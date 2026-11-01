# CLAUDE.md

本项目的完整交接记忆在 **[AGENTS.md](AGENTS.md)**，请先读它。

该文件包含：实测数据、架构速查表、文件地图、工具用法、当前状态、
下一步选项、环境坑、未验证假设、协作约定。

按标签页需要，再进 `docs/`：

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) — 分层架构、主循环 `ak.run`、线程模型、风险表
- [docs/stub-spec.md](docs/stub-spec.md) — 781 个外部方法的完整签名
- [docs/PORTING.md](docs/PORTING.md) — GL 兼容层设计、统一着色器、构建链

---

**一句话项目定位**：把 Rusted Warfare 1.15 的 Android APK 移植到浏览器，
挂 GitHub Pages。零 native 库、GL 入口收敛在单个类、绘图有可替换抽象层 —— 可移植，
工期两阶段共 2–2.5 人月。当前处于「分析完成、未开始写移植代码」阶段。
