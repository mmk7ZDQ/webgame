/*
 * PatchAthrow — 把指定方法里的 athrow 换成 return（仅限 void 方法）。
 *
 * 用途：某些初始化方法在资源缺失时会抛异常，而调用方（如 game.i.a(Context)）
 * 把它包装成 RuntimeException 重新抛出，导致整台引擎初始化中断。
 * 首版用不到那些子系统（mod 自定义单位等），让它们失败后直接返回即可。
 *
 * 用法：java rwtool.PatchAthrow <in.jar> <out.jar> <class#method> [...]
 */
package rwtool;

import java.io.*;
import java.util.*;
import java.util.zip.*;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;

public final class PatchAthrow {

    public static void main(String[] args) throws IOException {
        if (args.length < 3) {
            System.err.println("用法: PatchAthrow <in.jar> <out.jar> <class#method> [...]");
            System.exit(2);
        }
        Set<String> targets = new HashSet<String>(Arrays.asList(args).subList(2, args.length));
        int n = 0;

        try (ZipFile in = new ZipFile(args[0]);
             ZipOutputStream out = new ZipOutputStream(new FileOutputStream(args[1]))) {
            Enumeration<? extends ZipEntry> en = in.entries();
            while (en.hasMoreElements()) {
                ZipEntry e = en.nextElement();
                byte[] data = readAll(in.getInputStream(e));
                if (e.getName().endsWith(".class")) {
                    ClassReader cr = new ClassReader(data);
                    ClassNode cn = new ClassNode();
                    cr.accept(cn, 0);
                    boolean touched = false;
                    for (MethodNode mn : cn.methods) {
                        if (!targets.contains(cn.name + "#" + mn.name)) continue;
                        String ret = mn.desc.substring(mn.desc.lastIndexOf(')') + 1);
                        if (!ret.equals("V")) continue;
                        for (AbstractInsnNode ins = mn.instructions.getFirst(); ins != null; ) {
                            AbstractInsnNode next = ins.getNext();
                            if (ins.getOpcode() == Opcodes.ATHROW) {
                                mn.instructions.set(ins, new InsnNode(Opcodes.RETURN));
                                n++;
                            }
                            ins = next;
                        }
                        touched = true;
                    }
                    if (touched) {
                        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                        cn.accept(cw);
                        data = cw.toByteArray();
                    }
                }
                out.putNextEntry(new ZipEntry(e.getName()));
                out.write(data);
                out.closeEntry();
            }
        }
        System.out.println("替换 " + n + " 处 athrow → return");
    }

    private static byte[] readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int len;
        while ((len = is.read(buf)) > 0) bos.write(buf, 0, len);
        return bos.toByteArray();
    }
}
