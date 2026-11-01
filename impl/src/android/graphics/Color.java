package android.graphics;

public class Color {

    public static final int BLACK = 0xFF000000;
    public static final int DKGRAY = 0xFF444444;
    public static final int GRAY = 0xFF888888;
    public static final int LTGRAY = 0xFFCCCCCC;
    public static final int WHITE = 0xFFFFFFFF;
    public static final int RED = 0xFFFF0000;
    public static final int GREEN = 0xFF00FF00;
    public static final int BLUE = 0xFF0000FF;
    public static final int YELLOW = 0xFFFFFF00;
    public static final int CYAN = 0xFF00FFFF;
    public static final int MAGENTA = 0xFFFF00FF;
    public static final int TRANSPARENT = 0;

    public static int alpha(int color) { return color >>> 24; }

    public static int red(int color) { return (color >> 16) & 0xFF; }

    public static int green(int color) { return (color >> 8) & 0xFF; }

    public static int blue(int color) { return color & 0xFF; }

    public static int rgb(int red, int green, int blue) {
        return 0xFF000000 | ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    public static int argb(int alpha, int red, int green, int blue) {
        return ((alpha & 0xFF) << 24) | ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

    public static int parseColor(String colorString) {
        if (colorString == null) return BLACK;
        if (colorString.startsWith("#")) {
            String s = colorString.substring(1);
            if (s.length() == 6) return (int) (0xFF000000L | Long.parseLong(s, 16));
            if (s.length() == 8) return (int) Long.parseLong(s, 16);
        }
        switch (colorString.toLowerCase()) {
            case "black": return BLACK;
            case "white": return WHITE;
            case "red": return RED;
            case "green": return GREEN;
            case "blue": return BLUE;
            case "yellow": return YELLOW;
            case "cyan": return CYAN;
            case "magenta": return MAGENTA;
            case "gray": case "grey": return GRAY;
            case "transparent": return TRANSPARENT;
        }
        return BLACK;
    }

    public static void colorToHSV(int color, float[] hsv) {
        float r = red(color) / 255f, g = green(color) / 255f, b = blue(color) / 255f;
        float max = Math.max(r, Math.max(g, b));
        float min = Math.min(r, Math.min(g, b));
        float d = max - min;
        float h;
        if (d == 0) h = 0;
        else if (max == r) h = ((g - b) / d) % 6f;
        else if (max == g) h = (b - r) / d + 2f;
        else h = (r - g) / d + 4f;
        h *= 60f;
        if (h < 0) h += 360f;
        hsv[0] = h;
        hsv[1] = max == 0 ? 0 : d / max;
        hsv[2] = max;
    }

    public static int HSVToColor(float[] hsv) {
        float h = hsv[0] / 60f, s = hsv[1], v = hsv[2];
        int i = (int) Math.floor(h) % 6;
        float f = h - (float) Math.floor(h);
        float p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s);
        float r, g, b;
        switch (i) {
            case 0: r = v; g = t; b = p; break;
            case 1: r = q; g = v; b = p; break;
            case 2: r = p; g = v; b = t; break;
            case 3: r = p; g = q; b = v; break;
            case 4: r = t; g = p; b = v; break;
            default: r = v; g = p; b = q; break;
        }
        return argb(255, (int) (r * 255), (int) (g * 255), (int) (b * 255));
    }
}
