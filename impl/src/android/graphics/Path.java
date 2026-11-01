package android.graphics;

import java.util.ArrayList;
import java.util.List;
import org.teavm.jso.canvas.CanvasRenderingContext2D;

/**
 * 路径：记录命令，绘制时回放到 Canvas2D。
 * Android 的 Path 是即时构建的对象，Canvas2D 的路径绑定在 ctx 上，所以需要自己存一份。
 */
public class Path {

    public enum FillType { WINDING, EVEN_ODD, INVERSE_WINDING, INVERSE_EVEN_ODD }

    public enum Direction { CW, CCW }

    public enum Op { DIFFERENCE, INTERSECT, UNION, XOR, REVERSE_DIFFERENCE }

    private static final byte MOVE = 0, LINE = 1, QUAD = 2, CUBIC = 3, CLOSE = 4, ARC = 5;
    private final List<float[]> ops = new ArrayList<float[]>();
    private final List<Byte> kinds = new ArrayList<Byte>();
    private FillType fillType = FillType.WINDING;

    public Path() { }

    public Path(Path src) {
        if (src != null) {
            ops.addAll(src.ops);
            kinds.addAll(src.kinds);
            fillType = src.fillType;
        }
    }

    public void reset() { ops.clear(); kinds.clear(); }

    public void rewind() { reset(); }

    public boolean isEmpty() { return ops.isEmpty(); }

    public void setFillType(FillType t) { fillType = t; }

    public FillType getFillType() { return fillType; }

    public boolean isInverseFillType() { return fillType == FillType.INVERSE_WINDING || fillType == FillType.INVERSE_EVEN_ODD; }

    public void moveTo(float x, float y) { add(MOVE, x, y); }

    public void lineTo(float x, float y) { add(LINE, x, y); }

    public void quadTo(float x1, float y1, float x2, float y2) {
        kinds.add(QUAD); ops.add(new float[]{x1, y1, x2, y2});
    }

    public void cubicTo(float x1, float y1, float x2, float y2, float x3, float y3) {
        kinds.add(CUBIC); ops.add(new float[]{x1, y1, x2, y2, x3, y3});
    }

    public void close() { kinds.add(CLOSE); ops.add(new float[0]); }

    public void addRect(float l, float t, float r, float b, Direction dir) {
        moveTo(l, t); lineTo(r, t); lineTo(r, b); lineTo(l, b); close();
    }

    public void addRect(RectF rect, Direction dir) {
        if (rect != null) addRect(rect.left, rect.top, rect.right, rect.bottom, dir);
    }

    public void addRoundRect(RectF rect, float rx, float ry, Direction dir) {
        if (rect != null) addRect(rect, dir);   // 简化：按直角矩形处理
    }

    public void addCircle(float x, float y, float radius, Direction dir) {
        // 用 4 段贝塞尔近似圆
        float k = radius * 0.5523f;
        moveTo(x + radius, y);
        cubicTo(x + radius, y + k, x + k, y + radius, x, y + radius);
        cubicTo(x - k, y + radius, x - radius, y + k, x - radius, y);
        cubicTo(x - radius, y - k, x - k, y - radius, x, y - radius);
        cubicTo(x + k, y - radius, x + radius, y - k, x + radius, y);
        close();
    }

    public void addOval(RectF oval, Direction dir) {
        if (oval == null) return;
        float rx = oval.width() * 0.5f, ry = oval.height() * 0.5f;
        float cx = oval.centerX(), cy = oval.centerY();
        float kx = rx * 0.5523f, ky = ry * 0.5523f;
        moveTo(cx + rx, cy);
        cubicTo(cx + rx, cy + ky, cx + kx, cy + ry, cx, cy + ry);
        cubicTo(cx - kx, cy + ry, cx - rx, cy + ky, cx - rx, cy);
        cubicTo(cx - rx, cy - ky, cx - kx, cy - ry, cx, cy - ry);
        cubicTo(cx + kx, cy - ry, cx + rx, cy - ky, cx + rx, cy);
        close();
    }

    public void addPath(Path src) {
        if (src == null) return;
        for (int i = 0; i < src.kinds.size(); i++) {
            kinds.add(src.kinds.get(i));
            ops.add(src.ops.get(i));
        }
    }

    public void addPath(Path src, float dx, float dy) {
        if (src == null) return;
        for (int i = 0; i < src.kinds.size(); i++) {
            float[] o = src.ops.get(i);
            float[] c = new float[o.length];
            for (int k = 0; k + 1 < o.length; k += 2) { c[k] = o[k] + dx; c[k + 1] = o[k + 1] + dy; }
            kinds.add(src.kinds.get(i));
            ops.add(c);
        }
    }

    public void addPath(Path src, Matrix m) {
        addPath(src);
    }

    public void offset(float dx, float dy) {
        for (float[] o : ops) {
            for (int k = 0; k + 1 < o.length; k += 2) { o[k] += dx; o[k + 1] += dy; }
        }
    }

    public void transform(Matrix m) {
        if (m == null) return;
        for (float[] o : ops) m.mapPoints(o);
    }

    public void arcTo(RectF oval, float startAngle, float sweepAngle, boolean forceMoveTo) { }

    public void rMoveTo(float dx, float dy) { moveTo(dx, dy); }

    public void rLineTo(float dx, float dy) { lineTo(dx, dy); }

    public void rQuadTo(float dx1, float dy1, float dx2, float dy2) { quadTo(dx1, dy1, dx2, dy2); }

    public void rCubicTo(float x1, float y1, float x2, float y2, float x3, float y3) {
        cubicTo(x1, y1, x2, y2, x3, y3);
    }

    public boolean op(Path other, Op op) { return true; }

    public boolean isConvex() { return false; }

    public void computeBounds(RectF bounds, boolean exact) {
        if (bounds == null) return;
        if (ops.isEmpty()) { bounds.set(0, 0, 0, 0); return; }
        float minX = Float.MAX_VALUE, minY = Float.MAX_VALUE;
        float maxX = -Float.MAX_VALUE, maxY = -Float.MAX_VALUE;
        for (float[] o : ops) {
            for (int k = 0; k + 1 < o.length; k += 2) {
                if (o[k] < minX) minX = o[k];
                if (o[k] > maxX) maxX = o[k];
                if (o[k + 1] < minY) minY = o[k + 1];
                if (o[k + 1] > maxY) maxY = o[k + 1];
            }
        }
        bounds.set(minX, minY, maxX, maxY);
    }

    /** 把已记录的命令回放到目标 ctx（由 Canvas.drawPath 调用） */
    public void emit(CanvasRenderingContext2D ctx) {
        ctx.beginPath();
        for (int i = 0; i < kinds.size(); i++) {
            float[] o = ops.get(i);
            switch (kinds.get(i)) {
                case MOVE: ctx.moveTo(o[0], o[1]); break;
                case LINE: ctx.lineTo(o[0], o[1]); break;
                case QUAD: ctx.quadraticCurveTo(o[0], o[1], o[2], o[3]); break;
                case CUBIC: ctx.bezierCurveTo(o[0], o[1], o[2], o[3], o[4], o[5]); break;
                case CLOSE: ctx.closePath(); break;
                default: break;
            }
        }
    }

    private void add(byte kind, float x, float y) {
        kinds.add(kind);
        ops.add(new float[]{x, y});
    }
}
