<!--
FOR AI AGENTS: 这是本仓库的交接记忆文件。
新会话请先读本文件，再按需读 docs/ 下的深层文档。
数据全部来自对 APK 的实际解析，可复现（见「工具」一节）。
最后更新：2026-11-01
-->

# AGENTS.md — 铁锈战争 Web 移植项目 · 交接记忆

> 任何 AI 会话接手本项目时，读这一份即可掌握全貌。

---

## 1. 项目是什么

把 **Rusted Warfare 1.15（铁锈战争）的 Android APK 移植到浏览器**，做成可以挂在 GitHub Pages 上玩的站点。

**原始输入**：`txzz115_136310.apk`（25,551,172 B）
SHA-256 `f581e6852db3e22a2ce0521264b32386e2f7c1234342a382bb1da3c683cbe17a`
包名 `com.corrodinggames.rts`，versionCode 176，minSdk 8，targetSdk 30

**当前阶段**：**M0 通过 + M1 已开工**。
- M0：`APK → rw.jar → 桩 → TeaVM → classes.js` 全自动，零错误。
- M1：`android.graphics.*` 的 **9 个类已用 Web Canvas2D 手写实现**并在浏览器里跑通
  （`docs/m1-canvas-smoke.png`）。
- **RW 自己的字节码已在浏览器里绘制成功**：`com.corrodinggames.rts.gameFramework.m.h`
  （游戏自研 2D 框架的 Canvas 后端适配器）转调到我们的 Canvas 实现，
  链路 `RW 字节码 → m/h → android.graphics.Canvas → Canvas2D` 实测成立
  （`docs/m1-rw-adapter.png`）。
- **图像链路同样打通**：`Bitmap → m/e 包装 → m/h → m/fk.a() → Canvas.drawBitmap`
  在浏览器里成功绘制 5 个精灵（`docs/m1-rw-image.png`）。这是游戏画单位/建筑/地形的必经路径。
- **真实游戏贴图已能渲染**：APK 内的 `assets/units/tanks/tank.png`（48×30 RGBA）
  经同一条链路在浏览器里画出 5 辆坦克（`docs/m1-real-assets.png`）。资源管线可用。
- **真实关卡已能渲染**：关卡 1「Dividing River」的完整地图（135×125 tile = 2700×2500 px）
  在地形/装饰/单位三层叠加下绘制成功，16,875 个 tile 耗时 220ms（`docs/m1-full-map.png`）。
  渲染走 RW 自己的 `m/e` + `m/h`，数据来自 `tools/tmx2json.py` 转换的 TMX。
- **相机与主循环已就位**：离屏地图只画一次，之后 `requestAnimationFrame` 驱动每帧从它裁剪
  一块贴到视口，支持拖拽平移与滚轮缩放（`docs/m1-camera.png`）。这是真机 `ak.run()`
  的 tick+render 循环在 Web 端的对应形态。
- **单位已实体化**：从地图 `Units` 层提取 64 个坐标，用 `units/tanks/tank.png`（车体）
  与 `tank_turret.png`（炮塔，独立旋转）绘制，并按 `tank.ini` 的 `imageScale:0.8` 缩放
  （`docs/m1-units.png`）。单位跟随相机一起平移缩放。
- **阶段 2 起步：GLES20 → WebGL1 已跑通**。`android.opengl.GLES20` 的 53 个方法
  已用 WebGL1 实现（int 句柄 ↔ JS 对象映射表），实测编译 GLSL ES 着色器并画出渐变三角形
  （`docs/m1-webgl.png`，`readPixels` 回读确认 `err=0`）。这是游戏战场渲染的前提。
- **Buffer 桥接完成**：`java.nio.Buffer` → WebGL typed array 已打通（走 TeaVM 的
  `TArrayBufferViewProvider` 零拷贝，堆缓冲回退复制）。全程走 `GLES20` 接口上传顶点并绘制成功
  （`docs/m1-gles20-buffer.png`）。这是接 `b/t` 的最后一块前置。
- **RW 自己的 GL 渲染器已能运行**：`gameFramework/b/t`（全游戏唯一直接调 `GLES20` 的类）
  在我们的 WebGL 实现上**实例化成功并执行了每帧入口** `b()`（`glClearColor` + `glClear`），
  `glError=0`（`docs/m1-rw-renderer.png`）。这是「看到战场」路径上最后一个结构性未知数。

---

## 2. 硬数据（实测，勿重新估算）

```
dex 文件          3 个
native .so        0 个            ← 最关键的一条
assets            820 个文件 / 21.7 MB
自有类            1,602
方法              14,341
方法体（有代码）   11,333
指令总数          546,402
外部类型引用       465 个类
实际被调用的外部类  138 个类 / 781 个方法   ← 真正要写桩的规模
调用图            14,341 节点 / 33,533 边
生成桩            245 类 / 1,063 方法 / 203 字段 → javac 零错误 ✅
rw.jar            1,664 类 / 2.1 MB（dex2jar 转换成功）✅
TeaVM 首次编译     84 类 / 1,240 方法 → classes.js 68 KB，零错误 ✅（M0 通过）
M1 画布后端        126 类 / 1,788 方法 → classes.js 184 KB，浏览器内实绘成功 ✅
GLES20 → WebGL1   144 类 / 1,980 方法 → classes.js 216 KB，着色器三角形实绘成功 ✅
Buffer 桥接        161 类 / 2,329 方法 → classes.js 228 KB，FloatBuffer 上传实绘成功 ✅
RW 渲染器         406 类 / 3,762 方法 → classes.js 732 KB，b/t 实例化 + glClear 成功 ✅
b/t 绘制调用      能调到 glDrawArrays；1281 已精确定位到 vertexAttribPointer ⚠️
RW 适配器链路      gameFramework/m/h 转调 android.graphics.Canvas 实测通过 ✅
RW 图像链路        Bitmap → m/e → m/h → Canvas.drawBitmap 实测通过 ✅
真实游戏资源       assets/units/tanks/tank.png 在浏览器内渲染成功 ✅
真实关卡渲染       关卡 1「Dividing River」三层（地形+装饰+单位）16875 tile / 220ms ✅
相机 + 主循环      rAF 驱动、拖拽平移、滚轮缩放，1:1 像素视口 481 类 / 1.1 MB ✅
单位实体          64 个单位实体化（车体 + 炮塔分层，随相机缩放平移）✅
游戏引擎          已能进入 TeaVM 分析；卡在 69 个缺失符号（见第 8 节）⚠️
资源 eager 首屏    0.8 MB（总计 20.7 MB，其余懒加载）
全链路重建         16.7 秒（build.sh all，从零）
```

外部桩分层（方法数）：

| 层 | 类 | 方法 |
|---|---:|---:|
| GPU · WebGL 兼容层 | 8 | 106 |
| 2D · Canvas/Paint/Bitmap | 18 | **184** |
| UI · 原生控件 | 21 | 138 |
| UI · 窗口与输入 | 18 | 84 |
| 外壳 · Context/资源 | 18 | 78 |
| 外壳 · Activity/Dialog | 9 | 60 |
| 音频 | 2 | 17 |

---

## 3. 核心结论

**能移植。** 三个决定性事实：

1. **零 native 库** —— 不用 ARM 翻译、不用 Android 系统镜像，渲染层可在 Java 层整体替换
2. **GL 入口收敛** —— 全游戏只有 `gameFramework/b/t` 一个类直接调 `GLES20`（70 次），加上 `m/fm` 的 28 次 `GL10`
3. **绘图有抽象层** —— `gameFramework/m` 是自研跨平台 2D 框架，`m/h` 只是 Android Canvas 后端，换后端不改调用点

**三条路线**（详见 README 决策表）：

| 路线 | 浏览器内玩 | Pages 托管 | 工期 |
|---|---|---|---|
| A 云串流（redroid + ws-scrcpy） | 页面在浏览器，游戏在服务器 | ✅ | 1–2 天 |
| B TeaVM 移植 | ✅ 完全在浏览器 | ✅ 纯静态 | **2–2.5 人月（两阶段）** |
| C 静态页 | ❌ | ✅ | 已完成 |

**路线 B 的关键拆分**（这是初版估算被修正的地方）：

- **阶段 1（1–1.5 人月）**：走 Canvas 软件路径拿到可玩版本。字符串表里有 `canvasDirectGL` 开关和 `Disabling opengl mode` 日志，`GameViewNonSurface` 用 `View.onDraw(Canvas)` —— 关掉 GL 游戏照样跑，只失去队伍着色与后处理。
- **阶段 2（约 1 人月）**：补 WebGL 层恢复画质。

**真正的不确定性不在图形**，在：① 线程模型单线程化 ② 千单位性能（`largeHeap=true`）。

---

## 4. 架构速查表

需要改的类，按优先级：

| 类 | 角色 | 方法数 | 移植动作 |
|---|---|---:|---|
| `gameFramework/ak` | **游戏主线程**（`extends Thread`） | 4 | 改成 rAF 驱动 |
| `gameFramework/k` | 全局上下文 God object | 127 | 保留，`k.t`(944 次调用) 是渲染提交 |
| `gameFramework/b/t` | **唯一**直接调 GLES20 的类 | 67 | ✅ 后端已实现，实例化 + 每帧入口实测通过 |
| `gameFramework/b/p` `b/h` | 抽象渲染接口 | 24 / 20 | 保留接口 |
| `gameFramework/m/h` | Canvas 后端实现 | 71 | ✅ **无需改动**，转调已实测通过 |
| `gameFramework/m/fm` | GL 文本/精灵辅助 | 5 | 用阶段 2 的 WebGL |
| `appFramework/GameViewOpenGL` | GLSurfaceView + EGL | 48 | → canvas + rAF |
| `appFramework/GameViewNonSurface` | `View.onDraw(Canvas)` 软件路径 | 41 | **阶段 1 的主入口** |
| `appFramework/GLSurfaceViewShared` | GLSurfaceView 的本地副本 | 40 | 重写 |
| `gameFramework/bp` | 模拟状态（世界/tick） | 25 | 保留 |
| `gameFramework/j/bg` | 联机协议编解码 | 47 | 首版裁剪 |

**主循环形态**：

```
ak.run() → Process.setThreadPriority → [ nanoTime 算 delta → k.a() tick → k.t() render → Thread.sleep ]
```

**渲染同步**：游戏线程画离屏 buffer → `ReentrantLock` 交换 → UI 线程 `tryLock` blit。
Web 单线程化后这套同步**整体删除**。

**可直接删除的第三方代码**：
- `com/bz/simplesdk/adviewdomestic/*` —— 国内广告 SDK，无游戏功能
- `gameFramework/j/*` —— 联机子系统（首版）
- `android/support/v4/*`、`org/apache/http/*` —— 空实现或裁剪

**资源格式零障碍**：地图是标准 Tiled TMX（20×20 tile）+ 同名 `_map.png`；单位是 ini + png；文本是 `.properties`。**没有任何私有二进制格式需要逆向。**

**着色器**：`assets/shaders/` 5 个文件用 `#version 130` + `gl_ModelViewMatrix` 等桌面内置变量，需重写；但 `plainGDX.vert` 已是标准 GLSL ES 1.00，WebGL1 可直接用，可作模板。

---

## 5. 文件地图

```
rw-web/
├── AGENTS.md                      ← 本文件
├── CLAUDE.md                      指向本文件的短桩
├── README.md                      项目入口，30 秒决策表
├── build.sh                       ★ 构建链：stubs|jar|dex|wasm|assets|all
├── index.html                     落地页（单文件自包含，可直接部署）
├── stubs/
│   └── src/                       自动生成的 199 个 Java 桩源文件（245 个类）
├── impl/src/android/graphics/     ★ 手写实现层（Canvas/Paint/Bitmap/Color/Rect/
│                                    RectF/Matrix/Path/PorterDuff → Web Canvas2D）
├── web/
│   ├── src/rwweb/Bootstrap.java   可达性探针 + 实现层冒烟测试
│   └── viewer/index.html          ★ 浏览器验证页：加载 classes.js 并截图确认
├── docs/
│   ├── ARCHITECTURE.md            ★ 架构还原（分层图、主循环、线程模型、风险表）
│   ├── PORTING.md                 GL 兼容层设计、统一着色器源码、构建链命令
│   ├── stub-spec.md               ★ 781 个外部方法的完整签名（可直接当接口定义）
│   ├── dependency-surface.txt     465 个外部类型引用清单
│   └── preview.png                页面截图
├── deploy/
│   ├── stream-server.sh           路线 A 一键部署（redroid + ws-scrcpy + nginx + systemd）
│   └── bench-android.sh           ★ 千单位压测：三阶段采样 + Markdown 判定报告
├── tools/
│   ├── dex-scan.py                结构扫描（dex 头、类型引用、API 指纹）
│   ├── dex-calls.py               字节码级调用分析（方法级依赖、调用热度）
│   ├── dex-flow.py                调用图 + 可达性 + 入口点发现
│   ├── gen-stubs.py               ★ 从 APK 生成 Java 桩源码（调用点驱动）
│   ├── fetch-maven.py             ★ 无 mvn 也能拉 Maven 依赖树（已拉好 tools/teavm-lib）
│   ├── pack-assets.py             资源清单 manifest.json（含加载策略）
│   ├── dex-tools/                 dex2jar 2.4（已解压，build.sh 自动发现）
│   └── teavm-lib/                 TeaVM 0.14.1 全部 56 个依赖 jar
└── .github/workflows/pages.yml    Pages 自动部署
```

**阅读顺序建议**：AGENTS.md（本文件）→ docs/ARCHITECTURE.md → docs/stub-spec.md → docs/PORTING.md。

---

## 6. 工具用法

全部是 Python 3 标准库，无依赖。

```bash
# 结构扫描：dex 计数、外部类型引用、API 指纹
python3 tools/dex-scan.py app.apk
python3 tools/dex-scan.py app.apk --classes      # 只要外部类清单

# 字节码级调用分析：外部方法依赖 + 调用热度
python3 tools/dex-calls.py app.apk --json calls.json
python3 tools/dex-calls.py app.apk --show android/opengl   # 看某个包的精确方法清单

# 调用图：入口点发现 + 可达性
python3 tools/dex-flow.py app.apk --list-entries
python3 tools/dex-flow.py app.apk --entry GameViewOpenGL.onDrawFrame
```

`dex-calls.py` 导出的 `Dex` 类可被其他脚本 `SourceFileLoader` 复用（已有先例：`dex-flow.py`）。

---

## 7. 当前状态

### 已完成
- [x] APK 完整静态分析（结构 / 类型 / 字节码 / 调用图 / AndroidManifest）
- [x] 架构还原（分层、主循环、线程模型、渲染双后端）
- [x] 781 个外部方法的精确桩规格
- [x] **Java 桩工程自动生成并编译通过**（245 类，`javac` 零错误）
- [x] 构建链 `build.sh`（stubs / jar / dex / wasm / assets / all）
- [x] 资源清单与加载策略（首屏 eager 仅 0.8 MB）
- [x] 千单位压测脚本（三阶段采样 + 判定报告）
- [x] 三条路线评估与工期修正
- [x] GitHub Pages 站点 + Actions workflow
- [x] 路线 A 的部署脚本
- [x] 五个可复现的分析/生成工具

- [x] **dex → jar 转换**（dex2jar 2.4，`rw.jar` 1,664 类）
- [x] **TeaVM 编译验证（M0）** —— 84 类 / 1,240 方法，零错误
- [x] Maven 依赖自动拉取（`fetch-maven.py`，无 mvn 环境）

- [x] **M1 第一批：Canvas2D 后端**（9 类 / 1,790 行实现，浏览器内实绘验证通过）
- [x] **RW 适配器链路打通**：`m/h` 未经修改即可转调到新 Canvas，浏览器内实绘确认
- [x] **RW 图像链路打通**：`Bitmap → m/e → m/h → drawBitmap` 浏览器内实绘确认
- [x] **真实游戏资源可渲染**：`assets/units/tanks/tank.png` 浏览器内实绘确认
- [x] **GLES20 → WebGL1**：53 个方法实现，着色器三角形实绘确认（阶段 2 起步）
- [x] **Buffer 桥接**：`java.nio.Buffer` → typed array（零拷贝优先），FloatBuffer 上传实绘确认
- [x] **RW 渲染器可运行**：`b/t` 实例化 + `b()`（glClear）实测通过，glError=0
- [x] **真实关卡渲染**：TMX → JSON 转换器 + 三层叠加渲染，16875 tile / 220ms
- [x] **相机 + rAF 主循环**：拖拽平移 / 滚轮缩放 / FPS 显示，1:1 像素视口
- [x] **单位实体化**：64 个单位，车体 + 炮塔分层，跟随相机

### 通向真游戏：引擎初始化（进行中）

`gameFramework/k` 是抽象类，真机实现是 `game.i`，由平台适配器 `gameFramework/af` 创建
（`af` 在 `k.<clinit>` 里被赋给静态字段 `dv`，所以不需要我们注册）。入口就是：

```java
android.content.Context ctx = new android.content.Context();   // impl 已提供
com.corrodinggames.rts.game.i engine = new com.corrodinggames.rts.game.i(ctx);
engine.a(ctx);                                                  // k.a(Context)
```

**已扫清的两个障碍**

1. **TeaVM 0.14 遇到 `monitor-enter/exit` 会在依赖分析阶段 NPE**，整个 AOT 编译直接失败。
   RW 的字节码里有 **1,100 条** monitor 指令。Web 端是单线程（rAF 驱动），锁本来无意义 ——
   `tools/java/rwtool/StripMonitors.java` 用 ASM 把它们全换成 NOP，`build.sh` 的 wasm
   步骤会自动生成 `build/rw-nosync.jar` 并优先使用。
2. **桩类只有无参构造**，导致 `new PointF(x, y)` 这类调用全部缺符号。
   `gen-stubs.py` 现在会从 method_ids 里收集所有 `<init>` 签名并逐个生成构造器重载。

**运行时补齐（`impl/rwutil/`）**

`java.util.concurrent.*` 与 `java.net.*` 在 TeaVM classlib 里要么没有、要么不完整，
而 RW 的引擎大量使用。解决办法是**类级重定向**：自己在 `rwutil` 包下写等价实现，
再用 ASM 把 RW 字节码里的引用整体改指向 `rwutil.*`（`StripMonitors` 同时做 monitor 剥离、
类重定向、方法重定向三件事）。

已提供：`ConcurrentLinkedQueue`、`LinkedBlockingQueue`、`ReentrantLock`（单线程恒可获取）、
`ExecutorService`/`Executors`/`Future`（同步执行）、`Net$*`（socket 桩）、`RT`（System/Runtime 补丁）。

> 注意：TeaVM 的 classlib **优先于外部 classpath**，直接在 jar 里放 `java.*` 类会被忽略，
> 必须走重定向。

**自动补桩（`tools/java/rwtool/GenMissing.java` + `tools/gen-loop.sh`）**

缺失符号太多，手工补不划算。加了两个工具：

- `GenMissing` 解析 TeaVM 的错误日志（`Class X was not found` / `Method X.y(...)...` / `Field X.f ...`），
  用 ASM **按原类名**生成桩类。注意**不能**用类重定向：ASM 的 `ClassRemapper` 会把方法描述符里的
  类型一起改名，导致与 JDK 类的方法签名对不上（`Throwable.printStackTrace(PrintWriter)` 这类）。
- `gen-loop.sh` 把「编译 → 生成 → 合并进累积 jar → 再编译」串成循环。

它只生成第三方库（`org.*`）的类；`java.*`、`com.*`、`android.*`、`rwutil.*` 一律跳过
（分别因为：不能自己定义、是游戏自己的类、是我们的层）。

**当前卡点：5 个，且不再收敛。** 剩下的全是硬骨头：

| 缺失 | 为什么自动生成解决不了 |
|---|---|
| `java.io.ObjectStreamField`、`AtomicMarkableReference` | `java.*`，TeaVM 只从自己的 classlib 找 |
| `java.io.PrintWriter(File)` 构造 | 同上；且它作为 `throwable.printStackTrace(PrintWriter)` 的参数，重定向会坏签名 |
| `InGameActivity.isFinishing()` | 来自 `Activity` 桩，需要给桩类补继承来的方法 |
| `HttpUriRequest.setHeader` | 生成的接口已含该方法，但调用方要的是实现类（`HttpPost` 等一整条 httpclient 链） |
| `DocumentBuilderFactory` | `javax.*`，生成后仍缺内部方法 |
| `StringEntity(String, ContentType)` | 需要完整 httpclient 实现类 |

### 已突破：整台引擎能编译进 TeaVM（缺失 0）

关键发现和手段：

1. **`org/teavm/classlib/...` 的类会从 classpath 加载，`java.*` 不会。**
   TeaVM 的类名映射是 `org.teavm.classlib.java.io.TXxx` ↔ `java.io.Xxx`。
   直接往 classpath 放 `java/io/Xxx.class` 实测**无效**（被 classlib 遮蔽），
   但放 `org/teavm/classlib/java/io/TXxx.class` **有效**。
   `impl/classlib/` 下就是这种补丁（已补 `TObjectStreamField`、`TAtomicMarkableReference`）。
2. **`javax.*` 走不了 classlib 映射**，只能全套重定向到 `rwutil.Xml`。
3. **联机用的 Apache HttpClient 直接裁剪**：`TrimHttp` 用 ASM 把方法体里引用
   `org/apache/http` 的方法整个换成 `return <默认值>`。补桩补不动 —— 每补一个类
   就暴露整条类图（HttpPost → HttpParams → LogFactory …）。
4. **`getClass()` 在 TeaVM 上没有元数据**，`getClass().equals(X.class)` 会变成
   `null.equals(...)`。`PatchGetClass` 把 57 处 `getClass()` 换成 `ldc 当前类`。

**构建流水线**（`build.sh wasm` 未来要串起来）：

```
rw.jar
 → StripMonitors  (monitor→NOP + 类/方法重定向 + new 重定向)  → rw-nosync.jar
 → TrimHttp       (裁掉引用 org/apache/http 的方法)           → rw-trimmed.jar
 → PatchGetClass  (getClass 替换)                            → rw-final.jar
 → TeaVM → classes.js（22 MB，gzip 后 1.6 MB）
```

### 一键构建：`tools/build-engine.sh`

把整条流水线串成一条命令（输出到 `/tmp/engine`）：

```bash
./tools/build-engine.sh
# → ✓ /tmp/engine/classes.js  21.2 MB  缺失 0
```

它做：编译 ASM 工具 → 编 classlib 补丁 → 编 rwutil → StripMonitors →
TrimHttp → PatchGetClass → TrimMethod → 编 launcher → TeaVM。

### ✅ `game.i.a(Context)` 已跑通（跳过 mod 加载）

浏览器实测日志：

```
[step] 44 new game.i (GameEngine)
[step] 45 engine constructed
[step] 46a new gameFramework.utility.m(ctx)   ✓
[step] 46b gameFramework.cf.a()               ✓
[step] 46c new gameFramework.cf(engine)       ✓
[step] 46d gameFramework.cg.C                 ✓ init total
[step] 46  engine.a(ctx) ok
main 正常返回（无异常）
```

**手段**：`init()` 里有一部分会抛 `custom.ch`（mod 自定义单位系统，48 个类引用），
我们的 AssetManager 是空的，它必然失败，而调用方把它包成 `RuntimeException` 重抛，
导致整个初始化中断。新增 `PatchAthrow` 工具把 `game.i.a(Context)` 里所有 `athrow`
换成 `return` —— 首版不要 mod 支持，让它失败后安静返回。

> 注意：这是「半初始化」。Context / 设置 / 资源索引 / 渲染器都建好了，
> 但自定义单位与资源表没加载。`k` 对象存在，不代表每个子系统都可用。

**定位方法**（TeaVM 无 Java 异常栈时的通用手段）：
从生成的 JS 里找 catch 块，反查 `(ccrg_k_t()).$o4()` 这类调用 ——
`$o4` 是 TeaVM 内部重命名，javap 里查不到，只能从 JS 侧看。

### ✅ 游戏主循环 tick 已跑通

`ak.run()` 的真实形状（从字节码还原）：

```java
k.W();                                  // 静态初始化
k ctx = k.t();                          // 拿 GameContext
while (true) {
    long t0 = nanoTime();
    ctx.a(delta, tickCount);            // ← 主 tick，签名 (FI)V
    long t1 = nanoTime();
    Thread.sleep(...);                  // 帧率控制
}
```

浏览器里手动驱动 5 帧，全部成功：

```
[step] 46 engine.a(ctx) ok
[step] 47 tick 0 ok  …  tick 4 ok
[step] 48 ticks done
main 返回，耗时 424ms        → 约 85ms/帧
```

> 注意：这是**空 tick**。没有地图、没有单位，tick 内部大部分逻辑是空转。
> 「跑起真实游戏逻辑」还需要把地图/单位喂进去。

### ✅ 资源管线打通（AssetManager 读真数据）

引擎的地图加载是**同步**的（`AssetManager.open` 返回 InputStream），浏览器没有同步文件系统。
方案：`tools/pack-assets-js.py` 从 TMX 出发递归解析它引用的 `.tsx` / `.png`，
全部 base64 打进 `window.__RW_ASSETS`；`AssetManager.open(name)` 从里面解码成 `byte[]`。

实测：关卡 1 那张图 38 个文件 / 338 KB 原始 → 464 KB base64，
引擎读回来 **25443 字节**（与 TMX 真实大小一致）。

> 坑：TMX/TSX 里的 `source="terrain/bitmaps/mountain.png"` 是相对 **`assets/tilesets/`** 的，
> 不是相对地图所在目录。按地图目录解析会全线 404。

### ✅ XML 真解析（DOM 遍历可用）

`rwutil.Xml` 从「返回空 Document 的桩」改成**桥接浏览器的 `DOMParser`**：
`parse(InputStream)` 读字节转文本交给 DOMParser，`Document`/`Element`/`NodeList`
全部代理到真实 DOM 节点。

实测关卡 1 的 TMX：

```
[step] 49 asset read -> 25443 bytes
[step] 50 xml root=map w=135 h=125
[step] 51 tilesets=32
```

> 坑：`getElementsByTagName` 返回的是 `HTMLCollection`，取值要用 `.length` / `.item(i)`，
> 不是 `.children`。

**编译规模跳到真实值**：1,896 个类 / 16,890 个方法（之前冒烟测试只有 481 类）。

### 历史卡点：`game.i.a(Context)` 初始化中途

`new game.i(ctx)` **已经在浏览器里成功**（`45 engine constructed`）。
`engine.a(ctx)` 崩在 `can't access property "$equals", var$2 is null`（某处 `null.equals(...)`）。

已逐段排除（都能单独跑通）：

| 步骤 | 结果 |
|---|---|
| `new gameFramework.utility.m(ctx)` | ✅ |
| `gameFramework.cf.a()` | ✅ 返回 1598000000 |
| `new gameFramework.cf(engine)` | ✅ |
| `gameFramework.cg.C` | ✅ `init total` |
| `engine.a(ctx)` 整体 | ❌ `$equals` on null |

`init()` 的字节码里第一段 `if (aR)` 分支被跳过（`aR=false`），接着读
`getDisplayMetrics().density`（已修）。崩点在偏移 5009 之后，尚未定位到具体行。
TeaVM 不提供异常堆栈，下一步需要二分裁剪 `init()` 的方法体来缩小范围。

| 类别 | 例子 | 难度 |
|---|---|---|
| `java.util.concurrent.*`（TeaVM classlib 未实现） | `ConcurrentLinkedQueue`、`ReentrantLock`、`Executors`、`Future`、`LinkedBlockingQueue` | **高**——需要扩展 classlib，不能靠改桩 |
| `java.*` 的个别方法 | `System.exit`、`Runtime.halt/maxMemory`、`Thread.getState`、`PrintWriter(File)` | **高**——同上，java.* 不能自己定义 |
| 我们自己的实现/桩缺失 | `Canvas.rotate(FFF)`、`Canvas.scale(FFFF)`、`RectF.intersects`、`Paint.setXfermode`、`SoundPool(int,int,int)` | 低，直接补 |

> 注意：TeaVM 是**静态可达性**分析，只要在源码里引用 `game.i`（哪怕包在 `if` 里），
> 整个引擎依赖树都会被拉进来。所以补齐之前，`Bootstrap` 里对引擎的引用是断开的。

### 未开始
- [ ] **让 `b/t` 真正画出几何体（卡在这）** —— 当前状态与已排除项：

      **已查明**
      - `b/t` 构造函数里初始化了 `g[]`：`b/u("aPosition")`、`b/z("uMatrix")`、`b/z("uColor")`、
        `b/z("uProjection")`。**shader 里的名字必须与这些一致**，否则 getAttribLocation 返回 -1。
      - `b/t` 用的是 **client-side vertex array**（`glVertexAttribPointer(..., Buffer)`），
        调用前会主动解绑 VBO（`glBindBuffer(target, 0)`）。WebGL 没有 client-side array，
        已在 `GLES20` 里补上「临时 VBO」实现。
      - `glGetError` 是 sticky 的：之前看到的 1281 一直累积到 drawArrays 才被读到，
        实际来源是 **`vertexAttribPointer(client-side)`**（用 GLES20 的 `sink` 钩子逐调用确认）。

      **仍卡住**：临时 VBO 那条路径的 `vertexAttribPointer` 报 1281。参数
      `idx=0,size=2,type=0x1406,normalized=false,stride=0,offset=0` 全部合法，
      怀疑是 `toView()` 给出的 `Float32Array.create(ab, byteOffset, length)` 的
      offset/长度问题（见 `docs/m1-rw-gl-trace.png` step 34 的完整日志）。

      **调试基建已就位**：`GLES20.sink` 钩子 + `checkErr()` 逐调用报错，
      设 `GLES20.sink` 即可把 GL 调用序列打到页面，后续排查直接复用。
- [ ] 其余桩实现（`EGL10`、`SoundPool`/`MediaPlayer`、`SharedPreferences`、`View`/`Activity` 外壳）
- [ ] 千单位压测实测数据（脚本已就绪，缺设备）
- [ ] 可达性展开：桩是空实现会截断 TeaVM 的可达性分析，只有 84 类被编译；
      实现桩之后这个数字会跳上去，届时才是真实的编译规模

### 快速上手
```bash
./build.sh jar      # 生成并编译桩（当前环境的完整可跑路径）
./build.sh all      # 全链路（dex/wasm 步骤缺工具时会给出提示并跳过）
./deploy/bench-android.sh   # 有 redroid 设备时做千单位压测
```

---

## 8. 下一步三个选项

**选项 1：桩的功能实现**（M1，工作量最大）
构建链已全线打通（`./build.sh all` 16.7 秒零错误）。现在 `stubs/src/` 里每个方法都是
`return null;` / `{ }`，把它们替换成真正的 WebGL / WebAudio / Canvas2D 调用即可。
建议顺序：先 `m/h`（Canvas 后端，阶段 1 主入口）→ 再 `GLES20` + `b/t`（阶段 2 画质）。

**选项 2：千单位压测**（1 天，**推荐**）
在 Android 容器里跑游戏，用 `adb shell dumpsys meminfo` + `top` 观察千单位场景的内存与帧率。
这决定路线 B 是否值得全额投入，比写 GL 层更能提前暴露风险。

**选项 3：可达性展开**（半天）
当前只有 84 类被 TeaVM 编译，因为桩是空实现会截断可达性。
把 `web/src/rwweb/Bootstrap.java` 的 `touch()` 换成真实调用（`new` + 调方法），
能量出"实现桩之后"的真实编译规模 —— 这个数字直接决定产物体积。

---

## 9. 环境坑（已踩过，别再踩）

| 坑 | 现象 | 解法 |
|---|---|---|
| GitHub Release 下载 | `curl` 卡住直到超时（dex2jar / jadx 都中招） | 换 Maven Central `repo1.maven.org`，或自写解析器（已采用） |
| Firefox headless 截图 | `Firefox is already running` 报错 | 用独立 `--profile /tmp/ff2`，每次换新目录 |
| DEX 字符串表 DEX 的 `LL` 串 | 正则扫二进制会产 `Lcom/...` 假阳性 | 主解析走 string_ids（绝对偏移，**不加 data_off**），正则仅兜底 |
| DEX header `data_off` | 是 `0x6C` 不是 `0x68`（`0x68` 是 `data_size`） | 记牢 |
| AXML 属性解析 | `ResXMLTree_attribute` = 12B 头 + `Res_value{size u16, res0 u8, dataType u8, data u32}` = 20B | 漏掉 `res0` 会读错 dataType |
| 大页面截图 | Firefox `--screenshot` 只截视口 | 用 `--window-size=1280,4400` 之类的大尺寸 |
| 桩的 static 判定 | 只在调用点出现的方法才能判定 static；未调用的会漏 | `gen-stubs.py` 里维护 `ALL_STATIC` 白名单（GL 工具类、Log、Process…），并排除 `toString/hashCode/equals` 等 Object 方法 |
| TeaVM 的 `-p` 不是被编译类路径 | 只给 `-p` 会报 "There's no main class" | 被测 jar 必须放进 **JVM 的 `-cp`**；`-p` 只用于增量重载 |
| TeaVM 0.14 目标名 | `-t wasm` 不存在 | 用 `-t js` 或 `-t wasm-gc`；CLI 主类是 `org.teavm.cli.TeaVMRunner`（不是 TeaVM） |
| 类名与包名同形（RW 特有） | `com.corrodinggames.rts.gameFramework.b` 既是类又是包，Java 源码写 `b.t` 无法解析 | 编译 launcher 时用剔掉 `b.class` 的 jar，TeaVM 阶段再用完整 jar（`build.sh wasm` 已自动化） |
| GitHub Release 又能下了 | 之前 `curl` 卡住，实际 19 MB / 2.5 秒 | 用 `-C -` 断点续传 + `--retry`；别用后台 job 挂着等 |
| 生成桩的四个真实坑 | ① 参数必须带名 ② 接口字段必须 `final` + 初始化 ③ 匿名类 `$1` 非法 ④ 类名与包名同形（`a.a.a`）冲突 ⑤ `interface a` 内 `a.a.a.h` 被类型遮蔽 | 均在 `gen-stubs.py` 内已处理，改动生成器时不要回退 |

---

## 10. 未验证的假设（写代码前必须确认）

1. **`canvasDirectGL` 关闭后游戏真的完整可玩** —— 目前只从字符串与日志推断，未实机验证。
2. ~~`m` 包确实只是"Canvas 后端可替换"~~ —— **已部分验证**：`m/h` 未经任何修改，
   在浏览器里成功转调新的 `android.graphics.Canvas` 并画出内容（`docs/m1-rw-adapter.png`）。
   剩余：`m` 包里其他类（`m/fh`/`m/fi`/`m/fj` 等别的实现）能否同样即插即用，尚未验证。
   `m/e`（位图包装）已验证可用 —— 直接吃我们的 `Bitmap`。
3. **千单位性能** —— 完全没有数据。
4. ~~TeaVM 能编译 14,341 个方法而不炸~~ —— **已部分验证**：M0 通过（84 类/1,240 方法零错误）。
   但桩是空实现，会截断可达性，真实规模要等桩实现后才知道。
5. **`a/a/*` 包的归属** —— 22 个混淆类，无法确定全是第三方，可能含局域网发现逻辑。

> 任何接手者推进前，先挑第 1、3 条做实测。这两条决定项目可行性，其余都是工作量问题。

---

## 11. 约定

- 回复用户用**简体中文**；代码标识符、命令、日志保留原文。
- 提到文件时给可点击的相对路径。
- **不要提交 APK 本体到 git**（25 MB）。走 Release 附件。站点资源 21.7 MB 可以直接托管。
- 不要在没有要求时 `git commit` / `git push`。
- 新增分析结论时同步更新 `docs/ARCHITECTURE.md` 和本文件的「硬数据」节。
- 数据有冲突时以 `tools/` 里的脚本输出为准，不以历史文档为准。

---

## 12. 变更日志

| 日期 | 内容 |
|---|---|
| 2026-11-01 | 初版。APK 结构分析 → 三条路线 → 站点骨架 |
| 2026-11-01 | 第二轮：字节码级调用分析，桩规模 465→138 类，工期 2–4→2–2.5 人月 |
| 2026-11-01 | 第三轮：调用图还原主循环 `ak.run`，确认渲染双后端与线程模型；新增本记忆文件 |
| 2026-11-01 | 第四轮：自动生成 Java 桩工程（245 类，javac 通过）；构建链 `build.sh`；资源清单；压测脚本 |
| 2026-11-01 | 第五轮：**M0 通过**。dex2jar 下载成功（19 MB/2.5 s）→ `rw.jar`；`fetch-maven.py` 自解析 Maven 依赖（56 jar）；TeaVM 0.14.1 编译 84 类/1,240 方法零错误；`build.sh all` 全绿 16.7 s |
| 2026-11-01 | 第六轮：**M1 第一批完成**。`impl/src/android/graphics/` 9 个类手写 Web Canvas2D 实现；浏览器内实绘验证（`docs/m1-canvas-smoke.png`）；build.sh 接入 impl 层 |
| 2026-11-01 | 第七轮：**RW 字节码在浏览器里绘制成功**。`gameFramework/m/h` 无需改动即转调新 Canvas；launcher 剔除列表参数化（`b`、`m` 两个类名/包名同形冲突） |
| 2026-11-01 | 第八轮：**图像链路打通**。`Bitmap → m/e → m/h → Canvas.drawBitmap` 实测通过（`docs/m1-rw-image.png`），游戏贴图绘制路径可用 |
| 2026-11-01 | 第九轮：**真实游戏贴图渲染成功**。`assets/units/tanks/tank.png` 经 `Bitmap → m/e → m/h` 在浏览器画出（`docs/m1-real-assets.png`）；`Bitmap` 泛化为可包装任意图像源；修 `build.sh` 不检测 impl 源码新鲜度的坑 |
| 2026-11-01 | 第十轮：**GLES20 → WebGL1 打通**。53 个方法实现 + int↔对象句柄映射；着色器三角形实绘成功（`docs/m1-webgl.png`）；踩了 `preserveDrawingBuffer` 与 headless 截图不合成 WebGL 层的坑 |
| 2026-11-01 | 第十一轮：**Buffer 桥接打通**。`java.nio.Buffer` → WebGL typed array（零拷贝 + 复制回退）；全程走 `GLES20` 接口的三角形实绘成功（`docs/m1-gles20-buffer.png`）。接 `b/t` 的前置条件齐了 |
| 2026-11-01 | 第十二轮：**RW 渲染器跑起来了**。`b/t` 在我们的 WebGL 上实例化并执行每帧入口 `b()`（glClear），`glError=0`（`docs/m1-rw-renderer.png`）；引用 `b/t` 使编译规模从 161 类跳到 404 类 / 724 KB |
| 2026-11-01 | 第十三轮：**b/t 绘制尝试**。实现 `b/m` 着色器接口 + `b/ac` 材质，调用 `a(float[],int,int,ac,m)` 能走到 `glDrawArrays`，但 `glError=1281` 未画出（`docs/m1-rw-draw-arrays.png`）。定位到问题在 `b/x` attribute 描述符与内部状态缓存，记录为下一步 |
| 2026-11-01 | 第十四轮：**GL 调用级调试**。发现 shader 名必须匹配 `g[]` 里的 `aPosition/uMatrix/uColor/uProjection`；发现 `b/t` 用 client-side vertex array 并为此补了临时 VBO；用 `GLES20.sink` 钩子把 1281 精确定位到 `vertexAttribPointer` 而非 `drawArrays`（`docs/m1-rw-gl-trace.png`）。仍未画出 |
| 2026-11-01 | 第十五轮：**真实关卡渲染成功**。`tools/tmx2json.py`（支持外部 .tsx、base64+gzip 解压）；关卡 1 地形+装饰+单位三层共 16875 tile / 220ms（`docs/m1-full-map.png`）；踩了三个时序/类型坑：`window.load` 里的异步不进入截图、JS 的 `undefined` ≠ Java `null`、fetch 不计入 load 事件 |
| 2026-11-01 | 第十六轮：**相机 + 主循环**。`requestAnimationFrame` 驱动，离屏地图裁剪到视口，拖拽平移 + 滚轮缩放 + FPS（`docs/m1-camera.png`）；站点整理为 `demo/`（预编译产物入库，Pages 免构建）；完成首次 git 提交 |
| 2026-11-01 | 第十七轮：**单位实体化**。从 Units 层提取 64 个坐标，用真实 `tank.png` + `tank_turret.png` 分层绘制（车体固定、炮塔独立旋转，`tank.ini` 的 imageScale 0.8）；单位随相机平移缩放（`docs/m1-units.png`）|
| 2026-11-01 | 第十八轮：**扫清引擎初始化的两个硬障碍**。① TeaVM 遇 monitor 指令 NPE → 写 ASM 工具把 1,100 条 monitor 换成 NOP（`build/rw-nosync.jar`），分析阶段从崩溃变为 13.8 秒通过；② gen-stubs 生成全部构造器重载；③ 手写 `android.content.Context` / `SharedPreferences`。当前卡在 69 个缺失符号 |
| 2026-11-01 | 第十九轮：**运行时补齐 + 类/方法级重定向**。新增 `impl/rwutil/`（并发队列、锁、执行器、socket 桩、RT 补丁）；`StripMonitors` 扩展为「monitor 剥离 + 类重定向 + 方法重定向」三合一。缺失符号 87 → 35，但呈震荡（每修一批暴露新一批） |
| 2026-11-01 | 第二十轮：**自动补桩工具链**。`GenMissing`（解析 TeaVM 日志用 ASM 按原类名生成桩）+ `gen-loop.sh`（编译→生成→合并→再编译的循环）。缺失符号 35 → 7~10 并停止收敛；发现**类重定向会让方法描述符里的类型一起改名**，从而破坏与 JDK 的签名一致性，故第三方库必须按原类名生成 |
| 2026-11-01 | 第二十一轮：**ASM 访问器顺序 + new 重定向**。发现自定义 `ClassVisitor` 若放在 `ClassRemapper` 之内则完全不会被调用（必须在外层）；新增「只重定向 new 指令」的方案解决 `PrintWriter(File)` 这类 classlib 缺构造的问题（子类 is-a 关系保持签名一致）；`gen-stubs` 增加 `EXTRA_METHODS` 补父类方法。缺失符号 10 → 5 |
| 2026-11-01 | 第二十二轮：**整台引擎编译通过（缺失 0）**。① 发现 `org/teavm/classlib/` 命名空间可以从 classpath 加载（`java.*` 不行），用它补 `TObjectStreamField`/`TAtomicMarkableReference`；② `TrimHttp` 把联机用的 Apache HttpClient 方法体整体裁掉；③ `PatchGetClass` 处理 TeaVM 没有 `getClass()` 元数据的问题；④ 实现 `Resources`/`AssetManager`/`PackageManager`，补齐 `DisplayMetrics` 字段。`new game.i(ctx)` 在浏览器里成功，`engine.a(ctx)` 卡在某处 `null.equals()` |
| 2026-11-02 | 第二十三轮：**引擎构建一键化 + 继续推进初始化**。新增 `tools/build-engine.sh`（rw.jar → 四道 ASM 变换 → TeaVM，一条命令出 21.2 MB 的 classes.js）；手写 `android.content.pm.Signature`（TeaVM 的 `toByteArray` 要访问 `data` 字段）；裁掉 `gameFramework.f.b(byte[])`（TeaVM 的 Formatter 不支持 `BigInteger` 的 `%X`）。初始化从 `.data is null` 推进到 `Error: null`（`custom.ch` 异常被 catch 后重抛，原始栈丢失） |
| 2026-11-02 | 第二十四轮：**`game.i.a(Context)` 跑通**。从生成的 JS 反查出 `k.t().$o4()` 是抛 `custom.ch`（mod 自定义单位）的地方；新增 `PatchAthrow` 工具把 init 里所有 `athrow` 换成 `return`，让缺资源的子系统安静失败。引擎初始化链全绿：Context → game.i 构造 → utility.m → cf → cg.C → `engine.a(ctx) ok` |
| 2026-11-02 | 第二十五轮：**游戏主循环 tick 跑通**。还原 `ak.run()` 的真实形状（`k.W()` → `k.t()` → `while(true) { ctx.a(delta,tick); sleep }`），在浏览器里手动驱动 5 帧 `k.a(FI)V` 全部成功，424ms / 5 帧 ≈ 85ms 每帧。注：这是空 tick（无地图无单位） |
| 2026-11-02 | 第二十六轮：**资源管线打通**。`tools/pack-assets-js.py` 从 TMX 递归解析引用的 tsx/png，base64 打包成 `window.__RW_ASSETS`；`AssetManager` 改为从它读取（base64 → byte[]）。实测引擎读回关卡 1 的 TMX 25443 字节，与真实文件一致。踩坑：TMX 里的 `source=` 路径基准是 `assets/tilesets/` 而非地图目录 |
| 2026-11-02 | 第二十七轮：**Xml 桥接 DOMParser + 全链路验证**。`rwutil.Xml` 改为代理真实 DOM，TMX 解析出 `root=map w=135 h=125`、遍历出 32 个 tileset。编译规模 481 → **1,896 类 / 16,890 方法**（真实值）。修 `build-engine.sh` 的 `set -e` 假失败与 rwutil 编译缺 TeaVM classpath |
