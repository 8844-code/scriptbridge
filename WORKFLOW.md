# ScriptBridge 开发协作流程

## 角色定义

### Claude（规划师）
- ✅ 整体架构设计和规划
- ✅ 检查项目进度（git log, git diff, git status）
- ✅ 定义清晰的任务清单和验收标准
- ✅ 代码逻辑审查
- ❌ 无法实时看到视觉效果和浏览器渲染
- ❌ 无法运行代码验证

### Cursor（执行师）
- ✅ 实时编辑代码
- ✅ 在浏览器中看到效果
- ✅ 快速迭代和调整细节
- ✅ 验证代码是否真的能运行
- ✅ 发现视觉 bug 和交互问题
- ❌ 不做全局架构决策

---

## 工作流程（每个任务循环）

### 1️⃣ 规划阶段（Claude）
```
- 检查项目当前状态（git log, git diff）
- 理解已完成的功能
- 确认下一步优先级
- 给 Cursor 一个明确的任务清单（写入 CURSOR_TASK.md）
```

### 2️⃣ 执行阶段（Cursor）
```
- 打开项目，自动读取 CURSOR_TASK.md 找最新未完成任务
- 在本地 IDE 中实现功能
- 在浏览器中测试看效果
- 完成后 git commit + git push
- 在 CURSOR_TASK.md 末尾写完成状态
```

### 3️⃣ 验证阶段（Claude）
```
- 检查 git log 和新提交
- 审查代码逻辑是否正确
- 如发现问题，反馈给 Cursor
- 否则，规划下一个任务
```

---

## 当前项目状态（2026-05-09 更新）

### ✅ 已完成的全部页面

| 页面 | 功能 | 状态 |
|------|------|------|
| `index.html` | 首页候补名单，双语，实时人数，重复邮箱检测，Browse 入口 | ✅ |
| `login.html` | 登录，双语，忘记密码入口 | ✅ |
| `signup.html` | 注册，双语，角色选择（创作者/买家） | ✅ |
| `forgot-password.html` | 密码重置邮件发送 | ✅ |
| `reset-password.html` | 重置密码表单 | ✅ |
| `dashboard.html` | 个人主页，双语，角色对应功能入口，编辑资料入口 | ✅ |
| `profile-edit.html` | 编辑显示名称和简介 | ✅ |
| `scripts-upload.html` | 上传作品，可见性选择（公开/草稿），Supabase Storage | ✅ |
| `scripts-browse.html` | 浏览作品（需登录），搜索+类型筛选+价格区间，仅显示 published | ✅ |
| `scripts-list-author.html` | 我的作品，状态徽章，下架/上架按钮，Edit 按钮 | ✅ |
| `script-detail.html` | 作品详情，联系卖家（mailto），购买按钮（待开发） | ✅ |
| `script-edit.html` | 编辑已上传作品信息 | ✅ |
| `marketplace.html` | 公开市场（无需登录），仅显示 published 作品 | ✅ |
| `admin-waitlist.html` | 候补后台（管理员专属），实时数据，CSV 导出 | ✅ |
| `terms.html` | 服务条款，双语 | ✅ |
| `privacy.html` | 隐私政策，双语 | ✅ |
| `404.html` | 404 错误页，双语 | ✅ |

### ✅ 已完成的系统功能

- `js/theme.js` — 深色/浅色/自动主题，持久化
- `js/nav-mobile.js` — 滚动隐藏导航（手机+桌面）
- `js/auth.js` — requireAuth() 和 getCurrentUser()
- `js/supabase-client.js` — Supabase 客户端（window.supabase_client）
- `css/common.css` — 全局样式，en-only/zh-only 语言切换系统
- Supabase Storage RLS 权限已配置（scripts-files bucket）
- `scripts` 表含 `status` 字段（published/draft）
- 全站中文文案规范（作品/个人主页）
- `.cursorrules` — Cursor 自动读任务工作流

### ❌ 尚未开始（按优先级）

| 优先级 | 功能 | 说明 |
|--------|------|------|
| 🔴 高 | **购买询盘系统** | 买家发意向→创作者接收→平台撮合 |
| 🔴 高 | **我的询盘页** | 买家看发出的询盘，创作者看收到的询盘 |
| 🟠 中 | 试读保护 | 全文锁定，只给30%试读，未购买不能下载全文 |
| 🟠 中 | 真实支付集成 | Stripe/微信/支付宝，需要营业执照 |
| 🟡 低 | 邮箱验证 | 注册后发验证邮件 |
| 🟡 低 | 自定义域名 | 替换 github.io 地址 |

---

## 提交规范

```bash
# 提交消息格式
git commit -m "类型: 简短描述

详细说明（可选）"
```

类型：`feat` / `fix` / `refactor` / `style` / `docs` / `chore`

---

## 沟通规范

**Cursor 完成任务后写入 CURSOR_TASK.md：**
```
✅ 完成时间：[时间 UTC+8]
✅ 任务A（xxx）：完成/失败
✅ 推送状态：成功/失败
```

**Claude 每次开始先检查：**
```bash
git log --oneline -10
```
然后读 CURSOR_TASK.md 末尾状态确认是否完成。

---

## 禁止提交的文件

- `.claude/`
- `.obsidian/`
- `.DS_Store`
- 任何 `.env` 文件

---

**最后更新：2026-05-09**
