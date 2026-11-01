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
