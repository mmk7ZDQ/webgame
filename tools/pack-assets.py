#!/usr/bin/env python3
"""
pack-assets.py — 从 APK 生成 Web 端资源清单

Web 版不需要把 assets 原样解包成目录，而是生成一份 manifest.json 供运行时按需 fetch。
本工具输出：

    manifest.json   { version, total, groups: {maps:[...], music:[...]}, files: [...] }
    <out>/          可选：真正解包出来的文件（--extract）

每个条目含：路径、字节数、sha256、按扩展名推断的 MIME、以及加载策略建议
（eager = 首屏必需 / lazy = 按需 / stream = 音频流式）。

用法:
    python3 tools/pack-assets.py app.apk -o build/assets
    python3 tools/pack-assets.py app.apk -o build/assets --extract
"""
import argparse
import hashlib
import json
import mimetypes
import os
import zipfile

# 扩展名 → MIME（补几个 mimetypes 在部分系统上缺的）
EXTRA_MIME = {
    ".tmx": "application/x-tiled-tmx",
    ".ini": "text/plain; charset=utf-8",
    ".frag": "x-shader/x-fragment",
    ".vert": "x-shader/x-vertex",
    ".properties": "text/plain; charset=utf-8",
    ".png": "image/png",
    ".ogg": "audio/ogg",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ttf": "font/ttf",
    ".txt": "text/plain; charset=utf-8",
}


def mime_of(path):
    ext = os.path.splitext(path)[1].lower()
    return EXTRA_MIME.get(ext) or mimetypes.guess_type(path)[0] or "application/octet-stream"


def strategy_of(path):
    p = path.lower()
    if p.endswith((".ogg", ".mp3", ".wav")):
        return "stream"          # 15 MB 音乐，走流式
    if "/maps/" in p or p.endswith(".tmx"):
        return "lazy"            # 进关卡时再拉
    if p.endswith((".frag", ".vert", ".ini", ".properties", ".txt")):
        return "eager"           # 小文本，首屏全量
    if "/units/" in p or "/tilesets/" in p:
        return "lazy"            # 贴图按单位/地块懒加载
    if p.endswith(".png"):
        return "lazy"
    return "eager"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("apk")
    ap.add_argument("-o", "--out", default="build/assets")
    ap.add_argument("--extract", action="store_true", help="同时解包文件到输出目录")
    ap.add_argument("--prefix", default="assets/")
    args = ap.parse_args()

    entries = []
    groups = {}
    total = 0
    with zipfile.ZipFile(args.apk) as z:
        names = [n for n in z.namelist() if n.startswith(args.prefix) and not n.endswith("/")]
        for n in sorted(names):
            data = z.read(n)
            rel = n[len(args.prefix):]
            h = hashlib.sha256(data).hexdigest()
            group = rel.split("/")[0] if "/" in rel else "_root"
            entries.append({
                "path": rel,
                "size": len(data),
                "sha256": h[:16],
                "mime": mime_of(rel),
                "load": strategy_of(n),
                "group": group,
            })
            groups.setdefault(group, {"count": 0, "bytes": 0, "eager": 0})
            groups[group]["count"] += 1
            groups[group]["bytes"] += len(data)
            if strategy_of(n) == "eager":
                groups[group]["eager"] += 1
            total += len(data)
            if args.extract:
                dst = os.path.join(args.out, *rel.split("/"))
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                with open(dst, "wb") as f:
                    f.write(data)

    eager_bytes = sum(e["size"] for e in entries if e["load"] == "eager")
    manifest = {
        "generated_by": "tools/pack-assets.py",
        "source": os.path.basename(args.apk),
        "total_bytes": total,
        "eager_bytes": eager_bytes,
        "file_count": len(entries),
        "groups": groups,
        "files": entries,
    }
    os.makedirs(args.out, exist_ok=True)
    out_path = os.path.join(args.out, "manifest.json")
    with open(out_path, "w") as f:
        json.dump(manifest, f, indent=1, ensure_ascii=False)

    print(f"文件 {len(entries)}  总计 {total/1048576:.1f} MB  "
          f"首屏(eager) {eager_bytes/1048576:.1f} MB")
    for g, s in sorted(groups.items(), key=lambda kv: -kv[1]["bytes"]):
        print(f"  {g:16s} {s['count']:4d} 个  {s['bytes']/1048576:7.2f} MB  eager={s['eager']}")
    print(f"→ {out_path}")


if __name__ == "__main__":
    main()
