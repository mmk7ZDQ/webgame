/*
 * Bootstrap.java — 可达性探针
 *
 * Rusted Warfare 的 Android 版没有 main()，TeaVM 的静态可达性分析从入口方法出发，
 * 不引用就等于没编译。这个类的作用是：把移植时必须改的那些类**强制拉进编译图**，
 * 从而量出真实的编译规模与缺失符号。
 *
 * 它不参与运行时，只是 M0 的测量工具。
 */
package rwweb;

import com.corrodinggames.rts.appFramework.GameViewNonSurface;
import com.corrodinggames.rts.appFramework.GameViewOpenGL;
import com.corrodinggames.rts.appFramework.GLSurfaceViewShared;
import com.corrodinggames.rts.appFramework.InGameActivity;
import com.corrodinggames.rts.appFramework.IntroScreen;
import com.corrodinggames.rts.appFramework.MainMenuActivity;
import com.corrodinggames.rts.appFramework.RWApplication;
import com.corrodinggames.rts.gameFramework.ak;
import com.corrodinggames.rts.gameFramework.b.t;
import com.corrodinggames.rts.gameFramework.bp;
import com.corrodinggames.rts.gameFramework.k;
import com.corrodinggames.rts.gameFramework.m.h;

import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Path;
import android.graphics.RectF;
import org.teavm.jso.dom.html.HTMLCanvasElement;

public class Bootstrap {

    public static void main(String[] args) throws Exception {
        // 冒烟测试放最前：游戏类的静态初始化会触碰空桩，不能让它先崩掉
        smokeTest();

        // 以下仅用于让 TeaVM 展开游戏侧的可达性，失败不影响冒烟测试
        try {
            touch(RWApplication.class);
            touch(IntroScreen.class);
            touch(MainMenuActivity.class);
            touch(InGameActivity.class);
            touch(GameViewOpenGL.class);
            touch(GameViewNonSurface.class);
            touch(GLSurfaceViewShared.class);

            ak loop = new ak();
            loop.run();

            touch(t.class);
            touch(h.class);
            touch(k.class);
            touch(bp.class);
        } catch (Throwable e) {
            System.out.println("[probe] 游戏类展开中止（预期内）: " + e);
        }

        System.out.println("bootstrap done");
    }

    /**
     * 实现层冒烟测试：把 android.graphics.* 的 Web 实现完整跑一遍。
     * TeaVM 的静态可达性分析要求真正调用，只 touch(Class) 不会展开方法体。
     */
    private static void smokeTest() {
        step("1 createBitmap");
        Bitmap bmp = Bitmap.createBitmap(320, 200, Bitmap.Config.ARGB_8888);
        step("2 new Canvas");
        Canvas canvas = new Canvas(bmp);
        step("3 new Paint");
        Paint paint = new Paint();
        step("4 drawColor");

        canvas.drawColor(Color.BLACK);

        step("5 drawRect");
        paint.setColor(Color.RED);
        paint.setStyle(Paint.Style.FILL);
        canvas.drawRect(10, 10, 100, 60, paint);

        step("6 drawCircle");
        paint.setColor(0xFF00FF00);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(2.5f);
        canvas.drawCircle(160, 60, 30, paint);
        canvas.drawLine(10, 80, 300, 80, paint);

        step("7 drawOval");
        RectF oval = new RectF(10, 100, 120, 160);
        canvas.drawOval(oval, paint);

        step("8 drawPath");
        Path path = new Path();
        path.moveTo(150, 120);
        path.lineTo(200, 180);
        path.lineTo(100, 180);
        path.close();
        canvas.drawPath(path, paint);

        step("9 drawText");
        paint.setColor(Color.WHITE);
        paint.setStyle(Paint.Style.FILL);
        paint.setTextSize(16);
        canvas.drawText("Rusted Warfare", 10, 190, paint);

        step("10 getPixel");
        int w = bmp.getWidth();
        int h = bmp.getHeight();
        int px = bmp.getPixel(50, 30);
        System.out.println("canvas smoke: " + w + "x" + h + " px=" + Integer.toHexString(px));

        // ---- RW 自己的 Canvas 适配器（gameFramework/m/h）转调验证 ----
        rwAdapterSmoke();

        // ---- RW 位图包装（gameFramework/m/e）→ Canvas.drawBitmap 链路 ----
        rwImageSmoke();

        // ---- 真实游戏贴图（assets/units/tanks/tank.png）----
        rwRealAssetSmoke();

        // ---- GLES20 → WebGL1 ----
        webglSmoke();

        // ---- RW 自己的 GL 渲染器（gameFramework/b/t）----
        rwRendererSmoke();

        // ---- 真实地图渲染（RW 的 m/e + m/h 画 tile）----
        try {
            rwRealMap();
        } catch (Throwable e) {
            step("37 FAILED rwRealMap: " + e);
        }

        // 故意不 catch：让异常冒到 JS 层，用 window.onerror 拿 JS 堆栈（含行号）
        rwGameEngine();

        // ---- 相机 + rAF 主循环 ----
        try {
            setupCamera();
        } catch (Throwable e) {
            step("41 FAILED camera: " + e);
        }

        // 挂到页面，便于用截图确认真的画出来了
        org.teavm.jso.dom.html.HTMLDocument doc =
                (org.teavm.jso.dom.html.HTMLDocument)
                        org.teavm.jso.browser.Window.current().getDocument();
        if (doc != null && doc.getBody() != null) {
            doc.getBody().appendChild(bmp.getElement());
        }
    }

    @org.teavm.jso.JSBody(params = {"msg"},
            script = "var el=document.getElementById('log'); if(el){el.textContent+=msg+String.fromCharCode(10);}")
    private static native void domLog(String msg);

    private static void step(String name) {
        System.out.println("[step] " + name);
        domLog("[step] " + name);
    }

    /**
     * RW 侧验证：com.corrodinggames.rts.gameFramework.m.h 是游戏自研 2D 框架的
     * Canvas 后端适配器（implements m.l），每个方法都是对 android.graphics.Canvas 的
     * 直接转调。这里走一遍，证明「RW 字节码 → m/h → 我们的 Canvas → Canvas2D」整条链路成立。
     */
    private static void rwAdapterSmoke() {
        step("11 new m.h adapter");
        Bitmap bmp = Bitmap.createBitmap(320, 90, Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bmp);
        com.corrodinggames.rts.gameFramework.m.h adapter =
                new com.corrodinggames.rts.gameFramework.m.h(canvas);

        step("12 adapter.drawColor");
        adapter.a(0xFF102030);                       // Canvas.drawColor

        Paint paint = new Paint();
        paint.setColor(0xFFFFCC00);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(2f);

        step("13 adapter.drawLine");
        adapter.a(8, 14, 312, 14, paint);            // Canvas.drawLine

        step("14 adapter.drawOval");
        adapter.a(new RectF(8, 24, 120, 72), paint); // Canvas.drawOval

        paint.setColor(0xFFFFFFFF);
        paint.setStyle(Paint.Style.FILL);
        paint.setTextSize(14);

        step("15 adapter.drawText");
        adapter.a("via m/h adapter", 130, 56, paint);  // Canvas.drawText

        step("16 adapter done");

        org.teavm.jso.dom.html.HTMLDocument doc =
                (org.teavm.jso.dom.html.HTMLDocument)
                        org.teavm.jso.browser.Window.current().getDocument();
        if (doc != null && doc.getBody() != null) {
            doc.getBody().appendChild(bmp.getElement());
        }
    }

    /**
     * RW 侧图像链路验证：
     *   Bitmap（我们） → m.e 包装 → m/h.a(m.e,x,y,paint) → m/fk.a(m.e) → Canvas.drawBitmap
     * 这是游戏画单位/建筑/地形的必经路径。
     */
    private static void rwImageSmoke() {
        step("17 build sprite bitmap");
        Bitmap sprite = Bitmap.createBitmap(64, 64, Bitmap.Config.ARGB_8888);
        Canvas sc = new Canvas(sprite);
        sc.drawColor(0x00000000);                       // 透明底

        Paint p = new Paint();
        p.setColor(0xFF4A7C3F);
        p.setStyle(Paint.Style.FILL);
        sc.drawCircle(32, 34, 26, p);                   // 车体
        p.setColor(0xFF2B4A26);
        p.setStyle(Paint.Style.STROKE);
        p.setStrokeWidth(3f);
        sc.drawRect(16, 26, 48, 42, p);                 // 装甲框
        p.setColor(0xFFD8A13C);
        p.setStyle(Paint.Style.FILL);
        sc.drawRect(28, 8, 36, 30, p);                  // 炮管

        step("18 wrap into m.e");
        com.corrodinggames.rts.gameFramework.m.e img =
                new com.corrodinggames.rts.gameFramework.m.e();
        img.a(sprite);                                  // m/e.a(Bitmap)

        step("19 draw via m/h");
        Bitmap screen = Bitmap.createBitmap(320, 120, Bitmap.Config.ARGB_8888);
        Canvas screenCanvas = new Canvas(screen);
        com.corrodinggames.rts.gameFramework.m.h adapter =
                new com.corrodinggames.rts.gameFramework.m.h(screenCanvas);
        adapter.a(0xFF0E1620);                          // 背景

        for (int i = 0; i < 5; i++) {
            adapter.a(img, 12 + i * 60, 26, p);         // Canvas.drawBitmap
        }

        Paint label = new Paint();
        label.setColor(0xFF8B949E);
        label.setTextSize(11);
        adapter.a("m/e -> drawBitmap x5", 12, 108, label);

        step("20 image smoke done");

        org.teavm.jso.dom.html.HTMLDocument doc =
                (org.teavm.jso.dom.html.HTMLDocument)
                        org.teavm.jso.browser.Window.current().getDocument();
        if (doc != null && doc.getBody() != null) {
            doc.getBody().appendChild(screen.getElement());
        }
    }

    /** 从 DOM 取已加载的 <img> 作为图像源 */
    @org.teavm.jso.JSBody(params = {"id"},
            script = "return document.getElementById(id);")
    private static native org.teavm.jso.canvas.CanvasImageSource getImageSource(String id);

    /**
     * 真实资源验证：用 APK 里 game assets/units/tanks/tank.png（48×30 RGBA）
     * 走完整链路加载并绘制，证明游戏美术资源可以直接用。
     */
    private static void rwRealAssetSmoke() {
        step("21 load real tank.png");
        org.teavm.jso.dom.html.HTMLDocument d0 =
                (org.teavm.jso.dom.html.HTMLDocument)
                        org.teavm.jso.browser.Window.current().getDocument();
        org.teavm.jso.dom.html.HTMLElement el = d0.getElementById("tankCanvas");
        if (el == null) {
            step("21 SKIP: tankCanvas 未就绪");
            return;
        }
        Bitmap tank = Bitmap.fromElement((org.teavm.jso.dom.html.HTMLCanvasElement) el);
        if (tank == null) { step("21 SKIP: null canvas"); return; }
        step("22 real bitmap " + tank.getWidth() + "x" + tank.getHeight());

        com.corrodinggames.rts.gameFramework.m.e unit =
                new com.corrodinggames.rts.gameFramework.m.e();
        unit.a(tank);

        Bitmap screen = Bitmap.createBitmap(320, 110, Bitmap.Config.ARGB_8888);
        Canvas c = new Canvas(screen);
        com.corrodinggames.rts.gameFramework.m.h adapter =
                new com.corrodinggames.rts.gameFramework.m.h(c);
        adapter.a(0xFF12222E);

        // 画一排真实坦克贴图
        for (int i = 0; i < 5; i++) {
            adapter.a(unit, 14 + i * 60, 24, new Paint());
        }

        Paint label = new Paint();
        label.setColor(0xFF7FB2C8);
        label.setTextSize(11);
        adapter.a("assets/units/tanks/tank.png 48x30", 14, 96, label);

        step("23 real asset drawn");

        org.teavm.jso.dom.html.HTMLDocument doc =
                (org.teavm.jso.dom.html.HTMLDocument)
                        org.teavm.jso.browser.Window.current().getDocument();
        if (doc != null && doc.getBody() != null) {
            doc.getBody().appendChild(screen.getElement());
        }
    }

    /** preserveDrawingBuffer 必须开，否则合成后缓冲被清空，截图/读取都拿不到内容 */
    @org.teavm.jso.JSBody(script = "return {preserveDrawingBuffer: true, antialias: false, depth: true};")
    private static native org.teavm.jso.JSObject glAttrs();

    private static final String VS_SRC =
            "attribute vec2 aPos;\n" +
            "attribute vec3 aColor;\n" +
            "varying vec3 vColor;\n" +
            "void main() {\n" +
            "  vColor = aColor;\n" +
            "  gl_Position = vec4(aPos, 0.0, 1.0);\n" +
            "}\n";

    private static final String FS_SRC =
            "precision mediump float;\n" +
            "varying vec3 vColor;\n" +
            "void main() {\n" +
            "  gl_FragColor = vec4(vColor, 1.0);\n" +
            "}\n";

    /**
     * GLES20 → WebGL1 验证：用 android.opengl.GLES20 的接口编译真实 GLSL ES 着色器
     * 并画一个渐变三角形。这是阶段 2（游戏战场渲染）的最小可用证明。
     */
    private static void webglSmoke() {
        step("24 create webgl canvas");
        org.teavm.jso.dom.html.HTMLDocument doc =
                (org.teavm.jso.dom.html.HTMLDocument)
                        org.teavm.jso.browser.Window.current().getDocument();
        org.teavm.jso.dom.html.HTMLCanvasElement cv =
                (org.teavm.jso.dom.html.HTMLCanvasElement) doc.createElement("canvas");
        cv.setWidth(320);
        cv.setHeight(160);

        org.teavm.jso.webgl.WebGLRenderingContext gl =
                (org.teavm.jso.webgl.WebGLRenderingContext) cv.getContext("webgl", glAttrs());
        if (gl == null) { step("24 SKIP: webgl 不可用"); return; }
        android.opengl.GLES20.setContext(gl);

        step("25 compile shaders");
        int vs = android.opengl.GLES20.glCreateShader(0x8B31);   // GL_VERTEX_SHADER
        android.opengl.GLES20.glShaderSource(vs, VS_SRC);
        android.opengl.GLES20.glCompileShader(vs);
        int[] ok = new int[1];
        android.opengl.GLES20.glGetShaderiv(vs, 0x8B81, ok, 0); // GL_COMPILE_STATUS
        if (ok[0] == 0) {
            step("25 VS 编译失败: " + android.opengl.GLES20.glGetShaderInfoLog(vs));
            return;
        }

        int fs = android.opengl.GLES20.glCreateShader(0x8B30);   // GL_FRAGMENT_SHADER
        android.opengl.GLES20.glShaderSource(fs, FS_SRC);
        android.opengl.GLES20.glCompileShader(fs);
        android.opengl.GLES20.glGetShaderiv(fs, 0x8B81, ok, 0);
        if (ok[0] == 0) {
            step("25 FS 编译失败: " + android.opengl.GLES20.glGetShaderInfoLog(fs));
            return;
        }

        step("26 link program");
        int prog = android.opengl.GLES20.glCreateProgram();
        android.opengl.GLES20.glAttachShader(prog, vs);
        android.opengl.GLES20.glAttachShader(prog, fs);
        android.opengl.GLES20.glLinkProgram(prog);
        android.opengl.GLES20.glGetProgramiv(prog, 0x8B82, ok, 0); // GL_LINK_STATUS
        if (ok[0] == 0) {
            step("26 link 失败: " + android.opengl.GLES20.glGetProgramInfoLog(prog));
            return;
        }
        android.opengl.GLES20.glUseProgram(prog);

        step("27 attribs + buffer（走 GLES20 的 FloatBuffer 上传）");
        int aPos = android.opengl.GLES20.glGetAttribLocation(prog, "aPos");
        int aColor = android.opengl.GLES20.glGetAttribLocation(prog, "aColor");
        step("27 aPos=" + aPos + " aColor=" + aColor);

        // 3 顶点：x,y,r,g,b
        float[] verts = {
                 0.0f,  0.8f, 1.0f, 0.2f, 0.2f,
                -0.8f, -0.7f, 0.2f, 1.0f, 0.3f,
                 0.8f, -0.7f, 0.3f, 0.4f, 1.0f,
        };
        java.nio.FloatBuffer fb = java.nio.FloatBuffer.allocate(verts.length);
        fb.put(verts);
        fb.position(0);

        int[] bufs = new int[1];
        android.opengl.GLES20.glGenBuffers(1, bufs, 0);
        android.opengl.GLES20.glBindBuffer(0x8892, bufs[0]);                 // GL_ARRAY_BUFFER
        android.opengl.GLES20.glBufferData(0x8892, verts.length * 4, fb, 0x88E4); // GL_STATIC_DRAW

        android.opengl.GLES20.glEnableVertexAttribArray(aPos);
        android.opengl.GLES20.glVertexAttribPointer(aPos, 2, 0x1406, false, 20, 0);   // GL_FLOAT
        android.opengl.GLES20.glEnableVertexAttribArray(aColor);
        android.opengl.GLES20.glVertexAttribPointer(aColor, 3, 0x1406, false, 20, 8);

        step("28 draw");
        android.opengl.GLES20.glClearColor(0.05f, 0.09f, 0.13f, 1f);
        android.opengl.GLES20.glClear(0x4000);           // GL_COLOR_BUFFER_BIT
        android.opengl.GLES20.glViewport(0, 0, 320, 160);
        android.opengl.GLES20.glDrawArrays(0x0004, 0, 3); // GL_TRIANGLES

        android.opengl.GLES20.glFinish();
        int err = android.opengl.GLES20.glGetError();

        // 读回中心像素，确认真的画上了（不依赖截图/合成的时序）
        org.teavm.jso.typedarrays.Uint8Array px = org.teavm.jso.typedarrays.Uint8Array.create(4);
        gl.readPixels(160, 80, 1, 1, 0x1908, 0x1401, px);   // RGBA, UNSIGNED_BYTE
        int r = px.get(0) & 0xFF, g = px.get(1) & 0xFF, b = px.get(2) & 0xFF;
        step("29 webgl done, err=" + err + " centerPixel=(" + r + "," + g + "," + b + ")");

        // headless 截图不合成 WebGL 层，转成 <img> 保证可见
        if (doc.getBody() != null) {
            org.teavm.jso.dom.html.HTMLElement img =
                    (org.teavm.jso.dom.html.HTMLElement) doc.createElement("img");
            img.setAttribute("src", cv.toDataURL("image/png"));
            doc.getBody().appendChild(img);
        }
    }

    /**
     * RW 的着色器提供者接口（b/m）实现。
     *
     * 名字必须与 b/t 构造函数里初始化的 attribute/uniform 描述符一致：
     *   g[0] = b/u("aPosition")
     *   g[1] = b/z("uMatrix"), g[2] = b/z("uColor"), g[5] = b/z("uProjection")
     * 名字对不上 -> glGetAttribLocation 返回 -1 -> enableVertexAttribArray(-1)
     * -> GL_INVALID_VALUE(1281)，这就是之前画不出来的原因。
     */
    public static class TestShader implements com.corrodinggames.rts.gameFramework.b.m {
        public String a() {
            return "attribute vec2 aPosition;\n" +
                   "uniform mat4 uMatrix;\n" +
                   "uniform mat4 uProjection;\n" +
                   "void main() {\n" +
                   "  gl_Position = uProjection * uMatrix * vec4(aPosition, 0.0, 1.0);\n" +
                   "}\n";
        }

        public String b() {
            return "#ifdef GL_ES\nprecision mediump float;\n#endif\n" +
                   "uniform vec4 uColor;\n" +
                   "void main() {\n" +
                   "  gl_FragColor = uColor;\n" +
                   "}\n";
        }

        public void a(int location, com.corrodinggames.rts.gameFramework.b.ad program) {
        }
    }

    /**
     * RW 渲染器验证：实例化 com.corrodinggames.rts.gameFramework.b.t
     * （全游戏唯一直接调 GLES20 的类），并调用它的每帧入口 b()。
     */
    private static void rwRendererSmoke() {
        // GL 调用级追踪：排查 1281 时打开
        if (System.getProperty("rw.gl.trace") != null) {
            android.opengl.GLES20.sink = new android.opengl.GLES20.LogSink() {
                public void log(String m) { domLog("    · " + m); }
            };
        }
        step("30 new b.h (render manager)");
        com.corrodinggames.rts.gameFramework.b.h mgr;
        try {
            mgr = new com.corrodinggames.rts.gameFramework.b.h();
        } catch (Throwable e) {
            step("30 FAILED b.h: " + e);
            return;
        }

        step("31 new b.t (renderer)");
        com.corrodinggames.rts.gameFramework.b.t renderer;
        try {
            renderer = new com.corrodinggames.rts.gameFramework.b.t(mgr);
        } catch (Throwable e) {
            step("31 FAILED b.t: " + e);
            return;
        }

        step("32 renderer.b() -> glClearColor + glClear");
        try {
            renderer.b();
            int err = android.opengl.GLES20.glGetError();
            step("33 renderer clear ok, glError=" + err);
        } catch (Throwable e) {
            step("32 FAILED renderer.b(): " + e);
        }

        step("34 renderer.a(float[],...) -> glDrawArrays");
        try {
            com.corrodinggames.rts.gameFramework.b.ac mat =
                    new com.corrodinggames.rts.gameFramework.b.ac();
            mat.a = 1f;                                     // alpha
            mat.b = 0xFFFFFFFF;                             // 颜色
            float[] tri = {
                -0.6f, -0.6f,
                 0.6f, -0.6f,
                 0.0f,  0.7f,
            };
            renderer.a(tri, 0, tri.length, mat, new TestShader());   // 第 3 参数是 float 个数
            int err = android.opengl.GLES20.glGetError();
            step("35 drawArrays ok, glError=" + err);

            org.teavm.jso.typedarrays.Uint8Array px = org.teavm.jso.typedarrays.Uint8Array.create(4);
            android.opengl.GLES20.getContext().readPixels(160, 80, 1, 1, 0x1908, 0x1401, px);
            step("36 pixel=(" + (px.get(0) & 0xFF) + "," + (px.get(1) & 0xFF) + ","
                    + (px.get(2) & 0xFF) + ")");
        } catch (Throwable e) {
            step("34 FAILED renderer.a(): " + e);
        }
    }

    @org.teavm.jso.JSBody(params = {"i"},
            script = "return (window.__map && window.__map.layers[i]) ? window.__map.layers[i].gids : null;")
    private static native org.teavm.jso.typedarrays.Int32Array mapLayerGids(int i);

    @org.teavm.jso.JSBody(script = "return (window.__map && window.__map.layers) ? window.__map.layers.length : 0;")
    private static native int mapLayerCount();

    @org.teavm.jso.JSBody(script = "return (window.__map && window.__map.tsMeta) || null;")
    private static native org.teavm.jso.typedarrays.Int32Array mapTsMeta();

    @org.teavm.jso.JSBody(script = "return window.__map ? window.__map.w : 0;")
    private static native int mapW();

    @org.teavm.jso.JSBody(script = "return window.__map ? window.__map.h : 0;")
    private static native int mapH();

    @org.teavm.jso.JSBody(script = "return window.__map ? window.__map.tsCount : 0;")
    private static native int mapTsCount();

    @org.teavm.jso.JSBody(params = {"i"},
            script = "return (window.__map && window.__map.tiles[i]) || null;")
    private static native org.teavm.jso.dom.html.HTMLCanvasElement mapTile(int i);

    /**
     * 真实地图渲染：用 RW 自己的 m/e（图像包装）+ m/h（Canvas 后端）逐 tile 绘制。
     * 数据来自 assets/maps 的 TMX（构建期转成 JSON），贴图是原始 tilesets。
     */
    private static void rwRealMap() {
        step("37 real map: " + mapW() + "x" + mapH());
        org.teavm.jso.typedarrays.Int32Array meta = mapTsMeta();
        if (meta == null || mapLayerCount() == 0) { step("37 SKIP: 地图未加载"); return; }

        int w = mapW(), h = mapH(), tsCount = mapTsCount();
        int TW = 20, TH = 20;

        // 贴图包装成 RW 的 m/e
        com.corrodinggames.rts.gameFramework.m.e[] imgs =
                new com.corrodinggames.rts.gameFramework.m.e[16];
        int loaded = 0;
        for (int i = 0; i < 16; i++) {
            org.teavm.jso.dom.html.HTMLCanvasElement el = mapTile(i);
            if (el == null) break;
            Bitmap b = Bitmap.fromElement(el);
            com.corrodinggames.rts.gameFramework.m.e e =
                    new com.corrodinggames.rts.gameFramework.m.e();
            e.a(b);
            imgs[i] = e;
            loaded++;
        }
        step("38 tiles decoded: " + loaded + " images, " + tsCount + " tilesets");

        // 预渲染到离屏画布（一次性，之后每帧只贴一张图）
        Bitmap off = Bitmap.createBitmap(w * TW, h * TH, Bitmap.Config.ARGB_8888);
        Canvas cv = new Canvas(off);
        com.corrodinggames.rts.gameFramework.m.h r =
                new com.corrodinggames.rts.gameFramework.m.h(cv);

        Paint p = new Paint();
        r.a(Color.rgb(12, 26, 34));

        long t0 = System.currentTimeMillis();
        int drawn = 0;
        int layerCount = mapLayerCount();
        for (int L = 0; L < layerCount; L++) {
            org.teavm.jso.typedarrays.Int32Array gids = mapLayerGids(L);
            if (gids == null) continue;
            int layerDrawn = 0;
            for (int y = 0; y < h; y++) {
                for (int x = 0; x < w; x++) {
                    int gid = gids.get(y * w + x);
                    if (gid == 0) continue;
                    int tsFirst = -1, tsCols = 0, tsTw = TW, tsTh = TH, tsImg = -1;
                    for (int t = 0; t < tsCount; t++) {
                        int first = meta.get(t * 5);
                        if (first > gid) continue;
                        if (first > tsFirst) {
                            tsFirst = first;
                            tsCols = meta.get(t * 5 + 1);
                            tsTw = meta.get(t * 5 + 2);
                            tsTh = meta.get(t * 5 + 3);
                            tsImg = meta.get(t * 5 + 4);
                        }
                    }
                    if (tsImg < 0 || tsImg >= loaded || tsCols <= 0) continue;
                    int idx = gid - tsFirst;
                    int sx = (idx % tsCols) * tsTw;
                    int sy = (idx / tsCols) * tsTh;

                    android.graphics.Rect src = new android.graphics.Rect(sx, sy, sx + tsTw, sy + tsTh);
                    android.graphics.Rect dst = new android.graphics.Rect(x * TW, y * TH,
                            x * TW + TW, y * TH + TH);
                    r.a(imgs[tsImg], src, dst, p);
                    drawn++;
                    layerDrawn++;
                }
            }
            step("39." + L + " layer drawn: " + layerDrawn);
        }
        step("39 tiles drawn: " + drawn + " in " + (System.currentTimeMillis() - t0) + "ms");

        // 挂到页面（缩放显示，完整地图 2700x2500 太大）
        org.teavm.jso.dom.html.HTMLCanvasElement out = off.getElement();
        if (out != null) {
            out.setAttribute("id", "mapOffscreen");
            out.setAttribute("style", "display:none");
            org.teavm.jso.dom.html.HTMLDocument doc =
                    (org.teavm.jso.dom.html.HTMLDocument)
                            org.teavm.jso.browser.Window.current().getDocument();
            if (doc != null && doc.getBody() != null) doc.getBody().appendChild(out);
        }
        step("40 map ready");
    }

    // ================================================================ 相机

    private static HTMLCanvasElement viewEl;
    private static Canvas viewCanvas;
    private static Bitmap mapBmp;
    private static Bitmap viewBmp;
    private static com.corrodinggames.rts.gameFramework.m.h viewR;

    // ---- 单位 ----
    private static double[] uX = new double[0], uY = new double[0], uAngle = new double[0];
    private static Bitmap tankBody, tankTurret;
    private static final double TANK_SCALE = 0.8;   // 来自 tank.ini 的 imageScale

    private static double camX = 1150, camY = 1250;   // 地图坐标（像素）
    private static double camZoom = 1.8;
    private static boolean dragging;
    private static int lastX, lastY;
    private static int frameCount;
    private static long lastFpsAt;
    private static int fps;

    @org.teavm.jso.JSBody(script = "return document.getElementById('viewport');")
    private static native HTMLCanvasElement viewportEl();

    @org.teavm.jso.JSBody(params = {"id"}, script =
            "var e=document.getElementById('fps'); if(e) e.textContent=id;")
    private static native void setFpsText(String text);

    @org.teavm.jso.JSBody(params = {"id"}, script =
            "var e=document.getElementById('cam'); if(e) e.textContent=id;")
    private static native void setCamText(String text);

    /**
     * 相机 + 主循环。
     * 离屏地图只画一次（rwRealMap 里预渲染），这里每帧只从它裁剪一块贴到视口。
     * 对应真机上 ak.run() 的 tick+render 循环，Web 端换成 requestAnimationFrame 驱动。
     */
    private static void setupCamera() {
        viewEl = viewportEl();
        if (viewEl == null) { step("41 SKIP: 没有 viewport 画布"); return; }
        viewBmp = Bitmap.fromElement(viewEl);
        viewCanvas = new Canvas(viewBmp);

        HTMLCanvasElement mapEl = mapOffscreenEl();
        if (mapEl == null) { step("41 SKIP: 没有离屏地图"); return; }
        mapBmp = Bitmap.fromElement(mapEl);

        // 单位贴图
        HTMLCanvasElement bodyEl = elById("tankBody");
        HTMLCanvasElement turretEl = elById("tankTurret");
        if (bodyEl != null && bodyEl.getWidth() > 0) tankBody = Bitmap.fromElement(bodyEl2Canvas(bodyEl));
        if (turretEl != null && turretEl.getWidth() > 0) tankTurret = Bitmap.fromElement(turretEl2Canvas(turretEl));

        extractUnits();

        step("41 camera ready, map=" + mapBmp.getWidth() + "x" + mapBmp.getHeight()
                + " view=" + viewEl.getWidth() + "x" + viewEl.getHeight()
                + " units=" + uX.length + (tankBody != null ? " tank✓" : " tank✗"));

        // 拖拽平移
        org.teavm.jso.dom.events.EventListener down = e -> {
            org.teavm.jso.dom.events.MouseEvent me = (org.teavm.jso.dom.events.MouseEvent) e;
            dragging = true; lastX = me.getClientX(); lastY = me.getClientY();
            me.preventDefault();
        };
        org.teavm.jso.dom.events.EventListener move = e -> {
            if (!dragging) return;
            org.teavm.jso.dom.events.MouseEvent me = (org.teavm.jso.dom.events.MouseEvent) e;
            camX -= (me.getClientX() - lastX) / camZoom;
            camY -= (me.getClientY() - lastY) / camZoom;
            lastX = me.getClientX(); lastY = me.getClientY();
            clampCam();
        };
        org.teavm.jso.dom.events.EventListener up = e -> dragging = false;

        viewEl.addEventListener("mousedown", down);
        viewEl.addEventListener("mousemove", move);
        viewEl.addEventListener("mouseup", up);
        viewEl.addEventListener("mouseleave", up);

        // 滚轮缩放
        viewEl.addEventListener("wheel", e -> {
            org.teavm.jso.dom.events.WheelEvent we = (org.teavm.jso.dom.events.WheelEvent) e;
            double f = we.getDeltaY() > 0 ? 0.9 : 1.1;
            camZoom = Math.max(0.25, Math.min(4.0, camZoom * f));
            we.preventDefault();
        });

        lastFpsAt = System.currentTimeMillis();
        // 先画一帧并刷新 HUD，避免首屏空白
        renderFrame();
        setFpsText("…");
        setCamText((int) camX + ", " + (int) camY + "  ×" + String.format("%.2f", camZoom));
        scheduleFrame();
        step("42 main loop started (rAF)");
    }

    @org.teavm.jso.JSBody(params = {"id"}, script = "return document.getElementById(id);")
    private static native HTMLCanvasElement elById(String id);

    /** 把 <img> 画进离屏 canvas，返回该 canvas（Bitmap 需要 canvas 载体） */
    @org.teavm.jso.JSBody(params = {"img"}, script =
            "var c=document.createElement('canvas');" +
            "c.width=img.naturalWidth||img.width; c.height=img.naturalHeight||img.height;" +
            "c.getContext('2d').drawImage(img,0,0); return c;")
    private static native HTMLCanvasElement bodyEl2Canvas(HTMLCanvasElement img);

    @org.teavm.jso.JSBody(params = {"img"}, script =
            "var c=document.createElement('canvas');" +
            "c.width=img.naturalWidth||img.width; c.height=img.naturalHeight||img.height;" +
            "c.getContext('2d').drawImage(img,0,0); return c;")
    private static native HTMLCanvasElement turretEl2Canvas(HTMLCanvasElement img);

    /** 从 Units 层提取单位位置（tile 坐标 → 像素坐标） */
    private static void extractUnits() {
        int layerCount = mapLayerCount();
        if (layerCount < 3) return;
        org.teavm.jso.typedarrays.Int32Array g = mapLayerGids(layerCount - 1);
        if (g == null) return;
        int w = mapW(), h = mapH(), TW = 20, TH = 20;
        int cnt = 0;
        for (int i = 0; i < w * h; i++) if (g.get(i) != 0) cnt++;
        uX = new double[cnt]; uY = new double[cnt]; uAngle = new double[cnt];
        int k = 0;
        for (int y = 0; y < h; y++) {
            for (int x = 0; x < w; x++) {
                if (g.get(y * w + x) == 0) continue;
                uX[k] = x * TW + TW / 2.0;
                uY[k] = y * TH + TH / 2.0;
                // 用坐标派生一个稳定的朝向，避免每次刷新都变
                uAngle[k] = ((x * 37 + y * 91) % 360) * Math.PI / 180.0;
                k++;
            }
        }
    }

    @org.teavm.jso.JSBody(script = "return document.getElementById('mapOffscreen');")
    private static native HTMLCanvasElement mapOffscreenEl();

    private static void scheduleFrame() {
        org.teavm.jso.browser.Window.current().requestAnimationFrame(t -> {
            try {
                renderFrame();
            } catch (Throwable e) {
                // 帧内异常不终止循环
            }
            scheduleFrame();
        });
    }

    private static void renderFrame() {
        if (mapBmp == null || viewEl == null) return;
        int vw = viewEl.getWidth(), vh = viewEl.getHeight();

        int sw = (int) (vw / camZoom);
        int sh = (int) (vh / camZoom);
        int sx = (int) camX - sw / 2;
        int sy = (int) camY - sh / 2;

        int mw = mapBmp.getWidth(), mh = mapBmp.getHeight();
        if (sx < 0) sx = 0;
        if (sy < 0) sy = 0;
        if (sx + sw > mw) sx = mw - sw;
        if (sy + sh > mh) sy = mh - sh;
        if (sx < 0) sx = 0;
        if (sy < 0) sy = 0;

        Paint p = new Paint();
        viewCanvas.drawColor(Color.BLACK);
        android.graphics.Rect src = new android.graphics.Rect(sx, sy, sx + sw, sy + sh);
        android.graphics.Rect dst = new android.graphics.Rect(0, 0, vw, vh);
        viewCanvas.drawBitmap(mapBmp, src, dst, p);

        // 单位：世界坐标 → 屏幕坐标（与相机同步缩放/平移）
        Paint up = new Paint();
        int n = uX.length;
        for (int i = 0; i < n; i++) {
            double wx = uX[i], wy = uY[i];
            double sx2 = (wx - sx) * (double) vw / sw;
            double sy2 = (wy - sy) * (double) vh / sh;
            if (sx2 < -40 || sy2 < -40 || sx2 > vw + 40 || sy2 > vh + 40) continue;

            if (tankBody != null) {
                viewCanvas.save();
                viewCanvas.translate((float) sx2, (float) sy2);
                viewCanvas.scale((float) TANK_SCALE, (float) TANK_SCALE);
                viewCanvas.drawBitmap(tankBody, -tankBody.getWidth() / 2f,
                        -tankBody.getHeight() / 2f, up);
                viewCanvas.restore();
            }
            if (tankTurret != null) {
                viewCanvas.save();
                viewCanvas.translate((float) sx2, (float) sy2);
                viewCanvas.rotate((float) Math.toDegrees(uAngle[i]));
                viewCanvas.scale((float) TANK_SCALE, (float) TANK_SCALE);
                viewCanvas.drawBitmap(tankTurret, -tankTurret.getWidth() / 2f,
                        -tankTurret.getHeight() / 2f, up);
                viewCanvas.restore();
            }
        }

        frameCount++;
        long now = System.currentTimeMillis();
        if (now - lastFpsAt >= 500) {
            fps = (int) (frameCount * 1000.0 / (now - lastFpsAt));
            frameCount = 0;
            lastFpsAt = now;
            setFpsText(fps + " fps");
            setCamText((int) camX + ", " + (int) camY + "  ×" + String.format("%.2f", camZoom));
        }
    }

    private static void clampCam() {
        int mw = mapBmp.getWidth(), mh = mapBmp.getHeight();
        if (camX < 0) camX = 0;
        if (camY < 0) camY = 0;
        if (camX > mw) camX = mw;
        if (camY > mh) camY = mh;
    }

    private static void rwGameEngine() {
        // 强制把引擎会 catch 的异常类型拉进可达图（TeaVM 静态分析不会为未引用的类生成 JS）
        try {
            rwutil.Xml.parserConfigException();
        } catch (Throwable ignored) {
        }

        step("43 new android.content.Context");
        android.content.Context ctx = new android.content.Context();
        step("44 new game.i (GameEngine)");
        com.corrodinggames.rts.game.i engine = new com.corrodinggames.rts.game.i(ctx);
        step("45 engine constructed");
        // 分段定位：先单独测 init() 里的第一个构造步骤
        try {
            step("46a new gameFramework.utility.m(ctx)");
            Object idx = new com.corrodinggames.rts.gameFramework.utility.m(ctx);
            step("46a ok: " + idx);
        } catch (Throwable e) {
            step("46a FAILED: " + e);
        }

        try {
            step("46b gameFramework.cf.a()");
            long t = com.corrodinggames.rts.gameFramework.cf.a();
            step("46b ok: " + t);
        } catch (Throwable e) {
            step("46b FAILED: " + e);
        }

        try {
            step("46c new gameFramework.cf(engine)");
            Object cf = new com.corrodinggames.rts.gameFramework.cf(engine);
            step("46c ok: " + cf);
        } catch (Throwable e) {
            step("46c FAILED: " + e);
        }

        try {
            step("46d gameFramework.cg.C");
            Object cg = com.corrodinggames.rts.gameFramework.cg.C;
            step("46d ok: " + cg);
        } catch (Throwable e) {
            step("46d FAILED: " + e);
        }

        step("46 engine.a(ctx)");
        engine.a(ctx);
        step("46 engine.a(ctx) ok");
    }

    /** 引用类字面量，迫使 TeaVM 编译该类及其可达方法 */
    private static void touch(Class<?> c) {
        if (c == null) {
            throw new IllegalStateException();
        }
    }
}
