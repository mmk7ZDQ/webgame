/*
 * android.graphics.Paint — 绘制样式容器
 *
 * Android 的 Paint 是「参数对象」，真正的状态在 Canvas 里；Web 端反过来：
 * Canvas2D 的样式挂在 ctx 上，所以这里保存属性，由 Canvas.applyPaint() 同步过去。
 */
package android.graphics;

import org.teavm.jso.canvas.CanvasRenderingContext2D;
import org.teavm.jso.canvas.TextMetrics;
import org.teavm.jso.dom.html.HTMLCanvasElement;

public class Paint {

    public static final int ANTI_ALIAS_FLAG = 0x01;
    public static final int FILTER_BITMAP_FLAG = 0x02;
    public static final int DITHER_FLAG = 0x04;
    public static final int UNDERLINE_TEXT_FLAG = 0x08;
    public static final int STRIKE_THRU_TEXT_FLAG = 0x10;
    public static final int FAKE_BOLD_TEXT_FLAG = 0x20;
    public static final int LINEAR_TEXT_FLAG = 0x40;
    public static final int SUBPIXEL_TEXT_FLAG = 0x80;
    public static final int DEV_KERN_TEXT_FLAG = 0x100;

    // ---------------------------------------------------------------- 枚举

    public enum Style { FILL, STROKE, FILL_AND_STROKE }

    public enum Align { LEFT, CENTER, RIGHT }

    public enum Cap { BUTT, ROUND, SQUARE }

    public enum Join { MITER, ROUND, BEVEL }

    public static class FontMetrics {
        public float top;
        public float ascent;
        public float descent;
        public float bottom;
        public float leading;
    }

    // ---------------------------------------------------------------- 状态

    private int color = 0xFF000000;
    private int alpha = 255;
    private Style style = Style.FILL;
    private float strokeWidth = 1f;
    private float textSize = 12f;
    private Align align = Align.LEFT;
    private Cap cap = Cap.BUTT;
    private Join join = Join.MITER;
    private boolean antiAlias = true;
    private boolean dither;
    private boolean filterBitmap;
    private boolean subpixelText;
    private boolean underline;
    private Typeface typeface;
    private ColorFilter colorFilter;

    /** 文本测量用的共享 ctx（懒创建） */
    private static CanvasRenderingContext2D measureCtx;

    public Paint() {
    }

    public Paint(int flags) {
        this.antiAlias = (flags & ANTI_ALIAS_FLAG) != 0;
        this.filterBitmap = (flags & FILTER_BITMAP_FLAG) != 0;
        this.dither = (flags & DITHER_FLAG) != 0;
        this.underline = (flags & UNDERLINE_TEXT_FLAG) != 0;
        this.subpixelText = (flags & SUBPIXEL_TEXT_FLAG) != 0;
    }

    public Paint(Paint other) {
        set(other);
    }

    // ---------------------------------------------------------------- 同步到 ctx

    /** 由 Canvas 在每次绘制前调用 */
    void applyTo(CanvasRenderingContext2D ctx) {
        ctx.setGlobalAlpha(alphaForPaint());
        String css = Canvas.cssColor((color & 0x00FFFFFF) | 0xFF000000);
        ctx.setFillStyle(css);
        ctx.setStrokeStyle(css);
        ctx.setLineWidth(Math.max(0.01f, strokeWidth));
        ctx.setLineCap(capOf(cap));
        ctx.setLineJoin(joinOf(join));
        ctx.setFont(fontSpec());
        ctx.setTextAlign(alignOf(align));
        ctx.setTextBaseline("alphabetic");
    }

    private double alphaForPaint() {
        int a = (color >>> 24) & 0xFF;
        return (a / 255.0) * (alpha / 255.0);
    }

    private String fontSpec() {
        // Typeface 的族名在 Android 里不直接可取；这里按 isBold() 推断样式，
        // 族名统一用 sans-serif（RW 的界面与 HUD 都用默认无衬线字体）。
        boolean bold = typeface != null && typeface.isBold();
        String family = "sans-serif";
        if (bold) return "bold " + textSize + "px " + family;
        return textSize + "px " + family;
    }

    private static String capOf(Cap c) {
        switch (c) {
            case ROUND: return "round";
            case SQUARE: return "square";
            default: return "butt";
        }
    }

    private static String joinOf(Join j) {
        switch (j) {
            case ROUND: return "round";
            case BEVEL: return "bevel";
            default: return "miter";
        }
    }

    private static String alignOf(Align a) {
        switch (a) {
            case CENTER: return "center";
            case RIGHT: return "right";
            default: return "left";
        }
    }

    private static CanvasRenderingContext2D measure() {
        if (measureCtx == null) {
            HTMLCanvasElement el = Bitmap.createCanvasElement(8, 8);
            measureCtx = (CanvasRenderingContext2D) el.getContext("2d");
        }
        return measureCtx;
    }

    // ---------------------------------------------------------------- 属性

    public int getColor() {
        return color;
    }

    public void setColor(int c) {
        this.color = c;
        this.alpha = 255;
    }

    public void setARGB(int a, int r, int g, int b) {
        this.color = ((a & 0xFF) << 24) | ((r & 0xFF) << 16) | ((g & 0xFF) << 8) | (b & 0xFF);
        this.alpha = 255;
    }

    public int getAlpha() {
        return alpha;
    }

    public void setAlpha(int a) {
        this.alpha = a & 0xFF;
    }

    public Style getStyle() {
        return style;
    }

    public void setStyle(Style s) {
        this.style = s;
    }

    public float getStrokeWidth() {
        return strokeWidth;
    }

    public void setStrokeWidth(float w) {
        this.strokeWidth = w;
    }

    public float getStrokeMiter() {
        return 4f;
    }

    public void setStrokeMiter(float m) {
    }

    public Cap getStrokeCap() {
        return cap;
    }

    public void setStrokeCap(Cap c) {
        this.cap = c;
    }

    public Join getStrokeJoin() {
        return join;
    }

    public void setStrokeJoin(Join j) {
        this.join = j;
    }

    public boolean isAntiAlias() {
        return antiAlias;
    }

    public void setAntiAlias(boolean aa) {
        this.antiAlias = aa;
    }

    public void setDither(boolean d) {
        this.dither = d;
    }

    public void setFilterBitmap(boolean f) {
        this.filterBitmap = f;
    }

    public void setSubpixelText(boolean s) {
        this.subpixelText = s;
    }

    public void setUnderlineText(boolean u) {
        this.underline = u;
    }

    public void setFakeBoldText(boolean b) {
    }

    public void setLinearText(boolean l) {
    }

    public void setStrikeThruText(boolean s) {
    }

    // ---------------------------------------------------------------- 文本度量

    public float getTextSize() {
        return textSize;
    }

    public void setTextSize(float size) {
        this.textSize = size;
    }

    public Align getTextAlign() {
        return align;
    }

    public void setTextAlign(Align a) {
        this.align = a;
    }

    public Typeface getTypeface() {
        return typeface;
    }

    public Typeface setTypeface(Typeface t) {
        Typeface old = this.typeface;
        this.typeface = t;
        return old;
    }

    public float measureText(String text) {
        if (text == null) return 0f;
        CanvasRenderingContext2D c = measure();
        c.setFont(fontSpec());
        TextMetrics m = c.measureText(text);
        return (float) m.getWidth();
    }

    public float measureText(CharSequence text, int start, int end) {
        if (text == null) return 0f;
        return measureText(text.subSequence(start, Math.min(end, text.length())).toString());
    }

    public float measureText(char[] text, int index, int count) {
        if (text == null) return 0f;
        return measureText(new String(text, index, count));
    }

    public int breakText(String text, boolean measureForwards, float maxWidth, float[] measuredWidth) {
        if (text == null) return 0;
        int n = 0;
        while (n < text.length() && measureText(text.substring(0, n + 1)) <= maxWidth) n++;
        if (measuredWidth != null && measuredWidth.length > 0) measuredWidth[0] = measureText(text.substring(0, n));
        return n;
    }

    public int breakText(CharSequence text, int start, int end, boolean forwards, float maxWidth, float[] measured) {
        return breakText(text.subSequence(start, end).toString(), forwards, maxWidth, measured);
    }

    public int getTextWidths(String text, float[] widths) {
        if (text == null || widths == null) return 0;
        int n = Math.min(text.length(), widths.length);
        for (int i = 0; i < n; i++) widths[i] = measureText(String.valueOf(text.charAt(i)));
        return n;
    }

    public int getTextWidths(char[] text, int index, int count, float[] widths) {
        if (text == null) return 0;
        return getTextWidths(new String(text, index, count), widths);
    }

    public void getTextBounds(String text, int start, int end, Rect bounds) {
        if (bounds == null) return;
        String s = text == null ? "" : text.substring(start, Math.min(end, text.length()));
        float w = measureText(s);
        bounds.set(0, (int) -ascent(), (int) Math.ceil(w), (int) Math.ceil(descent()));
    }

    public void getTextBounds(char[] text, int index, int count, Rect bounds) {
        if (text == null) return;
        getTextBounds(new String(text, index, count), 0, count, bounds);
    }

    public void getTextPath(String text, int start, int end, float x, float y, Path path) {
    }

    public float ascent() {
        return -textSize * 0.85f;
    }

    public float descent() {
        return textSize * 0.25f;
    }

    public FontMetrics getFontMetrics() {
        FontMetrics fm = new FontMetrics();
        fm.ascent = ascent();
        fm.descent = descent();
        fm.top = fm.ascent - textSize * 0.12f;
        fm.bottom = fm.descent + textSize * 0.12f;
        fm.leading = textSize * 0.1f;
        return fm;
    }

    public float getFontSpacing() {
        return textSize * 1.2f;
    }

    public void getFontMetrics(FontMetrics fm) {
        FontMetrics f = getFontMetrics();
        fm.ascent = f.ascent;
        fm.descent = f.descent;
        fm.top = f.top;
        fm.bottom = f.bottom;
        fm.leading = f.leading;
    }

    // ---------------------------------------------------------------- 其它

    private Xfermode xfermode;

    public Xfermode setXfermode(Xfermode x) {
        Xfermode old = this.xfermode;
        this.xfermode = x;
        return old;
    }

    public Xfermode getXfermode() {
        return xfermode;
    }

    public ColorFilter getColorFilter() {
        return colorFilter;
    }

    public ColorFilter setColorFilter(ColorFilter f) {
        ColorFilter old = this.colorFilter;
        this.colorFilter = f;
        return old;
    }

    public void set(Paint p) {
        if (p == null) return;
        this.color = p.color;
        this.alpha = p.alpha;
        this.style = p.style;
        this.strokeWidth = p.strokeWidth;
        this.textSize = p.textSize;
        this.align = p.align;
        this.cap = p.cap;
        this.join = p.join;
        this.antiAlias = p.antiAlias;
        this.dither = p.dither;
        this.filterBitmap = p.filterBitmap;
        this.subpixelText = p.subpixelText;
        this.underline = p.underline;
        this.typeface = p.typeface;
        this.colorFilter = p.colorFilter;
    }

    public void reset() {
        set(new Paint());
    }

    public boolean hasShadowLayer() {
        return false;
    }

    public void setShadowLayer(float radius, float dx, float dy, int color) {
    }

    public void clearShadowLayer() {
    }
}
