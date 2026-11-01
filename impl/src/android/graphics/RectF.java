package android.graphics;

public class RectF {
    public float left, top, right, bottom;

    public RectF() { }

    public RectF(float l, float t, float r, float b) { set(l, t, r, b); }

    public RectF(RectF r) { if (r != null) set(r); }

    public RectF(Rect r) { if (r != null) set(r.left, r.top, r.right, r.bottom); }

    public void set(float l, float t, float r, float b) { left = l; top = t; right = r; bottom = b; }

    public void set(RectF r) { if (r != null) set(r.left, r.top, r.right, r.bottom); }

    public void set(Rect r) { if (r != null) set(r.left, r.top, r.right, r.bottom); }

    public void setEmpty() { set(0, 0, 0, 0); }

    public boolean isEmpty() { return left >= right || top >= bottom; }

    public float width() { return right - left; }

    public float height() { return bottom - top; }

    public float centerX() { return (left + right) * 0.5f; }

    public float centerY() { return (top + bottom) * 0.5f; }

    public void offset(float dx, float dy) { left += dx; right += dx; top += dy; bottom += dy; }

    public void offsetTo(float x, float y) { right += x - left; bottom += y - top; left = x; top = y; }

    public void inset(float dx, float dy) { left += dx; top += dy; right -= dx; bottom -= dy; }

    public boolean contains(float x, float y) { return left < right && top < bottom && x >= left && x < right && y >= top && y < bottom; }

    public boolean contains(RectF r) {
        return r != null && left < right && top < bottom
                && left <= r.left && top <= r.top && right >= r.right && bottom >= r.bottom;
    }

    public boolean intersect(float l, float t, float r, float b) {
        if (left < r && l < right && top < b && t < bottom) {
            if (left < l) left = l;
            if (top < t) top = t;
            if (right > r) right = r;
            if (bottom > b) bottom = b;
            return true;
        }
        return false;
    }

    public boolean intersect(RectF r) { return r != null && intersect(r.left, r.top, r.right, r.bottom); }

    public void union(float l, float t, float r, float b) {
        if (l < r && t < b) {
            if (left >= right || top >= bottom) set(l, t, r, b);
            else {
                if (l < left) left = l;
                if (t < top) top = t;
                if (r > right) right = r;
                if (b > bottom) bottom = b;
            }
        }
    }

    public void union(RectF r) { if (r != null) union(r.left, r.top, r.right, r.bottom); }

    public void sort() {
        if (left > right) { float tmp = left; left = right; right = tmp; }
        if (top > bottom) { float tmp = top; top = bottom; bottom = tmp; }
    }

    public void round(Rect dst) { if (dst != null) dst.set(Math.round(left), Math.round(top), Math.round(right), Math.round(bottom)); }

    @Override public String toString() { return "RectF(" + left + ", " + top + ", " + right + ", " + bottom + ")"; }

    @Override public boolean equals(Object o) {
        if (!(o instanceof RectF)) return false;
        RectF r = (RectF) o;
        return left == r.left && top == r.top && right == r.right && bottom == r.bottom;
    }

    @Override public int hashCode() { return ((Float.floatToIntBits(left) * 31 + Float.floatToIntBits(top)) * 31
            + Float.floatToIntBits(right)) * 31 + Float.floatToIntBits(bottom); }
}
