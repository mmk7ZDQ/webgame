#!/usr/bin/env python3
"""
dex-scan.py — 复现本仓库所有静态分析数字

用法:
    python3 tools/dex-scan.py path/to/app.apk
    python3 tools/dex-scan.py path/to/app.apk --classes   # 只列外部类

输出:
    - dex 头信息（字符串/类型/方法/类计数）
    - 外部类引用清单，按包分组
    - native 库存在性
    - 关键 API 指纹（反射 / AWT / GL / 音频 / 网络）
"""
import argparse
import collections
import re
import struct
import sys
import zipfile


def read_uleb128(data, pos):
    result = shift = 0
    while True:
        b = data[pos]
        pos += 1
        result |= (b & 0x7F) << shift
        shift += 7
        if not b & 0x80:
            return result, pos


def dex_strings(blob):
    """Yield every string in a dex string table."""
    u32 = lambda o: struct.unpack_from("<I", blob, o)[0]
    sids, ssize = u32(0x3C), u32(0x38)
    if sids == 0 or ssize == 0:
        return []
    out = []
    for i in range(ssize):
        off = u32(sids + 4 * i)
        if off <= 0 or off >= len(blob):
            continue
        try:
            length, pos = read_uleb128(blob, off)
        except IndexError:
            continue
        out.append(blob[pos:pos + length].decode("utf-8", "replace"))
    return out


def header_stats(blob, name):
    u32 = lambda o: struct.unpack_from("<I", blob, o)[0]
    return {
        "file": name,
        "strings": u32(0x38),
        "types": u32(0x40),
        "protos": u32(0x48),
        "fields": u32(0x50),
        "methods": u32(0x58),
        "classes": u32(0x60),
    }


FINGERPRINTS = {
    "反射 Class.forName": rb"Class\.forName",
    "反射 Method.invoke": rb"java/lang/reflect/Method",
    "JNI loadLibrary": rb"System\.loadLibrary",
    "AWT": rb"java/awt/",
    "Swing": rb"javax/swing/",
    "GLES 固定管线": rb"javax/microedition/khronos/opengles/GL1[01]",
    "GLES 2.0": rb"android/opengl/GLES20",
    "EGL": rb"javax/microedition/khronos/egl/EGL",
    "SoundPool": rb"android/media/SoundPool",
    "MediaPlayer": rb"android/media/MediaPlayer",
    "UDP DatagramSocket": rb"java/net/DatagramSocket",
    "HTTP": rb"java/net/HttpURLConnection",
    "Canvas 2D": rb"android/graphics/Canvas",
    "SurfaceView": rb"android/view/SurfaceView",
    "WebView": rb"android/webkit/WebView",
}

DESC_RE = re.compile(rb"L[A-Za-z0-9_$/]+;")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("apk")
    ap.add_argument("--classes", action="store_true", help="只输出外部类清单")
    args = ap.parse_args()

    with zipfile.ZipFile(args.apk) as z:
        names = z.namelist()
        dexes = sorted(n for n in names if n.endswith(".dex"))
        natives = sorted(n for n in names if n.endswith(".so"))
        assets = [n for n in names if n.startswith("assets/")]

        print("=" * 66)
        print(f"APK: {args.apk}")
        print(f"dex 文件: {len(dexes)}  |  native .so: {len(natives)}  |  assets: {len(assets)} 个")
        if natives:
            print("  ⚠ 存在 native 库 — 移植需额外处理指令集翻译:")
            for n in natives[:10]:
                print("   ", n)
        else:
            print("  ✓ 无 native 库，纯 Java —— 渲染层可在 Java 侧整体替换")
        print("=" * 66)

        all_strings = []
        for d in dexes:
            blob = z.read(d)
            st = header_stats(blob, d)
            if not args.classes:
                print(
                    f"{st['file']:16s} strings={st['strings']:6d} types={st['types']:5d} "
                    f"methods={st['methods']:6d} classes={st['classes']:5d}"
                )
            all_strings += dex_strings(blob)

        cls = set()
        for s in all_strings:
            if s.startswith("L") and s.endswith(";") and "/" in s:
                cls.add(s[1:-1])

        # 兜底：string 表解析为空时再直接正则扫二进制
        # 注意：正则会在 "…\\0LLcom/foo;\\0" 这类相邻 shorty 串上产生 "Lcom/foo" 假阳性，
        # 因此仅在主解析失败时启用，并剔除残留的前导 L。
        if not cls:
            valid = re.compile(r"^[A-Za-z_$][A-Za-z0-9_$]*(?:/[A-Za-z0-9_$]+)*$")
            for d in dexes:
                for m in DESC_RE.findall(z.read(d)):
                    c = m[1:-1].decode("utf-8", "replace")
                    if valid.match(c):
                        cls.add(c)

        own = {c for c in cls if c.startswith("com/corrodinggames")}
        ext = sorted(cls - own)

        print(f"\n自有类: {len(own)}   外部类: {len(ext)}")

        groups = collections.Counter()
        for c in ext:
            p = c.split("/")
            if p[0] == "android":
                groups["android/" + p[1]] += 1
            elif p[0] in ("java", "javax", "org", "dalvik", "com", "sun", "org"):
                groups[f"{p[0]}/{p[1] if len(p) > 1 else ''}"] += 1
            else:
                groups[p[0]] += 1
        print("\n外部依赖分布:")
        for k, v in groups.most_common(24):
            print(f"  {k:38s}{v:4d}")

        if not args.classes:
            print("\nAPI 指纹:")
            for label, pat in FINGERPRINTS.items():
                n = sum(len(re.findall(pat, z.read(d))) for d in dexes)
                mark = "✓" if n else "·"
                print(f"  {mark} {label:22s}{n:5d}")

            print("\n外部类全清单:")
        print()
        for c in ext:
            print(" ", c)


if __name__ == "__main__":
    main()
