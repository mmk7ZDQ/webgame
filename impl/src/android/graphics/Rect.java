package android.graphics;

public class Rect {
    public int left, top, right, bottom;

    public Rect() { }

    public Rect(int l, int t, int r, int b) { set(l, t, r, b); }

    public Rect(Rect r) { if (r != null) set(r); }

    public void set(int l, int t, int r, int b) { left = l; top = t; right = r; bottom = b; }

    public void set(Rect r) { if (r != null) set(r.left, r.top, r.right, r.bottom); }

    public void setEmpty() { set(0, 0, 0, 0); }

    public boolean isEmpty() { return left >= right || top >= bottom; }

    public int width() { return right - left; }

    public int height() { return bottom - top; }

    public int centerX() { return (left + right) >> 1; }

    public int centerY() { return (top + bottom) >> 1; }

    public float exactCenterX() { return (left + right) * 0.5f; }

    public float exactCenterY() { return (top + bottom) * 0.5f; }

    public void offset(int dx, int dy) { left += dx; right += dx; top += dy; bottom += dy; }

    public void offsetTo(int x, int y) { right += x - left; bottom += y - top; left = x; top = y; }

    public void inset(int dx, int dy) { left += dx; top += dy; right -= dx; bottom -= dy; }

    public boolean contains(int x, int y) { return left < right && top < bottom && x >= left && x < right && y >= top && y < bottom; }

    public boolean contains(Rect r) {
        return r != null && left < right && top < bottom
                && left <= r.left && top <= r.top && right >= r.right && bottom >= r.bottom;
    }

    public boolean intersect(int l, int t, int r, int b) {
        if (left < r && l < right && top < b && t < bottom) {
            if (left < l) left = l;
            if (top < t) top = t;
            if (right > r) right = r;
            if (bottom > b) bottom = b;
            return true;
        }
        return false;
    }

    public boolean intersect(Rect r) { return r != null && intersect(r.left, r.top, r.right, r.bottom); }

    public void union(int l, int t, int r, int b) {
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

    public void union(Rect r) { if (r != null) union(r.left, r.top, r.right, r.bottom); }

    public void sort() {
        if (left > right) { int tmp = left; left = right; right = tmp; }
        if (top > bottom) { int tmp = top; top = bottom; bottom = tmp; }
    }

    @Override public String toString() { return "Rect(" + left + ", " + top + ", " + right + ", " + bottom + ")"; }

    @Override public boolean equals(Object o) {
        if (!(o instanceof Rect)) return false;
        Rect r = (Rect) o;
        return left == r.left && top == r.top && right == r.right && bottom == r.bottom;
    }

    @Override public int hashCode() { return ((left * 31 + top) * 31 + right) * 31 + bottom; }
}
