package org.teavm.classlib.javax.xml.parsers;

/** 补 TeaVM classlib 缺失的 javax.xml.parsers.DocumentBuilderFactory（mod 的 XML 解析用）。 */
public class TDocumentBuilderFactory {

    public static TDocumentBuilderFactory newInstance() {
        return new TDocumentBuilderFactory();
    }

    public Object newDocumentBuilder() {
        return new TDocumentBuilder();
    }

    public void setNamespaceAware(boolean b) { }

    public void setValidating(boolean b) { }

    public void setIgnoringElementContentWhitespace(boolean b) { }

    public void setExpandEntityReferences(boolean b) { }

    public boolean isNamespaceAware() { return false; }

    public boolean isValidating() { return false; }
}
