package rwutil;

/**
 * javax.xml.parsers.* 与 org.w3c.dom.* 的完整替身。
 *
 * TeaVM 的 classlib 只做 java.* 的 T 前缀映射，javax.* 与 org.w3c.* 一律不认；
 * 而 mod 的 XML 解析首版用不到，所以整套重定向到这里的自包含实现 ——
 * 所有类型都是我们自己的，签名自然一致，不会出现跨类型不匹配。
 */
public class Xml {

    /** org.w3c.dom.Node 替身 */
    public static class Node {
        public String getNodeName() { return ""; }
        public String getNodeValue() { return ""; }
        public NodeList getChildNodes() { return new NodeList(); }
        public Node getFirstChild() { return null; }
        public Node getNextSibling() { return null; }
        public short getNodeType() { return 1; }
        public boolean hasChildNodes() { return false; }
    }

    /** org.w3c.dom.NodeList 替身 */
    public static class NodeList {
        public int getLength() { return 0; }
        public Node item(int i) { return null; }
    }

    /** org.w3c.dom.Element 替身 */
    public static class Element extends Node {
        public String getTagName() { return ""; }
        public String getAttribute(String name) { return ""; }
        public boolean hasAttribute(String name) { return false; }
        public void setAttribute(String name, String value) { }
        public void removeAttribute(String name) { }
        public NodeList getElementsByTagName(String tag) { return new NodeList(); }
        public Node getFirstChild() { return null; }
        public Node getLastChild() { return null; }
        public Node getNextSibling() { return null; }
        public Element getParentElement() { return null; }
        public String getTextContent() { return ""; }
        public void setTextContent(String t) { }
    }

    /** org.w3c.dom.Document 替身 */
    public static class Document extends Node {
        public Element getDocumentElement() { return new Element(); }
        public NodeList getElementsByTagName(String tag) { return new NodeList(); }
        public Element createElement(String tag) { return new Element(); }
        public Node createTextNode(String text) { return new Node(); }
    }

    /** javax.xml.parsers.ParserConfigurationException 替身 */
    public static class ParseException extends Exception {
        public ParseException() { super(); }
        public ParseException(String m) { super(m); }
    }

    /** org.xml.sax.EntityResolver / ErrorHandler 替身 */
    public static class EntityResolver { }
    public static class ErrorHandler { }

    /** javax.xml.parsers.DocumentBuilder 替身 */
    public static class Builder {
        public Document parse(java.io.InputStream is) { return new Document(); }
        public Document parse(java.io.File f) { return new Document(); }
        public Document parse(String uri) { return new Document(); }
        public Document newDocument() { return new Document(); }
        public void setEntityResolver(EntityResolver r) { }
        public void setErrorHandler(ErrorHandler h) { }
        public void setNamespaceAware(boolean b) { }
    }

    /** javax.xml.parsers.DocumentBuilderFactory 替身 */
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

    /** 强制引用，让 TeaVM 为 ParseException 生成 JS */
    public static ParseException parserConfigException() {
        return new ParseException("web stub");
    }
}
