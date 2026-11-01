/*
 * TrimHttp — 把方法体里引用 Apache HttpClient 的方法整个裁掉。
 *
 * 背景：联机大厅用 org.apache.http 做 HTTP 请求，而 TeaVM 没有这套库。
 * 补桩补不动 —— 每补一个类就暴露整条类图（HttpPost → HttpParams → LogFactory …）。
 * 首版本来就要裁掉联机功能，所以直接把这些方法变成 `return <默认值>`，
 * http 依赖随之从可达图里消失。
 *
 * 用法：java rwtool.TrimHttp <in.jar> <out.jar>
 */
package rwtool;

import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.AbstractInsnNode;
import org.objectweb.asm.tree.ClassNode;
import org.objectweb.asm.tree.LdcInsnNode;
import org.objectweb.asm.tree.MethodInsnNode;
import org.objectweb.asm.tree.MethodNode;
import org.objectweb.asm.tree.FieldInsnNode;
import org.objectweb.asm.tree.TypeInsnNode;
import org.objectweb.asm.tree.InsnList;

public final class TrimHttp {

    /** 命中这些前缀的方法会被裁剪 */
    private static final String[] HTTP_PREFIXES = {
        "org/apache/http/",
        "org/apache/commons/logging/",
    };

    public static void main(String[] args) throws IOException {
        if (args.length < 2) {
            System.err.println("用法: TrimHttp <in.jar> <out.jar>");
            System.exit(2);
        }
        int trimmed = 0, classesTouched = 0;

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

                    int before = trimmed;
                    for (MethodNode mn : cn.methods) {
                        if (mn.instructions == null || mn.instructions.size() == 0) continue;
                        if (!usesHttp(mn)) continue;
                        strip(mn);
                        trimmed++;
                    }
                    if (trimmed > before) classesTouched++;

                    ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
                    cn.accept(cw);
                    data = cw.toByteArray();
                }

                out.putNextEntry(new ZipEntry(e.getName()));
                out.write(data);
                out.closeEntry();
            }
        }
        System.out.println("裁剪 " + trimmed + " 个方法（涉及 " + classesTouched + " 个类）");
    }

    private static boolean usesHttp(MethodNode mn) {
        for (AbstractInsnNode ins : instructionList(mn)) {
            String owner = null;
            if (ins instanceof MethodInsnNode) owner = ((MethodInsnNode) ins).owner;
            else if (ins instanceof FieldInsnNode) owner = ((FieldInsnNode) ins).owner;
            else if (ins instanceof TypeInsnNode) owner = ((TypeInsnNode) ins).desc;
            else if (ins instanceof LdcInsnNode && ((LdcInsnNode) ins).cst instanceof org.objectweb.asm.Type)
                owner = ((org.objectweb.asm.Type) ((LdcInsnNode) ins).cst).getInternalName();
            if (owner == null) continue;
            for (String p : HTTP_PREFIXES) if (owner.startsWith(p)) return true;
        }
        return false;
    }

    private static Iterable<AbstractInsnNode> instructionList(MethodNode mn) {
        List<AbstractInsnNode> list = new ArrayList<AbstractInsnNode>(mn.instructions.size());
        for (AbstractInsnNode ins = mn.instructions.getFirst(); ins != null; ins = ins.getNext()) list.add(ins);
        return list;
    }

    /** 把方法体替换成 `return <默认值>` */
    private static void strip(MethodNode mn) {
        mn.tryCatchBlocks.clear();
        if (mn.localVariables != null) mn.localVariables.clear();
        InsnList ins = new InsnList();
        String ret = descriptorReturn(mn.desc);
        char c = ret.charAt(0);
        switch (c) {
            case 'V': ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.RETURN)); break;
            case 'Z': case 'B': case 'C': case 'S': case 'I':
                ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.ICONST_0));
                ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.IRETURN)); break;
            case 'J': ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.LCONST_0));
                ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.LRETURN)); break;
            case 'F': ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.FCONST_0));
                ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.FRETURN)); break;
            case 'D': ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.DCONST_0));
                ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.DRETURN)); break;
            default: ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.ACONST_NULL));
                ins.add(new org.objectweb.asm.tree.InsnNode(Opcodes.ARETURN)); break;
        }
        mn.instructions = ins;
    }

    private static String descriptorReturn(String desc) {
        return desc.substring(desc.lastIndexOf(')') + 1);
    }

    private static byte[] readAll(InputStream is) throws IOException {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        byte[] buf = new byte[8192];
        int n;
        while ((n = is.read(buf)) > 0) bos.write(buf, 0, n);
        return bos.toByteArray();
    }
}
