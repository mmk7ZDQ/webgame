package rwutil;

/** 零散的 classlib 缺口 */
public class Misc {

    /** java.io.ObjectStreamField 替身 */
    public static class ObjectStreamField {
        private final String name;
        private final Class<?> type;
        public ObjectStreamField(String name, Class<?> type) {
            this.name = name;
            this.type = type;
        }
        public String getName() { return name; }
        public Class<?> getType() { return type; }
        public boolean isPrimitive() { return type != null && type.isPrimitive(); }
    }

    /** java.util.concurrent.atomic.AtomicMarkableReference 替身（单线程无需 CAS） */
    public static class AtomicMarkableReference<V> {
        private V value;
        private boolean mark;

        public AtomicMarkableReference(V initial, boolean initialMark) {
            this.value = initial;
            this.mark = initialMark;
        }
        public V get() { return value; }
        public boolean isMarked() { return mark; }
        public V get(boolean[] markHolder) {
            if (markHolder != null && markHolder.length > 0) markHolder[0] = mark;
            return value;
        }
        public void set(V newValue, boolean newMark) { value = newValue; mark = newMark; }
        public boolean compareAndSet(V expect, V update, boolean expectMark, boolean newMark) {
            if (value == expect && mark == expectMark) { value = update; mark = newMark; return true; }
            return false;
        }
        public boolean attemptMark(V expect, boolean newMark) {
            if (value == expect) { mark = newMark; return true; }
            return false;
        }
    }
}
