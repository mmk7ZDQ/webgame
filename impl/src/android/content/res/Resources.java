/*
 * android.content.res.Resources — 最小实现
 *
 * 真机的 Resources 背后是 aapt 编译过的资源表；Web 端没有这一层，
 * 只需要给引擎一套合理的屏幕参数，让它在浏览器里正常初始化。
 */
package android.content.res;

import android.util.DisplayMetrics;

public class Resources {

    private static final DisplayMetrics METRICS = new DisplayMetrics();
    private static final Configuration CONFIG = new Configuration();

    static {
        METRICS.density = 1.0f;
        METRICS.widthPixels = 1280;
        METRICS.heightPixels = 720;
        METRICS.densityDpi = 160;
        METRICS.scaledDensity = 1.0f;
        METRICS.xdpi = 160;
        METRICS.ydpi = 160;
    }

    public Resources() {
    }

    public static Resources getSystem() {
        return new Resources();
    }

    public DisplayMetrics getDisplayMetrics() {
        return METRICS;
    }

    public Configuration getConfiguration() {
        return CONFIG;
    }

    public AssetManager getAssets() {
        return new AssetManager();
    }

    /**
     * 1x1 透明 PNG。引擎初始化时会按 resId 加载图片，
     * Web 端还没有资源表映射，先返回一张合法的最小 PNG，保证解码不失败。
     */
    private static final byte[] TINY_PNG = {
        (byte) 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A,
        0, 0, 0, 0x0D, 0x49, 0x48, 0x44, 0x52,
        0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0,
        0x1F, 0x15, (byte) 0xC4, (byte) 0x89,
        0, 0, 0, 0x0A, 0x49, 0x44, 0x41, 0x54,
        0x78, (byte) 0x9C, 0x63, 0, 1, 0, 0, 5, 0, 1,
        0x0D, 0x0A, 0x2D, (byte) 0xB4,
        0, 0, 0, 0, 0x49, 0x45, 0x4E, 0x44, (byte) 0xAE, 0x42, 0x60, (byte) 0x82
    };

    public java.io.InputStream openRawResource(int id) {
        return new java.io.ByteArrayInputStream(TINY_PNG);
    }

    public java.io.InputStream openRawResource(int id, android.util.TypedValue value) {
        return new java.io.ByteArrayInputStream(TINY_PNG);
    }

    public AssetFileDescriptor openRawResourceFd(int id) {
        return new AssetFileDescriptor();
    }

    public String[] getStringArray(int id) {
        return new String[0];
    }

    public String getString(int id) {
        return "";
    }

    public CharSequence getText(int id) {
        return "";
    }

    public int getColor(int id) {
        return 0xFFFFFFFF;
    }

    public float getDimension(int id) {
        return 0f;
    }

    public int getDimensionPixelSize(int id) {
        return 0;
    }

    public int getIdentifier(String name, String defType, String defPackage) {
        return 0;
    }
}
