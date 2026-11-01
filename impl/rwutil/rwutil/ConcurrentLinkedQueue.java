package rwutil;

import java.util.Iterator;
import java.util.LinkedList;

/**
 * java.util.concurrent.ConcurrentLinkedQueue 的 Web 替身。
 *
 * Web 端是单线程（rAF 驱动），不需要无锁队列；这里直接委托给 LinkedList。
 * 类名会被 tools/java/rwtool/RemapClasses 改写成 java.util.concurrent.ConcurrentLinkedQueue。
 */
public class ConcurrentLinkedQueue<E> implements Iterable<E> {

    private final LinkedList<E> list = new LinkedList<E>();

    public ConcurrentLinkedQueue() { }

    public boolean add(E e) { return list.add(e); }

    public boolean offer(E e) { return list.add(e); }

    public E poll() {
        return list.isEmpty() ? null : list.removeFirst();
    }

    public E peek() {
        return list.isEmpty() ? null : list.getFirst();
    }

    public E remove() {
        return list.removeFirst();
    }

    public E element() {
        return list.getFirst();
    }

    public boolean remove(Object o) { return list.remove(o); }

    public boolean contains(Object o) { return list.contains(o); }

    public int size() { return list.size(); }

    public boolean isEmpty() { return list.isEmpty(); }

    public void clear() { list.clear(); }

    public Iterator<E> iterator() { return list.iterator(); }

    public Object[] toArray() { return list.toArray(); }

    public <T> T[] toArray(T[] a) { return list.toArray(a); }
}
