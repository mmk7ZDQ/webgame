#!/usr/bin/env bash
# ============================================================================
# 千单位压测 · Android 侧采样
#
# 目的：回答项目最大的未知数 —— 千单位场景下内存与帧率是否撑得住。
# 这不是单元测试，需要人工操作游戏进入战斗场景，脚本负责自动采样与出报告。
#
# 用法：
#   ./bench-android.sh                      # 连默认设备（localhost:5555）
#   SERIAL=emulator-5554 ./bench-android.sh
#   APK=/path/app.apk DURATION=120 ./bench-android.sh
#
# 输出：
#   bench/<时间戳>/report.md   +   raw.csv
# ============================================================================
set -uo pipefail

SERIAL="${SERIAL:-localhost:5555}"
APK="${APK:-}"
PKG="${PKG:-com.corrodinggames.rts}"
DURATION="${DURATION:-60}"        # 每个阶段采样秒数
INTERVAL="${INTERVAL:-2}"         # 采样间隔
OUTDIR="bench/$(date +%Y%m%d-%H%M%S)"

c_ok()   { printf '\033[1;32m✓\033[0m %s\n' "$*"; }
c_info() { printf '\033[1;33m→\033[0m %s\n' "$*"; }
c_ask()  { printf '\033[1;36m?\033[0m %s\n' "$*"; }
die()    { printf '\033[1;31m✗\033[0m %s\n' "$*" >&2; exit 1; }

command -v adb >/dev/null || die "需要 adb"

adb connect "$SERIAL" >/dev/null 2>&1 || true
STATE=$(adb -s "$SERIAL" get-state 2>/dev/null || echo none)
[ "$STATE" = "device" ] || die "设备 $SERIAL 未就绪（get-state=$STATE）。先启动 redroid：deploy/stream-server.sh"
c_ok "设备就绪: $SERIAL"

mkdir -p "$OUTDIR"
CSV="$OUTDIR/raw.csv"
echo "phase,ts,elapsed_s,pss_kb,heap_kb,frames,fps,cpu_pct" > "$CSV"

# ---------------------------------------------------------------- 工具函数
get_frames() {
  adb -s "$SERIAL" shell dumpsys gfxinfo "$PKG" 2>/dev/null \
    | awk '/Total frames rendered/ {print $4; exit}' | tr -d '\r'
}
get_pss() {
  adb -s "$SERIAL" shell dumpsys meminfo "$PKG" 2>/dev/null \
    | awk '/TOTAL PSS/ {print $3; exit} /^ *TOTAL +[0-9]+/ {print $2; exit}' | tr -d '\r'
}
get_heap() {
  adb -s "$SERIAL" shell dumpsys meminfo "$PKG" 2>/dev/null \
    | awk '/Dalvik Heap|Native Heap/ && /TOTAL/ {next} /^ *Java Heap|^ *Dalvik Heap/ {print $3; exit}' | tr -d '\r'
}
get_cpu() {
  adb -s "$SERIAL" shell top -n 1 -b 2>/dev/null \
    | awk -v p="$PKG" '$0 ~ p {print $9; exit}' | tr -d '\r%'
}

# 采样一个阶段
sample_phase() {
  local phase="$1" dur="$2"
  local t0 f0 f1 ts el pss heap cpu fps
  f0=$(get_frames); t0=$(date +%s)
  c_info "采样「$phase」${dur}s …（每 ${INTERVAL}s 一次）"
  while :; do
    ts=$(date +%s); el=$((ts - t0))
    [ "$el" -ge "$dur" ] && break
    f1=$(get_frames); pss=$(get_pss); heap=$(get_heap); cpu=$(get_cpu)
    if [ -n "${f1:-}" ] && [ -n "${f0:-}" ]; then
      fps=$(awk -v a="$f1" -v b="$f0" -v e="$el" 'BEGIN{ if(e>0) printf "%.1f", (a-b)/e; else printf "0" }')
    else
      fps=""
    fi
    echo "$phase,$ts,$el,${pss:-},${heap:-},${f1:-},${fps:-},${cpu:-}" >> "$CSV"
    printf '\r    elapsed %3ds  PSS %8s KB  fps %5s  cpu %3s%%' "$el" "${pss:-?}" "${fps:-?}" "${cpu:-?}"
    sleep "$INTERVAL"
  done
  echo
  c_ok "「$phase」完成"
}

# ---------------------------------------------------------------- 前置
if [ -n "$APK" ] && [ -f "$APK" ]; then
  c_info "安装 $(basename "$APK")"
  adb -s "$SERIAL" install -r -g "$APK" || die "安装失败"
else
  c_info "未提供 APK，假定已安装 $PKG"
fi

c_info "冷启动游戏"
adb -s "$SERIAL" shell am force-stop "$PKG"
sleep 2
adb -s "$SERIAL" shell monkey -p "$PKG" -c android.intent.category.LAUNCHER 1 >/dev/null 2>&1
sleep 8
c_ok "已启动"

# ---------------------------------------------------------------- 三阶段
echo
c_ask "阶段 1/3：停在主菜单，不要操作。按回车开始（${DURATION}s）"
read -r _
sample_phase "idle_menu" "$DURATION"

echo
c_ask "阶段 2/3：进入单机遭遇战，开一个中等规模地图（每方 2 个 AI），开始游戏后按回车"
read -r _
sample_phase "match_start" "$DURATION"

echo
c_ask "阶段 3/3：造到约 500–1000 个单位（或让 AI 打到后期），场面拉满后按回车"
read -r _
sample_phase "stress_1k" "$DURATION"

# ---------------------------------------------------------------- 报告
c_info "汇总报告"
python3 - "$CSV" "$OUTDIR/report.md" <<'PY'
import csv, sys, statistics as st
src, dst = sys.argv[1], sys.argv[2]
rows = list(csv.DictReader(open(src)))
phases = {}
for r in rows:
    phases.setdefault(r["phase"], []).append(r)

def nums(rs, key):
    v = []
    for r in rs:
        try: v.append(float(r[key]))
        except (ValueError, TypeError): pass
    return v

L = ["# 千单位压测报告", "", f"样本 {len(rows)} 条", "",
     "| 阶段 | PSS 均值 | PSS 峰值 | fps 均值 | fps 最低 | CPU 均值 |",
     "|---|---:|---:|---:|---:|---:|"]
verdict = []
for p, rs in phases.items():
    pss = nums(rs, "pss_kb"); fps = nums(rs, "fps"); cpu = nums(rs, "cpu_pct")
    row = [p,
           f"{st.mean(pss)/1024:.0f} MB" if pss else "-",
           f"{max(pss)/1024:.0f} MB" if pss else "-",
           f"{st.mean(fps):.1f}" if fps else "-",
           f"{min(fps):.1f}" if fps else "-",
           f"{st.mean(cpu):.0f}%" if cpu else "-"]
    L.append("| " + " | ".join(row) + " |")
    if p == "stress_1k" and fps:
        verdict.append((st.mean(fps), max(pss) if pss else 0))

L += ["", "## 判定", ""]
if verdict:
    fps, pss = verdict[0]
    if fps >= 25:
        L.append(f"**通过** —— 压力场景 {fps:.1f} fps。移植路线 B 的图形部分可行，"
                 f"工作量估算维持 2–2.5 人月。")
    elif fps >= 12:
        L.append(f"**存疑** —— 压力场景 {fps:.1f} fps。原生都不到 25fps，"
                 f"Web 端（尤其 Canvas2D 路径）会更慢，需要认真评估单位上限与渲染裁剪。")
    else:
        L.append(f"**警告** —— 压力场景仅 {fps:.1f} fps。这已经是原生性能，"
                 f"Web 移植后大概率不可玩；建议改走路线 A（云串流）。")
    if pss:
        L.append("")
        L.append(f"峰值 PSS {pss/1024:.0f} MB —— wasm 线性内存需按此值上浮 1.5 倍预分配。")
open(dst, "w").write("\n".join(L) + "\n")
print("\n".join(L))
PY

echo
c_ok "报告: $OUTDIR/report.md"
c_ok "原始数据: $CSV"
echo
echo "把这行结论回填到 docs/ARCHITECTURE.md 的「未验证假设」第 3 条。"
