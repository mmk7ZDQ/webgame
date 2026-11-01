/*
 * android.graphics.BitmapFactory — Web 端实现
 *
 * 真机从资源表解码 PNG；浏览器里没有同步解码 API。
 * 第一阶段：返回 1x1 占位位图，保证引擎初始化不因 null 崩溃。
 * 第二阶段（待做）：把 PNG 字节转成 Blob / data URI，用 Image 异步解码，
 * 再回填到 Bitmap 的 canvas —— 需要把 decode 改成「先返回占位、后替换」，
 * 或者预先把所有资源解码进 atlas。
 */
package android.graphics;

import java.io.InputStream;

import android.content.res.Resources;

public class BitmapFactory {

    public BitmapFactory() {
    }

    private static Bitmap placeholder() {
        return Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888);
    }

    public static Bitmap decodeResource(Resources res, int id) {
        return decodeResource(res, id, null);
    }

    public static Bitmap decodeResource(Resources res, int id, Options opts) {
        if (res == null) return placeholder();
        return decodeStream(res.openRawResource(id), null, opts);
    }

    public static Bitmap decodeStream(InputStream is) {
        return placeholder();
    }

    public static Bitmap decodeStream(InputStream is, Rect outPadding, Options opts) {
        return placeholder();
    }

    public static Bitmap decodeByteArray(byte[] data, int offset, int length) {
        return placeholder();
    }

    public static Bitmap decodeByteArray(byte[] data, int offset, int length, Options opts) {
        return placeholder();
    }

    public static Bitmap decodeFile(String pathName) {
        return placeholder();
    }

    public static boolean isImageDecoderAvailable() {
        return true;
    }

    /** BitmapFactory.Options 由桩提供，这里只是让调用点能编译 */
    public static class Options {
        public boolean inScaled = true;
        public boolean inPurgeable;
        public boolean inInputShareable;
        public int inSampleSize = 1;
        public int inDensity;
        public int inTargetDensity;
        public int outWidth;
        public int outHeight;
        public String outMimeType;
        public Bitmap.Config inPreferredConfig;

        public Options() { }
    }
}
