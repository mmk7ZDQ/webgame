#!/usr/bin/env python3
"""
tmx2json.py — 把 Rusted Warfare 的 Tiled 地图（.tmx）转成浏览器友好的 JSON

TMX 的 layer 数据是 base64 + gzip，浏览器里解压要额外依赖；构建时转换更稳。

输出：
    <name>.json      地图尺寸、tileset 表、每层的 gid 数组
    <out>/tiles/*.png  该地图实际用到的 tileset 贴图

用法:
    python3 tools/tmx2json.py assets/maps/normal/xxx.tmx -o web/viewer/maps
"""
import argparse
import base64
import gzip
import json
import os
import re
import shutil
import xml.etree.ElementTree as ET


def parse_layer_data(layer):
    data = layer.find("data")
    if data is None:
        return []
    enc = data.get("encoding")
    comp = data.get("compression")
    raw = (data.text or "").strip()
    if enc == "base64":
        blob = base64.b64decode(raw)
        if comp == "gzip":
            blob = gzip.decompress(blob)
        elif comp == "zlib":
            import zlib
            blob = zlib.decompress(blob)
        # 小端 uint32 数组
        return [int.from_bytes(blob[i:i + 4], "little") for i in range(0, len(blob) - 3, 4)]
    if enc == "csv":
        return [int(v) for v in re.split(r"[,\s]+", raw) if v.strip()]
    return []


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("tmx")
    ap.add_argument("-o", "--out", default="web/viewer/maps")
    ap.add_argument("--assets-root", default="",
                    help="assets 根目录（用于找贴图），默认从 tmx 路径往上推")
    args = ap.parse_args()

    root = ET.parse(args.tmx).getroot()
    W = int(root.get("width"))
    H = int(root.get("height"))
    TW = int(root.get("tilewidth"))
    TH = int(root.get("tileheight"))

    # 地图目录用于解析外部 .tsx 引用
    tmx_dir = os.path.dirname(os.path.abspath(args.tmx))
    tsx_root = None
    if args.assets_root:
        tsx_root = os.path.join(args.assets_root, "tilesets")

    tilesets = []
    for ts in root.findall("tileset"):
        firstgid = int(ts.get("firstgid"))
        ext = ts.get("source")
        if ext:
            # 外部 .tsx：firstgid 在地图里，其余属性在 tsx 里
            cands = []
            if tsx_root:
                cands.append(os.path.join(tsx_root, ext))
            cands.append(os.path.join(tmx_dir, ext))
            for c in cands:
                if os.path.exists(c):
                    ts = ET.parse(c).getroot()
                    break
        img = ts.find("image")
        src = img.get("source") if img is not None else None
        # TMX 里是 terrain/bitmaps/x.png，实际文件在 tilesets/bitmaps/x.png
        base = os.path.basename(src) if src else None
        tilesets.append({
            "firstgid": firstgid,
            "name": ts.get("name"),
            "tilewidth": int(ts.get("tilewidth", TW)),
            "tileheight": int(ts.get("tileheight", TH)),
            "columns": int(ts.get("columns") or 0),
            "tilecount": int(ts.get("tilecount") or 0),
            "image": base,
            "imagewidth": int(img.get("width") or 0) if img is not None else 0,
            "imageheight": int(img.get("height") or 0) if img is not None else 0,
        })

    layers = []
    for layer in root.findall("layer"):
        d = parse_layer_data(layer)
        layers.append({
            "name": layer.get("name"),
            "width": int(layer.get("width") or W),
            "height": int(layer.get("height") or H),
            "data": d,
        })

    # 统计用到的 tileset
    used = set()
    for layer in layers:
        for gid in layer["data"]:
            if gid == 0:
                continue
            for ts in sorted(tilesets, key=lambda t: -t["firstgid"]):
                if gid >= ts["firstgid"]:
                    used.add(ts["image"])
                    break

    os.makedirs(args.out, exist_ok=True)
    name = os.path.splitext(os.path.basename(args.tmx))[0]
    name = re.sub(r"[^A-Za-z0-9_.-]", "_", name)

    # 找贴图源目录
    assets_root = args.assets_root
    if not assets_root:
        p = os.path.abspath(args.tmx)
        while p != "/" and not os.path.isdir(os.path.join(p, "tilesets")):
            p = os.path.dirname(p)
        assets_root = p
    src_dir = os.path.join(assets_root, "tilesets", "bitmaps")
    dst_dir = os.path.join(args.out, "tiles")
    os.makedirs(dst_dir, exist_ok=True)
    copied = []
    for image in sorted(x for x in used if x):
        if not image:
            continue
        s = os.path.join(src_dir, image)
        if os.path.exists(s):
            shutil.copy2(s, os.path.join(dst_dir, image))
            copied.append(image)

    out = {
        "name": name,
        "availableImages": copied,
        "width": W, "height": H,
        "tilewidth": TW, "tileheight": TH,
        "tilesets": tilesets,
        "layers": layers,
    }
    jpath = os.path.join(args.out, name + ".json")
    with open(jpath, "w") as f:
        json.dump(out, f, separators=(",", ":"))

    # 同时输出一份可 <script> 同步加载的 JS：fetch 不计入 window load 事件，
    # headless 截图会在数据到位前就拍，用 script 标签才能保证时序。
    jspath = os.path.join(args.out, name + ".js")
    with open(jspath, "w") as f:
        f.write("window.__RW_MAP_JSON = ")
        json.dump(out, f, separators=(",", ":"))
        f.write(";\n")

    nonempty = {l["name"]: sum(1 for g in l["data"] if g) for l in layers}
    print(f"{name}: {W}x{H} tiles ({W*TW}x{H*TH} px), {len(tilesets)} tilesets")
    for ln, cnt in nonempty.items():
        print(f"  层 {ln}: {cnt} 个非空 tile")
    print(f"贴图复制 {len(copied)}/{len(used)} → {dst_dir}")
    print(f"→ {jpath}  ({os.path.getsize(jpath)//1024} KB)")


if __name__ == "__main__":
    main()
