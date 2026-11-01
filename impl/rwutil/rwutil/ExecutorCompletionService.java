package rwutil;

import java.util.concurrent.TimeUnit;

/** java.util.concurrent.ExecutorCompletionService 的同步替身。 */
public class ExecutorCompletionService<T> {

    private final ExecutorService executor;

    public ExecutorCompletionService(java.util.concurrent.Executor executor) {
        this.executor = (executor instanceof ExecutorService) ? (ExecutorService) executor : new ExecutorService();
    }

    public Future<T> submit(java.util.concurrent.Callable<T> task) { return executor.submit(task); }

    public Future<T> submit(Runnable task, T result) {
        task.run();
        return new Future<T>(result, true);
    }

    public Future<T> take() { return null; }

    public Future<T> poll() { return null; }

    public Future<T> poll(long t, TimeUnit u) { return null; }
}
