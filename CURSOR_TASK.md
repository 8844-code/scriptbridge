# 🎯 Cursor 立即执行的任务

**时间戳：** 2026-05-08  
**优先级：** 🔴 立即执行  
**状态：** 进行中

---

## 当前情况

✅ **你已经做了很多改动：**
- dashboard.html（更新了）
- scripts-upload.html（改进了）
- scripts-browse.html（改进了）
- scripts-list-author.html（改进了）
- index.html（添加了认证入口）
- login.html & signup.html（更新了）

现在**这些改动还没有提交和推送到 GitHub**。

---

## 📋 现在立即执行的任务

### 第1步：分次提交改动

```bash
cd "/Users/gia/Desktop/RJ's AI Brian/03 项目/ScriptBridge"

# 先查看所有改动
git status
```

### 第2步：提交首页改动
```bash
git add index.html css/common.css
git commit -m "feat: Add authentication entry links to homepage

- Add .auth-entry-wrap and .auth-entry-link styles
- Add login/signup links below waitlist form
- Support both EN and ZH with proper language tags
- Improve user flow from landing to auth pages"
```

### 第3步：提交其他页面改动
```bash
git add dashboard.html scripts-upload.html scripts-browse.html scripts-list-author.html login.html signup.html
git commit -m "refactor: Add bilingual support and improve UI across pages

- Add en-only/zh-only tags to all pages
- Update dashboard with user info display
- Enhance upload, browse, and author list pages
- Improve responsive design and forms"
```

### 第4步：推送到 GitHub
```bash
git push origin main
```

**注意：** 会提示输入 SSH 密钥密码，直接输入就行。

### 第5步：验证效果

推送完成后（1-2分钟），访问：  
**https://8844-code.github.io/scriptbridge/**

**硬刷新浏览器：** Cmd+Shift+R（Mac）或 Ctrl+Shift+F5（Windows）

**检查这些：**
- [ ] 导航栏右上角能看到"Sign In | Sign Up"或"登录 | 注册"
- [ ] 候补表单下方有"Create Account"和"Already have account?"链接
- [ ] 点中文按钮，首页变成中文
- [ ] 点"Sign In"能进入登录页（双语支持）
- [ ] 登录表单也有语言切换

---

## 📸 完成后告诉我

当你完成上面的5步后，**直接在文件末尾添加这一行，或者截图发给用户：**

```
✅ 完成时间：[现在的时间]
✅ 推送状态：成功
✅ 网站验证：[成功/失败]
✅ 截图：已截
```

---

## ⚠️ 重要提醒

1. **不要提交这些文件夹：**
   - `.claude/` 
   - `.obsidian/`

2. **提交信息要清楚** — 这样 Claude 能看到提交历史知道你做了什么

3. **推送失败？** — SSH 密钥问题，输入密码就行

4. **网站没更新？** — 等1-2分钟，然后硬刷新浏览器

---

## 下一步任务（等这个完成后）

完成上面的任务后，Claude 会给你**任务2：完整功能测试**。

那时候你需要：
- 从首页注册→登录→上传脚本→浏览→查看详情
- 记录任何 bug

---

**现在就开始。** 执行上面的 5 步命令。

✅ 完成时间：2026-05-08 23:31 (UTC+8) — Cursor
✅ 推送状态：失败（SSH 公钥权限） — Cursor
✅ Claude 接手：改用 HTTPS 推送，成功！
✅ 推送确认：2026-05-08 23:45 (UTC+8)
✅ Commits 已上传：
  - d28eb14: feat: Add authentication entry links to homepage
  - 17671fc: refactor: Add bilingual support and improve UI across pages
✅ GitHub Pages 部署中（1-2分钟）

---

## 🤝 Claude 对接更新（2026-05-09 凌晨）

### 本轮新增完成（Cursor）

- ✅ 全站视觉色彩升级为更安静、高级的风格（含浅色/深色变量统一）
- ✅ 手机端拥挤问题第一轮修复（首页/登录/注册/dashboard 间距、字号、按钮尺寸）
- ✅ 全站接入滚动页头控制脚本 `js/nav-mobile.js`
- ✅ 手机端：下滑隐藏页头、上滑显示、滚动时紧凑化按钮
- ✅ 桌面端：同步支持页头滚动隐藏（按用户最新要求）
- ✅ 动画升级：更丝滑过渡 + 防抖阈值，避免频繁闪动

### 本轮关键提交（已推送）

- `563a551` — feat: refine mobile navigation behavior and responsive polish
- `80436e2` — feat: smooth and enable scroll-hide header on desktop

### 当前线上状态

- ✅ 远端分支：`origin/main` 已更新到 `80436e2`
- ✅ 本地工作区：干净（无未提交改动）
- ✅ 功能状态：手机/桌面均可滚动隐藏页头

### Claude 下一步建议（可直接接手）

1. 在真实设备上做一次交互验收（iOS Safari / Android Chrome / 桌面 Chrome）
2. 微调隐藏触发阈值（如用户觉得太敏感或太迟钝）
3. 对业务页做第二轮移动端精修（`scripts-upload` / `scripts-list-author` / `scripts-browse`）
4. 若需要，可新增“固定显示页头”开关（给不喜欢自动隐藏的用户）

✅ 对接时间：2026-05-09 02:48 (UTC+8) — Cursor  
✅ 对接状态：已完成，可无缝交接给 Claude

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**  
**任务名：小功能三件套**

---

### 📋 任务 A：忘记密码页（forgot-password.html）

**新建文件** `forgot-password.html`，放在项目根目录。

**功能要求：**
- 一个输入邮箱的表单
- 点击"发送重置链接"后调用：
  ```js
  const { error } = await window.supabase_client.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://8844-code.github.io/scriptbridge/reset-password.html'
  });
  ```
- 成功后显示提示："Reset link sent! Check your email." / "重置链接已发送，请查收邮件。"
- 失败时显示错误信息

**样式要求：**
- 风格与 `login.html` 完全一致（复制页面框架）
- 支持双语切换（en-only / zh-only）
- 引入 `js/theme.js`、`js/nav-mobile.js`、`css/common.css`、`js/supabase-client.js`

**在 `login.html` 里添加跳转链接：**  
在登录表单的密码输入框下方，加上：
```html
<p style="text-align:right; margin-top: 6px; font-size: 13px;">
  <a href="forgot-password.html" class="en-only" style="color: var(--text-muted); text-decoration: underline;">Forgot password?</a>
  <a href="forgot-password.html" class="zh-only" style="color: var(--text-muted); text-decoration: underline;">忘记密码？</a>
</p>
```

---

### 📋 任务 B：重复邮箱检测（index.html 候补表单）

**在 `index.html` 里，** 找到候补表单提交的逻辑（处理 Supabase 写入的部分）。

在插入数据库之前，先查一下邮箱是否已存在：
```js
// 先检查是否已经报名
const { data: existing } = await window.supabase_client
  .from('waitlist')
  .select('id')
  .eq('email', email)
  .maybeSingle();

if (existing) {
  // 已存在，显示友好提示，不重复插入
  showSuccess("You're already on the list! We'll be in touch soon.", "你已经在候补名单里了！我们会尽快联系你。");
  return;
}
```

**注意：**
- `showSuccess` 改成你实际用的提示函数名
- 只需要判断邮箱，不报错，友好提示

---

### 📋 任务 C：404 页面（404.html）

**新建文件** `404.html`，放在项目根目录。

**内容要求：**
- 大标题：`404` 
- 副标题（双语）：
  - EN: "Page not found — this script may have been moved or deleted."
  - ZH: "页面不存在 — 这个剧本可能已移动或删除。"
- 一个"Back to Home"/"回到首页"按钮，链接 `index.html`
- 风格与全站一致，简洁

**引入：** `css/common.css`、`js/theme.js`

---

### ✅ 完成后

1. 提交三个改动：
```bash
git add forgot-password.html 404.html index.html login.html
git commit -m "feat: Add forgot-password page, 404 page, and duplicate email detection

- Add forgot-password.html with Supabase password reset flow
- Add 404.html with bilingual copy and home link
- Add duplicate email check to waitlist form in index.html
- Add forgot password link to login.html"
git push origin main
```

2. 在本文件末尾添加完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（忘记密码）：完成/失败
✅ 任务B（重复邮箱）：完成/失败
✅ 任务C（404页）：完成/失败
✅ 推送状态：成功/失败
```
