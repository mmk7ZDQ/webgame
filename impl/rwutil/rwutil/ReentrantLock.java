package rwutil;

import java.util.concurrent.TimeUnit;

/**
 * java.util.concurrent.locks.ReentrantLock 的 Web 替身。
 *
 * 单线程环境里锁永远可用 —— 全部操作退化为 no-op，tryLock 恒返回 true。
 * 类名会被重映射到 java.util.concurrent.locks.ReentrantLock。
 */
public class ReentrantLock {

    private int holdCount;

    public ReentrantLock() { }

    public ReentrantLock(boolean fair) { }

    public void lock() { holdCount++; }

    public void lockInterruptibly() { holdCount++; }

    public boolean tryLock() { holdCount++; return true; }

    public boolean tryLock(long timeout, TimeUnit unit) { holdCount++; return true; }

    public void unlock() { if (holdCount > 0) holdCount--; }

    public int getHoldCount() { return holdCount; }

    public boolean isLocked() { return holdCount > 0; }

    public boolean isHeldByCurrentThread() { return holdCount > 0; }

    public Condition newCondition() { return new Condition(); }

    public static class Condition {
        public void await() { }
        public void awaitUninterruptibly() { }
        public long awaitNanos(long nanosTimeout) { return 0; }
        public boolean await(long time, TimeUnit unit) { return true; }
        public void signal() { }
        public void signalAll() { }
    }
}
