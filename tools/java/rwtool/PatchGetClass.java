/*
 * PatchGetClass — 把 `getClass().equals(X.class)` 这种比较替换成恒真。
 *
 * 背景：TeaVM 的 Object.getClass() 在没有完整反射元数据时返回 null，
 * 于是引擎里的 `getClass().equals(i.class)` 变成 `null.equals(...)`，直接抛
 * "can't access property $equals, var$2 is null"。
 *
 * 这类比较的语义是「我这个对象是不是某个类型」——在移植后的代码里
 * 它就是那个类型，所以恒真是正确结果。
 *
 * 用法：java rwtool.PatchGetClass <in.jar> <out.jar>
 */
package rwtool;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;

public final class PatchGetClass {

    private static final String GETCLASS = "java/lang/Object";

    public static void main(String[] args) throws IOException {
        if (args.length < 2) {
            System.err.println("用法: PatchGetClass <in.jar> <out.jar>");
            System.exit(2);
        }
        int[] patched = new int[1];

        try (ZipFile in = new ZipFile(args[0]);
             ZipOutputStream out = new ZipOutputStream(new FileOutputStream(args[1]))) {
            Enumeration<? extends ZipEntry> en = in.entries();
            while (en.hasMoreElements()) {
                ZipEntry e = en.nextElement();
                byte[] data = readAll(in.getInputStream(e));
                if (e.getName().endsWith(".class")) {
                    ClassReader cr = new ClassReader(data);
                    ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                    cr.accept(new org.objectweb.asm.ClassVisitor(Opcodes.ASM9, cw) {
                        private String self;

                        @Override
                        public void visit(int version, int access, String cname, String sig,
                                          String superName, String[] ifaces) {
                            self = cname;
                            super.visit(version, access, cname, sig, superName, ifaces);
                        }

                        @Override
                        public MethodVisitor visitMethod(int access, String name, String desc,
                                                         String sig, String[] ex) {
                            MethodVisitor mv = super.visitMethod(access, name, desc, sig, ex);
                            return new MethodVisitor(Opcodes.ASM9, mv) {
                                private boolean lastWasGetClass;

                                @Override
                                public void visitMethodInsn(int opcode, String owner, String mname,
                                                            String mdesc, boolean itf) {
                                    boolean isGetClass = owner.equals(GETCLASS)
                                            && mname.equals("getClass")
                                            && mdesc.equals("()Ljava/lang/Class;");
                                    boolean isEquals = mname.equals("equals")
                                            && mdesc.equals("(Ljava/lang/Object;)Z");

                                    // getClass() 在 TeaVM 上没有完整元数据，直接换成 ldc 当前类
                                    if (isGetClass) {
                                        mv.visitInsn(Opcodes.POP);
                                        mv.visitLdcInsn(org.objectweb.asm.Type.getObjectType(self));
                                        patched[0]++;
                                        return;
                                    }
                                    if (lastWasGetClass && isEquals) {
                                        // 栈: [getClass 结果, 参数] → 丢弃两者，推 true
                                        mv.visitInsn(Opcodes.POP);
                                        mv.visitInsn(Opcodes.POP);
                                        mv.visitInsn(Opcodes.ICONST_1);
                                        patched[0]++;
                                        lastWasGetClass = false;
                                        return;
                                    }
                                    lastWasGetClass = isGetClass;
                                    super.visitMethodInsn(opcode, owner, mname, mdesc, itf);
                                }

                                @Override
                                public void visitInsn(int opcode) {
                                    lastWasGetClass = false;
                                    super.visitInsn(opcode);
                                }

                                @Override
                                public void visitVarInsn(int opcode, int var) {
                                    lastWasGetClass = false;
                                    super.visitVarInsn(opcode, var);
                                }

                                @Override
                                public void visitFieldInsn(int opcode, String o, String n, String d) {
                                    lastWasGetClass = false;
                                    super.visitFieldInsn(opcode, o, n, d);
                                }

                                @Override
                                public void visitTypeInsn(int opcode, String type) {
                                    lastWasGetClass = false;
                                    super.visitTypeInsn(opcode, type);
                                }

                                @Override
                                public void visitLdcInsn(Object cst) {
                                    // 不重置：`getClass()` 与 `equals()` 之间夹的正是 ldc（目标 Class）
                                    super.visitLdcInsn(cst);
                                }
                            };
                        }
                    }, 0);
                    data = cw.toByteArray();
                }
                out.putNextEntry(new ZipEntry(e.getName()));
                out.write(data);
                out.closeEntry();
            }
        }
        System.out.println("替换 " + patched[0] + " 处 getClass().equals()");
    }

    private static byte[] readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = is.read(buf)) > 0) bos.write(buf, 0, n);
        return bos.toByteArray();
    }
}
