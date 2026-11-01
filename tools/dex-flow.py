#!/usr/bin/env python3
"""
dex-flow.py — 方法级调用图与主循环路径还原

在 dex-calls.py 的字节码遍历基础上构建 method → method 调用图，
然后从指定入口做可达性分析，回答三个移植关键问题：

  1. 启动链：Application.onCreate → Activity → 游戏窗口 怎么进来
  2. 每帧路径：onDrawFrame / onDraw 里到底调了什么
  3. 状态树：从入口可达的自有类有多少、外部类有多少

用法:
    python3 tools/dex-flow.py app.apk --entry GameViewOpenGL.onDrawFrame
    python3 tools/dex-flow.py app.apk --list-entries
"""
import argparse
import collections
import json
import zipfile
from importlib.machinery import SourceFileLoader
import os

_here = os.path.dirname(os.path.abspath(__file__))
_m = SourceFileLoader("dc", os.path.join(_here, "dex-calls.py")).load_module()

ULEB = _m.uleb128
LEN = _m._LEN
INVOKE = _m.INVOKE_OPS


class Graph:
    def __init__(self, apk):
        self.sig = {}          # method_id -> "class->name(params)ret"
        self.owner = {}        # method_id -> class
        self.name = {}
        self.edges = collections.defaultdict(set)   # src_mid -> {dst_mid}
        self.callers = collections.defaultdict(set)
        self.decl = {}         # class -> set of method_ids
        self._build(apk)

    def _build(self, apk):
        with zipfile.ZipFile(apk) as z:
            for dexname in sorted(n for n in z.namelist() if n.endswith(".dex")):
                dex = _m.Dex(z.read(dexname))
                d = dex.d
                # 方法签名表（含外部方法）
                for mid, (cls, nm, ret, params) in enumerate(dex.methods):
                    key = f"{dexname}:{mid}"
                    self.sig[key] = f"{cls}->{nm}({''.join(params)}){ret}"
                    self.owner[key] = cls
                    self.name[key] = nm
                cls_n, cls_off = dex.u(0x60), dex.u(0x64)
                for class_idx, midx, code_off in dex.iter_code():
                    src = f"{dexname}:{midx}"
                    owner = dex.types[class_idx]
                    self.decl.setdefault(owner, set()).add(src)
                    try:
                        ins, n = dex.insns(code_off)
                    except Exception:
                        continue
                    i = 0
                    while i < n:
                        op = ins[i] & 0xFF
                        if op in INVOKE:
                            try:
                                dst = f"{dexname}:{ins[i + 1]}"
                                self.edges[src].add(dst)
                                self.callers[dst].add(src)
                            except (IndexError, KeyError):
                                pass
                        i += LEN[op]

    def cls(self, mid):
        o = self.owner.get(mid, "")
        return o[1:-1] if o.startswith("L") else o

    def reachable(self, start_mid, limit=200000):
        seen = {start_mid}
        q = collections.deque([start_mid])
        while q and len(seen) < limit:
            cur = q.popleft()
            for nxt in self.edges.get(cur, ()):
                if nxt not in seen:
                    seen.add(nxt)
                    q.append(nxt)
        return seen


def find(g, cls_sub, name_sub=None, exact_name=None):
    out = []
    for mid, s in g.sig.items():
        c, rest = s.split("->", 1)
        if cls_sub and cls_sub not in c:
            continue
        nm = rest.split("(", 1)[0]
        if exact_name and nm != exact_name:
            continue
        if name_sub and name_sub not in nm:
            continue
        if mid in g.edges or mid in g.callers:
            out.append((mid, s))
    return out


def summarize(g, mids, label):
    own = collections.Counter()
    ext = collections.Counter()
    for m in mids:
        c = g.cls(m)
        (own if c.startswith(("com/corrodinggames", "a/")) else ext)[c] += 1
    print(f"\n### {label}: {len(mids)} 个方法可达")
    print(f"  自有类 {len(own)}   外部类 {len(ext)}")
    print("  —— 自有类 Top 15")
    for c, n in own.most_common(15):
        print(f"     {n:4d}  {c}")
    print("  —— 外部类 Top 12")
    for c, n in ext.most_common(12):
        print(f"     {n:4d}  {c}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("apk")
    ap.add_argument("--list-entries", action="store_true")
    ap.add_argument("--entry", action="append", default=[],
                    help="形如 'GameViewOpenGL.onDrawFrame'，可多次给出")
    ap.add_argument("--json")
    args = ap.parse_args()

    g = Graph(args.apk)
    print(f"方法节点 {len(g.sig)}   调用边 {sum(len(v) for v in g.edges.values())}")

    if args.list_entries:
        print("\n[可能的入口方法]")
        for pat in [("IntroScreen", "onCreate"), ("MainMenuActivity", "onCreate"),
                    ("InGameActivity", "onCreate"), ("GameViewOpenGL", "onDrawFrame"),
                    ("GameViewOpenGL", "onSurfaceCreated"), ("GameViewNonSurface", "onDraw"),
                    ("RWApplication", "onCreate"), ("GameViewThreaded", "surfaceCreated")]:
            hits = find(g, pat[0], exact_name=pat[1])
            for mid, s in hits[:2]:
                print(f"  {s}   [出边 {len(g.edges.get(mid,()))}]")
        return

    result = {}
    for e in args.entry:
        cls, _, meth = e.partition(".")
        hits = find(g, cls, exact_name=meth)
        if not hits:
            print(f"!! 未找到入口 {e}")
            continue
        for mid, s in hits[:1]:
            reach = g.reachable(mid)
            summarize(g, reach, s)
            result[s] = {
                "methods_reachable": len(reach),
                "classes": sorted({g.cls(m) for m in reach}),
            }
    if args.json:
        json.dump(result, open(args.json, "w"), indent=1, ensure_ascii=False)


if __name__ == "__main__":
    main()
