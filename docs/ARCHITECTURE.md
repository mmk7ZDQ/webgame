# 架构分析：铁锈战争的移植可行性到底在哪

对 APK 做**字节码级**调用分析（`tools/dex-calls.py`，遍历 11,333 个方法体、546,402 条指令）后的架构还原。
结论和第一版蓝图有关键修正。

---

## 1. 分层图景

```
┌─ appFramework ────────────────────────────────────────────────┐
│  16 个 Activity（菜单/大厅/设置/关卡…）      原生控件 Button/TextView…│
│  GameView 抽象基类（33 方法，构建游戏主循环接口）                   │
│    ├─ GameViewOpenGL      GLSurfaceView + EGL  → 48 方法        │
│    ├─ GameViewThreaded    SurfaceView 独立线程 → 33 方法        │
│    └─ GameViewNonSurface  View.onDraw(Canvas) → 41 方法  ★软件路径│
└───────────────────────────────────────────────────────────────┘
            │ getRenderer() / getNewCanvasLock()
            ▼
┌─ gameFramework/m ── 自研跨平台 2D 绘图框架（≈150 类）────────────┐
│  抽象: m/h(71) m/i(77) m/l(67) m/n(68) m/o(74)                  │
│  实现: m/fh(68) m/fi(62) m/fj(63)  ── 多个后端                  │
│    ├─ m/h  ← 唯一包装 android.graphics.Canvas 的类（71 方法）     │
│    └─ m/fm ← GL 文本/精灵辅助（只调 28 次 GL10）                  │
│  控件: 约 150 个 2 方法小类（按钮/列表/滚动条/输入框…）            │
└───────────────────────────────────────────────────────────────┘
            │
┌─ gameFramework/b ── 3D/GPU 渲染层（≈75 类）────────────────────┐
│  b/t(67)  ← 唯一直接调用 android.opengl.GLES20 的类（70 次）      │
│  b/h(20) b/p(24) b/c(21)  抽象渲染接口 + 纹理 + 顶点缓冲          │
│  b/ai b/ag b/as b/a/*  …  各渲染子系统（水面/阴影/后处理/雾）      │
└───────────────────────────────────────────────────────────────┘
```

**三个关键结构事实：**

1. **绘图有抽象层**。`gameFramework/m` 不是 android.graphics 的转发，而是自研框架，
   `m/h` 只是"Android Canvas 后端"。**换后端 = 改一个类，不动几千个调用点。**
2. **GL 入口收敛**。整个游戏只有 `b/t` 一个类直接碰 `GLES20`（70 次调用），
   加上 `m/fm` 的 28 次 `GL10`。**WebGL 兼容层的边界非常干净。**
3. **存在软件渲染后端**。`GameViewNonSurface` 用 `View.onDraw(Canvas)` 绘制，
   字符串表里有 `canvasDirectGL` 开关与 `Disabling opengl mode` / `Enabled opengl view` 日志。
   关掉 GL 后游戏仍可运行，只是失去队伍着色与后处理。

---

## 2. 外部桩：781 个方法，按层分布

`tools/dex-calls.py` 逐条指令统计出的**实际被调用**的外部方法数（不是类型引用数）：

| 层 | 类 | 方法 | 说明 |
|---|---:|---:|---|
| GPU · WebGL 兼容层 | 8 | 106 | `GLES20`(53) `EGL10`(12) `GL10`(21) `GLES11Ext`(5) `GLUtils`(4) `GL11`(4) + 少量 |
| 2D · Canvas/Paint/Bitmap | 18 | **184** | 最大头。`Canvas`(68) `Paint`(35) `Rect/RectF`(33) `Bitmap`(13) … |
| UI · 原生控件 | 21 | 138 | `Button`(20) `TextView`(18) `ImageView`(14) `LinearLayout`(13) `TableRow`(11) … |
| UI · 窗口与输入 | 18 | 84 | `View`(21) `MotionEvent`(14) `SurfaceView`(5) `SurfaceHolder`(6) … |
| 外壳 · Context/资源 | 18 | 78 | `Context`(16) `Intent`(16) `Resources`(5) `SharedPreferences`(5) … |
| 外壳 · Activity/Dialog | 9 | 60 | `Activity`(21) `AlertDialog$Builder`(12) `Dialog`(7) … |
| 音频 | 2 | 17 | `MediaPlayer`(13) `SoundPool`(4) |
| 其它 | — | 2 | — |

完整方法签名清单见 **[stub-spec.md](stub-spec.md)**（自动生成，可直接当接口定义用）。

> 注意和第一版蓝图的差别：之前按"类型引用"数是 465 类，但**真正需要实现的只有 138 类**——
> 其余 327 个类只在字段类型/异常声明里出现，从未被调用，写空壳即可。

---

## 3. UI 层的真实成本

16 个 Activity 全部用 Android 原生控件搭建，不是自绘：

| Activity | 控件调用数 | 主要控件 |
|---|---:|---|
| MultiplayerBattleroomActivity | 23 | Button / EditText / TextView / ListView |
| MainMenuActivity | 21 | Button / ImageView / LinearLayout |
| LevelSelectActivity | 14 | Button / TextView / ScrollView |
| LoadLevelActivity | 14 | Button / ProgressDialog |
| LevelGroupSelectActivity | 13 | Button / Gallery / TextView |
| ReplaySelectActivity | 12 | Button / ListView |
| SettingsActivity | 9 | CheckBox / SeekBar / Spinner / TableLayout |
| ModsActivity / MultiplayerLobbyActivity | 6 / 6 | Button / ListView |
| SettingsKeysActivity | 4 | Button / EditText |

而游戏内 HUD（血条、小地图、指令面板）走的是 `m` 包自绘，与 GL/Canvas 同源。

**这意味着两条 UI 路线：**

- **A. 复用 `m` 包**：把 `m` 的控件在 Web 端实现一遍，16 个 Activity 的布局代码基本能直接跑
  （因为它们本来就调用 `m` 包的 `a(...)` 而不是 Android 控件）——但实测 Button/TextView 的直接调用
  来自 Activity 本身，说明菜单界面确实用了原生控件，**这条路只覆盖游戏内 HUD**。
- **B. 菜单用 HTML/CSS 重写**：16 个界面，控件种类就 12 种（Button/TextView/ImageView/EditText/
  CheckBox/SeekBar/Spinner/ListView/Gallery/ScrollView/TableLayout/AlertDialog）。
  把 `android.widget.*` 桩成一个"记录布局意图、由 Web 端渲染"的迷你框架，比重写 16 个界面更省事。

推荐 B 的变体：**桩 `android.widget.*` 为一套 20 行的"虚拟控件树"**，运行时在 canvas 上方
用 DOM 渲染（按钮就是 `<button>`），点击回调直接回到 Java 侧。这样 16 个 Activity 代码零改动。

---

## 4. 修正后的工作量模型

初版蓝图按"71 个 GL 入口 + 150 个桩类"估 2–4 人月。实测后可以拆成两个可独立交付的阶段：

### 阶段 1：Canvas 软件路径（先跑起来，1–1.5 人月）

| 任务 | 内容 | 规模 |
|---|---|---|
| `m` 后端 | 写 `m/h` 的 Web 实现（WebCanvas2D + WebPaint） | ~1,200 LOC |
| 窗口层 | `GameViewNonSurface` → canvas + rAF 主循环 | ~300 LOC |
| 控件桩 | `android.widget.*` → DOM 虚拟控件树 | ~800 LOC |
| 输入 | `MotionEvent` → PointerEvent（含多点/框选） | ~300 LOC |
| 音频 | `SoundPool`/`MediaPlayer` → WebAudio | ~350 LOC |
| 存储 | `File`/`SharedPreferences` → OPFS + IndexedDB | ~300 LOC |
| 资源 | assets 映射表 + 分片加载 | 构建脚本 |

**出口标准：单机遭遇战可玩，无队伍着色/后处理/水面特效。**

### 阶段 2：WebGL 路径（恢复画质，约 1 人月）

| 任务 | 内容 | 规模 |
|---|---|---|
| `GLES20` 桩 | 53 个静态方法 → WebGL1 转发 | ~900 LOC |
| `b/t` 重写 | 缓冲/纹理/shader 管理层 | ~700 LOC |
| `GL10` 兼容 | 21 个固定管线方法 → 同一套 shader + uniform | ~400 LOC |
| `GLUtils` | `Bitmap` → `texImage2D` | ~100 LOC |
| 着色器 | 4 个团队色 + 2 个后处理，改 `#version` 与内置变量 | 少量 |

**出口标准：与 APK 画质对齐，千单位 30fps。**

> 先跑通阶段 1 的意义：它把"能不能玩"和"画质如何"解耦。阶段 1 完成后，
> 阶段 2 变成纯增量优化，风险大幅下降。

---

## 5. 资源格式：不需要转换

| 资源 | 格式 | Web 处理 |
|---|---|---|
| 地图 | **Tiled TMX**（orthogonal，20×20 tile）+ 同名 `_map.png` | 直接用 tmx 解析器，无需转换 |
| 单位 | 每单位一个目录，`.ini` 配置 + 多张 png（`_dead`/`_turret`/`_shadow` 变体） | 直接读取 |
| 贴图集 | `tilesets/*.png` | 直接加载 |
| 音乐 | 15 MB，ogg/mp3 | `decodeAudioData` |
| 文本 | `Strings_*.properties`（12 语言） | 原样 |
| 着色器 | GLSL，4 个文件用 `#version 130` + 内置变量 | 重写为 GLSL ES 1.00（`plainGDX.vert` 已是标准写法，可参照） |

**没有任何私有二进制格式需要逆向。** 这是又一个有利条件。

---

## 5.5 主循环与线程模型（方法级调用图还原）

`tools/dex-flow.py` 建立 14,341 个方法节点、33,533 条调用边后，主循环定位如下：

```
ak extends Thread
  ak.run()
    ├─ Process.setThreadPriority(...)      设定游戏线程优先级
    ├─ System.nanoTime / currentTimeMillis 计算帧间隔
    ├─ k.a(...)    ← tick：推进模拟
    ├─ k.t(...)    ← 被调用 944 次，全项目最热方法（渲染提交）
    └─ Thread.sleep(...)                   帧率控制
```

**`gameFramework/k` 是全局上下文（God object，127 个方法）**，
`k.t` 被调用 944 次、`k.d` 352 次、`k.b` 139 次 —— 这三个就是主循环的心脏。

线程清单：

| 线程类 | 职责 | 移植影响 |
|---|---|---|
| `gameFramework/ak` | **游戏主线程**（tick + render） | 必须改成 `requestAnimationFrame` 驱动 |
| `appFramework/af` | GL 渲染调度（`requestRender` + `wait`） | 合并进主循环 |
| `appFramework/ah` | 画布归还与缓冲池（`unlockAndReturnCanvas`） | 单线程后可直接删除 |
| `gameFramework/a/d` | 音频线程（`SoundPool.play` + `LinkedBlockingQueue.take`） | 改 WebAudio 后删除 |
| `gameFramework/j/*` | 联机：UDP 广播、TCP 服务器、大厅 HTTP | 首版全部裁剪 |
| `gameFramework/utility/e` `ak` | 文件解压 / IO | 保留但同步化 |

**渲染同步模型**（两种后端都是同一个模式）：

```
游戏线程                               UI/GL 线程
  │ 画到自己的离屏 buffer                │
  │ → lock → 交换 buffer → notifyAll ──→ │ tryLock → blit/onDrawFrame → unlock
```

`GameViewNonSurface.onDraw` 里的 `ReentrantLock.tryLock` + `Object.wait` + `Object.notifyAll`
就是这个双缓冲握手。**Web 端单线程化后，这套同步可以整体移除**，这是移植中少有的"变简单"的部分。

---

## 5.6 第三方代码（可直接裁剪）

| 包 | 内容 | 处理 |
|---|---|---|
| `com/bz/simplesdk/adviewdomestic/*` | **国内广告 SDK**（AdViewDomestic，HTTP 拉广告图） | 整体删除，无游戏功能 |
| `a/a/*`（22 类） | 混淆的第三方库（含 UDP 广播、线程池、文件工具） | 需甄别：`a/a/d.run` 处理 DatagramSocket，可能是局域网发现；其余多为工具类，可替换为 JDK 等价物 |
| `android/support/v4/*` | 旧版 support 库残余（6 类） | 空实现 |
| `org/apache/http/*` | 大厅 HTTP 客户端 | 首版裁剪 |

---

## 6. 剩余风险（按严重度）

| 风险 | 严重度 | 说明 | 对策 |
|---|---|---|---|
| 主循环与线程模型 | **高** | `GameViewThreaded` 有独立渲染线程 + `ReentrantLock`；`getGameThreadSync()` 同步点遍布 | Web 端单线程：把 `synchronized`/`Lock` 改为空实现，靠协作式让出（`await new Promise`）驱动 |
| 内存与 GC | **高** | `largeHeap=true`，RTS 后期单位上千；TeaVM 堆上限受 wasm 内存限制 | 千单位压测前置；必要时把单位对象池化 |
| 千单位渲染性能 | 中 | Canvas2D 路径在千单位下可能不够 | 正是阶段 2 存在的理由 |
| 原生控件的交互语义 | 中 | `ListView`/`Gallery` 的滚动惯性、`EditText` 输入法 | DOM 方案天然解决大部分 |
| 多点触控（框选+缩放） | 中 | RTS 核心操作 | PointerEvent 的 pointerId 映射到 MotionEvent 的 pointer index |
| 局域网联机 | 低 | `DatagramSocket` 不可用于浏览器 | 首版单机，联机后置为 WebRTC |
| 存档兼容 | 低 | `.rwsave`/回放格式不动 | 只换存储后端 |

---

## 7. 一页结论

- **可以移植**，且比初版估计更乐观：GL 与绘图都有干净抽象层，桩的真实规模是 138 类 / 781 方法。
- **有两条独立可交付的路径**：Canvas 软件路径先出可玩版本，WebGL 再补画质。
- **最大不确定性不在图形，而在线程模型与千单位性能**——建议先做一个 1,000 单位压力的
  最小验证，再决定是否投入完整移植。
- **资源零障碍**：TMX + ini + png，全部是公开格式。
