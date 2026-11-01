/*
 * GenMissing — 从 TeaVM 的错误日志里自动生成缺失的类/方法/字段。
 *
 * 为什么不用「类重定向」：
 *   ASM 的 ClassRemapper 会把方法描述符里的类型一起改名，导致调用方签名对不上
 *   （例如 Throwable.printStackTrace(PrintWriter) 变成 printStackTrace(rwutil$PrintWriter)）。
 *   正确做法是保持原类名，把这些类真的生成出来。
 *
 * 用法：java rwtool.GenMissing <teavm.log> <outJar>
 */
package rwtool;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.MethodVisitor;
import org.objectweb.asm.Opcodes;

public final class GenMissing {

    private static final Pattern P_CLASS = Pattern.compile("Class ([\\w./$]+) was not found");
    private static final Pattern P_METHOD = Pattern.compile("Method ([\\w./$]+)\\.([\\w$<>]+)(\\([^)]*\\))([\\w./$\\[;]+) was not found");
    private static final Pattern P_FIELD = Pattern.compile("Field ([\\w./$]+)\\.([\\w$]+) was not found");

    /** 原库中是接口、必须生成成接口的类（否则 invokeinterface 对不上） */
    private static final Set<String> INTERFACES = new LinkedHashSet<String>(java.util.Arrays.asList(
        "org/apache/http/client/methods/HttpUriRequest",
        "org/apache/http/client/HttpClient",
        "org/apache/http/client/ResponseHandler",
        "org/apache/http/HttpResponse",
        "org/apache/http/HttpEntity",
        "org/apache/http/HttpRequest",
        "org/apache/http/HttpMessage",
        "org/apache/http/StatusLine",
        "org/apache/http/Header",
        "org/w3c/dom/Document",
        "org/w3c/dom/Element",
        "org/w3c/dom/Node",
        "org/w3c/dom/NodeList",
        "org/xml/sax/EntityResolver",
        "org/xml/sax/ErrorHandler"
    ));

    static final class Cls {
        final Set<String> methods = new LinkedHashSet<String>();
        final Set<String> fields = new LinkedHashSet<String>();
    }

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("用法: GenMissing <teavm.log> <out.jar>");
            System.exit(2);
        }
        List<String> lines = java.nio.file.Files.readAllLines(java.nio.file.Paths.get(args[0]));
        Map<String, Cls> classes = new LinkedHashMap<String, Cls>();

        for (String line : lines) {
            Matcher mc = P_CLASS.matcher(line);
            if (mc.find()) { get(classes, mc.group(1).replace('.', '/')); continue; }
            Matcher mm = P_METHOD.matcher(line);
            if (mm.find()) {
                Cls c = get(classes, mm.group(1).replace('.', '/'));
                c.methods.add(mm.group(2) + mm.group(3) + mm.group(4));
                continue;
            }
            Matcher mf = P_FIELD.matcher(line);
            if (mf.find()) {
                Cls c = get(classes, mf.group(1).replace('.', '/'));
                c.fields.add(mf.group(2));
            }
        }

        int nCls = 0, nMeth = 0, nField = 0;
        try (ZipOutputStream out = new ZipOutputStream(new FileOutputStream(args[1]))) {
            for (Map.Entry<String, Cls> e : classes.entrySet()) {
                String name = e.getKey();
                // 只生成第三方库的缺失类：
                //  - java.*/javax.* 不能自己定义（javac/TeaVM 会拒绝）
                //  - com.* 是游戏自己的类，覆盖会破坏逻辑
                //  - android.*/rwutil.* 是我们的层，要手工改
                if (name.startsWith("java/")
                        || name.startsWith("com/") || name.startsWith("android/")
                        || name.startsWith("rwutil/")) {
                    continue;
                }
                byte[] b = build(name, e.getValue());
                out.putNextEntry(new ZipEntry(name + ".class"));
                out.write(b);
                out.closeEntry();
                nCls++;
                nMeth += e.getValue().methods.size();
                nField += e.getValue().fields.size();
            }
        }
        System.out.println("生成 " + nCls + " 个类 / " + nMeth + " 个方法 / " + nField + " 个字段 → " + args[1]);
    }

    private static Cls get(Map<String, Cls> m, String n) {
        Cls c = m.get(n);
        if (c == null) { c = new Cls(); m.put(n, c); }
        return c;
    }

    private static byte[] build(String name, Cls info) {
        boolean isIface = INTERFACES.contains(name);
        ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_MAXS);
        cw.visit(Opcodes.V1_8,
                Opcodes.ACC_PUBLIC | (isIface ? Opcodes.ACC_INTERFACE | Opcodes.ACC_ABSTRACT : Opcodes.ACC_SUPER),
                name, null, "java/lang/Object", null);

        if (!isIface) {
            MethodVisitor ctor = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", "()V", null, null);
            ctor.visitCode();
            ctor.visitVarInsn(Opcodes.ALOAD, 0);
            ctor.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
            ctor.visitInsn(Opcodes.RETURN);
            ctor.visitMaxs(0, 0);
            ctor.visitEnd();
        }

        for (String sig : info.methods) {
            int lp = sig.indexOf('(');
            String mname = sig.substring(0, lp);
            String desc = sig.substring(lp);
            if (mname.equals("<clinit>")) continue;
            int rp = desc.lastIndexOf(')');
            String ret = desc.substring(rp + 1);

            if (isIface) {
                cw.visitMethod(Opcodes.ACC_PUBLIC | Opcodes.ACC_ABSTRACT, mname, desc, null, null).visitEnd();
            } else if (mname.equals("<init>")) {
                // 带参构造：调父类无参构造即可
                MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, "<init>", desc, null, null);
                mv.visitCode();
                mv.visitVarInsn(Opcodes.ALOAD, 0);
                mv.visitMethodInsn(Opcodes.INVOKESPECIAL, "java/lang/Object", "<init>", "()V", false);
                mv.visitInsn(Opcodes.RETURN);
                mv.visitMaxs(0, 0);
                mv.visitEnd();
            } else {
                MethodVisitor mv = cw.visitMethod(Opcodes.ACC_PUBLIC, mname, desc, null, null);
                mv.visitCode();
                emitDefault(mv, ret);
                mv.visitMaxs(0, 0);
                mv.visitEnd();
            }
        }

        for (String f : info.fields) {
            int acc = Opcodes.ACC_PUBLIC | Opcodes.ACC_STATIC | (isIface ? Opcodes.ACC_FINAL : 0);
            cw.visitField(acc, f, "I", null, null).visitEnd();
        }

        cw.visitEnd();
        return cw.toByteArray();
    }

    private static void emitDefault(MethodVisitor mv, String ret) {
        char c = ret.charAt(0);
        switch (c) {
            case 'V': mv.visitInsn(Opcodes.RETURN); return;
            case 'Z': case 'B': case 'C': case 'S': case 'I':
                mv.visitInsn(Opcodes.ICONST_0); mv.visitInsn(Opcodes.IRETURN); return;
            case 'J': mv.visitInsn(Opcodes.LCONST_0); mv.visitInsn(Opcodes.LRETURN); return;
            case 'F': mv.visitInsn(Opcodes.FCONST_0); mv.visitInsn(Opcodes.FRETURN); return;
            case 'D': mv.visitInsn(Opcodes.DCONST_0); mv.visitInsn(Opcodes.DRETURN); return;
            default: mv.visitInsn(Opcodes.ACONST_NULL); mv.visitInsn(Opcodes.ARETURN); return;
        }
    }
}
