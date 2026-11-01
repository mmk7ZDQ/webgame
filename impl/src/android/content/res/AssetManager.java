/*
 * android.content.res.AssetManager — Web 端最小实现
 *
 * 真机从 APK 的 assets/ 里读文件；浏览器里没有同步文件系统，
 * 完整方案需要预先把资源打包成 JS 对象 / 用同步 XHR 预取。
 * 这一版先保证「不返回 null」，让引擎初始化能走下去。
 */
package android.content.res;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

public class AssetManager {

    private static final AssetManager INSTANCE = new AssetManager();

    public AssetManager() {
    }

    /** 列举目录内容。真机返回文件名数组，这里返回空数组（不是 null）。 */
    public String[] list(String path) {
        return new String[0];
    }

    /** 打开资源文件。真机返回文件流，这里返回空流。 */
    public InputStream open(String fileName) {
        return new ByteArrayInputStream(new byte[0]);
    }

    public InputStream open(String fileName, int accessMode) {
        return new ByteArrayInputStream(new byte[0]);
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
