# 推送到 GitHub

仓库：https://github.com/mmk7ZDQ/webgame.git
本地：`~/文档/rw-web`，分支 `master`，所有工作已提交。

## 当前状态

- remote 已配置为 SSH：`git@github.com:mmk7ZDQ/webgame.git`
- 本机 SSH key（`~/.ssh/id_ed25519`）能通过 GitHub 认证，但被识别为 **deploy key**，
  对 `mmk7ZDQ/webgame` 没有写权限 → `Permission to mmk7ZDQ/webgame.git denied to deploy key`

## 两个解法（任选其一）

### A. 用 Personal Access Token（最快）

```bash
cd ~/文档/rw-web
git remote set-url origin https://github.com/mmk7ZDQ/webgame.git
git push -u origin master
# 用户名填 mmk7ZDQ，密码填 PAT（需 repo 权限）
```

或用一行命令内嵌 token（注意别把 token 提交进 git）：

```bash
git push https://mmk7ZDQ:<TOKEN>@github.com/mmk7ZDQ/webgame.git master
```

### B. 给现有 deploy key 写权限

到 https://github.com/mmk7ZDQ/webgame/settings/keys
找到当前这把 key，勾选 **Allow write access**，然后：

```bash
cd ~/文档/rw-web
git push -u origin master
```

如果是「Deploy keys」而不是「SSH keys」，deploy key 需要显式勾选写权限；
更省事的做法是把 `~/.ssh/id_ed25519.pub` 加到 **账号级 SSH keys**
（https://github.com/settings/keys）。

## 推送内容

```
9e6da01  Xml 桥到浏览器 DOMParser：TMX 真正能解析
c97ba01  资源管线打通：AssetManager 从预打包 JS 读取真实资源
268f89d  游戏主循环 tick 在浏览器里跑通（5 帧 / 424ms）
9a0d448  game.i.a(Context) 跑通：PatchAthrow 让缺资源的子系统安静失败
7f8fdd9  引擎构建一键化 + 初始化继续推进
...（共 26 轮，完整历史见 git log）
```

注意：`demo/classes-engine.js`（21 MB）在 `.gitignore` 里，不入库。
需要时跑 `./tools/build-engine.sh` 生成到 `/tmp/engine/`。
