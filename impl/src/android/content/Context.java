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
        return new ContentResolver();
    }

    /**
     * 真机上按名字返回不同的系统服务。Web 端没有这些东西，
     * 但引擎初始化会调 getSystemService(...).xxx()，返回 null 会直接崩，
     * 所以给一个能接住任意调用的占位对象。
     */
    public Object getSystemService(String name) {
        if (name == null) return null;
        if (name.equals("window")) return new WindowManager();
        if (name.equals("layout_inflater")) return new LayoutInflater();
        if (name.equals("audio")) return new ServicePlaceholder();
        if (name.equals("vibrator")) return new Vibrator();
        if (name.equals("connectivity")) return new Connectivity();
        return new ServicePlaceholder();
    }

    /** 任意系统服务的兜底占位 */
    public static class ServicePlaceholder {
        public Object getDefaultDisplay() { return new Display(); }
        public int getRotation() { return 0; }
        public boolean isScreenOn() { return true; }
    }

    public static class WindowManager {
        public Object getDefaultDisplay() { return new Display(); }
    }

    public static class LayoutInflater { }

    public static class Vibrator {
        public void vibrate(long ms) { }
        public void cancel() { }
    }

    public static class Connectivity {
        public Object getActiveNetworkInfo() { return null; }
    }

    /** android.view.Display 的替身 */
    public static class Display {
        public int getWidth() { return 1280; }
        public int getHeight() { return 720; }
        public int getRotation() { return 0; }
        public int getDisplayId() { return 0; }
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
