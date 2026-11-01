package rwutil;

/**
 * org.apache.http.* 的完整替身（联机大厅用 HTTP，首版裁掉）。
 *
 * 整套重定向到本类：所有类型都是我们的，签名自然一致，
 * 不会出现「接口方法找不到」这类跨类型不匹配。
 */
public class Http {

    public static class Header {
        public String getName() { return ""; }
        public String getValue() { return ""; }
    }

    public static class Message {
        public void setHeader(String name, String value) { }
        public void addHeader(String name, String value) { }
        public Header getFirstHeader(String name) { return null; }
        public Header[] getAllHeaders() { return new Header[0]; }
        public Header[] getHeaders(String name) { return new Header[0]; }
        public void setHeaders(Header[] headers) { }
    }

    public static class Req extends Message {
        public void abort() { }
        public boolean isAborted() { return false; }
        public String getMethod() { return "GET"; }
        public String getURI() { return null; }
    }

    public static class Resp extends Message {
        public int getStatusLine() { return 200; }
        public Object getStatusLineObj() { return null; }
        public Entity getEntity() { return null; }
        public void setEntity(Entity e) { }
        public void close() { }
    }

    public static class Entity {
        public java.io.InputStream getContent() { return null; }
        public long getContentLength() { return 0; }
        public String getContentType() { return null; }
        public boolean isRepeatable() { return false; }
        public void consumeContent() { }
    }

    public static class StringEntity extends Entity {
        public StringEntity(String s) { }
        public StringEntity(String s, ContentType t) { }
        public StringEntity(String s, String cs) { }
    }

    public static class ContentType {
        public static final ContentType APPLICATION_JSON = new ContentType();
        public static final ContentType TEXT_PLAIN = new ContentType();
        public static ContentType create(String mime, String charset) { return new ContentType(); }
        public static ContentType get(String mime) { return new ContentType(); }
        public String getMimeType() { return "text/plain"; }
    }

    public static class Client {
        public Resp execute(Req req) { return null; }
        public Object execute(Req req, Object handler) { return null; }
        public void close() { }
        public Object getParams() { return null; }
        public void setParams(Object p) { }
    }

    public static class Args {
        public static void notNull(Object o, String msg) { }
        public static void check(boolean b, String msg) { }
    }

    public static class Consts {
        public static final java.nio.charset.Charset UTF_8 = java.nio.charset.Charset.forName("UTF-8");
        public static final java.nio.charset.Charset ISO_8859_1 = java.nio.charset.Charset.forName("ISO-8859-1");
    }

    public static class Protocol {
        public static final java.nio.charset.Charset DEF_CONTENT_CHARSET =
                java.nio.charset.Charset.forName("ISO-8859-1");
        public static final java.nio.charset.Charset UTF_8 = java.nio.charset.Charset.forName("UTF-8");
    }
}
