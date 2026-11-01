/*
 * android.content.Context — 最小实现
 *
 * 真机上 Context 由 Activity/Application 提供；Web 端我们是唯一的宿主，
 * 这里直接持有一份全局单例资源，让 RW 的初始化链能拿到非 null 的依赖。
 */
package android.content;

import java.io.File;

import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.content.res.Resources;

public class Context {

    private static final AssetManager ASSETS = new AssetManager();
    private static final Resources RESOURCES = new Resources();
    private static final File FILES = new File("/rw");

    public Context() {
    }

    public Context getApplicationContext() {
        return this;
    }

    public AssetManager getAssets() {
        return ASSETS;
    }

    public Resources getResources() {
        return RESOURCES;
    }

    public String getPackageName() {
        return "com.corrodinggames.rts";
    }

    public File getFilesDir() {
        return FILES;
    }

    public File getCacheDir() {
        return FILES;
    }

    public File getExternalFilesDir(String type) {
        return FILES;
    }

    public File getExternalCacheDir() {
        return FILES;
    }

    public SharedPreferences getSharedPreferences(String name, int mode) {
        return SharedPreferences.open(name);
    }

    public PackageManager getPackageManager() {
        return new PackageManager();
    }

    public ContentResolver getContentResolver() {
        return null;
    }

    public Object getSystemService(String name) {
        return null;
    }

    public int checkPermission(String permission, int pid, int uid) {
        return 0;   // PERMISSION_GRANTED
    }

    public java.io.FileInputStream openFileInput(String name) throws java.io.FileNotFoundException {
        return new java.io.FileInputStream(new File(FILES, name));
    }

    public java.io.FileOutputStream openFileOutput(String name, int mode)
            throws java.io.FileNotFoundException {
        return new java.io.FileOutputStream(new File(FILES, name));
    }

    public android.content.res.TypedArray obtainStyledAttributes(android.util.AttributeSet set, int[] attrs) {
        return null;
    }
}
