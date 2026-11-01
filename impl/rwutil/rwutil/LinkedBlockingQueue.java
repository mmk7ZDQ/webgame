package rwutil;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.concurrent.TimeUnit;

/** java.util.concurrent.LinkedBlockingQueue 的 Web 替身（委托 LinkedList）。 */
public class LinkedBlockingQueue<E> implements Iterable<E> {

    private final LinkedList<E> list = new LinkedList<E>();

    public LinkedBlockingQueue() { }

    public LinkedBlockingQueue(int capacity) { }

    public boolean offer(E e) { return list.add(e); }

    public boolean offer(E e, long t, TimeUnit u) { return list.add(e); }

    public void put(E e) { list.add(e); }

    public E poll() { return list.isEmpty() ? null : list.removeFirst(); }

    public E poll(long t, TimeUnit u) { return poll(); }

    public E take() { return poll(); }

    public E peek() { return list.isEmpty() ? null : list.getFirst(); }

    public int size() { return list.size(); }

    public boolean isEmpty() { return list.isEmpty(); }

    public void clear() { list.clear(); }

    public boolean remove(Object o) { return list.remove(o); }

    public Iterator<E> iterator() { return list.iterator(); }

    public int remainingCapacity() { return Integer.MAX_VALUE; }

    public int drainTo(java.util.Collection<? super E> c) {
        int n = 0;
        while (!list.isEmpty()) { c.add(list.removeFirst()); n++; }
        return n;
    }
}
