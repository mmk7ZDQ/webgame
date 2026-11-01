package rwutil;

/**
 * java.net.* 的 Web 替身。
 * 浏览器里没有原始 socket；联机部分首版裁掉，这里只需要"类存在且不崩"。
 * 由 StripMonitors 做类级重定向指过来。
 */
public class Net {

    /** java.net.ServerSocket 替身 */
    public static class ServerSocket {
        public ServerSocket() { }
        public ServerSocket(int port) { }
        public ServerSocket(int port, int backlog) { }
        public Socket accept() { return null; }
        public Socket accept$dummy() { return null; }
        public void close() { }
        public int getLocalPort() { return 0; }
        public boolean isClosed() { return true; }
        public void setSoTimeout(int t) { }
        public void bind(SocketAddress addr) { }
    }

    /** java.net.Socket 替身 */
    public static class Socket {
        public Socket() { }
        public Socket(String host, int port) { }
        public void close() { }
        public boolean isClosed() { return true; }
        public java.io.InputStream getInputStream() { return null; }
        public java.io.OutputStream getOutputStream() { return null; }
        public void setTcpNoDelay(boolean on) { }
        public void connect(SocketAddress addr, int timeout) { }
        public void connect(SocketAddress addr) { }
        
        public void setSoTimeout(int t) { }
        public InetAddress getInetAddress() { return new InetAddress(); }
        public int getPort() { return 0; }
        public int getLocalPort() { return 0; }
        public boolean isConnected() { return false; }
    }

    /** java.net.DatagramSocket 替身（局域网联机用，Web 端不可用） */
    public static class DatagramSocket {
        public DatagramSocket() { }
        public DatagramSocket(int port) { }
        public void send(DatagramPacket p) { }
        public void receive(Object p) { }
        public void close() { }
        public void setReuseAddress(boolean on) { }
        public void setBroadcast(boolean on) { }
        public void setSoTimeout(int t) { }
        public boolean isClosed() { return true; }
        public boolean isConnected() { return false; }
        public int getLocalPort() { return 0; }
        public void receive(DatagramPacket p) { }
    }

    /** java.net.SocketAddress 替身 */
    public static class SocketAddress {
        public SocketAddress() { }
    }

    /** java.net.DatagramPacket 替身 */
    public static class DatagramPacket {
        public DatagramPacket(byte[] buf, int len) { }
        public DatagramPacket(byte[] buf, int len, Object addr, int port) { }
        public DatagramPacket(byte[] buf, int len, SocketAddress sockAddr) { }
        public int getLength() { return 0; }
        public void setLength(int n) { }
        public byte[] getData() { return new byte[0]; }
        public int getOffset() { return 0; }
        public InetAddress getAddress() { return new InetAddress(); }
        public int getPort() { return 0; }
        public void setAddress(Object a) { }
        public void setPort(int p) { }
    }

    /** java.net.InetAddress 替身 */
    public static class InetAddress {
        public static InetAddress getLocalHost() { return new InetAddress(); }
        public static InetAddress getByName(String host) { return new InetAddress(); }
        public static InetAddress getByAddress(byte[] addr) { return new InetAddress(); }
        public static InetAddress getLoopbackAddress() { return new InetAddress(); }
        public boolean isLoopbackAddress() { return true; }
        public boolean isAnyLocalAddress() { return false; }
        public String getHostAddress() { return "127.0.0.1"; }
        public String getHostName() { return "localhost"; }
        public byte[] getAddress() { return new byte[]{127, 0, 0, 1}; }
    }

    /** java.net.NetworkInterface 替身 */
    public static class NetworkInterface {
        public static NetworkInterface getByInetAddress(InetAddress a) { return new NetworkInterface(); }
        public static java.util.Enumeration<NetworkInterface> getNetworkInterfaces() {
            return java.util.Collections.enumeration(new java.util.ArrayList<NetworkInterface>());
        }
        public String getName() { return "eth0"; }
        public String getDisplayName() { return "eth0"; }
        public int getIndex() { return 0; }
        public java.util.Enumeration<InetAddress> getInetAddresses() {
            return java.util.Collections.enumeration(new java.util.ArrayList<InetAddress>());
        }
        public byte[] getHardwareAddress() { return new byte[6]; }
        public boolean isUp() { return true; }
    }

    /** java.net.InetSocketAddress 替身 */
    public static class InetSocketAddress {
        public InetSocketAddress(String host, int port) { }
        public InetSocketAddress(int port) { }
        public InetSocketAddress(InetAddress addr, int port) { }
        public InetSocketAddress(byte[] addr, int port) { }
        public String getHostString() { return "localhost"; }
        public int getPort() { return 0; }
        public InetAddress getAddress() { return new InetAddress(); }
        public boolean isUnresolved() { return false; }
    }

    /** java.net.UnknownHostException 替身 */
    public static class UnknownHostException extends java.io.IOException {
        public UnknownHostException() { super(); }
        public UnknownHostException(String m) { super(m); }
    }

    /** java.util.concurrent.LinkedBlockingDeque 替身 */
    public static class LinkedBlockingDeque<E> extends LinkedBlockingQueue<E> {
        public LinkedBlockingDeque() { super(); }
        public LinkedBlockingDeque(int cap) { super(cap); }
        public LinkedBlockingDeque(java.util.Collection<? extends E> c) { super(); }
        public void putFirst(E e) { offer(e); }
        public void putLast(E e) { offer(e); }
        public void addFirst(E e) { offer(e); }
        public void addLast(E e) { offer(e); }
        public E pollFirst() { return poll(); }
        public E pollLast() { return poll(); }
        public E takeFirst() { return poll(); }
        public E takeLast() { return poll(); }
        public boolean offerFirst(E e) { return offer(e); }
        public boolean offerLast(E e) { return offer(e); }
        public boolean add(E e) { return offer(e); }
        public boolean addAll(java.util.Collection<? extends E> c) {
            boolean any = false;
            for (E e : c) any |= offer(e);
            return any;
        }
    }

    /** java.security.MessageDigest 替身（不做真摘要，联机口令用不到） */
    public static class MessageDigest {
        public static MessageDigest getInstance(String alg) { return new MessageDigest(); }
        public void update(byte[] input) { }
        public void update(byte[] input, int off, int len) { }
        public void update(byte b) { }
        public byte[] digest() { return new byte[16]; }
        public byte[] digest(byte[] input) { return new byte[16]; }
        public void reset() { }
        public int getDigestLength() { return 16; }
    }

    /** java.net.SocketException 替身 */
    public static class SocketException extends java.io.IOException {
        public SocketException() { super(); }
        public SocketException(String msg) { super(msg); }
    }
}
