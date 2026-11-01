package rwutil;

/**
 * java.io.PrintWriter 的子类，补上 TeaVM classlib 缺的 (File) 构造。
 *
 * 用法：只把 `new PrintWriter(File)` 的 **new 指令**重定向到本类，
 * 方法描述符里的 java.io.PrintWriter 保持不变 —— 因为本类是它的子类，
 * 后续 invokevirtual 和作为参数传递都仍然成立。
 */
public class RLPrintWriter extends java.io.PrintWriter {

    public RLPrintWriter(java.io.File f) throws java.io.FileNotFoundException {
        super(new java.io.FileOutputStream(f));
    }

    public RLPrintWriter(java.io.File f, String csn) throws java.io.FileNotFoundException {
        super(new java.io.FileOutputStream(f));
    }
}
