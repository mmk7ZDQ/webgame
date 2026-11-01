#!/usr/bin/env bash
# 把整台引擎编译成 classes.js 的完整流水线。
#
#   rw.jar
#    → StripMonitors  monitor→NOP + 类/方法/new 重定向
#    → TrimHttp       裁掉引用 org/apache/http 的方法
#    → PatchGetClass  getClass/Field.getType/Locale/ResourceBundle 调用点替换
#    → TrimMethod     裁掉指定方法（LogicBooleanLoader 之类）
#    → TeaVM          → classes.js（约 22 MB）
#
# 用法：./tools/build-engine.sh [输出目录]
set -euo pipefail
cd "$(dirname "$0")/.."

JAVA="${JAVA_HOME:-$HOME/.local/opt/jdk17}/bin/java"
JAVAC="${JAVA_HOME:-$HOME/.local/opt/jdk17}/bin/javac"
RWT="$PWD/tools/java/out"
ASM="$PWD/tools/teavm-lib/asm-9.8.jar"
ASMT="$PWD/tools/teavm-lib/asm-tree-9.8.jar"
ASMC="$PWD/tools/teavm-lib/asm-commons-9.8.jar"
LIB="$PWD/tools/teavm-lib"
OUTDIR="${1:-/tmp/engine}"
B=build

# 0) 工具与 classlib 补丁
mkdir -p "$RWT"
"$JAVAC" -nowarn -cp "$ASM:$ASMT:$ASMC" -d "$RWT" tools/java/rwtool/*.java
"$JAVAC" -nowarn -d "$B/classlib" $(find impl/classlib -name '*.java')
(cd "$B/classlib" && jar cf ../classlib-patch.jar .)

# 1) rwutil（含手写层）
rm -rf "$B/rwutil"; mkdir -p "$B/rwutil"
"$JAVAC" -nowarn -d "$B/rwutil" impl/rwutil/rwutil/*.java
(cd "$B/rwutil" && jar cf ../rwutil.jar .)

# 2) 字节码变换链
"$JAVA" -cp "$RWT:$ASM:$ASMC" rwtool.StripMonitors  "$B/rw.jar" "$B/rw-nosync.jar"  >/dev/null
"$JAVA" -cp "$RWT:$ASM:$ASMT"  rwtool.TrimHttp       "$B/rw-nosync.jar" "$B/rw-trimmed.jar" >/dev/null
"$JAVA" -cp "$RWT:$ASM"        rwtool.PatchGetClass  "$B/rw-trimmed.jar" "$B/rw-final.jar"  >/dev/null
"$JAVA" -cp "$RWT:$ASM:$ASMT"  rwtool.TrimMethod    "$B/rw-final.jar" "$B/rw-final2.jar" \
  "com/corrodinggames/rts/game/units/custom/logicBooleans/LogicBooleanLoader#setArgumentWithMapping" \
  "com/corrodinggames/rts/game/units/custom/logicBooleans/LogicBooleanLoader#setArgumentsRaw" \
  "com/corrodinggames/rts/gameFramework/f#b" >/dev/null
# 注：gameFramework.f.b(byte[]) 是哈希转十六进制，TeaVM 的 Formatter 不支持 BigInteger 的 %X，
# 直接裁掉（返回值调用方只用于日志/ID 展示）

# 3) launcher
"$JAVAC" -nowarn -cp "$B/rw-launcher-cp.jar:stubs/stubs.jar:$LIB/*:$B/rwutil.jar" \
  -d "$B/launcher" web/src/rwweb/Bootstrap.java 2>/dev/null

# 4) TeaVM
rm -rf "$OUTDIR"; mkdir -p "$OUTDIR"
"$JAVA" -cp "$LIB/*:$B/classlib-patch.jar:$B/gen.jar:$B/rwutil.jar:$B/rw-final2.jar:stubs/stubs.jar:$B/launcher" \
  org.teavm.cli.TeaVMRunner -t js -O1 -d "$OUTDIR" rwweb.Bootstrap > /tmp/engine-build.log 2>&1 || true

N=$(grep -cE '^ERROR' /tmp/engine-build.log || true)
if [ -s "$OUTDIR/classes.js" ]; then
  printf '✓ %s/classes.js  %.1f MB  缺失 %s\n' "$OUTDIR" \
    "$(stat -c%s "$OUTDIR/classes.js" | awk '{print $1/1048576}')" "$N"
  [ "$N" -gt 0 ] && grep -E '^ERROR' /tmp/engine-build.log | sed 's/^ERROR: //' | sort -u | head -5
else
  echo "✗ 未生成 classes.js，缺失 $N"; grep -E '^ERROR' /tmp/engine-build.log | sed 's/^ERROR: //' | sort -u | head -8
  exit 1
fi
