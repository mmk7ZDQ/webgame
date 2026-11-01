package org.teavm.classlib.java.util.concurrent.atomic;

/**
 * 补 TeaVM classlib 缺失的 java.util.concurrent.atomic.AtomicMarkableReference。
 * 单线程模型下不需要真正的 CAS，全部退化为普通读写。
 */
public class TAtomicMarkableReference<V> {

    private V value;
    private boolean mark;

    public TAtomicMarkableReference(V initialRef, boolean initialMark) {
        this.value = initialRef;
        this.mark = initialMark;
    }

    public V get() {
        return value;
    }

    public boolean isMarked() {
        return mark;
    }

    public V get(boolean[] markHolder) {
        if (markHolder != null && markHolder.length > 0) {
            markHolder[0] = mark;
        }
        return value;
    }

    public void set(V newValue, boolean newMark) {
        this.value = newValue;
        this.mark = newMark;
    }

    public boolean compareAndSet(V expectedReference, V newReference,
                                 boolean expectedMark, boolean newMark) {
        if (value == expectedReference && mark == expectedMark) {
            value = newReference;
            mark = newMark;
            return true;
        }
        return false;
    }

    public boolean compareAndSet(V expectedReference, V newReference,
                                 boolean[] expectedMark, boolean newMark) {
        boolean e = expectedMark != null && expectedMark.length > 0 && expectedMark[0];
        return compareAndSet(expectedReference, newReference, e, newMark);
    }

    public boolean attemptMark(V expectedReference, boolean newMark) {
        if (value == expectedReference) {
            mark = newMark;
            return true;
        }
        return false;
    }

    public boolean weakCompareAndSet(V expectedReference, V newReference,
                                     boolean expectedMark, boolean newMark) {
        return compareAndSet(expectedReference, newReference, expectedMark, newMark);
    }
}
