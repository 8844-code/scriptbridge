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
- 给 Cursor 一个明确的任务清单
```

### 2️⃣ 执行阶段（Cursor）
```
- 收到 Claude 的任务清单
- 在本地 IDE 中实现功能
- 在浏览器中测试看效果
- 如遇问题，直接调整代码
- 完成后提交代码（git commit）
```

### 3️⃣ 验证阶段（Claude）
```
- 检查 git status 和新提交
- 审查代码逻辑是否正确
- 如发现问题，反馈给 Cursor
- 否则，规划下一个任务
```

---

## 当前任务清单（优先级排序）

### ✅ 已完成
- [x] 登录/注册页面双语支持
- [x] 脚本详情页
- [x] CSS 语言切换规则

### 🔄 进行中（Cursor 正在做）
**任务 1：提交并推送首页改动**
- [ ] 提交 index.html（添加认证入口链接）
- [ ] 推送到 GitHub
- [ ] 验证 https://8844-code.github.io/scriptbridge/ 能看到登录链接
- [ ] 截图确认

**验收标准：**
- 导航栏右上角能看到"Sign In | Sign Up"或"登录 | 注册"
- 候补表单下方有"创建账户"和"已有账户？登录"链接
- 语言切换正常工作

### ⏳ 待做（优先级排序）

**任务 2：完整流程测试**
- [ ] 从首页注册一个测试账户（选择 Creator）
- [ ] 登录后进入 Dashboard
- [ ] 上传一个测试脚本
- [ ] 在浏览页看到这个脚本
- [ ] 点击进入详情页查看完整信息
- [ ] 记录任何 bug 或错误

**验收标准：**
- 整个注册→上传→浏览→详情的流程无报错
- 数据正确显示（标题、价格、作者等）
- 文件能预览/下载

**任务 3：修复双语支持**
- [ ] Dashboard 页面添加双语标签
- [ ] Scripts Upload 页面添加双语标签
- [ ] Scripts Browse 页面添加双语标签
- [ ] 验证语言切换正常

**验收标准：**
- 切换"中文"后，所有页面内容变成中文
- 切换"EN"后，变回英文

**任务 4：Bug 修复**
- [ ] 根据任务 2 发现的 bug 列表逐个修复
- [ ] 测试每个 fix 是否真的解决了问题

---

## 提交规范

### 提交消息格式
```
git commit -m "类型: 简短描述

详细说明（可选）"
```

### 类型
- `feat:` 新功能
- `fix:` 修复 bug
- `refactor:` 代码重构
- `test:` 测试相关
- `style:` 样式调整

### 示例
```
git commit -m "feat: Add bilingual support to dashboard

- Add en-only/zh-only labels to page titles and buttons
- Implement language persistence in localStorage
- Test language toggle on all elements"
```

---

## 沟通规则

**Cursor 完成一个任务后，告诉 Claude：**
```
✅ 完成：[任务名]
- 做了什么
- 推送了哪些文件
- 遇到的问题（如有）
- 验收标准是否满足：是/否
```

**Claude 接到反馈后：**
```
- 检查 git log
- 审查代码
- 决定是否继续下一个任务或反馈问题
```

---

## 当前优先级

🔴 **立即做：任务 1（Cursor 现在做）**
- 提交 index.html
- 推送到 GitHub
- 验证效果

⏳ **接下来：任务 2** 
- 完整流程测试，找出所有 bug

---

## 项目文件结构

```
ScriptBridge/
├── index.html              ← 首页（候补名单 + 认证入口）
├── login.html              ← 登录页（双语✅）
├── signup.html             ← 注册页（双语✅）
├── dashboard.html          ← 用户主页
├── scripts-upload.html     ← 上传页
├── scripts-browse.html     ← 浏览页
├── script-detail.html      ← 详情页✅
├── js/
│   ├── auth.js
│   └── supabase-client.js
└── css/
    └── common.css          ← 全局样式（包含.en-only/.zh-only✅）
```

---

## 常见命令

```bash
# 检查状态
git status

# 查看最近提交
git log --oneline -10

# 查看具体改动
git diff <filename>

# 提交改动
git add <files>
git commit -m "提交信息"

# 推送
git push origin main
```

---

**最后：这个流程就是 Claude 和 Cursor 的协作方式。清晰、可重复、高效。**

---

## Cursor 最新交接（2026-05-09 凌晨）

### 已完成（可直接给 Claude Code 查看）
- [x] 首页、登录、注册、Dashboard、Upload、Browse、Author List、Detail 页接入统一主题系统
- [x] 新增 `js/theme.js`：支持 `light / dark / system`，并持久化到 `scriptbridge_theme`
- [x] 暗色模式可读性修复（字体对比、边框、按钮、导航背景）
- [x] 首页候补提交写入 Supabase（保留 Web3Forms 邮件）
- [x] 首页候补人数改为数据库读取，并每 30 秒刷新
- [x] 新增 SQL 脚本：`sql/waitlist_setup.sql`（表+RLS 策略）
- [x] Supabase SQL 已由用户在控制台执行成功

### 当前线上状态
- 最新代码已推送到 `main`
- 关键功能：语言切换、主题切换、候补实时人数均已在代码中接通

### 待继续（建议 Claude Code 下一步）
1. 增加重复邮箱提示（例如“你已在候补名单中”）
2. 增加运营后台页 `admin-waitlist.html`：
   - 总人数
   - 今日新增
   - 角色占比（creator/buyer）
   - 最近报名列表
3. 移动端进一步减负导航（保持收集入口强曝光）
