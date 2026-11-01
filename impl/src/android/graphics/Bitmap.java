/*
 * android.graphics.Bitmap — 背后是一个 HTMLCanvasElement
 *
 * Android 的 Bitmap 是像素缓冲，Web 端最接近的是离屏 canvas：
 * 既能作为 drawImage 的源，也能就地绘制（Paint 画到上面）。
 */
package android.graphics;

import org.teavm.jso.canvas.CanvasRenderingContext2D;
import org.teavm.jso.canvas.ImageData;
import org.teavm.jso.typedarrays.Uint8ClampedArray;
import org.teavm.jso.canvas.CanvasImageSource;
import org.teavm.jso.dom.html.HTMLCanvasElement;
import org.teavm.jso.dom.html.HTMLDocument;

public class Bitmap {

    public enum Config { ALPHA_8, RGB_565, ARGB_4444, ARGB_8888 }

    public enum CompressFormat { JPEG, PNG, WEBP }

    private CanvasImageSource source;      // canvas 或 img，都能作为 drawImage 的源
    private HTMLCanvasElement element;     // 仅当源是 canvas 时非 null（可往上画）
    private CanvasRenderingContext2D context;
    private int width, height;
    private boolean recycled;

    // ---------------------------------------------------------------- 构造

    private Bitmap(HTMLCanvasElement el) {
        this.element = el;
        if (el != null) {
            this.source = (CanvasImageSource) el;
            this.width = el.getWidth();
            this.height = el.getHeight();
        }
    }

    /** 包装任意图像源（如已加载的 <img>），只可作绘制源，不能再往上绘制 */
    /** 直接包装一个已存在的 <canvas> 元素（可作为绘制源，也可继续绘制） */
    public static Bitmap fromElement(HTMLCanvasElement el) {
        return el == null ? null : new Bitmap(el);
    }

    public static Bitmap fromImageSource(CanvasImageSource src, int w, int h) {
        Bitmap b = new Bitmap((HTMLCanvasElement) null);
        b.source = src;
        b.width = w;
        b.height = h;
        return b;
    }

    public Bitmap() {
        this(createCanvasElement(1, 1));
    }

    /** 宿主的 canvas 元素（仅当源是 canvas 时非 null） */
    public HTMLCanvasElement getElement() {
        return element;
    }

    /** drawImage 的源 */
    public CanvasImageSource getSource() {
        return source;
    }

    public CanvasRenderingContext2D getContext() {
        if (context == null && element != null) {
            context = (CanvasRenderingContext2D) element.getContext("2d");
        }
        return context;
    }

    // ---------------------------------------------------------------- 创建

    static HTMLCanvasElement createCanvasElement(int width, int height) {
        HTMLDocument doc = (HTMLDocument) org.teavm.jso.browser.Window.current().getDocument();
        HTMLCanvasElement el = (HTMLCanvasElement) doc.createElement("canvas");
        el.setWidth(Math.max(1, width));
        el.setHeight(Math.max(1, height));
        return el;
    }

    public static Bitmap createBitmap(int width, int height, Config config) {
        return new Bitmap(createCanvasElement(width, height));
    }

    public static Bitmap createBitmap(Bitmap src) {
        if (src == null) return null;
        Bitmap out = createBitmap(src.getWidth(), src.getHeight(), Config.ARGB_8888);
        out.getContext().drawImage(src.getSource(), 0, 0);
        return out;
    }

    public static Bitmap createBitmap(Bitmap src, int x, int y, int w, int h) {
        if (src == null) return null;
        Bitmap out = createBitmap(w, h, Config.ARGB_8888);
        out.getContext().drawImage(src.getSource(), x, y, w, h, 0, 0, w, h);
        return out;
    }

    public static Bitmap createBitmap(Bitmap src, int x, int y, int w, int h,
                                      Matrix m, boolean filter) {
        return createBitmap(src, x, y, w, h);
    }

    public static Bitmap createBitmap(int[] colors, int width, int height, Config config) {
        return fromPixels(colors, 0, width, width, height);
    }

    public static Bitmap createBitmap(int[] colors, int offset, int stride,
                                      int width, int height, Config config) {
        return fromPixels(colors, offset, stride, width, height);
    }

    /** 由 int[] ARGB 像素数组创建 */
    public static Bitmap fromPixels(int[] colors, int offset, int stride, int width, int height) {
        Bitmap bmp = createBitmap(width, height, Config.ARGB_8888);
        int[] out = new int[width * height];
        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                int srcIdx = offset + y * stride + x;
                out[y * width + x] = (srcIdx >= 0 && srcIdx < colors.length) ? colors[srcIdx] : 0;
            }
        }
        bmp.setPixels(out, 0, width, 0, 0, width, height);
        return bmp;
    }

    public static Bitmap createScaledBitmap(Bitmap src, int dstWidth, int dstHeight, boolean filter) {
        if (src == null) return null;
        Bitmap out = createBitmap(dstWidth, dstHeight, Config.ARGB_8888);
        out.getContext().drawImage(src.getSource(),
                0, 0, src.getWidth(), src.getHeight(), 0, 0, dstWidth, dstHeight);
        return out;
    }

    // ---------------------------------------------------------------- 尺寸

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public Config getConfig() {
        return Config.ARGB_8888;
    }

    public int getRowBytes() {
        return getWidth() * 4;
    }

    public int getByteCount() {
        return getRowBytes() * getHeight();
    }

    public int getDensity() {
        return 160;
    }

    public void setDensity(int density) {
    }

    public boolean isMutable() {
        return !recycled;
    }

    public boolean isRecycled() {
        return recycled;
    }

    public void recycle() {
        recycled = true;
    }

    public void setHasAlpha(boolean hasAlpha) {
    }

    public boolean hasAlpha() {
        return true;
    }

    // ---------------------------------------------------------------- 像素

    public void eraseColor(int color) {
        CanvasRenderingContext2D c = getContext();
        if (c == null) return;
        c.save();
        c.setGlobalCompositeOperation("copy");
        c.setFillStyle(Canvas.cssColor(color));
        c.fillRect(0, 0, getWidth(), getHeight());
        c.restore();
    }

    public int getPixel(int x, int y) {
        if (x < 0 || y < 0 || x >= getWidth() || y >= getHeight()) return 0;
        ImageData d = getContext().getImageData(x, y, 1, 1);
        Uint8ClampedArray px = d.getData();
        int r = px.get(0), g = px.get(1), b = px.get(2), a = px.get(3);
        return (a << 24) | (r << 16) | (g << 8) | b;
    }

    public void setPixel(int x, int y, int color) {
        int[] one = {color};
        setPixels(one, 0, 1, x, y, 1, 1);
    }

    public void getPixels(int[] pixels, int offset, int stride, int x, int y, int width, int height) {
        CanvasRenderingContext2D c = getContext();
        if (c == null || pixels == null) return;
        ImageData d = c.getImageData(x, y, width, height);
        Uint8ClampedArray px = d.getData();
        for (int row = 0; row < height; row++) {
            for (int col = 0; col < width; col++) {
                int i = (row * width + col) * 4;
                int r = px.get(i) & 0xFF, g = px.get(i + 1) & 0xFF;
                int b = px.get(i + 2) & 0xFF, a = px.get(i + 3) & 0xFF;
                int dst = offset + row * stride + col;
                if (dst >= 0 && dst < pixels.length) {
                    pixels[dst] = (a << 24) | (r << 16) | (g << 8) | b;
                }
            }
        }
    }

    public void setPixels(int[] pixels, int offset, int stride, int x, int y, int width, int height) {
        CanvasRenderingContext2D c = getContext();
        if (c == null || pixels == null) return;
        ImageData d = c.createImageData(width, height);
        Uint8ClampedArray px = d.getData();
        for (int row = 0; row < height; row++) {
            for (int col = 0; col < width; col++) {
                int src = offset + row * stride + col;
                int argb = (src >= 0 && src < pixels.length) ? pixels[src] : 0;
                int i = (row * width + col) * 4;
                px.set(i, (argb >> 16) & 0xFF);
                px.set(i + 1, (argb >> 8) & 0xFF);
                px.set(i + 2, argb & 0xFF);
                px.set(i + 3, (argb >>> 24) & 0xFF);
            }
        }
        c.putImageData(d, x, y);
    }

    public Bitmap copy(Config config, boolean isMutable) {
        return createBitmap(this);
    }

    public boolean compress(CompressFormat format, int quality, java.io.OutputStream stream) {
        // 阶段 2：通过 canvas.toDataURL 导出后写入流
        return false;
    }
}
