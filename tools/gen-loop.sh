#!/usr/bin/env bash
# 自动补齐缺失符号的迭代循环：
#   跑 TeaVM → 从错误日志生成缺失类 → 合并进累积 jar → 再跑
# 只生成第三方库（org.* 等）的缺失类；java.*/com.*/android.* 必须手工处理。
set -uo pipefail
cd "$(dirname "$0")/.."

JAVA="${JAVA_HOME:-$HOME/.local/opt/jdk17}/bin/java"
RWT="$PWD/tools/java/out"
ASM="$PWD/tools/teavm-lib/asm-9.8.jar"
LIB="$PWD/tools/teavm-lib"
NOCLASS="/dev/null"
MAX=${MAX:-6}

rm -rf build/gen build/gen.jar
mkdir -p build/gen

for i in $(seq 1 "$MAX"); do
  OUT="/tmp/genloop$i"
  rm -rf "$OUT"; mkdir -p "$OUT"
  "$JAVA" -cp "$LIB/*:$PWD/build/rw-nosync.jar:$PWD/stubs/stubs.jar:$PWD/build/rwutil.jar:$PWD/build/gen.jar:$PWD/build/launcher" \
    org.teavm.cli.TeaVMRunner -t js -O1 -d "$OUT" rwweb.Bootstrap > "/tmp/genloop$i.log" 2>&1
  N=$(grep -cE '^ERROR' "/tmp/genloop$i.log" || true)
  echo "迭代 $i：缺失 $N"
  if [ -s "$OUT/classes.js" ] && [ "$N" -eq 0 ]; then
    echo "✓ 编译通过：$OUT/classes.js"
    exit 0
  fi
  [ "$N" -eq 0 ] && { echo "错误已清零但产物为空，见 /tmp/genloop$i.log"; exit 1; }
  "$JAVA" -cp "$RWT:$ASM" rwtool.GenMissing "/tmp/genloop$i.log" "build/gen-$i.jar" | tail -1
  ( cd build/gen && unzip -oq "../gen-$i.jar" 2>/dev/null || true )
  ( cd build/gen && "$JAVA" -version >/dev/null 2>&1; jar cf ../gen.jar . )
  # 没有新类可加就停
  if [ ! -s build/gen.jar ]; then echo "无法再生成新类，停止"; exit 1; fi
done
echo "达到迭代上限 $MAX"
