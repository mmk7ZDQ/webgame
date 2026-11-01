package rwutil;

import java.util.concurrent.TimeUnit;

/** java.util.concurrent.Future 的同步替身：任务已执行完，结果立刻可取。 */
public class Future<T> {

    private final T value;
    private final boolean done;

    public Future(T value, boolean done) {
        this.value = value;
        this.done = done;
    }

    public boolean cancel(boolean mayInterrupt) { return false; }

    public boolean isCancelled() { return false; }

    public boolean isDone() { return done; }

    public T get() { return value; }

    public T get(long timeout, TimeUnit unit) { return value; }
}
