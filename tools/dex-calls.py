#!/usr/bin/env python3
"""
dex-calls.py — DEX 字节码级调用分析

遍历每个 class_def 的方法体指令流，提取：
  * 对「外部类」（android.* / javax.microedition.* / java.* …）的方法调用与字段访问
    → 这就是移植时必须提供的桩接口规格（精确到方法名+签名）
  * 自有类之间的调用热度 → 定位渲染/主循环等核心类

用法:
    python3 tools/dex-calls.py path/to/app.apk [--target android] [--json out.json]
"""
import argparse
import collections
import json
import struct
import zipfile

# ---------------------------------------------------------------- dex primitives

def uleb128(d, p):
    r = s = 0
    while True:
        b = d[p]; p += 1
        r |= (b & 0x7F) << s
        s += 7
        if not b & 0x80:
            return r, p


# 指令长度表（单位：16-bit code units），按 Dalvik opcode 035
_LEN = [1] * 256
for op in (0x02, 0x05, 0x08, 0x13, 0x15, 0x16, 0x19, 0x1a, 0x1c, 0x1f,
           0x20, 0x22, 0x23, 0x29, 0x2d, 0x2e, 0x2f, 0x30, 0x31,
           0x38, 0x39, 0x3a, 0x3b, 0x3c, 0x3d,
           0x44, 0x45, 0x46, 0x47, 0x48, 0x49, 0x4a, 0x4b, 0x4c, 0x4d, 0x4e, 0x4f,
           0x50, 0x51, 0x52, 0x53, 0x54, 0x55, 0x56, 0x57, 0x58, 0x59, 0x5a, 0x5b,
           0x5c, 0x5d, 0x5e, 0x5f,
           0x60, 0x61, 0x62, 0x63, 0x64, 0x65, 0x66, 0x67, 0x68, 0x69, 0x6a, 0x6b,
           0x6c, 0x6d,
           0x90, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x99, 0x9a, 0x9b,
           0x9c, 0x9d, 0x9e, 0x9f, 0xa0, 0xa1, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7,
           0xa8, 0xa9, 0xaa, 0xab, 0xac, 0xad, 0xae, 0xaf,
           0xd0, 0xd1, 0xd2, 0xd3, 0xd4, 0xd5, 0xd6, 0xd7,
           0xd8, 0xd9, 0xda, 0xdb, 0xdc, 0xdd, 0xde, 0xdf,
           0xe0, 0xe1, 0xe2):
    _LEN[op] = 2
for op in (0x03, 0x06, 0x09, 0x2a, 0x31 - 1, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37,
           0x6e, 0x6f, 0x70, 0x71, 0x72, 0x74, 0x75, 0x76, 0x77, 0x78,
           0xfc, 0xfd):
    _LEN[op] = 3
_LEN[0x18] = 5           # const-wide (51l)
_LEN[0xfa] = 4           # invoke-polymorphic (45cc)
_LEN[0xfb] = 4           # invoke-polymorphic/range (4rcc)
_LEN[0x14] = 3           # const (31i)
_LEN[0x17] = 3           # const-wide/32
_LEN[0x1b] = 3           # const-string/jumbo
_LEN[0x24] = 3           # filled-new-array (35c)
_LEN[0x25] = 3           # filled-new-array/range (3rc)
_LEN[0x26] = 3           # fill-array-data
_LEN[0x2b] = 3           # packed-switch
_LEN[0x2c] = 3           # sparse-switch

INVOKE_OPS = set(range(0x6E, 0x73)) | set(range(0x74, 0x79)) | {0xFA, 0xFB, 0xFC, 0xFD}
FIELD_OPS = set(range(0x52, 0x6E))


class Dex:
    def __init__(self, blob):
        self.d = blob
        self.u = lambda o: struct.unpack_from("<I", blob, o)[0]
        self._strings()
        self._types()
        self._protos()
        self._fields()
        self._methods()

    def _strings(self):
        d = self.d
        sids, ssize = self.u(0x3C), self.u(0x38)
        self.strings = []
        for i in range(ssize):
            off = struct.unpack_from("<I", d, sids + 4 * i)[0]
            n, p = uleb128(d, off)
            self.strings.append(d[p:p + n].decode("utf-8", "replace"))

    def _types(self):
        d = self.d
        tids, n = self.u(0x44), self.u(0x40)
        self.types = [self.strings[struct.unpack_from("<I", d, tids + 4 * i)[0]] for i in range(n)]

    def _protos(self):
        d = self.d
        pids, n = self.u(0x4C), self.u(0x48)
        self.protos = []
        for i in range(n):
            shorty, ret, params_off = struct.unpack_from("<III", d, pids + 12 * i)
            params = []
            if params_off:
                cnt = struct.unpack_from("<I", d, params_off)[0]
                params = [self.types[struct.unpack_from("<H", d, params_off + 4 + 2 * k)[0]]
                          for k in range(cnt)]
            self.protos.append((self.types[ret], tuple(params)))

    def _fields(self):
        d = self.d
        fids, n = self.u(0x54), self.u(0x50)
        self.fields = []
        for i in range(n):
            cidx, tidx, nidx = struct.unpack_from('<HHI', d, fids + 8 * i)
            self.fields.append((self.types[cidx], self.types[tidx], self.strings[nidx]))

    def _methods(self):
        d = self.d
        mids, n = self.u(0x5C), self.u(0x58)
        self.methods = []
        for i in range(n):
            cidx, pidx, nidx = struct.unpack_from("<HHI", d, mids + 8 * i)
            ret, params = self.protos[pidx]
            self.methods.append((self.types[cidx], self.strings[nidx], ret, params))

    def method_sig(self, idx):
        cls, name, ret, params = self.methods[idx]
        return f"{cls}->{name}({''.join(p for p in params)}){ret}"

    def method_owner(self, idx):
        return self.methods[idx][0]

    # -------- 遍历所有方法的指令流
    def iter_code(self):
        d = self.d
        cls_n, cls_off = self.u(0x60), self.u(0x64)
        for ci in range(cls_n):
            base = cls_off + 32 * ci
            class_idx = struct.unpack_from("<I", d, base)[0]
            class_data_off = struct.unpack_from("<I", d, base + 24)[0]
            if not class_data_off:
                continue
            p = class_data_off
            sf, p = uleb128(d, p)
            inf, p = uleb128(d, p)
            dm, p = uleb128(d, p)
            vm, p = uleb128(d, p)
            for _ in range(sf + inf):
                _, p = uleb128(d, p)
                _, p = uleb128(d, p)
            for count in (dm, vm):
                midx = 0
                for _ in range(count):
                    diff, p = uleb128(d, p)
                    midx += diff
                    _, p = uleb128(d, p)
                    code_off, p = uleb128(d, p)
                    if code_off:
                        yield class_idx, midx, code_off

    def insns(self, code_off):
        d = self.d
        insns_size = struct.unpack_from("<I", d, code_off + 12)[0]
        start = code_off + 16
        return struct.unpack_from("<%dH" % insns_size, d, start), insns_size


def analyze(apk, target_prefixes, out_json=None):
    ext_calls = collections.defaultdict(set)     # 外部类 -> {方法签名}
    ext_fields = collections.defaultdict(set)
    own_hot = collections.Counter()              # 被调用最多的自有类
    per_class_calls = collections.Counter()
    total_insns = 0
    total_code = 0

    with zipfile.ZipFile(apk) as z:
        for name in sorted(n for n in z.namelist() if n.endswith(".dex")):
            dex = Dex(z.read(name))
            for class_idx, midx, code_off in dex.iter_code():
                total_code += 1
                try:
                    ins, n = dex.insns(code_off)
                except struct.error:
                    continue
                total_insns += n
                i = 0
                while i < n:
                    op = ins[i] & 0xFF
                    if op in INVOKE_OPS:
                        try:
                            mref = ins[i + 1]
                            owner = dex.method_owner(mref)
                            sig = dex.method_sig(mref)
                        except (IndexError, struct.error):
                            i += _LEN[op]; continue
                        cls = owner[1:-1] if owner.startswith("L") else owner
                        if any(cls.startswith(p) for p in target_prefixes):
                            ext_calls[cls].add(sig)
                            src = dex.types[class_idx][1:-1] if dex.types[class_idx].startswith("L") else dex.types[class_idx]
                            per_class_calls[src] += 1
                        elif cls.startswith(("com/corrodinggames", "a/")):
                            own_hot[cls] += 1
                    i += _LEN[op]

    report = {
        "methods_with_code": total_code,
        "total_insns": total_insns,
        "external_classes_called": len(ext_calls),
        "external_methods_called": sum(len(v) for v in ext_calls.values()),
        "own_hot": own_hot.most_common(40),
        "per_source_class": per_class_calls.most_common(40),
        "detail": {k: sorted(v) for k, v in sorted(ext_calls.items())},
    }
    if out_json:
        json.dump(report, open(out_json, "w"), indent=1, ensure_ascii=False)
    return report


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("apk")
    ap.add_argument("--target", default="android,androidx,javax,org.apache,org.w3c,org.xml,org.json,dalvik",
                    help="逗号分隔的包前缀")
    ap.add_argument("--json")
    ap.add_argument("--show", default="", help="只打印匹配该前缀的类明细")
    args = ap.parse_args()

    prefixes = tuple(p.strip() for p in args.target.split(",") if p.strip())
    r = analyze(args.apk, prefixes, args.json)

    print("=" * 70)
    print(f"方法体数: {r['methods_with_code']}   指令总数: {r['total_insns']:,}")
    print(f"被调用的外部类: {r['external_classes_called']}   外部方法: {r['external_methods_called']}")
    print("=" * 70)
    print("\n[外部类调用量 Top 40]")
    items = sorted(r["detail"].items(), key=lambda kv: -len(kv[1]))[:40]
    for cls, ms in items:
        print(f"  {len(ms):4d}  {cls}")
    print("\n[自有类被调用热度 Top 25]")
    for cls, n in r["own_hot"][:25]:
        print(f"  {n:5d}  {cls}")
    print("\n[发出调用最多的自有类 Top 20]")
    for cls, n in r["per_source_class"][:20]:
        print(f"  {n:5d}  {cls}")

    if args.show:
        print(f"\n[明细: {args.show}]")
        for cls, ms in r["detail"].items():
            if cls.startswith(args.show):
                print(f"\n## {cls}")
                for m in ms:
                    print("   ", m)


if __name__ == "__main__":
    main()
