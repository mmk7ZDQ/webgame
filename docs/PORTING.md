# 铁锈战争 Web 化：移植蓝图

> **先读 [ARCHITECTURE.md](ARCHITECTURE.md)。** 那份是字节码级分析后的架构还原，
> 修正了本文档初版的桩规模（465 类 → 138 类 / 781 方法）与工作量模型
> （2–4 人月 → 两阶段 2–2.5 人月）。本文档保留完整的 GL 兼容层设计与构建链路细节。

对象：`txzz115_136310.apk`（`com.corrodinggames.rts` v1.15 / 25,551,172 B）
SHA-256：`f581e6852db3e22a2ce0521264b32386e2f7c1234342a382bb1da3c683cbe17a`

---

## 0. 结论先行

**能做成 Web。** 三条落地路线，按「能否原样游玩」排序：

| # | 路线 | 浏览器内运行 | 挂 GitHub Pages | 工期 | 判定 |
|---|---|---|---|---|---|
| A | 云串流（Android 容器 + WebRTC/WebSocket 推流） | 客户端页面在浏览器，游戏在服务器 | ✅ 前端静态托管 | 1–2 天 | **最快达成「点开就玩」** |
| B | TeaVM 移植（dex → class → WASM + WebGL 兼容层） | ✅ 完全在浏览器 | ✅ 纯静态，零服务器 | 2–4 人月 | **唯一不需要服务器的可玩方案** |
| C | 静态分发页 | ❌ | ✅ | 2 小时 | 入口页／落地页 |

本仓库的 `index.html` 即路线 C 的成品，同时是 A/B 的入口页。

---

## 1. 静态分析实测

| 指标 | 实测值 | 含义 |
|---|---|---|
| `lib/**/*.so` | **0 个** | 无 native 代码，不需要 ARM 指令翻译或系统镜像模拟 |
| dex 文件 | 3（`classes.dex` 2.2 MB 为主） | 单进程，无多 dex 拆分加载逻辑 |
| 自有类 | 1,602 | 引擎 + 游戏逻辑全部在 Java 层 |
| 方法总数 | 14,341 | 中等规模，AOT 编译可控 |
| 外部类引用 | 465 | 见 `docs/dependency-surface.txt` |
| ├ android.* | 187 | 需自写桩 |
| ├ java.* | ~190 | TeaVM 提供，少量需补（`java.io.File`、`java.net.DatagramSocket`） |
| ├ javax.* | ~35 | `khronos.opengles/egl` 9 个类是移植核心 |
| └ org.* / dalvik | ~50 | XML 解析、注解，多数可空实现 |
| `Class.forName` | **0** | 无动态类加载，AOT 友好 |
| `java.lang.reflect` | 3 处（`getMethod`/`getDeclaredField`） | 可局部改写，不影响整体 AOT |
| `System.loadLibrary` | 0 | 确认无 JNI |
| AWT / Swing / JavaSound | 0 | 无桌面 UI 依赖 |
| GL 入口 | 71 个函数 | `GL10`/`GL11` 固定管线为主，少量 `GLES20` 着色器路径 |
| 资源 | 21.7 MB | music 15 MB / maps 3.4 MB / units 2.2 MB / tilesets 2.1 MB |
| 音频 API | `SoundPool` + `MediaPlayer` | → WebAudio |
| 联网 | `java.net.DatagramSocket`（局域网 UDP） | 浏览器需 WebRTC DataChannel 或降级单机 |

### 为什么这条路成立

三条硬性前提全部满足：

1. **无 native** —— 渲染不是黑盒 `.so`，可以在 Java 层整体替换。
2. **GLES 1.x 固定管线** —— 只有 71 个入口、无着色器语义负担，状态机可用单个统一着色器模拟。
3. **零反射 + 零 JNI** —— TeaVM 这类 AOT 工具不需要保留任何运行时元数据。

反例对照：若该游戏是自研 native 引擎 + Vulkan + 反射式 mod 系统，同样需求会直接变成「不可行」。

---

## 2. 路线 B：TeaVM 移植详细设计

### 2.1 构建链路

```
txzz.apk
  └─ d2j-dex2jar ──────────────► rw.jar          (dex → JVM class)
        └─ 桩工程 stubs.jar 前置 ──► TeaVM AOT ──► out/*.wasm + *.js
              └─ pack-assets ───► out/assets/*    (21.7 MB 资源映射表)
                    └─ 静态托管（GitHub Pages / 任意 CDN）
```

命令：

```bash
# 1. dex → class
d2j-dex2jar.sh txzz.apk -o build/rw.jar

# 2. 桩工程
cd stubs && ./gradlew jar     # 产出 build/libs/stubs.jar

# 3. AOT 编译（wasm 后端，比 JS 后端小约 40%）
java -jar teavm-cli.jar \
  -t wasm -O3 \
  --main-class com.corrodinggames.rts.appFramework.MainActivity \
  --classpath build/rw.jar:stubs.jar \
  -d out/

# 4. 资源
node tools/pack-assets.mjs extracted/assets out/assets
```

### 2.2 GL 兼容层（工作量最大的一块）

APK 内的调用全部走 `javax.microedition.khronos.opengles.GL10/GL11`。实现一个
`GL11Impl implements GL11`，把每个方法转成 WebGL 调用，并在 Java 侧维护固定管线状态机。

**状态机需要维护的东西：**

| 状态 | GLES1 入口 | WebGL 侧处理 |
|---|---|---|
| 矩阵栈 | `glMatrixMode` `glLoadIdentity` `glPushMatrix` `glPopMatrix` `glTranslatef` `glRotatef` `glScalef` `glOrthof` `glFrustumf` `glMultMatrixf` | JS 侧 `mat4` 栈，每帧合成为 `uMVP` uniform |
| 顶点数组 | `glEnableClientState` `glVertexPointer` `glTexCoordPointer` `glColorPointer` `glDrawArrays` `glDrawElements` | 懒上传到 `ARRAY_BUFFER`，脏标记复用 |
| 顶点色 | `glColor4f` `glColorPointer(GL_COLOR_ARRAY)` | 无属性时注入常量 `uColor` |
| 纹理 | `glGenTextures` `glBindTexture` `glTexImage2D` `glTexSubImage2D` `glTexParameterf` `glTexEnvi` | 近乎一一对应；`glTexEnvi` 的 MODULATE/REPLACE/DECAL 转 `uTexEnv` 分支 |
| 混合 | `glBlendFunc` `glBlendFuncSeparate` | 直接映射 |
| Alpha 测试 | `glAlphaFunc` `glEnable(GL_ALPHA_TEST)` | 片元着色器 `discard`（RW 大量依赖，性能敏感） |
| 雾 | `glFogf` `glFogfv` `glEnable(GL_FOG)` | `uFogColor/uFogNear/uFogFar` |
| 裁剪 | `glScissor` `glEnable(GL_SCISSOR_TEST)` | 直接映射 |
| 视口 | `glViewport` | 直接映射 |
| FBO | `GLES11Ext` / `GLES20` 的 framebuffer 系列 | `FRAMEBUFFER` 直接映射（后处理与 minimap 用） |

**统一着色器（覆盖固定管线全部组合）：**

```glsl
// vertex
attribute vec2 aPos; attribute vec2 aUV; attribute vec4 aColor;
uniform mat4 uMVP;
varying vec2 vUV; varying vec4 vColor; varying float vFogDepth;
void main(){
  vUV = aUV; vColor = aColor;
  vFogDepth = (uMVP * vec4(aPos,0.0,1.0)).z;
  gl_Position = uMVP * vec4(aPos,0.0,1.0);
}
// fragment
precision mediump float;
uniform sampler2D uTex; uniform int uTexEnv; uniform vec4 uColor;
uniform vec3 uFogColor; uniform float uFogNear,uFogFar; uniform int uFogMode;
uniform float uAlphaRef; uniform int uAlphaTest;
varying vec2 vUV; varying vec4 vColor; varying float vFogDepth;
void main(){
  vec4 t = texture2D(uTex, vUV);
  vec4 c = (uTexEnv==1) ? t : (uTexEnv==2) ? vec4(t.rgb,1.0) : t * vColor;
  if (uAlphaTest==1 && c.a < uAlphaRef) discard;
  if (uFogMode==1){
    float f = clamp((uFogFar - abs(vFogDepth)) / (uFogFar - uFogNear), 0.0, 1.0);
    c.rgb = mix(uFogColor, c.rgb, f);
  }
  gl_FragColor = c;
}
```

> 注意：APK 里 `assets/shaders/plain.vert` 等用的是 `#version 130` + `gl_ModelViewMatrix`
> （桌面 OpenGL 内置变量），在 WebGL1 下不可编译，需重写；而 `plainGDX.vert` 是标准
> GLSL ES 1.00（`attribute`/`varying`），WebGL1 **可直接使用**。团队自绘的 5 个团队色
> 着色器（`hueAddTeamColor.frag` 等）改掉 `#version` 行即可复用。

### 2.3 android.* 桩实现清单

按层拆，括号内为该层核心类数量：

**图形与窗口（~40 类，最重）**
`SurfaceView` `SurfaceHolder`(+Callback/Callback2) `GLSurfaceView`(+Renderer) `View`
`ViewGroup` `Window` `WindowManager`(+LayoutParams) `Bitmap` `BitmapFactory`(+Options)
`Canvas`(+VertexMode) `Paint`(+内部类) `Path` `Picture` `Matrix` `Rect` `RectF` `Point`
`PointF` `Color` `ColorFilter` `Typeface`

- `Bitmap` → 包装 `ImageData` / `ImageBitmap`，`BitmapFactory.decodeStream` 走 `createImageBitmap`
- `Canvas` → 走 OffscreenCanvas 2D（用于文字渲染、UI 贴图预烘焙）
- `Paint.measureText` → 需要一套确定性字体度量，建议预生成字体图集

**输入（~12 类）**
`MotionEvent`（含多点触控 pointer 索引 —— RTS 框选+拖屏必需）、`KeyEvent`、`View$OnKeyListener`

**媒体（4 类）**
`SoundPool` → WebAudio 采样池（预解码，按需 `AudioBufferSourceNode`）
`MediaPlayer` → `HTMLAudioElement` 或 WebAudio 流式播放（BGM）
> 已知坑：`SoundPool` 的 `rate` 参数（音调变化）在 WebAudio 里对应 `playbackRate`，语义一致。

**资源与配置（~20 类）**
`Context` `Resources` `AssetManager` `Configuration` `SharedPreferences`(+Editor)
`PackageManager` `PackageInfo` `Application` `Activity`
- `AssetManager.open()` → 带路径表的 `fetch` + 缓存；21.7 MB 建议按地图/音乐分片懒加载
- `SharedPreferences` → IndexedDB 键值层
- `java.io.File`（8 处引用）→ OPFS 或内存 FS，存档/回放写入

**UI 外壳（~60 类，可大量裁剪）**
`AlertDialog`(+Builder) `ProgressDialog` `Notification`(+Builder/Manager) `PendingIntent`
`Menu`/`MenuItem`/`SubMenu`/`ContextMenu`/`ActionProvider`/`LayoutInflater`/`ViewTreeObserver`
以及 `android/support/*`（12 类）与 `android/widget/*`（32 类）
> 这一层大部分是商店评分弹窗、通知、Android 原生菜单。建议**直接裁剪**：
> 把调用点替换为 no-op 或自绘 DOM 覆盖层，可省掉 ~40% 的桩代码。

**网络（6 类）**
`DatagramSocket` `DhcpInfo` `WifiManager` `bluetooth/*`
- 单机 + 局域网联机以外的功能全部可降级
- 联机若要做：Java 侧 socket 改为抽象接口，Web 端用 WebRTC DataChannel；服务器侧需要中继

### 2.4 风险与对策

| 风险 | 影响 | 对策 |
|---|---|---|
| 主循环线程模型（`SurfaceView` 渲染线程 + `Looper`） | 高 | TeaVM 有协程/`Thread` 模拟，但需把渲染循环改为 `requestAnimationFrame` 驱动；`GLSurfaceView` 的 `RENDERMODE_CONTINUOUSLY` 语义要手工重写 |
| GC 停顿 | 中 | RTS 后期单位上千，需给 TeaVM 配大堆 + 减少每帧分配；实测前先做千单位压测场景 |
| `glAlphaFunc` 依赖 | 中 | 片元 `discard` 在移动 GPU 上有填充率代价，需批量排序减少 overdraw |
| 音频延迟 | 低 | WebAudio 采样池本身足够低延迟 |
| 产物体积 | 低 | wasm 预计 12–20 MB + 资源 21.7 MB ≈ 35 MB 首屏；用分片加载把首屏压到 8 MB 内 |
| 存档兼容 | 低 | 原 `.rwsave` 格式不动，只是存储后端替换 |

### 2.5 里程碑

| 阶段 | 内容 | 出口标准 |
|---|---|---|
| M0 | 构建链跑通 | `rw.jar` 能被 TeaVM 编译，报错全部为 missing class |
| M1 | 桩骨架 + GL 层 | 黑屏 → 能看到菜单背景渲染 |
| M2 | 输入 + UI 壳 | 能点进单机遭遇战 |
| M3 | 游戏内渲染 | 单位、地图、迷雾、minimap 正确 |
| M4 | 音频 + 存档 | 完整单机可玩 |
| M5 | 优化 + 打包 | 千单位 30 fps，首屏 < 8 MB，上 Pages |

---

## 3. 路线 A：云串流（最快可用）

思路：游戏跑在服务器上的 Android 容器里，浏览器只做「显示 + 触控回传」。

```
浏览器 (静态页, GitHub Pages)
   │  WSS（视频流 H.264/WebP 帧 + 触控事件）
   ▼
nginx 反代 ──► ws-scrcpy (Node)
                   │  adb
                   ▼
             redroid 容器 (Android 11) ──► 安装 txzz115_136310.apk ──► 运行
```

`deploy/stream-server.sh` 提供了完整的一键脚本。

要点：

- redroid 需 `--privileged` 与 `binderfs`；GPU 可选 `gpu_mode=guest`（SwiftShader 软件渲染），
  对 2D 为主的 RTS 足够，千单位场景建议上真 GPU 或 `gpu_mode=host` 直通。
- 视频编码用 ws-scrcpy 的 `tinyh264` 解码器，弱网下切 `broadway`。
- 触控：RTS 需要「框选拖动 + 双指缩放」，scrcpy 的 `control` 通道支持多点，需在前端把
  PointerEvent 转成绝对坐标（`--max-size` 与 canvas 尺寸要严格对应，否则点击偏移）。
- 延迟：同地域 30–80 ms；跨国 150 ms+ 不适合 RTS 微操。
- 成本：2 vCPU / 4 GB 可跑单实例；多并发按 1 实例/玩家估算。

---

## 4. 路线 C：静态页（本仓库现状）

`index.html` 为单文件自包含站点，无外部依赖、无构建步骤：

- 直接 `gh-pages` 或 Actions 部署
- 若后续要放 APK：建议走 Release 附件（单文件 100 MB 上限，25 MB 可放但会拖慢 clone）
- 资源浏览（地图/单位图鉴）可在 `tools/extract-preview.mjs` 基础上扩展

---

## 5. 附：本仓库文件

```
rw-web/
├── index.html                      落地页（自包含）
├── docs/
│   ├── PORTING.md                  本文档
│   └── dependency-surface.txt      465 个外部类的完整清单
├── deploy/
│   └── stream-server.sh            路线 A 一键部署
├── tools/
│   └── dex-scan.py                 dex 静态分析（复现本文所有数字）
└── .github/workflows/pages.yml     Pages 自动部署
```
