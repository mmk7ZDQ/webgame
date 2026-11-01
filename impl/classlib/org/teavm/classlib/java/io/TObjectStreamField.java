package org.teavm.classlib.java.io;

/**
 * 补 TeaVM classlib 缺失的 java.io.ObjectStreamField。
 *
 * TeaVM 的类名映射规则：org.teavm.classlib.java.io.TXxx  ↔  java.io.Xxx。
 * 这类补丁必须放在 classlib 的包路径下 —— 直接往 classpath 放 java.* 是无效的
 * （实测：TeaVM 只从 classlib source 加载 java.*，外部 jar 里的同名类被忽略）。
 */
public class TObjectStreamField {

    private final String name;
    private final Class<?> type;

    public TObjectStreamField(String name, Class<?> type) {
        this.name = name;
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public Class<?> getType() {
        return type;
    }

    public boolean isPrimitive() {
        return type != null && type.isPrimitive();
    }

    public int getOffset() {
        return 0;
    }

    public String toString() {
        return (type == null ? "?" : type.getName()) + " " + name;
    }
}
