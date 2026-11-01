/*
 * RemapClasses — 把我们自己写的类重命名到 JDK 包名下。
 *
 * 为什么需要：
 *   TeaVM 0.14 的 classlib 没实现 java.util.concurrent.* 的一部分类，
 *   而 RW 的字节码依赖它们。javac 不允许我们直接写 java.* 包的源码，
 *   所以先在 rwutil.* 下用普通 Java 写实现，再用本工具做类重命名，
 *   产出可以直接放进 classpath 的 java.util.concurrent.* 类。
 *
 * 用法：java rwtool.RemapClasses <inDir> <outDir> <fromPrefix> <toPrefix>
 *   例：java rwtool.RemapClasses build/rwutil build/remapped rwutil/ java/util/concurrent/ \
 *         rwutil.ConcurrentLinkedQueue=java.util.concurrent.ConcurrentLinkedQueue ...
 */
package rwtool;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.commons.ClassRemapper;
import org.objectweb.asm.commons.SimpleRemapper;

public final class RemapClasses {

    public static void main(String[] args) throws IOException {
        if (args.length < 2) {
            System.err.println("用法: RemapClasses <inDir> <outDir> key=value [key=value ...]");
            System.exit(2);
        }
        File inDir = new File(args[0]);
        File outDir = new File(args[1]);
        Map<String, String> map = new HashMap<String, String>();
        for (int i = 2; i < args.length; i++) {
            int eq = args[i].indexOf('=');
            if (eq < 0) continue;
            map.put(args[i].substring(0, eq).replace('.', '/'), args[i].substring(eq + 1).replace('.', '/'));
        }
        if (map.isEmpty()) {
            System.err.println("没有给出重命名映射");
            System.exit(2);
        }

        int[] n = new int[1];
        Files.walk(inDir.toPath()).filter(p -> p.toString().endsWith(".class")).forEach(p -> {
            try {
                byte[] b = Files.readAllBytes(p);
                ClassReader cr = new ClassReader(b);
                ClassWriter cw = new ClassWriter(0);
                cr.accept(new ClassRemapper(cw, new SimpleRemapper(map)), 0);
                String orig = cr.getClassName();
                String target = map.getOrDefault(orig, orig);
                File out = new File(outDir, target + ".class");
                out.getParentFile().mkdirs();
                Files.write(out.toPath(), cw.toByteArray());
                n[0]++;
            } catch (Exception e) {
                System.err.println("处理失败 " + p + ": " + e);
            }
        });
        System.out.println("重映射 " + n[0] + " 个类 → " + outDir);
        for (Map.Entry<String, String> e : map.entrySet()) {
            System.out.println("  " + e.getKey() + " → " + e.getValue());
        }
    }
}
