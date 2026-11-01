package rwutil;

import org.teavm.jso.JSBody;
import org.teavm.jso.JSObject;

/**
 * javax.xml.parsers.* / org.w3c.dom.* 的 Web 实现 —— 桥到浏览器原生 DOMParser。
 *
 * 为什么不用纯 Java 桩：RW 的地图解析器（game.b.l）就是这样拿 Document 再
 * 遍历 Element 的。返回空 Document 的话，地图永远是空的。
 * 好在浏览器有完整的 XML 解析器，直接接上去。
 */
public class Xml {

    /** 把 Java 侧持有的 JS Document 包成 Element */
    @JSBody(params = {"doc"}, script =
            "return { kind: 'document', node: doc };")
    private static native JSObject wrapDocument(JSObject doc);

    @JSBody(params = {"text"}, script =
            "try {"
            + "  var d = new DOMParser().parseFromString(text, 'text/xml');"
            + "  var err = d.getElementsByTagName('parsererror');"
            + "  if (err && err.length) return null;"
            + "  return d;"
            + "} catch (e) { return null; }")
    private static native JSObject parseXml(String text);

    @JSBody(params = {"node"}, script =
            "if (!node) return null;"
            + "var e = node.documentElement || node;"
            + "return e ? { kind: 'element', node: e } : null;")
    private static native JSObject rootElement(JSObject node);

    @JSBody(params = {"h"}, script =
            "if (!h || !h.node) return null;"
            + "var e = h.node.documentElement || h.node;"
            + "return e ? { kind: 'element', node: e } : null;")
    private static native JSObject documentElementOf(JSObject h);

    @JSBody(params = {"h"}, script = "return h && h.node ? String(h.node.tagName || '') : '';")
    private static native String elemTagName(JSObject h);

    @JSBody(params = {"h", "name"}, script =
            "if (!h || !h.node) return '';"
            + "var v = h.node.getAttribute ? h.node.getAttribute(name) : null;"
            + "return (v === null || v === undefined) ? '' : String(v);")
    private static native String elemAttr(JSObject h, String name);

    @JSBody(params = {"h", "name"}, script =
            "if (!h || !h.node || !h.node.hasAttribute) return false;"
            + "return !!h.node.hasAttribute(name);")
    private static native boolean elemHasAttr(JSObject h, String name);

    @JSBody(params = {"h"}, script =
            "if (!h || !h.node) return '';"
            + "return String(h.node.textContent || '');")
    private static native String elemText(JSObject h);

    @JSBody(params = {"h"}, script =
            "if (!h || !h.node) return null;"
            + "var c = h.node.firstElementChild;"
            + "return c ? { kind: 'element', node: c } : null;")
    private static native JSObject elemFirstChild(JSObject h);

    @JSBody(params = {"h"}, script =
            "if (!h || !h.node) return null;"
            + "var c = h.node.nextElementSibling;"
            + "return c ? { kind: 'element', node: c } : null;")
    private static native JSObject elemNextSibling(JSObject h);

    @JSBody(params = {"h", "tag"}, script =
            "if (!h || !h.node) return null;"
            + "var list = h.node.getElementsByTagName(tag);"
            + "return list ? { kind: 'list', node: list } : null;")
    private static native JSObject elemChildrenByTag(JSObject h, String tag);

    @JSBody(params = {"h"}, script =
            "if (!h || !h.node) return 0;"
            + "return (h.node.length !== undefined) ? h.node.length"
            + "     : (h.node.children ? h.node.children.length : 0);")
    private static native int listLength(JSObject h);

    @JSBody(params = {"h", "i"}, script =
            "if (!h || !h.node) return null;"
            + "var c = null;"
            + "if (h.node.item) c = h.node.item(i);"
            + "else if (h.node.children) c = h.node.children.item(i);"
            + "return c ? { kind: 'element', node: c } : null;")
    private static native JSObject listItem(JSObject h, int i);

    @JSBody(params = {"h"}, script =
            "return (h && h.node) ? String(h.node.nodeName || '') : '';")
    private static native String listNodeName(JSObject h);

    @JSBody(params = {"h"}, script = "return (h && h.node) ? String(h.node.nodeName || '') : '';")
    private static native String nodeNameOf(JSObject h);

    @JSBody(params = {"s"}, script = "return String(s);")
    private static native String toStr(Object s);

    // ---------------- 对外类型 ----------------

    public static class Node {
        protected JSObject h;
        public Node() { }
        Node(JSObject h) { this.h = h; }
        public String getNodeName() { return h == null ? "" : nodeNameOf(h); }
        public String getNodeValue() { return ""; }
        public String getTextContent() { return h == null ? "" : elemText(h); }
        public Node getFirstChild() { return h == null ? null : new Element(elemFirstChild(h)); }
        public Node getNextSibling() { return h == null ? null : new Element(elemNextSibling(h)); }
        public short getNodeType() { return 1; }
        public boolean hasChildNodes() { return h != null && listLength(h) > 0; }
    }

    public static class NodeList extends Node {
        public NodeList() { }
        NodeList(JSObject h) { super(h); }
        public int getLength() { return h == null ? 0 : listLength(h); }
        public Node item(int i) { return h == null ? null : new Element(listItem(h, i)); }
    }

    public static class Element extends Node {
        public Element() { }
        Element(JSObject h) { super(h); }
        public String getTagName() { return h == null ? "" : elemTagName(h); }
        public String getAttribute(String name) { return h == null ? "" : elemAttr(h, name); }
        public boolean hasAttribute(String name) { return h != null && elemHasAttr(h, name); }
        public void setAttribute(String n, String v) { }
        public void removeAttribute(String n) { }
        public String getTextContent() { return h == null ? "" : elemText(h); }
        public void setTextContent(String t) { }
        public Node getFirstChild() { return h == null ? null : new Element(elemFirstChild(h)); }
        public Node getNextSibling() { return h == null ? null : new Element(elemNextSibling(h)); }
        public NodeList getElementsByTagName(String tag) {
            return h == null ? new NodeList() : new NodeList(elemChildrenByTag(h, tag));
        }
        public String getNodeName() { return h == null ? "" : nodeNameOf(h); }
        public String getNodeValue() { return ""; }
        public short getNodeType() { return 1; }
        public boolean hasChildNodes() { return h != null && listLength(h) > 0; }
        public Element getParentElement() { return null; }
    }

    public static class Document extends Node {
        public Document() { }
        Document(JSObject h) { super(h); }
        public Element getDocumentElement() {
            if (h == null) return null;
            return new Element(documentElementOf(h));
        }
        public NodeList getElementsByTagName(String tag) {
            return h == null ? new NodeList() : new NodeList(elemChildrenByTag(h, tag));
        }
        public Element createElement(String tag) { return new Element(); }
        public Node createTextNode(String text) { return new Node(); }
    }

    public static class ParseException extends Exception {
        public ParseException() { super(); }
        public ParseException(String m) { super(m); }
    }

    public static class EntityResolver { }
    public static class ErrorHandler { }

    public static class Builder {
        /** 真正解析：读出字节 → 当作 XML 文本交给浏览器的 DOMParser */
        public Document parse(java.io.InputStream is) {
            if (is == null) return null;
            try {
                java.io.ByteArrayOutputStream bos = new java.io.ByteArrayOutputStream();
                byte[] buf = new byte[8192];
                int n;
                while ((n = is.read(buf)) > 0) bos.write(buf, 0, n);
                String text = new String(bos.toByteArray(), "UTF-8");
                JSObject doc = parseXml(text);
                return doc == null ? null : new Document(wrapDocument(doc));
            } catch (Throwable e) {
                return null;
            }
        }
        public Document parse(java.io.File f) { return null; }
        public Document parse(String uri) { return null; }
        public Document newDocument() { return null; }
        public void setEntityResolver(EntityResolver r) { }
        public void setErrorHandler(ErrorHandler h) { }
        public void setNamespaceAware(boolean b) { }
    }

    public static class Factory {
        public static Factory newInstance() { return new Factory(); }
        public Builder newDocumentBuilder() { return new Builder(); }
        public void setNamespaceAware(boolean b) { }
        public void setValidating(boolean b) { }
        public void setIgnoringElementContentWhitespace(boolean b) { }
        public void setExpandEntityReferences(boolean b) { }
        public boolean isNamespaceAware() { return false; }
        public boolean isValidating() { return false; }
    }

    public static ParseException parserConfigException() {
        return new ParseException("web stub");
    }
}
