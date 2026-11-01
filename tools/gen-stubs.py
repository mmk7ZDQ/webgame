#!/usr/bin/env python3
"""
gen-stubs.py — 从 APK 自动生成 Java 桩源码（v2：调用点驱动）

APK 里不含 android.* 的 class_def，所以无法直接读到它们的结构。
本工具改为扫描**全部调用点**，从指令本身恢复类型信息：

  invoke-static      → 该方法为 static
  invoke-interface   → 该 owner 是接口
  invoke-virtual/direct/super → 实例方法
  iget/iput/sget/sput → 字段（sget/sput 视为 static）

再结合 type_ids / method_ids / field_ids 得到完整的类-成员结构，
输出可被 javac 编译的桩源码。

用法:
    python3 tools/gen-stubs.py app.apk -o stubs/src
    python3 tools/gen-stubs.py app.apk --only android/  # 只生成某前缀
"""
import argparse
import collections
import os
import re
import zipfile
from importlib.machinery import SourceFileLoader

_here = os.path.dirname(os.path.abspath(__file__))
_m = SourceFileLoader("dc", os.path.join(_here, "dex-calls.py")).load_module()

PRIM = {"V": "void", "Z": "boolean", "B": "byte", "S": "short",
        "C": "char", "I": "int", "J": "long", "F": "float", "D": "double"}
DEFAULT = {"void": "", "boolean": "return false;", "int": "return 0;", "long": "return 0L;",
           "float": "return 0f;", "double": "return 0d;", "byte": "return (byte)0;",
           "short": "return (short)0;", "char": "return '\\0';"}

# 调用点 opcode
OPS_INVOKE = set(range(0x6E, 0x73)) | set(range(0x74, 0x79))
OP_STATIC = {0x71, 0x77}          # invoke-static / range
OP_INTERFACE = {0x72, 0x78}       # invoke-interface / range
OP_SGET = set(range(0x60, 0x66))  # sget / sput 系列

# 已知的全静态工具类：其所有方法都是 static（调用点未必覆盖到，需硬编码）
ALL_STATIC = {
    "android/opengl/GLES20", "android/opengl/GLES10", "android/opengl/GLES11",
    "android/opengl/GLES11Ext", "android/opengl/GLES30", "android/opengl/GLUtils",
    "android/opengl/Matrix", "android/opengl/EGL14",
    "javax/microedition/khronos/egl/EGL10", "javax/microedition/khronos/egl/EGL14",
    "android/util/Log", "android/util/Base64", "android/os/Process", "android/os/Debug",
    "android/text/TextUtils", "android/text/Html", "android/webkit/MimeTypeMap",
    "android/os/Environment", "android/graphics/Color", "android/graphics/BitmapFactory",
    "android/provider/DocumentsContract",
}

# 已知的继承关系（用来让类型能互相赋值）。只写确定的。
PARENTS = {
    "android/widget/": "android.view.View",
    "android/view/": None,
    "android/app/": None,
}


RENAME = {}


def descriptor_to_type(desc, pkg=""):
    if desc is None:
        return "void"
    dims = 0
    while desc.startswith("["):
        dims += 1
        desc = desc[1:]
    if desc in PRIM:
        return PRIM[desc] + "[]" * dims
    if desc.startswith("L") and desc.endswith(";"):
        inner = desc[1:-1]
        inner = RENAME.get(inner, inner)
        # 同包用短名：避免在名为 a 的接口内部把 a.a.a.h 解析成「接口 a 的成员」
        if pkg and inner.startswith(pkg + "/") and "/" not in inner[len(pkg) + 1:]:
            inner = inner[len(pkg) + 1:]
        return inner.replace("/", ".").replace("$", ".") + "[]" * dims
    return desc


class C:
    __slots__ = ("name", "methods", "fields", "iface", "parent")

    def __init__(self, name):
        self.name = name
        self.methods = {}     # (name, params) -> (ret, static)
        self.fields = {}      # name -> (type, static)
        self.iface = False
        self.parent = None


def scan(apk, prefixes):
    keep = lambda cls: (not prefixes) or any(cls.startswith(p) for p in prefixes)
    skip = ("java/lang/", "java/util/", "java/io/", "java/nio/", "java/net/", "java/text/",
            "java/math/", "java/security/", "java/reflect/", "java/util/concurrent/",
            "javax/xml/", "javax/net/", "dalvik/annotation/", "com/corrodinggames/",
            "org/w3c/", "org/xml/",          # JDK java.xml 模块已提供
            "com/bz/")   # 广告 SDK，移植时应删除

    classes = {}
    static_methods = set()
    inst_methods = set()
    ifaces = set()
    static_fields = set()
    inst_fields = set()

    def reg(cls):
        # 只接受合法类描述符内容（排除数组类型 "[Lcom/...;" 之类）
        if not cls or cls[0] in "[(" or cls.endswith(";"):
            return None
        if not re.fullmatch(r"[A-Za-z_$][A-Za-z0-9_$]*(?:/[A-Za-z0-9_$]+)*", cls):
            return None
        # dex 字符串池里存在 "LLcom/...;" 这类畸形描述符，剥出一层后会变成 "Lcom/..."
        if cls.split("/")[0] in ("Lcom", "Lorg", "Ljava", "Landroid", "Ljavax", "Ldalvik"):
            return None
        if any(cls.startswith(s) for s in skip):
            return None
        if not keep(cls):
            return None
        if cls not in classes:
            classes[cls] = C(cls)
        return classes[cls]

    with zipfile.ZipFile(apk) as z:
        for dn in sorted(n for n in z.namelist() if n.endswith(".dex")):
            dex = _m.Dex(z.read(dn))
            d = dex.d
            # 类型
            for t in dex.types:
                if t.startswith("L") and t.endswith(";"):
                    reg(t[1:-1])
            # 方法与字段声明
            for (cidx, nm, ret, params) in dex.methods:
                c = cidx[1:-1] if cidx.startswith("L") else cidx
                if reg(c) is not None:
                    classes[c].methods.setdefault((nm, tuple(params)), ret)
            for (cidx, tidx, nm) in dex.fields:
                c = cidx[1:-1] if cidx.startswith("L") else cidx
                if reg(c) is not None:
                    classes[c].fields.setdefault(nm, tidx)

            # 调用点
            for class_idx, midx, code_off in dex.iter_code():
                try:
                    ins, n = dex.insns(code_off)
                except Exception:
                    continue
                i = 0
                while i < n:
                    op = ins[i] & 0xFF
                    if op in OPS_INVOKE:
                        try:
                            ref = ins[i + 1]
                            owner, nm, ret, params = dex.methods[ref]
                            o = owner[1:-1]
                            if reg(o) is not None:
                                if op in OP_STATIC:
                                    static_methods.add((o, nm, tuple(params)))
                                else:
                                    inst_methods.add((o, nm, tuple(params)))
                                if op in OP_INTERFACE:
                                    ifaces.add(o)
                        except (IndexError, KeyError):
                            pass
                    elif op in OP_SGET:
                        try:
                            ref = ins[i + 1]
                            fc, ft, fn = dex.fields[ref]
                            o = fc[1:-1]
                            if reg(o) is not None:
                                static_fields.add((o, fn))
                        except (IndexError, KeyError):
                            pass
                    i += _m._LEN[op]

    # 全静态工具类：未在调用点出现的方法也强制 static
    OBJECT_METHODS = {"toString", "hashCode", "equals", "getClass", "clone", "finalize", "notify", "wait"}
    for cname in ALL_STATIC:
        if cname in classes:
            for mk, v in list(classes[cname].methods.items()):
                if mk[0] in OBJECT_METHODS:      # Object 的方法不能被 static 覆盖
                    continue
                ret = v[0] if isinstance(v, tuple) else v
                classes[cname].methods[mk] = (ret, True)

    # 标注 static / interface
    for o in ifaces:
        if o in classes:
            classes[o].iface = True
    for (o, nm, params) in static_methods:
        if o in classes and (nm, params) in classes[o].methods:
            cur = classes[o].methods[(nm, params)]
            if not isinstance(cur, tuple):          # 避免被 ALL_STATIC 预置后二次包裹
                classes[o].methods[(nm, params)] = (cur, True)
    for (o, nm, params) in inst_methods:
        if o in classes and (nm, params) in classes[o].methods:
            v = classes[o].methods[(nm, params)]
            if isinstance(v, tuple):
                continue
            classes[o].methods[(nm, params)] = (v, False)
    for k in classes:
        for mk, v in list(classes[k].methods.items()):
            if not isinstance(v, tuple):
                classes[k].methods[mk] = (v, False)
    for k in classes:
        for fn in list(classes[k].fields):
            t = classes[k].fields[fn]
            classes[k].fields[fn] = (t, (k, fn) in static_fields)

    # 消解「包名与类名冲突」：若某类名同时是其它类的包前缀（如类 a.a.a 与包 a.a.a.*），
    # Java 不允许二者共存，把该类重命名加下划线后缀。
    # 补全只在嵌套引用里出现、自身未登记的父类（如 Region$Op 需要 Region）
    changed = True
    while changed:
        changed = False
        for cls in list(classes):
            tail = cls.rsplit("/", 1)[-1]
            if "$" not in tail:
                continue
            parent = cls.rsplit("$", 1)[0]
            if parent not in classes:
                classes[parent] = C(parent)
                changed = True

    # 消解「包名与类名冲突」：类 a.a.a 与包 a.a.a.* 不能共存
    names = set(classes)
    pref = {c.rsplit("/", 1)[0] for c in names if "/" in c}
    for c in names:
        if c in pref:
            RENAME[c] = c + "_"

    # 启发式父类：把 widget 挂到 View 下，便于 addView(View) 之类编译
    for k in classes:
        if k.startswith("android/widget/") and "android.view/View" in classes:
            classes[k].parent = "android.view/View"
    return classes


def build_nesting(classes):
    names = set(classes)
    tops, kids = [], collections.defaultdict(list)
    for cls in classes:
        tail = cls.rsplit("/", 1)[-1]
        if "$" in tail:
            parent = cls.rsplit("$", 1)[0]
            while parent not in names and "$" in parent:
                parent = parent.rsplit("$", 1)[0]
            kids[parent].append(cls)
        else:
            tops.append(cls)
    return tops, kids


def emit(cls, classes, kids, indent, nested):
    c = classes[cls]
    pad = "    " * indent
    real = RENAME.get(cls, cls)
    simple = real.rsplit("/", 1)[-1].rsplit("$", 1)[-1]
    pkg = real.rpartition("/")[0]
    if simple[:1].isdigit():
        simple = "Anon" + simple
    head = f"{pad}public {'static ' if nested else ''}{'interface' if c.iface else 'class'} {simple}"
    if not c.iface and c.parent and c.parent in classes:
        pn = RENAME.get(c.parent, c.parent)
        head += " extends " + pn.replace("/", ".").replace("$", ".")
    out = [head + " {"]

    if c.fields:
        for fn, (ft, st) in sorted(c.fields.items()):
            jt = descriptor_to_type(ft, pkg)
            if c.iface:
                # 接口字段必须是 public static final 且要初始化
                init = DEFAULT.get(jt, "null").replace("return ", "").rstrip(";") or "null"
                out.append(f"{pad}    {jt} {fn} = {init};")
            else:
                out.append(f"{pad}    public {'static ' if st else ''}{jt} {fn};")
        out.append("")

    if c.iface:
        for (mn, params), (ret, st) in sorted(c.methods.items()):
            if mn.startswith("<"):
                continue
            pt = ", ".join(f"{descriptor_to_type(p, pkg)} p{i}" for i, p in enumerate(params))
            out.append(f"{pad}    {descriptor_to_type(ret, pkg)} {mn}({pt});")
    else:
        for (mn, params), (ret, st) in sorted(c.methods.items()):
            if mn.startswith("<"):
                continue
            pt = ", ".join(f"{descriptor_to_type(p, pkg)} p{i}" for i, p in enumerate(params))
            rt = descriptor_to_type(ret, pkg)
            body = DEFAULT.get(rt, "return null;")
            out.append(f"{pad}    public {'static ' if st else ''}{rt} {mn}({pt}) {{ {body} }}")
        ctor = simple
        out.append(f"{pad}    public {ctor}() {{ }}")

    for k in sorted(kids.get(cls, [])):
        out.append("")
        out.append(emit(k, classes, kids, indent + 1, True))
    out.append(f"{pad}}}")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("apk")
    ap.add_argument("-o", "--out", default="stubs/src")
    ap.add_argument("--only", default="", help="逗号分隔的前缀，如 android/,javax/microedition/")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--impl", default="",
                    help="逗号分隔的类名，这些类由 impl/src 手写实现，生成时跳过")
    args = ap.parse_args()

    prefixes = tuple(p for p in args.only.split(",") if p)
    classes = scan(args.apk, prefixes)

    # 手写实现优先：这些类不在自动生成范围内
    skipped = [c.strip() for c in args.impl.split(",") if c.strip()]
    for c in skipped:
        if c in classes:
            del classes[c]
            print(f"  (impl) 跳过 {c}")
    tops, kids = build_nesting(classes)
    nmeth = sum(len(c.methods) for c in classes.values())
    nfield = sum(len(c.fields) for c in classes.values())
    niface = sum(1 for c in classes.values() if c.iface)
    print(f"类 {len(classes)}（顶层 {len(tops)}，接口 {niface}）  方法 {nmeth}  字段 {nfield}")

    n = 0
    for cls in sorted(tops):
        real = RENAME.get(cls, cls)
        pkg, _, name = real.rpartition("/")
        lines = ["// AUTO-GENERATED by tools/gen-stubs.py — 编译期类型桩，勿手工编辑",
                 "package " + pkg.replace("/", ".") + ";" if pkg else "",
                 "",
                 emit(cls, classes, kids, 0, False),
                 ""]
        d = os.path.join(args.out, *pkg.split("/")) if pkg else args.out
        if not args.dry_run:
            os.makedirs(d, exist_ok=True)
            open(os.path.join(d, name + ".java"), "w").write("\n".join(lines))
        n += 1
    print(f"写出 {n} 个文件 → {args.out}")


if __name__ == "__main__":
    main()
