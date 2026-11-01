/*
 * android.content.pm.PackageManager — Web 端最小实现
 */
package android.content.pm;

public class PackageManager {

    private static final PackageInfo INFO = new PackageInfo();

    static {
        INFO.packageName = "com.corrodinggames.rts";
        INFO.versionName = "1.15";
        INFO.versionCode = 176;
    }

    public PackageManager() {
    }

    public PackageInfo getPackageInfo(String pkg, int flags) {
        return INFO;
    }

    public int checkPermission(String perm, String pkg) {
        return 0;
    }

    public String getInstallerPackageName(String pkg) {
        return "com.android.vending";
    }

    public ProviderInfo resolveContentProvider(String name, int flags) {
        return null;
    }

    public static final int PERMISSION_GRANTED = 0;
    public static final int PERMISSION_DENIED = -1;
    public static final int GET_META_DATA = 128;
}
