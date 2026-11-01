/*
 * android.content.res.AssetManager — 从预打包的 JS 对象读取
 *
 * 真机从 APK 的 assets/ 同步读文件；浏览器没有同步文件系统。
 * 方案：tools/pack-assets-js.py 把地图与它引用的资源 base64 打进
 * window.__RW_ASSETS，这里再解码成 byte[] —— 引擎的地图加载就能拿到真数据。
 */
package android.content.res;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import org.teavm.jso.JSBody;

public class AssetManager {

    private static final AssetManager INSTANCE = new AssetManager();

    public AssetManager() {
    }

    /** 取文件的 base64 内容，没有则返回 null */
    @JSBody(params = {"name"}, script =
            "var a = window.__RW_ASSETS || {};"
            + "var v = a[name];"
            + "return (v === undefined || v === null) ? null : v;")
    private static native String assetB64(String name);

    /** base64 → byte[]（TeaVM 的 byte[] 就是 Int8Array） */
    @JSBody(params = {"b64"}, script =
            "var bin = atob(b64);"
            + "var len = bin.length;"
            + "var out = new Int8Array(len);"
            + "for (var i = 0; i < len; i++) out[i] = bin.charCodeAt(i);"
            + "return out;")
    private static native byte[] decodeBase64(String b64);

    /** 列出某个前缀下的所有文件名 */
    @JSBody(params = {"prefix"}, script =
            "var a = window.__RW_ASSETS || {};"
            + "var out = [];"
            + "for (var k in a) {"
            + "  if (k.indexOf(prefix) === 0) {"
            + "    var rest = k.substring(prefix.length);"
            + "    if (rest.indexOf('/') < 0) out.push(rest);"
            + "  }"
            + "}"
            + "return out.length ? out : [];")
    private static native String[] listPrefix(String prefix);

    /**
     * 带文件名的输入流 —— BitmapFactory 靠它知道自己在解哪张图，
     * 才能从预解码的图片表里拿到同步可用的 ImageBitmap。
     */
    public static final class AssetStream extends ByteArrayInputStream {
        public final String assetName;
        AssetStream(byte[] data, String name) {
            super(data);
            this.assetName = name;
        }
    }

    /** 打开资源文件；找不到时返回空流而不是 null（引擎会检查 null 并抛错） */
    public InputStream open(String fileName) {
        String b64 = assetB64(fileName);
        if (b64 == null) return new AssetStream(new byte[0], fileName);
        return new AssetStream(decodeBase64(b64), fileName);
    }

    public InputStream open(String fileName, int accessMode) {
        return open(fileName);
    }

    public String[] list(String path) {
        String prefix = (path == null || path.isEmpty()) ? "" : (path + "/");
        return listPrefix(prefix);
    }

    public AssetFileDescriptor openFd(String fileName) {
        return new AssetFileDescriptor();
    }

    public void close() {
    }

    public static final int ACCESS_UNKNOWN = 0;
    public static final int ACCESS_RANDOM = 1;
    public static final int ACCESS_STREAMING = 2;
    public static final int ACCESS_BUFFER = 3;
}
