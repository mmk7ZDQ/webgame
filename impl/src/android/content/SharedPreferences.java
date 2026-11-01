/*
 * android.content.SharedPreferences — 内存实现
 *
 * 真机上写 /data/data/<pkg>/shared_prefs/*.xml；Web 端先用进程内 Map，
 * 后续可换 IndexedDB / localStorage。
 */
package android.content;

import java.util.HashMap;
import java.util.Map;

public class SharedPreferences {

    public interface Editor {
        Editor putString(String key, String value);
        Editor putInt(String key, int value);
        Editor putLong(String key, long value);
        Editor putFloat(String key, float value);
        Editor putBoolean(String key, boolean value);
        Editor remove(String key);
        Editor clear();
        boolean commit();
        void apply();
    }

    private static final Map<String, SharedPreferences> INSTANCES = new HashMap<String, SharedPreferences>();

    private final Map<String, Object> data = new HashMap<String, Object>();

    public static SharedPreferences open(String name) {
        SharedPreferences p = INSTANCES.get(name);
        if (p == null) {
            p = new SharedPreferences();
            INSTANCES.put(name, p);
        }
        return p;
    }

    public String getString(String key, String def) {
        Object v = data.get(key);
        return v instanceof String ? (String) v : def;
    }

    public int getInt(String key, int def) {
        Object v = data.get(key);
        return v instanceof Integer ? ((Integer) v).intValue() : def;
    }

    public long getLong(String key, long def) {
        Object v = data.get(key);
        return v instanceof Long ? ((Long) v).longValue() : def;
    }

    public float getFloat(String key, float def) {
        Object v = data.get(key);
        return v instanceof Float ? ((Float) v).floatValue() : def;
    }

    public boolean getBoolean(String key, boolean def) {
        Object v = data.get(key);
        return v instanceof Boolean ? ((Boolean) v).booleanValue() : def;
    }

    public boolean contains(String key) {
        return data.containsKey(key);
    }

    public Map<String, ?> getAll() {
        return data;
    }

    public Editor edit() {
        return new Editor() {
            private final Map<String, Object> pending = new HashMap<String, Object>();
            private boolean cleared;

            public Editor putString(String k, String v) { pending.put(k, v); return this; }
            public Editor putInt(String k, int v) { pending.put(k, Integer.valueOf(v)); return this; }
            public Editor putLong(String k, long v) { pending.put(k, Long.valueOf(v)); return this; }
            public Editor putFloat(String k, float v) { pending.put(k, Float.valueOf(v)); return this; }
            public Editor putBoolean(String k, boolean v) { pending.put(k, Boolean.valueOf(v)); return this; }
            public Editor remove(String k) { pending.put(k, null); return this; }
            public Editor clear() { cleared = true; return this; }

            public boolean commit() {
                if (cleared) data.clear();
                for (Map.Entry<String, Object> e : pending.entrySet()) {
                    if (e.getValue() == null) data.remove(e.getKey());
                    else data.put(e.getKey(), e.getValue());
                }
                pending.clear();
                cleared = false;
                return true;
            }

            public void apply() {
                commit();
            }
        };
    }

    public void registerOnSharedPreferenceChangeListener(Object listener) { }
    public void unregisterOnSharedPreferenceChangeListener(Object listener) { }
}
