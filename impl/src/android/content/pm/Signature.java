/*
 * android.content.pm.Signature — Web 端最小实现
 *
 * 真机的签名来自 APK 的证书；浏览器里没有签名校验，给一段固定的假数据即可。
 * 引擎初始化时会读 signatures[0].toByteArray()，不能返回 null。
 */
package android.content.pm;

public class Signature {

    /** TeaVM 生成 toByteArray 时会访问这个字段，必须是 public byte[] */
    public byte[] data;

    public Signature() {
        this.data = new byte[]{ 0x30, (byte) 0x82, 0x00, 0x00 };
    }

    public Signature(byte[] signature) {
        this.data = signature == null ? new byte[0] : signature;
    }

    public byte[] toByteArray() {
        return data;
    }

    public int hashCode() {
        return data == null ? 0 : data.length;
    }

    public boolean equals(Object o) {
        if (!(o instanceof Signature)) return false;
        Signature s = (Signature) o;
        return s.data == data;
    }
}
