/*
 * TrimMethod — 把指定的方法体替换成 `return <默认值>`。
 *
 * 用于「这个功能在 Web 端没有对应实现、但抛异常会中断引擎初始化」的场景：
 * 例如 LogicBooleanLoader 遇到未知参数就抛 RuntimeException，
 * 而参数表来自资源文件，Web 端还没有。
 *
 * 用法：java rwtool.TrimMethod <in.jar> <out.jar> <class#method> [class#method ...]
 *   类名用内部形式（com/foo/Bar），方法名是 Java 名。
 */
package rwtool;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.ClassNode;
import org.objectweb.asm.tree.InsnNode;
import org.objectweb.asm.tree.InsnList;
import org.objectweb.asm.tree.MethodNode;

public final class TrimMethod {

    public static void main(String[] args) throws IOException {
        if (args.length < 3) {
            System.err.println("用法: TrimMethod <in.jar> <out.jar> <class#method> [...]");
            System.exit(2);
        }
        Set<String> targets = new HashSet<String>(Arrays.asList(args).subList(2, args.length));
        int trimmed = 0;

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
                    for (MethodNode mn : cn.methods) {
                        if (!targets.contains(cn.name + "#" + mn.name)) continue;
                        if (mn.name.equals("<init>") || mn.name.equals("<clinit>")) continue;
                        strip(mn);
                        trimmed++;
                    }
                    ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                    cn.accept(cw);
                    data = cw.toByteArray();
                }
                out.putNextEntry(new ZipEntry(e.getName()));
                out.write(data);
                out.closeEntry();
            }
        }
        System.out.println("裁剪 " + trimmed + " 个方法");
    }

    private static void strip(MethodNode mn) {
        mn.tryCatchBlocks.clear();
        if (mn.localVariables != null) mn.localVariables.clear();
        InsnList ins = new InsnList();
        String ret = mn.desc.substring(mn.desc.lastIndexOf(')') + 1);
        switch (ret.charAt(0)) {
            case 'V': ins.add(new InsnNode(Opcodes.RETURN)); break;
            case 'Z': case 'B': case 'C': case 'S': case 'I':
                ins.add(new InsnNode(Opcodes.ICONST_0));
                ins.add(new InsnNode(Opcodes.IRETURN)); break;
            case 'J': ins.add(new InsnNode(Opcodes.LCONST_0));
                ins.add(new InsnNode(Opcodes.LRETURN)); break;
            case 'F': ins.add(new InsnNode(Opcodes.FCONST_0));
                ins.add(new InsnNode(Opcodes.FRETURN)); break;
            case 'D': ins.add(new InsnNode(Opcodes.DCONST_0));
                ins.add(new InsnNode(Opcodes.DRETURN)); break;
            default: ins.add(new InsnNode(Opcodes.ACONST_NULL));
                ins.add(new InsnNode(Opcodes.ARETURN)); break;
        }
        mn.instructions = ins;
    }

    private static byte[] readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = is.read(buf)) > 0) bos.write(buf, 0, n);
        return bos.toByteArray();
    }
}
