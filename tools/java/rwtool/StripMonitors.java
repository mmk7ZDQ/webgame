/*
 * StripMonitors — 把字节码里的 monitor-enter / monitor-exit 全部换成 NOP。
 *
 * 为什么需要：
 *   1. TeaVM 0.14 在依赖分析阶段遇到 monitorExit 会抛 NPE（AbstractInstructionAnalyzer），
 *      导致整个 AOT 编译失败；
 *   2. Web 端是单线程模型（requestAnimationFrame 驱动），synchronized 本来就没有意义，
 *      RW 里那些 ReentrantLock / synchronized 块在浏览器里全是空转。
 *
 * 用法：java rwtool.StripMonitors in.jar out.jar
 */
package rwtool;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassVisitor;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;

public final class StripMonitors {

    /** TeaVM classlib 未实现、需要重定向到我们自己的实现的类 */
    private static final String[][] REDIRECT = {
        {"java/util/concurrent/ConcurrentLinkedQueue", "rwutil/ConcurrentLinkedQueue"},
        {"java/util/concurrent/LinkedBlockingQueue",  "rwutil/LinkedBlockingQueue"},
        {"java/util/concurrent/locks/ReentrantLock",  "rwutil/ReentrantLock"},
        {"java/util/concurrent/locks/ReentrantReadWriteLock", "rwutil/ReentrantLock"},
        {"java/util/concurrent/ExecutorService",      "rwutil/ExecutorService"},
        {"java/util/concurrent/Executors",            "rwutil/Executors"},
        {"java/util/concurrent/Future",               "rwutil/Future"},
        {"java/util/concurrent/ExecutorCompletionService", "rwutil/ExecutorCompletionService"},
        {"java/net/ServerSocket",     "rwutil/Net$ServerSocket"},
        {"java/net/Socket",           "rwutil/Net$Socket"},
        {"java/net/DatagramSocket",   "rwutil/Net$DatagramSocket"},
        {"java/net/DatagramPacket",   "rwutil/Net$DatagramPacket"},
        {"java/net/InetAddress",      "rwutil/Net$InetAddress"},
        {"java/net/NetworkInterface", "rwutil/Net$NetworkInterface"},
        {"java/net/SocketException",  "rwutil/Net$SocketException"},
        {"java/net/SocketTimeoutException", "rwutil/Net$SocketTimeoutException"},
        {"java/io/ObjectStreamField", "rwutil/Net$ObjectStreamField"},
        {"java/net/InetSocketAddress","rwutil/Net$InetSocketAddress"},
        {"java/net/UnknownHostException", "rwutil/Net$UnknownHostException"},
        {"java/net/SocketAddress",    "rwutil/Net$SocketAddress"},
        {"java/security/MessageDigest", "rwutil/Net$MessageDigest"},
        {"java/util/concurrent/LinkedBlockingDeque", "rwutil/Net$LinkedBlockingDeque"},
        {"java/io/ObjectStreamField", "rwutil/Misc$ObjectStreamField"},
        {"java/util/concurrent/atomic/AtomicMarkableReference", "rwutil/Misc$AtomicMarkableReference"},
    };

    /**
     * 只重定向 new 指令的目标类（不改方法描述符）。
     *
     * 适用于「TeaVM classlib 缺某个构造」的情况：让 new 指向我们写的子类，
     * 而描述符里的原类名保持不变 —— 子类是 is-a 关系，后续调用与传参都还成立。
     */
    private static final String[][] NEW_REDIRECT = {
        {"java/io/PrintWriter", "rwutil/RLPrintWriter"},
    };

    /** 方法级重定向：{owner, name, desc, newOwner, newName} */
    private static final String[][] METHOD_REDIRECT = {
        {"java/lang/System", "exit", "(I)V", "rwutil/RT", "exit"},
        {"java/lang/Runtime", "halt", "(I)V", "rwutil/RT", "halt"},
        {"java/lang/Runtime", "maxMemory", "()J", "rwutil/RT", "maxMemory"},
        {"java/lang/Runtime", "totalMemory", "()J", "rwutil/RT", "totalMemory"},
        {"java/lang/Runtime", "freeMemory", "()J", "rwutil/RT", "freeMemory"},
        {"java/lang/Thread", "getAllStackTraces", "()Ljava/util/Map;", "rwutil/RT", "getAllStackTraces"},
        {"java/lang/Thread", "getState", "()Ljava/lang/Thread$State;", "rwutil/RT", "getState"},
        {"java/util/ResourceBundle", "clearCache", "()V", "rwutil/RT", "clearCache"},
        {"java/util/Locale", "getISO3Language", "()Ljava/lang/String;", "rwutil/RT", "getISO3Language"},
        {"java/util/concurrent/ConcurrentHashMap", "keys", "()Ljava/util/Enumeration;", "rwutil/RT", "keys"},
        {"java/io/FileInputStream", "getFD", "()Ljava/io/FileDescriptor;", "rwutil/RT", "getFD"},
        {"java/lang/reflect/Field", "getInt", "(Ljava/lang/Object;)I", "rwutil/RT", "getInt"},
        {"java/nio/channels/FileChannel", "getFD", "()Ljava/io/FileDescriptor;", "rwutil/RT", "getFD"},
    };

    public static void main(String[] args) throws IOException {
        if (args.length < 2) {
            System.err.println("用法: java rwtool.StripMonitors <in.jar> <out.jar>");
            System.exit(2);
        }
        final java.util.Map<String, String> newRedirect = new java.util.HashMap<String, String>();
        for (String[] p : NEW_REDIRECT) newRedirect.put(p[0], p[1]);
        java.util.Map<String, String> remap = new java.util.HashMap<String, String>();
        for (String[] p : REDIRECT) remap.put(p[0], p[1]);
        int stripped = 0, classes = 0;

        try (ZipFile in = new ZipFile(args[0]);
             ZipOutputStream out = new ZipOutputStream(new java.io.FileOutputStream(args[1]))) {

            Enumeration<? extends ZipEntry> en = in.entries();
            while (en.hasMoreElements()) {
                ZipEntry e = en.nextElement();
                byte[] data = readAll(in.getInputStream(e));

                if (e.getName().endsWith(".class")) {
                    classes++;
                    int[] cnt = new int[1];
                    ClassReader cr = new ClassReader(data);
                    ClassWriter cw = new ClassWriter(0);
                    // 注意顺序：自定义访问器必须在 ClassRemapper 之外，
                    // 否则它的 visitMethod 永远不会被调用（ClassRemapper 会先接管）。
                    ClassVisitor remapper = new org.objectweb.asm.commons.ClassRemapper(
                            cw, new org.objectweb.asm.commons.SimpleRemapper(remap));
                    final ClassVisitor target = new ClassVisitor(Opcodes.ASM9, remapper) {
                        @Override
                        public MethodVisitor visitMethod(int access, String name, String desc,
                                                         String sig, String[] ex) {
                            MethodVisitor mv = super.visitMethod(access, name, desc, sig, ex);
                            return new MethodVisitor(Opcodes.ASM9, mv) {
                                @Override
                                public void visitMethodInsn(int opcode, String owner, String name,
                                                            String desc, boolean itf) {
                                    // new 被重定向到子类后，对应的 <init> 也要跟着换 owner
                                    // （描述符保持不变，因为子类提供同名同签名的构造）
                                    if (newRedirect.containsKey(owner)) {
                                        owner = newRedirect.get(owner);
                                        itf = false;
                                    }
                                    for (String[] r : METHOD_REDIRECT) {
                                        if (r[0].equals(owner) && r[1].equals(name) && r[2].equals(desc)) {
                                            owner = r[3];
                                            name = r[4];
                                            itf = false;
                                            break;
                                        }
                                    }
                                    super.visitMethodInsn(opcode, owner, name, desc, itf);
                                }

                                @Override
                                public void visitTypeInsn(int opcode, String type) {
                                    if (opcode == Opcodes.NEW && newRedirect.containsKey(type)) {
                                        type = newRedirect.get(type);
                                    }
                                    super.visitTypeInsn(opcode, type);
                                }

                                @Override
                                public void visitInsn(int opcode) {
                                    if (opcode == Opcodes.MONITORENTER || opcode == Opcodes.MONITOREXIT) {
                                        cnt[0]++;
                                        super.visitInsn(Opcodes.NOP);
                                    } else {
                                        super.visitInsn(opcode);
                                    }
                                }
                            };
                        }
                    };
                    cr.accept(target, 0);
                    data = cw.toByteArray();
                    stripped += cnt[0];
                }

                out.putNextEntry(new ZipEntry(e.getName()));
                out.write(data);
                out.closeEntry();
            }
        }
        System.out.println("处理 " + classes + " 个类，替换 " + stripped + " 条 monitor 指令");
    }

    private static byte[] readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = is.read(buf)) > 0) bos.write(buf, 0, n);
        return bos.toByteArray();
    }
}
