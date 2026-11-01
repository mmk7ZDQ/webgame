package android.graphics;

/**
 * 2D 仿射矩阵，内部用 [a, b, c, d, tx, ty] 表示：
 *   | a c tx |
 *   | b d ty |
 *   | 0 0 1  |
 * 与 Canvas2D 的 ctx.transform(a,b,c,d,e,f) 参数顺序一致。
 */
public class Matrix {

    public enum ScaleToFit { FILL, START, CENTER, END }

    private final float[] m = {1, 0, 0, 1, 0, 0};

    public Matrix() { }

    public Matrix(Matrix src) { if (src != null) System.arraycopy(src.m, 0, m, 0, 6); }

    public void getValues(float[] values) {
        if (values != null && values.length >= 9) {
            values[0] = m[0]; values[1] = m[1]; values[2] = m[4];
            values[3] = m[2]; values[4] = m[3]; values[5] = m[5];
            values[6] = 0; values[7] = 0; values[8] = 1;
        } else if (values != null && values.length >= 6) {
            System.arraycopy(m, 0, values, 0, 6);
        }
    }

    public void setValues(float[] values) {
        if (values != null && values.length >= 9) {
            m[0] = values[0]; m[1] = values[1]; m[4] = values[2];
            m[2] = values[3]; m[3] = values[4]; m[5] = values[5];
        } else if (values != null && values.length >= 6) {
            System.arraycopy(values, 0, m, 0, 6);
        }
    }

    public void reset() { setValues(new float[]{1, 0, 0, 1, 0, 0}); }

    public boolean isIdentity() {
        return m[0] == 1 && m[1] == 0 && m[2] == 0 && m[3] == 1 && m[4] == 0 && m[5] == 0;
    }

    public void set(Matrix src) { if (src != null) System.arraycopy(src.m, 0, m, 0, 6); }

    public void setTranslate(float dx, float dy) {
        m[0] = 1; m[1] = 0; m[2] = 0; m[3] = 1; m[4] = dx; m[5] = dy;
    }

    public void setScale(float sx, float sy) {
        m[0] = sx; m[1] = 0; m[2] = 0; m[3] = sy; m[4] = 0; m[5] = 0;
    }

    public void setScale(float sx, float sy, float px, float py) {
        m[0] = sx; m[1] = 0; m[2] = 0; m[3] = sy;
        m[4] = px - sx * px; m[5] = py - sy * py;
    }

    public void setRotate(float degrees) {
        double r = Math.toRadians(degrees);
        float c = (float) Math.cos(r), s = (float) Math.sin(r);
        m[0] = c; m[1] = -s; m[2] = s; m[3] = c; m[4] = 0; m[5] = 0;
    }

    public void setRotate(float degrees, float px, float py) {
        setRotate(degrees);
        m[4] = px - m[0] * px - m[2] * py;
        m[5] = py - m[1] * px - m[3] * py;
    }

    public void setConcat(Matrix a, Matrix b) {
        if (a == null || b == null) return;
        float[] x = a.m, y = b.m;
        m[0] = x[0] * y[0] + x[2] * y[1];
        m[1] = x[1] * y[0] + x[3] * y[1];
        m[2] = x[0] * y[2] + x[2] * y[3];
        m[3] = x[1] * y[2] + x[3] * y[3];
        m[4] = x[0] * y[4] + x[2] * y[5] + x[4];
        m[5] = x[1] * y[4] + x[3] * y[5] + x[5];
    }

    public boolean preConcat(Matrix other) {
        if (other == null) return false;
        Matrix tmp = new Matrix();
        tmp.setConcat(this, other);
        set(tmp);
        return true;
    }

    public boolean postConcat(Matrix other) {
        if (other == null) return false;
        Matrix tmp = new Matrix();
        tmp.setConcat(other, this);
        set(tmp);
        return true;
    }

    public boolean preTranslate(float dx, float dy) {
        Matrix t = new Matrix();
        t.setTranslate(dx, dy);
        return preConcat(t);
    }

    public boolean postTranslate(float dx, float dy) {
        m[4] += dx;
        m[5] += dy;
        return true;
    }

    public boolean preScale(float sx, float sy) {
        Matrix t = new Matrix();
        t.setScale(sx, sy);
        return preConcat(t);
    }

    public boolean postScale(float sx, float sy) {
        m[0] *= sx; m[1] *= sx; m[2] *= sy; m[3] *= sy; m[4] *= sx; m[5] *= sy;
        return true;
    }

    public boolean preRotate(float degrees) {
        Matrix t = new Matrix();
        t.setRotate(degrees);
        return preConcat(t);
    }

    public boolean postRotate(float degrees) {
        Matrix t = new Matrix();
        t.setRotate(degrees);
        return postConcat(t);
    }

    public boolean invert(Matrix inverse) {
        float det = m[0] * m[3] - m[1] * m[2];
        if (det == 0) return false;
        float inv = 1f / det;
        if (inverse == null) return false;
        inverse.m[0] = m[3] * inv;
        inverse.m[1] = -m[1] * inv;
        inverse.m[2] = -m[2] * inv;
        inverse.m[3] = m[0] * inv;
        inverse.m[4] = (m[2] * m[5] - m[3] * m[4]) * inv;
        inverse.m[5] = (m[1] * m[4] - m[0] * m[5]) * inv;
        return true;
    }

    public void mapPoints(float[] pts) {
        if (pts == null) return;
        for (int i = 0; i + 1 < pts.length; i += 2) {
            float x = pts[i], y = pts[i + 1];
            pts[i] = m[0] * x + m[2] * y + m[4];
            pts[i + 1] = m[1] * x + m[3] * y + m[5];
        }
    }

    public void mapRect(RectF rect) {
        if (rect == null) return;
        float[] p = {rect.left, rect.top, rect.right, rect.bottom};
        mapPoints(p);
        rect.set(Math.min(p[0], p[2]), Math.min(p[1], p[3]), Math.max(p[0], p[2]), Math.max(p[1], p[3]));
    }

    public boolean rectStaysRect() { return m[1] == 0 && m[2] == 0; }

    public void setRectToRect(RectF src, RectF dst, ScaleToFit mode) {
        if (src == null || dst == null) return;
        float sx = dst.width() / src.width();
        float sy = dst.height() / src.height();
        float s = Math.min(sx, sy);
        setScale(s, s);
        postTranslate(dst.left - src.left * s, dst.top - src.top * s);
    }
}
