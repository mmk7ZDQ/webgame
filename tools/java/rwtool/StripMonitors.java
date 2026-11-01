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

    public static void main(String[] args) throws IOException {
        if (args.length < 2) {
            System.err.println("用法: java rwtool.StripMonitors <in.jar> <out.jar>");
            System.exit(2);
        }
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
                    ClassVisitor cv = new ClassVisitor(Opcodes.ASM9, cw) {
                        @Override
                        public MethodVisitor visitMethod(int access, String name, String desc,
                                                         String sig, String[] ex) {
                            MethodVisitor mv = super.visitMethod(access, name, desc, sig, ex);
                            return new MethodVisitor(Opcodes.ASM9, mv) {
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
                    cr.accept(cv, 0);
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
