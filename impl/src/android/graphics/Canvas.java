/*
 * android.graphics.Canvas — Web Canvas2D 实现
 *
 * 映射关系（HTML5 Canvas2D 的状态栈语义与 Android Canvas 高度一致）：
 *
 *   Canvas.save()      → ctx.save()          变换/裁剪/样式都进栈，语义完全对齐
 *   Canvas.restore()   → ctx.restore()
 *   Canvas.translate() → ctx.translate()
 *   Canvas.scale()     → ctx.scale()
 *   Canvas.rotate()    → ctx.rotate()
 *   Canvas.clipRect()  → beginPath + rect + clip
 *   Canvas.drawRect()  → fillRect / strokeRect
 *   Canvas.drawBitmap()→ drawImage
 *   Canvas.drawText()  → fillText / strokeText
 *
 * 唯一需要自己维护的是「当前 Paint」和「PorterDuff 混合模式」这两项，
 * 因为 Canvas2D 把它们放在 ctx 的 globalCompositeOperation 上，而 Android 是逐次调用参数。
 */
package android.graphics;

import org.teavm.jso.canvas.CanvasRenderingContext2D;
import org.teavm.jso.canvas.CanvasImageSource;
import org.teavm.jso.canvas.TextMetrics;
import org.teavm.jso.dom.html.HTMLCanvasElement;

public class Canvas {

    // ---------------------------------------------------------------- 状态

    private CanvasRenderingContext2D ctx;
    private Bitmap bitmap;

    /** 最近一次绘制所用的 Paint（Android 的 draw* 都带 Paint 参数，这里只做样式同步） */
    private Paint lastPaint;

    public Canvas() {
    }

    public Canvas(Bitmap bitmap) {
        setBitmap(bitmap);
    }

    public void setBitmap(Bitmap b) {
        this.bitmap = b;
        this.ctx = (b == null) ? null : b.getContext();
    }

    public Bitmap getBitmap() {
        return bitmap;
    }

    public CanvasRenderingContext2D getContext2D() {
        return ctx;
    }

    public boolean isHardwareAccelerated() {
        return false;
    }

    public int getWidth() {
        return bitmap == null ? 0 : bitmap.getWidth();
    }

    public int getHeight() {
        return bitmap == null ? 0 : bitmap.getHeight();
    }

    public int getDensity() {
        return 160;
    }

    public int getMaximumBitmapWidth() {
        return 8192;
    }

    public int getMaximumBitmapHeight() {
        return 8192;
    }

    // ---------------------------------------------------------------- 状态栈

    public int save() {
        if (ctx == null) return 0;
        ctx.save();
        return 1;
    }

    public void restore() {
        if (ctx != null) ctx.restore();
    }

    public int getSaveCount() {
        return 1;
    }

    public void restoreToCount(int saveCount) {
        // 逐个弹出；RW 用到的地方不多，语义近似即可
        for (int i = 1; i < saveCount; i++) restore();
    }

    // ---------------------------------------------------------------- 变换

    public void translate(float dx, float dy) {
        if (ctx != null) ctx.translate(dx, dy);
    }

    public void scale(float sx, float sy) {
        if (ctx != null) ctx.scale(sx, sy);
    }

    public void scale(float sx, float sy, float px, float py) {
        if (ctx == null) return;
        ctx.translate(px, py);
        ctx.scale(sx, sy);
        ctx.translate(-px, -py);
    }

    public void rotate(float degrees) {
        if (ctx != null) ctx.rotate(Math.toRadians(degrees));
    }

    public void rotate(float degrees, float px, float py) {
        if (ctx == null) return;
        ctx.translate(px, py);
        ctx.rotate(Math.toRadians(degrees));
        ctx.translate(-px, -py);
    }

    public void skew(float sx, float sy) {
        if (ctx != null) ctx.transform(1, Math.tan(Math.toRadians(sy)), Math.tan(Math.toRadians(sx)), 1, 0, 0);
    }

    public void concat(Matrix matrix) {
        if (ctx == null || matrix == null) return;
        float[] m = new float[6];
        matrix.getValues(m);
        ctx.transform(m[0], m[1], m[2], m[3], m[4], m[5]);
    }

    public void setMatrix(Matrix matrix) {
        concat(matrix);
    }

    public void getMatrix(Matrix out) {
        // 未跟踪当前矩阵；RW 里极少调用
    }

    // ---------------------------------------------------------------- 裁剪

    public boolean clipRect(float left, float top, float right, float bottom) {
        if (ctx == null) return false;
        ctx.beginPath();
        ctx.rect(left, top, right - left, bottom - top);
        ctx.clip();
        return true;
    }

    public boolean clipRect(float l, float t, float r, float b, Region.Op op) {
        return clipRect(l, t, r, b);
    }

    public boolean clipRect(int left, int top, int right, int bottom) {
        return clipRect((float) left, (float) top, (float) right, (float) bottom);
    }

    public boolean clipRect(Rect rect) {
        return clipRect(rect.left, rect.top, rect.right, rect.bottom);
    }

    public boolean clipRect(Rect rect, Region.Op op) {
        return clipRect(rect);
    }

    public boolean clipRect(RectF rect) {
        return clipRect(rect.left, rect.top, rect.right, rect.bottom);
    }

    public boolean clipRect(RectF rect, Region.Op op) {
        return clipRect(rect);
    }

    public boolean clipPath(Path path) {
        // 路径裁剪需要把 Path 转成 ctx 的路径；RW 用得少，先返回 true 不裁剪
        return true;
    }

    public boolean clipPath(Path path, Region.Op op) {
        return clipPath(path);
    }

    public boolean clipRegion(Region region) {
        return true;
    }

    public boolean quickReject(float l, float t, float r, float b) {
        return false;
    }

    public boolean quickReject(RectF rect) {
        return false;
    }

    public boolean quickReject(Path path, EdgeType type) {
        return false;
    }

    /** 桩里出现过的内部类型占位 */
    public static class EdgeType {
    }

    // ---------------------------------------------------------------- 颜色

    public void drawColor(int color) {
        drawColor(color, PorterDuff.Mode.SRC_OVER);
    }

    public void drawColor(int color, PorterDuff.Mode mode) {
        if (ctx == null) return;
        String prev = ctx.getGlobalCompositeOperation();
        ctx.setGlobalCompositeOperation(compositeOf(mode));
        ctx.setFillStyle(cssColor(color));
        ctx.fillRect(0, 0, getWidth(), getHeight());
        ctx.setGlobalCompositeOperation(prev);
    }

    public void drawARGB(int a, int r, int g, int b) {
        drawColor(Color.argb(a, r, g, b));
    }

    public void drawRGB(int r, int g, int b) {
        drawColor(Color.rgb(r, g, b));
    }

    // ---------------------------------------------------------------- 几何绘制

    public void drawRect(float left, float top, float right, float bottom, Paint paint) {
        if (ctx == null || paint == null) return;
        applyPaint(paint);
        if (paint.getStyle() == Paint.Style.STROKE) {
            ctx.strokeRect(left, top, right - left, bottom - top);
        } else {
            ctx.fillRect(left, top, right - left, bottom - top);
        }
    }

    public void drawRect(Rect r, Paint paint) {
        drawRect(r.left, r.top, r.right, r.bottom, paint);
    }

    public void drawRect(RectF r, Paint paint) {
        drawRect(r.left, r.top, r.right, r.bottom, paint);
    }

    public void drawLine(float x0, float y0, float x1, float y1, Paint paint) {
        if (ctx == null || paint == null) return;
        applyPaint(paint);
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
    }

    public void drawLines(float[] pts, Paint paint) {
        if (ctx == null || paint == null || pts == null) return;
        applyPaint(paint);
        ctx.beginPath();
        for (int i = 0; i + 3 < pts.length; i += 4) {
            ctx.moveTo(pts[i], pts[i + 1]);
            ctx.lineTo(pts[i + 2], pts[i + 3]);
        }
        ctx.stroke();
    }

    public void drawLines(float[] pts, int offset, int count, Paint paint) {
        if (pts == null) return;
        float[] sub = new float[count];
        System.arraycopy(pts, offset, sub, 0, Math.min(count, pts.length - offset));
        drawLines(sub, paint);
    }

    public void drawPoint(float x, float y, Paint paint) {
        if (paint != null && paint.getStyle() == Paint.Style.STROKE) {
            drawLine(x, y, x + 0.1f, y, paint);
        } else {
            drawCircle(x, y, Math.max(0.5f, paint == null ? 0.5f : paint.getStrokeWidth() * 0.5f), paint);
        }
    }

    public void drawPoints(float[] pts, Paint paint) {
        if (pts == null) return;
        for (int i = 0; i + 1 < pts.length; i += 2) drawPoint(pts[i], pts[i + 1], paint);
    }

    public void drawPoints(float[] pts, int offset, int count, Paint paint) {
        if (pts == null) return;
        for (int i = offset; i + 1 < offset + count && i + 1 < pts.length; i += 2)
            drawPoint(pts[i], pts[i + 1], paint);
    }

    public void drawCircle(float cx, float cy, float radius, Paint paint) {
        if (ctx == null || paint == null) return;
        applyPaint(paint);
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, false);
        if (paint.getStyle() == Paint.Style.STROKE) ctx.stroke(); else ctx.fill();
    }

    public void drawOval(RectF oval, Paint paint) {
        if (ctx == null || paint == null || oval == null) return;
        applyPaint(paint);
        float rx = (oval.right - oval.left) * 0.5f;
        float ry = (oval.bottom - oval.top) * 0.5f;
        ctx.beginPath();
        ctx.ellipse(oval.left + rx, oval.top + ry, rx, ry, 0, 0, Math.PI * 2);
        if (paint.getStyle() == Paint.Style.STROKE) ctx.stroke(); else ctx.fill();
    }

    public void drawArc(RectF oval, float startAngle, float sweepAngle, boolean useCenter, Paint paint) {
        if (ctx == null || paint == null || oval == null) return;
        applyPaint(paint);
        float rx = (oval.right - oval.left) * 0.5f;
        float ry = (oval.bottom - oval.top) * 0.5f;
        double a0 = Math.toRadians(startAngle);
        double a1 = Math.toRadians(startAngle + sweepAngle);
        ctx.beginPath();
        ctx.ellipse(oval.left + rx, oval.top + ry, rx, ry, 0, a0, a1);
        if (useCenter) {
            ctx.lineTo(oval.left + rx, oval.top + ry);
            ctx.closePath();
        }
        if (paint.getStyle() == Paint.Style.STROKE) ctx.stroke(); else ctx.fill();
    }

    public void drawRoundRect(RectF rect, float rx, float ry, Paint paint) {
        if (ctx == null || paint == null || rect == null) return;
        applyPaint(paint);
        roundRectPath(rect.left, rect.top, rect.right, rect.bottom, rx, ry);
        if (paint.getStyle() == Paint.Style.STROKE) ctx.stroke(); else ctx.fill();
    }

    private void roundRectPath(float l, float t, float r, float b, float rx, float ry) {
        float w = r - l, h = b - t;
        rx = Math.min(rx, w * 0.5f);
        ry = Math.min(ry, h * 0.5f);
        ctx.beginPath();
        ctx.moveTo(l + rx, t);
        ctx.lineTo(r - rx, t);
        ctx.quadraticCurveTo(r, t, r, t + ry);
        ctx.lineTo(r, b - ry);
        ctx.quadraticCurveTo(r, b, r - rx, b);
        ctx.lineTo(l + rx, b);
        ctx.quadraticCurveTo(l, b, l, b - ry);
        ctx.lineTo(l, t + ry);
        ctx.quadraticCurveTo(l, t, l + rx, t);
        ctx.closePath();
    }

    public void drawPath(Path path, Paint paint) {
        if (ctx == null || paint == null || path == null) return;
        applyPaint(paint);
        path.emit(ctx);
        if (paint.getStyle() == Paint.Style.STROKE) ctx.stroke(); else ctx.fill();
    }

    public void drawPaint(Paint paint) {
        if (paint == null) return;
        drawRect(0, 0, getWidth(), getHeight(), paint);
    }

    // ---------------------------------------------------------------- 位图

    public void drawBitmap(Bitmap bmp, float left, float top, Paint paint) {
        if (ctx == null || bmp == null) return;
        applyPaint(paint);
        ctx.drawImage(bmp.getSource(), left, top);
    }

    public void drawBitmap(Bitmap bmp, Rect src, Rect dst, Paint paint) {
        if (dst == null) return;
        drawBitmap(bmp,
                src == null ? 0 : src.left, src == null ? 0 : src.top,
                src == null ? -1 : src.right, src == null ? -1 : src.bottom,
                dst.left, dst.top, dst.right, dst.bottom, paint);
    }

    public void drawBitmap(Bitmap bmp, Rect src, RectF dst, Paint paint) {
        if (dst == null) return;
        drawBitmap(bmp,
                src == null ? 0 : src.left, src == null ? 0 : src.top,
                src == null ? -1 : src.right, src == null ? -1 : src.bottom,
                dst.left, dst.top, dst.right, dst.bottom, paint);
    }

    /** 9 参数版：src 宽高为 -1 时表示整图 */
    public void drawBitmap(Bitmap bmp, float sl, float st, float sr, float sb,
                           float dl, float dt, float dr, float db, Paint paint) {
        if (ctx == null || bmp == null) return;
        applyPaint(paint);
        CanvasImageSource img = bmp.getSource();
        if (sr < 0 || sb < 0) {
            ctx.drawImage(img, dl, dt, dr - dl, db - dt);
        } else {
            ctx.drawImage(img, sl, st, sr - sl, sb - st, dl, dt, dr - dl, db - dt);
        }
    }

    public void drawBitmap(Bitmap bmp, Matrix matrix, Paint paint) {
        if (bmp == null) return;
        save();
        concat(matrix);
        drawBitmap(bmp, 0, 0, paint);
        restore();
    }

    public void drawBitmap(int[] colors, int offset, int stride,
                           float x, float y, int width, int height,
                           boolean hasAlpha, Paint paint) {
        if (colors == null) return;
        Bitmap tmp = Bitmap.fromPixels(colors, offset, stride, width, height);
        drawBitmap(tmp, x, y, paint);
    }

    public void drawBitmap(int[] colors, int offset, int stride,
                           int x, int y, int width, int height,
                           boolean hasAlpha, Paint paint) {
        drawBitmap(colors, offset, stride, (float) x, (float) y, width, height, hasAlpha, paint);
    }

    public void drawBitmapMesh(Bitmap bmp, int meshWidth, int meshHeight, float[] verts,
                               int vertOffset, int[] colors, int colorOffset, Paint paint) {
        // 网格变形用于水波等效果，阶段 2 再做；先退化为整图绘制
        if (bmp != null) drawBitmap(bmp, 0, 0, paint);
    }

    // ---------------------------------------------------------------- 文本

    public void drawText(String text, float x, float y, Paint paint) {
        if (ctx == null || paint == null || text == null) return;
        applyPaint(paint);
        if (paint.getStyle() == Paint.Style.STROKE) ctx.strokeText(text, x, y);
        else ctx.fillText(text, x, y);
    }

    public void drawText(String text, int start, int end, float x, float y, Paint paint) {
        if (text == null) return;
        drawText(text.substring(start, Math.min(end, text.length())), x, y, paint);
    }

    public void drawText(char[] text, int index, int count, float x, float y, Paint paint) {
        if (text == null) return;
        drawText(new String(text, index, count), x, y, paint);
    }

    public void drawText(CharSequence text, int start, int end, float x, float y, Paint paint) {
        if (text == null) return;
        drawText(text.subSequence(start, Math.min(end, text.length())).toString(), x, y, paint);
    }

    public void drawTextOnPath(String text, Path path, float hOffset, float vOffset, Paint paint) {
        // 沿路径排版：RW 未使用，退化为普通绘制
        drawText(text, 0, 0, paint);
    }

    public void drawTextOnPath(char[] text, int index, int count, Path path,
                               float hOffset, float vOffset, Paint paint) {
        if (text != null) drawText(new String(text, index, count), 0, 0, paint);
    }

    public void drawPosText(String text, float[] pos, Paint paint) {
        if (text == null || pos == null) return;
        for (int i = 0; i < text.length() && i * 2 + 1 < pos.length; i++) {
            drawText(String.valueOf(text.charAt(i)), pos[i * 2], pos[i * 2 + 1], paint);
        }
    }

    public void drawPosText(char[] text, int index, int count, float[] pos, Paint paint) {
        if (text != null) drawPosText(new String(text, index, count), pos, paint);
    }

    public void drawTextRun(char[] text, int index, int count, int contextIndex, int contextCount,
                            float x, float y, boolean isRtl, Paint paint) {
        drawText(text, index, count, x, y, paint);
    }

    public void drawTextRun(CharSequence text, int start, int end, int contextStart, int contextEnd,
                            float x, float y, boolean isRtl, Paint paint) {
        drawText(text, start, end, x, y, paint);
    }

    // ---------------------------------------------------------------- 图片

    public void drawPicture(Picture picture) {
        // Picture 记录的是 Canvas 指令流；本项目用不到，留空
    }

    public void drawPicture(Picture picture, Rect dst) {
    }

    public void drawPicture(Picture picture, RectF dst) {
    }

    public void drawVertices(VertexMode mode, int vertexCount, float[] verts, int vertOffset,
                             float[] texs, int texOffset, int[] colors, int colorOffset,
                             short[] indices, int indexOffset, int indexCount, Paint paint) {
    }

    public static class VertexMode {
    }

    // ---------------------------------------------------------------- 内部

    /** 把 Paint 的样式同步到 ctx */
    private void applyPaint(Paint paint) {
        if (paint == null || ctx == null) return;
        lastPaint = paint;
        paint.applyTo(ctx);
    }

    private static String compositeOf(PorterDuff.Mode mode) {
        if (mode == null) return "source-over";
        switch (mode) {
            case SRC: return "copy";
            case DST: return "destination-over";
            case SRC_IN: return "source-in";
            case DST_IN: return "destination-in";
            case SRC_OUT: return "source-out";
            case DST_OUT: return "destination-out";
            case SRC_ATOP: return "source-atop";
            case DST_ATOP: return "destination-atop";
            case XOR: return "xor";
            case CLEAR: return "destination-out";
            case ADD: return "lighter";
            default: return "source-over";
        }
    }

    static String cssColor(int argb) {
        int a = (argb >>> 24) & 0xFF;
        int r = (argb >> 16) & 0xFF;
        int g = (argb >> 8) & 0xFF;
        int b = argb & 0xFF;
        if (a == 255) {
            return "rgb(" + r + "," + g + "," + b + ")";
        }
        return "rgba(" + r + "," + g + "," + b + "," + (a / 255.0) + ")";
    }
}
