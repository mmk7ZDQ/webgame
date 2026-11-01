package rwutil;

import java.util.ArrayList;
import java.util.List;

/**
 * java.util.concurrent.ExecutorService 的同步替身。
 * Web 单线程：提交的任务立即在当前调用栈执行完。
 */
public class ExecutorService implements java.util.concurrent.Executor {

    private boolean shutdown;

    public void shutdown() { shutdown = true; }

    public List<Runnable> shutdownNow() { shutdown = true; return new ArrayList<Runnable>(); }

    public boolean isShutdown() { return shutdown; }

    public boolean isTerminated() { return shutdown; }

    public boolean awaitTermination(long t, java.util.concurrent.TimeUnit u) { return true; }

    public <T> Future<T> submit(java.util.concurrent.Callable<T> task) {
        try {
            return new Future<T>(task.call(), true);
        } catch (Exception e) {
            return new Future<T>(null, true);
        }
    }

    public Future<?> submit(Runnable task) {
        task.run();
        return new Future<Object>(null, true);
    }

    public void execute(Runnable task) { task.run(); }
}
