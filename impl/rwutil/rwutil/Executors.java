package rwutil;

/** java.util.concurrent.Executors 的替身：所有工厂都返回同步执行器。 */
public class Executors {

    public static ExecutorService newSingleThreadExecutor() { return new ExecutorService(); }

    public static ExecutorService newFixedThreadPool(int n) { return new ExecutorService(); }

    public static ExecutorService newCachedThreadPool() { return new ExecutorService(); }

    public static ExecutorService newScheduledThreadPool(int n) { return new ExecutorService(); }

    public static java.util.concurrent.ThreadFactory defaultThreadFactory() { return null; }
}
