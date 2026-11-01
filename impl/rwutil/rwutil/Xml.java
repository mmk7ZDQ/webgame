package rwutil;

/**
 * javax.xml.parsers.* 的替身。
 *
 * TeaVM 的 classlib 只做 java.* 的 T 前缀映射，javax.* 不认；
 * 而 mod 的 XML 解析在首版用不到，所以整套重定向到这里的一致实现
 * （Factory/Builder/Document 都属于我们，签名自然对得上）。
 */
public class Xml {

    public static class Builder {
        public org.w3c.dom.Document parse(java.io.InputStream is) { return null; }
        public org.w3c.dom.Document parse(java.io.File f) { return null; }
        public org.w3c.dom.Document parse(String uri) { return null; }
        public org.w3c.dom.Document newDocument() { return null; }
        public void setEntityResolver(org.xml.sax.EntityResolver r) { }
        public void setErrorHandler(org.xml.sax.ErrorHandler h) { }
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
}
