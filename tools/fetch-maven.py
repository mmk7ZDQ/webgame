#!/usr/bin/env python3
"""
fetch-maven.py — 从 Maven Central 的静态仓库递归拉取依赖，生成可用的 classpath

环境里没有 mvn，但 Maven 仓库本身就是静态文件服务，所以可以自己解析 POM 递归。

处理了这些真实情况：
  * POM 的 parent 继承（properties 与 dependencyManagement 都继承）
  * ${property} 占位符（含 ${project.version}）
  * dependency 省略 version 时回退到 dependencyManagement
  * scope=test/provided 跳过，optional=true 跳过
  * XML namespace

用法:
    python3 tools/fetch-maven.py org.teavm:teavm-cli:0.14.1 -o tools/teavm-lib
    python3 tools/fetch-maven.py org.teavm:teavm-cli:0.14.1 -o lib --classpath lib/cp.txt
"""
import argparse
import os
import sys
import urllib.request
import xml.etree.ElementTree as ET

REPO = os.environ.get("MAVEN_REPO", "https://repo1.maven.org/maven2")
NS = "{http://maven.apache.org/POM/4.0.0}"
SKIP_SCOPE = {"test", "provided", "system"}
_cache = {}


def fetch_text(url):
    if url in _cache:
        return _cache[url]
    with urllib.request.urlopen(url, timeout=30) as r:
        data = r.read().decode("utf-8", "replace")
    _cache[url] = data
    return data


def pom_url(g, a, v):
    return f"{REPO}/{g.replace('.', '/')}/{a}/{v}/{a}-{v}.pom"


def jar_url(g, a, v, classifier=None):
    c = f"-{classifier}" if classifier else ""
    return f"{REPO}/{g.replace('.', '/')}/{a}/{v}/{a}-{v}{c}.jar"


def find(el, tag):
    return el.find(f"{NS}{tag}")


def findall(el, tag):
    return el.findall(f"{NS}{tag}")


class Pom:
    def __init__(self, gid, aid, vid):
        self.gid, self.aid, self.vid = gid, aid, vid
        self.props = {}
        self.dep_mgmt = {}     # "g:a" -> (v, exclusions)
        self.deps = []         # (g, a, v_or_None, scope, optional)
        self.parent = None
        self._load()

    def _load(self):
        url = pom_url(self.gid, self.aid, self.vid)
        try:
            root = ET.fromstring(fetch_text(url))
        except Exception as e:
            print(f"  ! POM 拉取失败 {url}: {e}", file=sys.stderr)
            return
        parent = find(root, "parent")
        if parent is not None:
            self.parent = (
                find(parent, "groupId").text,
                find(parent, "artifactId").text,
                find(parent, "version").text,
            )
        props = find(root, "properties")
        if props is not None:
            for c in props:
                tag = c.tag.replace(NS, "")
                self.props[tag] = (c.text or "").strip()
        # 内置属性
        self.props.setdefault("project.version", self.vid)
        self.props.setdefault("project.groupId", self.gid)
        self.props.setdefault("project.artifactId", self.aid)
        self.props.setdefault("version", self.vid)

        dm = find(root, "dependencyManagement")
        if dm is not None:
            for d in findall(dm, "dependencies"):
                for dep in findall(d, "dependency"):
                    key = self._coord(dep)
                    ver = find(dep, "version")
                    if ver is not None:
                        self.dep_mgmt[key] = self._resolve(ver.text)

        for d in findall(root, "dependencies"):
            for dep in findall(d, "dependency"):
                g = self._resolve(find(dep, "groupId").text)
                a = self._resolve(find(dep, "artifactId").text)
                ve = find(dep, "version")
                v = self._resolve(ve.text) if ve is not None else None
                sc = find(dep, "scope")
                op = find(dep, "optional")
                self.deps.append((g, a, v, sc.text if sc is not None else "compile",
                                  (op.text or "").strip().lower() == "true" if op is not None else False))

    def _coord(self, dep):
        g = self._resolve(find(dep, "groupId").text)
        a = self._resolve(find(dep, "artifactId").text)
        return f"{g}:{a}"

    def _resolve(self, text):
        """展开 ${...}，先查自身 properties，再查 parent 链"""
        if text is None:
            return None
        out = text.strip()
        for _ in range(10):
            if "${" not in out:
                break
            start = out.index("${")
            end = out.index("}", start)
            key = out[start + 2:end]
            val = self.props.get(key)
            if val is None and key.startswith("project."):
                val = self.props.get(key.split(".", 1)[1])
            if val is None and self.parent:
                try:
                    pv = Pom(*self.parent)
                    val = pv.props.get(key)
                except Exception:
                    val = None
            if val is None:
                break
            out = out[:start] + val + out[end + 1:]
        return out

    def lookup_mgmt(self, g, a):
        if f"{g}:{a}" in self.dep_mgmt:
            return self.dep_mgmt[f"{g}:{a}"]
        if self.parent:
            try:
                return Pom(*self.parent).lookup_mgmt(g, a)
            except Exception:
                return None
        return None


def resolve(g, a, v, outdir, seen, depth=0, log=None):
    key = f"{g}:{a}:{v}"
    if key in seen:
        return
    seen.add(key)
    pad = "  " * depth
    pom = Pom(g, a, v)

    # 下载 jar
    if os.environ.get("SKIP_POM_ONLY") != "1":
        url = jar_url(g, a, v)
        dst = os.path.join(outdir, f"{a}-{v}.jar")
        if not os.path.exists(dst) or os.path.getsize(dst) == 0:
            try:
                with urllib.request.urlopen(url, timeout=60) as r:
                    data = r.read()
                with open(dst, "wb") as f:
                    f.write(data)
                if log:
                    log.append(f"{a}-{v}.jar")
                print(f"{pad}+ {g}:{a}:{v}  ({len(data)//1024} KB)")
            except Exception as e:
                print(f"{pad}! {g}:{a}:{v} jar 失败: {e}", file=sys.stderr)
        else:
            print(f"{pad}= {g}:{a}:{v}  (已存在)")

    for (dg, da, dv, scope, optional) in pom.deps:
        if scope in SKIP_SCOPE or optional:
            continue
        if not dv:
            mg = pom.lookup_mgmt(dg, da)
            dv = mg[0] if mg else None
        if not dv:
            print(f"{pad}? {dg}:{da} 无版本，跳过", file=sys.stderr)
            continue
        resolve(dg, da, dv, outdir, seen, depth + 1, log)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("artifact", help="groupId:artifactId:version")
    ap.add_argument("-o", "--out", default="lib")
    ap.add_argument("--classpath", default="")
    args = ap.parse_args()

    parts = args.artifact.split(":")
    if len(parts) != 3:
        sys.exit("格式应为 groupId:artifactId:version")
    os.makedirs(args.out, exist_ok=True)
    seen, log = set(), []
    print(f"从 {REPO} 解析 {args.artifact}")
    resolve(*parts, outdir=args.out, seen=seen, log=log)
    jars = sorted(f for f in os.listdir(args.out) if f.endswith(".jar"))
    total = sum(os.path.getsize(os.path.join(args.out, j)) for j in jars)
    print(f"\n共 {len(jars)} 个 jar，{total/1048576:.1f} MB → {args.out}")

    if args.classpath:
        cp = ":".join(os.path.join(os.path.abspath(args.out), j) for j in jars)
        with open(args.classpath, "w") as f:
            f.write(cp + "\n")
        print(f"classpath → {args.classpath}")


if __name__ == "__main__":
    main()
