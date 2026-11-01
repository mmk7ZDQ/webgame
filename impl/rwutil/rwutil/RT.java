package rwutil;

/**
 * 补齐 TeaVM classlib 缺少的 Runtime / System / Thread 静态方法。
 * 由 tools/java/rwtool/StripMonitors 做方法级重定向指过来。
 */
public class RT {

    private static final long MAX = 512L * 1024 * 1024;

    // java.lang.System.exit / java.lang.Runtime.halt
    public static void exit(int code) { }
    public static void halt(int code) { }

    // java.lang.Runtime.maxMemory 等
    public static long maxMemory() { return MAX; }
    public static long totalMemory() { return MAX / 2; }
    public static long freeMemory() { return MAX / 4; }

    // java.lang.Thread.getState（接收者留在栈上，这里做成实例方法由重定向调用）
    public java.lang.Thread.State getState() { return java.lang.Thread.State.RUNNABLE; }

    // java.lang.Thread.getAllStackTraces
    public static java.util.Map<Thread, StackTraceElement[]> getAllStackTraces() {
        return new java.util.HashMap<Thread, StackTraceElement[]>();
    }

    // java.util.concurrent.ConcurrentHashMap.keys
    public java.util.Enumeration<?> keys() { return null; }

    // java.util.ResourceBundle.clearCache
    public static void clearCache() { }

    // java.util.Locale.getISO3Language
    public String getISO3Language() { return "und"; }
}
