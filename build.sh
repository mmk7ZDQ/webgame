#!/usr/bin/env bash
# ============================================================================
# 铁锈战争 Web 移植 · 构建链
#
#   ./build.sh stubs     从 APK 生成 Java 桩源码
#   ./build.sh jar       编译桩并打包 stubs.jar
#   ./build.sh dex       APK → rw.jar（需要 dex2jar）
#   ./build.sh wasm      桩 + rw.jar → WebAssembly（需要 teavm-cli）
#   ./build.sh assets    生成资源清单 manifest.json
#   ./build.sh demo      把编译产物同步到 demo/（GitHub Pages 用）
#   ./build.sh all       stubs → jar → dex → wasm → assets
#
# 环境变量：
#   APK     APK 路径（默认自动在仓库根与 ~/文档 下找）
#   JAVA_HOME  JDK 17+
#   D2J     d2j-dex2jar.sh 路径（可选，缺失时 dex 步骤会跳过）
#   TEAVM   teavm-cli.jar 路径（可选）
# ============================================================================
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

PY="${PYTHON:-python3}"
OUT="build"
STUB_SRC="stubs/src"
STUB_OUT="stubs/out"
STUB_JAR="stubs/stubs.jar"
IMPL_SRC="impl/src"
# 这些类由 impl/src 手写实现（Web Canvas2D 后端），不由生成器产出
# launcher 源码里需要写 "包.类" 形式、而该包名同时又是类名的，必须从这里剔除
LAUNCHER_STRIP="com/corrodinggames/rts/gameFramework/b,com/corrodinggames/rts/gameFramework/m,com/corrodinggames/rts/game/b"
IMPL_CLASSES="android/content/pm/Signature,android/graphics/BitmapFactory,android/content/Context,android/content/res/Resources,android/content/res/AssetManager,android/content/pm/PackageManager,android/content/SharedPreferences,android/opengl/GLES20,android/graphics/Canvas,android/graphics/Paint,android/graphics/Bitmap,android/graphics/Color,android/graphics/Rect,android/graphics/RectF,android/graphics/Matrix,android/graphics/Path,android/graphics/PorterDuff"

c_ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
c_info() { printf '\033[1;33m→\033[0m %s\n' "$*"; }
c_warn() { printf '\033[1;35m!\033[0m %s\n' "$*"; }
die()    { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

find_apk() {
  if [ -n "${APK:-}" ] && [ -f "$APK" ]; then echo "$APK"; return; fi
  local cand
  for cand in "$ROOT"/*.apk "$HOME/文档"/*.apk "$HOME/Downloads"/*.apk \
              "$HOME/.dsh/attachments/v1/files"/*/*/*.apk; do
    [ -f "$cand" ] && { echo "$cand"; return; }
  done
  die "找不到 APK。请用 APK=/path/to/app.apk ./build.sh ..."
}

find_java() {
  if [ -n "${JAVA_HOME:-}" ] && [ -x "$JAVA_HOME/bin/javac" ]; then
    echo "$JAVA_HOME"; return
  fi
  if command -v javac >/dev/null 2>&1; then
    dirname "$(dirname "$(readlink -f "$(command -v javac)")")"; return
  fi
  for j in "$HOME/.local/opt/jdk"* /usr/lib/jvm/*; do
    [ -x "$j/bin/javac" ] && { echo "$j"; return; }
  done
  die "找不到 javac（需要 JDK 17+）"
}

STUB_STAMP="stubs/.impl-stamp"
step_stubs() {
  local apk; apk="$(find_apk)"
  c_info "生成桩源码 ← $(basename "$apk")"
  rm -rf "$STUB_SRC"
  $PY tools/gen-stubs.py "$apk" -o "$STUB_SRC" --impl "$IMPL_CLASSES"
  echo "$IMPL_CLASSES" > "$STUB_STAMP"
  c_ok "桩源码: $(find "$STUB_SRC" -name '*.java' | wc -l) 个文件 + 手写实现 $(find "$IMPL_SRC" -name '*.java' | wc -l) 个"
}

step_jar() {
  local jdk; jdk="$(find_java)"
  # 手写实现清单变了就要重新生成，否则生成的桩会和 impl 冲突
  if [ ! -d "$STUB_SRC" ] || [ "$(cat "$STUB_STAMP" 2>/dev/null)" != "$IMPL_CLASSES" ]; then
    step_stubs
  fi
  c_info "编译桩 + 实现 → $STUB_JAR"
  rm -rf "$STUB_OUT"; mkdir -p "$STUB_OUT"
  find "$STUB_SRC" "$IMPL_SRC" -name '*.java' > "$OUT/sources.txt"
  # TeaVM 的 JSO 绑定需要一起在 classpath 上
  local jso_cp=""
  if [ -d "$ROOT/tools/teavm-lib" ]; then
    jso_cp="$ROOT/tools/teavm-lib/*"
  fi
  "$jdk/bin/javac" -nowarn ${jso_cp:+-cp "$jso_cp"} -d "$STUB_OUT" @"$OUT/sources.txt"
  "$jdk/bin/jar" cf "$STUB_JAR" -C "$STUB_OUT" .
  c_ok "stubs.jar: $(du -h "$STUB_JAR" | cut -f1)，$(find "$STUB_OUT" -name '*.class' | wc -l) 个类"
}

DEX_ATTEMPTED=""
step_dex() {
  [ -n "$DEX_ATTEMPTED" ] && return 1
  DEX_ATTEMPTED=1
  local apk; apk="$(find_apk)"
  local d2j="${D2J:-}"
  [ -z "$d2j" ] && command -v d2j-dex2jar.sh >/dev/null 2>&1 && d2j="$(command -v d2j-dex2jar.sh)"
  # 自动发现 tools/ 下解压好的 dex-tools
  if [ -z "$d2j" ]; then
    for cand in "$ROOT"/tools/dex-tools*/d2j-dex2jar.sh "$ROOT"/tools/dex-tools*/*/d2j-dex2jar.sh; do
      [ -x "$cand" ] && { d2j="$cand"; break; }
    done
  fi
  if [ -z "$d2j" ] || [ ! -x "$d2j" ]; then
    c_warn "未找到 d2j-dex2jar.sh，跳过 dex 步骤"
    c_warn "  获取方式: https://github.com/pxb1988/dex2jar/releases  解压后 D2J=... ./build.sh dex"
    c_warn "  （本环境 GitHub Release 下载不稳，可换 Maven 镜像或代理）"
    return 1
  fi
  mkdir -p "$OUT"
  c_info "APK → rw.jar"
  "$d2j" "$apk" -o "$OUT/rw.jar" --force >/dev/null
  c_ok "rw.jar: $(du -h "$OUT/rw.jar" | cut -f1)"
}

step_wasm() {
  local jdk; jdk="$(find_java)"
  local tlib="$ROOT/tools/teavm-lib"
  # 实现层源码比 jar 新就重编，否则 wasm 会用到过期的桩
  if [ ! -f "$STUB_JAR" ] || [ -n "$(find "$IMPL_SRC" -newer "$STUB_JAR" -name '*.java' 2>/dev/null | head -1)" ]; then
    step_jar
  fi
  [ -f "$OUT/rw.jar" ] || { step_dex || { c_warn "缺少 rw.jar，wasm 步骤中止"; return 1; }; }
  if ! ls "$tlib"/*.jar >/dev/null 2>&1; then
    c_warn "未找到 TeaVM 依赖，跳过 wasm 步骤"
    c_warn "  python3 tools/fetch-maven.py org.teavm:teavm-cli:0.14.1 -o tools/teavm-lib"
    return 1
  fi

  # --- launcher classpath ---
  # com.corrodinggames.rts.gameFramework.b 既是包又有同名类，
  # Java 源码里无法写 b.t。编译 launcher 时把那个类剔掉，编译完 TeaVM 再用完整 jar。
  c_info "准备 launcher classpath（剔除与包同名的类）"
  $PY - "$OUT/rw.jar" "$OUT/rw-launcher-cp.jar" "$LAUNCHER_STRIP" <<'PYEOF'
import sys, zipfile
src, dst, strip = sys.argv[1], sys.argv[2], sys.argv[3]
drop = {c.strip() for c in strip.split(",") if c.strip()}
with zipfile.ZipFile(src) as zi:
    names = zi.namelist()
    with zipfile.ZipFile(dst, 'w', zipfile.ZIP_STORED) as zo:
        for n in names:
            if n.endswith('.class') and n[:-6] in drop:
                continue
            zo.writestr(n, zi.read(n))
print('剔除同名类:', ', '.join(sorted(c.split('/')[-1] for c in drop)))
PYEOF

  c_info "编译 launcher"
  mkdir -p "$OUT/launcher"
  "$jdk/bin/javac" -nowarn -cp "$OUT/rw-launcher-cp.jar:$STUB_JAR:$tlib/*" \
    -d "$OUT/launcher" web/src/rwweb/Bootstrap.java || { c_warn "launcher 编译失败"; return 1; }

  # TeaVM 0.14 在依赖分析阶段遇到 monitor-exit 会 NPE；Web 端单线程也不需要锁，
  # 所以把 RW 字节码里的 monitor-enter/exit 全部换成 NOP。
  local NOSYNC="$OUT/rw-nosync.jar"
  if [ ! -f "$NOSYNC" ] || [ "$OUT/rw.jar" -nt "$NOSYNC" ]; then
    c_info "去除 synchronized 监控器指令"
    local asm_cp="$ROOT/tools/teavm-lib/asm-9.8.jar"
    local tool_out="$ROOT/tools/java/out"
    if [ ! -d "$tool_out" ]; then
      mkdir -p "$tool_out"
      "$jdk/bin/javac" -nowarn -cp "$asm_cp" -d "$tool_out" \
        "$ROOT/tools/java/rwtool/StripMonitors.java" || { c_warn "strip 工具编译失败"; return 1; }
    fi
    "$jdk/bin/java" -cp "$tool_out:$asm_cp" rwtool.StripMonitors "$OUT/rw.jar" "$NOSYNC"
  fi

  c_info "TeaVM AOT → JavaScript"
  rm -rf "$OUT/wasm"; mkdir -p "$OUT/wasm"
  # 注意：TeaVM 的 -p 只影响增量重载，被测类必须放在 JVM classpath 上
  "$jdk/bin/java" -cp "$tlib/*:$OUT/rw-nosync.jar:$STUB_JAR:$OUT/launcher" \
    org.teavm.cli.TeaVMRunner -t js -O1 \
    -d "$OUT/wasm" rwweb.Bootstrap 2>&1 | tee "$OUT/teavm.log" | grep -E 'INFO|ERROR' || true

  if [ -f "$OUT/wasm/classes.js" ]; then
    c_ok "wasm 产物: $OUT/wasm/classes.js ($(du -h "$OUT/wasm/classes.js" | cut -f1))"
    grep -E 'Classes compiled|Methods compiled' "$OUT/teavm.log" | sed 's/^INFO: /  /'
  else
    c_warn "未生成 classes.js，见 $OUT/teavm.log"
    return 1
  fi
}

step_demo() {
  mkdir -p demo
  if [ -f "$OUT/wasm/classes.js" ]; then
    cp "$OUT/wasm/classes.js" demo/classes.js
    c_ok "demo/classes.js: $(du -h demo/classes.js | cut -f1)"
  else
    c_warn "缺少 classes.js，跳过 demo 同步"
  fi
}

step_assets() {
  local apk; apk="$(find_apk)"
  c_info "生成资源清单"
  $PY tools/pack-assets.py "$apk" -o "$OUT/assets"
  c_ok "manifest: $OUT/assets/manifest.json"
}

mkdir -p "$OUT"
case "${1:-all}" in
  stubs)  step_stubs ;;
  jar)    step_jar ;;
  dex)    step_dex || true ;;
  wasm)   step_wasm || true ;;
  assets) step_assets ;;
  demo)   step_demo ;;
  all)
    step_stubs
    step_jar
    step_dex   || true
    step_wasm  || true
    step_assets
    step_demo
    ;;
  *) die "未知目标：$1（stubs|jar|dex|wasm|assets|all）" ;;
esac
