#!/usr/bin/env bash
# ============================================================================
# 铁锈战争 Web 云串流服务端 · 一键部署
#
#   浏览器 (静态页 / GitHub Pages)
#        │ WSS
#        ▼
#      nginx ──► ws-scrcpy (Node, :8000)  ──adb──► redroid 容器 (Android 11)
#                                                     └─► txzz115_136310.apk
#
# 用法：
#   sudo APK_PATH=/path/txzz115_136310.apk DOMAIN=rts.example.com ./stream-server.sh
#
# 依赖：docker, nginx, certbot, node>=16, adb(android-sdk-platform-tools)
# ============================================================================
set -euo pipefail

DOMAIN="${DOMAIN:-rts.example.com}"
PORT="${PORT:-8000}"
ADB_PORT="${ADB_PORT:-5555}"
APK_PATH="${APK_PATH:-./txzz115_136310.apk}"
PKG="com.corrodinggames.rts"
WS_SCRCPY_DIR="${WS_SCRCPY_DIR:-/opt/ws-scrcpy}"

log(){ printf '\033[1;33m[+]\033[0m %s\n' "$*"; }
die(){ printf '\033[1;31m[!]\033[0m %s\n' "$*" >&2; exit 1; }

[ "$(id -u)" -eq 0 ] || die "需要 root"

# ---------------------------------------------------------------- 1. 内核模块
log "加载 binderfs 所需模块"
modprobe binder_linux 2>/dev/null || true
modprobe ashmem_linux 2>/dev/null || true
mkdir -p /dev/binderfs
mountpoint -q /dev/binderfs || mount -t binder binder /dev/binderfs 2>/dev/null || true

# ---------------------------------------------------------------- 2. redroid
log "启动 redroid（Android 11）"
docker rm -f rw-android >/dev/null 2>&1 || true
docker run -d --name rw-android --privileged \
  -v /dev/binderfs:/dev/binderfs \
  -v rw-data:/data \
  -p "${ADB_PORT}:5555" \
  redroid/redroid:11.0.0-latest \
  androidboot.redroid_width=1280 \
  androidboot.redroid_height=720 \
  androidboot.redroid_dpi=240 \
  androidboot.redroid_gpu_mode=guest \
  androidboot.redroid_fps=60

log "等待 adb 上线（最多 120s）"
for i in $(seq 1 60); do
  adb connect "localhost:${ADB_PORT}" >/dev/null 2>&1 || true
  if adb devices | grep -q "localhost:${ADB_PORT}[[:space:]]*device"; then break; fi
  sleep 2
done
adb devices | grep -q "localhost:${ADB_PORT}[[:space:]]*device" || die "adb 未就绪，检查 dmesg 与 binderfs"
SERIAL="localhost:${ADB_PORT}"
log "adb 就绪: ${SERIAL}"

# ---------------------------------------------------------------- 3. 装游戏
if [ -f "$APK_PATH" ]; then
  log "安装 $(basename "$APK_PATH")"
  adb -s "$SERIAL" install -r -g "$APK_PATH" || die "APK 安装失败"
else
  log "未找到 APK（$APK_PATH），跳过安装"
fi

log "性能调优：关动画、放开后台"
adb -s "$SERIAL" shell settings put global window_animation_scale 0    || true
adb -s "$SERIAL" shell settings put global transition_animation_scale 0 || true
adb -s "$SERIAL" shell settings put global animator_duration_scale 0    || true
adb -s "$SERIAL" shell svc power stayon true                            || true

# ---------------------------------------------------------------- 4. ws-scrcpy
if [ ! -d "$WS_SCRCPY_DIR" ]; then
  log "拉取 ws-scrcpy"
  git clone --depth 1 https://github.com/NetrisTV/ws-scrcpy.git "$WS_SCRCPY_DIR"
fi
log "构建 ws-scrcpy"
cd "$WS_SCRCPY_DIR"
npm install --no-audit --no-fund
npm run dist

log "启动 ws-scrcpy（:${PORT}）"
cat > /etc/systemd/system/ws-scrcpy.service <<UNIT
[Unit]
Description=ws-scrcpy for Rusted Warfare web
After=docker.service network-online.target
[Service]
Type=simple
WorkingDirectory=${WS_SCRCPY_DIR}
ExecStart=$(command -v npx) ts-node ./src/index.ts
Restart=always
RestartSec=5
Environment=WS_SCRCPY_PORT=${PORT}
Environment=ADB_HOST=127.0.0.1
[Install]
WantedBy=multi-user.target
UNIT
systemctl daemon-reload
systemctl enable --now ws-scrcpy

# ---------------------------------------------------------------- 5. nginx
log "配置 nginx 反代 + WSS"
cat > "/etc/nginx/sites-available/rw-stream" <<NGINX
server {
    listen 80;
    server_name ${DOMAIN};
    return 301 https://\$host\$request_uri;
}
server {
    listen 443 ssl http2;
    server_name ${DOMAIN};

    ssl_certificate     /etc/letsencrypt/live/${DOMAIN}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${DOMAIN}/privkey.pem;

    # 前端静态页（可换成 GitHub Pages 直连，此处便于同域避免 CORS）
    root /var/www/rw-web;
    index index.html;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    # scrcpy 的 WebSocket 通道，必须带 Upgrade
    location /ws/ {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_read_timeout 3600s;
        proxy_send_timeout 3600s;
        proxy_buffering off;
    }
    location / {
        proxy_pass http://127.0.0.1:${PORT};
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_read_timeout 3600s;
        proxy_buffering off;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/rw-stream /etc/nginx/sites-enabled/rw-stream
nginx -t && systemctl reload nginx

if ! [ -f "/etc/letsencrypt/live/${DOMAIN}/fullchain.pem" ]; then
  log "申请证书（需 ${DOMAIN} 已解析到本机）"
  certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "admin@${DOMAIN}" || \
    log "certbot 失败，可手动补证书后 reload nginx"
fi

# ---------------------------------------------------------------- 6. 收尾
cat <<EOF

$(printf '\033[1;32m✓ 部署完成\033[0m')

  Android 容器 : redroid (${SERIAL})
  串流服务     : http://127.0.0.1:${PORT}
  公网入口     : https://${DOMAIN}/

  前端嵌入示例（iframe）：
    <iframe src="https://${DOMAIN}/?action=stream"
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            style="width:100%;height:100vh;border:0"></iframe>

  常见问题：
   - 点击偏移 → 前端 canvas 尺寸必须与 redroid 的 1280x720 等比
   - 黑屏       → docker logs rw-android 看 SwiftShader 是否初始化
   - 卡顿       → 千单位场景换 gpu_mode=host 并确认 /dev/dri 挂进容器
   - 掉线       → proxy_read_timeout 已设 3600s，检查中间层是否有 60s 空闲断开

EOF
