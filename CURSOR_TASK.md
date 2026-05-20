# 🎯 Cursor 立即执行的任务

**时间戳：** 2026-05-20
**优先级：** 🔴 立即执行
**状态：** 待执行

---

## 📋 任务零：搜索小红书热帖并生成内测招募文案（优先执行）

### 背景
ScriptBridge 网站已上线，现在需要发小红书招募内测用户（编剧 + 制片方）。
需要先搜索小红书上近期爆火的"创业进度/产品上线/内测招募"类型帖子，模仿其结构和语气写一篇。

### 步骤1：搜索热帖
用浏览器搜索以下关键词，找3-5篇点赞量高的帖子（点赞 > 500）：
- 小红书搜索：`内测 招募 创业`
- 小红书搜索：`产品上线了 编剧`
- 小红书搜索：`我做了一个产品 创业日记`

记录下这些帖子的：标题句式、开头第一句、正文结构、结尾引导方式。

### 步骤2：生成文案
根据搜索到的热帖模式，写一篇新的小红书帖子，要求：
- **主题**：ScriptBridge 项目当前阶段 + 招募内测用户
- **内容重点**：展示网站已经做了什么（✅已完成），正在内测，需要编剧和制片方参与
- **不要**：讲为什么做这个项目的故事（那是另一篇）
- **结尾**：低门槛行动指令，比如"评论'内测'"

### 步骤3：输出格式
把生成的文案写入：
`03 项目/ScriptBridge/03 上线推广/(C) 小红书内测招募文案.md`

格式参考 `(C) 小红书内容储备库.md` 里的帖子结构（封面标题、正文、标签、配图Prompt）。

---

---

## 📋 任务一：清理 Logo 草稿文件（5分钟）

### 步骤1：把草稿文件加进 .gitignore
打开根目录的 `.gitignore`，末尾加：
```
# Logo design drafts
images/mark-a.svg
images/mark-b.svg
images/mark-c.svg
C-logo-concepts-preview.html
logo-preview.html
```

### 步骤2：提交剩余 logo 改动
```bash
git add images/favicon.svg images/scriptbridge-mark.svg .gitignore WORKFLOW.md CURSOR_TASK.md
git commit -m "chore(brand): finalize logo assets and ignore draft files"
git push origin main
```

---

## 📋 任务二：注册邮箱验证流程

**目标：** 用户注册后收到验证邮件，未验证前无法使用平台功能。

### 修改 `signup.html`
注册成功后不跳转 dashboard，改为在页面内显示提示：
```
✅ 注册成功！请检查邮箱，点击验证链接后即可登录。
Registration successful! Please check your email to verify your account.
```

### 修改 `login.html`
登录时检测 `session.user.email_confirmed_at`：
- 已验证 → 正常跳转 dashboard
- 未验证 → 显示提示 + 「重新发送验证邮件」按钮
  ```javascript
  supabase.auth.resend({ type: 'signup', email })
  ```

### 修改 `js/auth.js`
在 `requireAuth()` 获取 session 后加验证检查：
```javascript
if (session && !session.user.email_confirmed_at) {
  window.location.href = '/login.html?unverified=1';
  return null;
}
```

### 提交
```bash
git add signup.html login.html js/auth.js
git commit -m "feat(auth): add email verification flow on signup

- signup.html: show verify prompt instead of redirect
- login.html: detect unverified users, offer resend option
- auth.js: redirect unverified users to login"
git push origin main
```

### 测试
用一个新邮箱注册，确认：
1. 注册后看到验证提示（不跳转）
2. 邮箱收到验证邮件
3. 点链接后能正常登录
4. 未验证时直接访问 dashboard 会被踢回登录页

---

## ✅ 完成后在此写：
```
✅ 完成时间：[时间 UTC+8]
✅ 任务一（清理logo）：完成/失败
✅ 任务二（邮箱验证）：完成/失败，commit hash：
✅ 推送状态：成功/失败
```

---

## 历史任务记录

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

---

### 执行记录（Cursor）

✅ 完成时间：2026-05-09 14:27 CST（UTC+8）
✅ 任务A（资料编辑）：完成
✅ 任务B（服务条款）：完成
✅ 任务C（隐私政策）：完成
✅ 任务D（Footer链接）：完成
✅ 推送状态：成功

✅ 完成时间：2026-05-09 02:59 (UTC+8)
✅ 任务A（忘记密码）：完成
✅ 任务B（重复邮箱）：完成
✅ 任务C（404页）：完成
✅ 推送状态：成功

---

## 📋 当前进度总览（Claude 整理，2026-05-09）

### ✅ 已完成的功能

**页面**
- `index.html` — 首页候补名单，双语，Supabase 实时人数，重复邮箱检测
- `login.html` — 登录，双语，忘记密码入口
- `signup.html` — 注册，双语，角色选择（创作者/买家）
- `forgot-password.html` — 密码重置，Supabase 邮件发送
- `dashboard.html` — 个人主页，双语，角色对应功能入口
- `scripts-upload.html` — 上传作品，Supabase Storage，双语
- `scripts-browse.html` — 浏览作品，标题搜索+类型筛选，双语
- `scripts-list-author.html` — 我的作品，预览+删除，双语
- `script-detail.html` — 作品详情，购买/下载入口，双语
- `admin-waitlist.html` — 候补后台（仅管理员可见），实时数据
- `404.html` — 错误页，双语

**系统**
- `js/theme.js` — 深色/浅色/自动主题，持久化
- `js/nav-mobile.js` — 滚动隐藏导航（手机+桌面）
- Supabase Storage RLS 权限已配置
- 全站中文文案规范（作品/个人主页，无"脚本"/"控制台"）

### ❌ 还缺少的功能（按优先级）

| 优先级 | 功能 | 说明 |
|--------|------|------|
| 🔴 高 | **作品编辑页**（script-edit.html） | Edit 按钮现在是禁用的 |
| 🔴 高 | **购买流程** | 购买按钮弹"under development" |
| 🟠 中 | 我的购买记录 | 买家买了什么没地方看 |
| 🟠 中 | 浏览页更多筛选 | 只有标题+类型，缺价格区间 |
| 🟡 低 | 邮箱验证（注册后） | 暂无验证邮件 |
| 🟡 低 | 用户资料编辑 | 头像/简介无法修改 |

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：作品编辑页（script-edit.html）**

---

### 背景

`scripts-list-author.html` 的 Edit 按钮已经存在，但点击只弹出"编辑功能暂未开放"。需要新建 `script-edit.html`，让创作者能修改已上传作品的信息。

---

### 📋 任务：新建 script-edit.html

**功能要求：**

1. **读取现有数据**：从 URL 参数 `?id=xxx` 获取作品 ID，从 Supabase `scripts` 表加载该作品信息，填入表单
2. **可编辑字段**（与上传页一致）：
   - 标题（title）
   - 简介（description）
   - 作品类型（script_type）
   - 定价（price）
   - 版权类型（rights_type）
   - 作品文件（可选：不换文件就保留原来的）
3. **权限检查**：只有作品的创建者（`user_id === currentUser.id`）才能编辑，其他人跳转回 dashboard
4. **保存**：点击"保存修改"后调用 Supabase `.update()`，成功后跳回 `scripts-list-author.html`

**Supabase 更新示例：**
```js
const { error } = await window.supabase_client
  .from('scripts')
  .update({
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    script_type: scriptTypeInput.value,
    price: Number(priceInput.value),
    rights_type: rightsType,
    // 如果用户换了文件，更新 file_url；否则不动
  })
  .eq('id', scriptId)
  .eq('user_id', currentUser.id); // 双重保险：只能改自己的
```

**样式要求：**
- 与 `scripts-upload.html` 完全一致（复制框架即可）
- 标题改为"编辑作品" / "Edit Script"
- 保存按钮："保存修改" / "Save Changes"
- 取消按钮：返回 `scripts-list-author.html`
- 双语支持（en-only / zh-only）
- 引入 `js/theme.js`、`js/nav-mobile.js`、`css/common.css`、`js/supabase-client.js`、`js/auth.js`

---

### 📋 同时修改：scripts-list-author.html

找到 Edit 按钮的部分，把禁用状态改为真实跳转：

```js
// 原来的（禁用）：
'<button class="btn btn-outline btn-sm btn-disabled" onclick="showEditDisabled(event)">' + t('edit') + '</button>'

// 改成（真实跳转）：
'<a href="script-edit.html?id=' + item.id + '" class="btn btn-outline btn-sm">' + t('edit') + '</a>'
```

---

### ✅ 完成后

```bash
git add script-edit.html scripts-list-author.html
git commit -m "feat: Add script editing page and enable Edit button

- Add script-edit.html with load/edit/save flow via Supabase
- Enable Edit button in scripts-list-author.html to link to edit page
- Owner-only access enforced both client-side and in Supabase query
- Bilingual support (EN/ZH) with same style as upload page"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ script-edit.html：完成/失败
✅ Edit 按钮启用：完成/失败
✅ 推送状态：成功/失败
```

✅ 完成时间：2026-05-09 11:36 (UTC+8)
✅ script-edit.html：完成
✅ Edit 按钮启用：完成
✅ 推送状态：成功

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：价格筛选 + 联系卖家**

---

### 📋 任务 A：浏览页加价格区间筛选（scripts-browse.html）

**目标：** 在现有筛选栏（搜索框 + 类型筛选 + 排序）旁边，加两个价格输入框。

**第一步：在 `filters-card` 区域加两个 input（`id="price-min"` 和 `id="price-max"`）：**

找到这段 HTML（大约在 `<section class="filters-card">` 里）：
```html
<select id="sort-select">
  ...
</select>
```
在它后面加：
```html
<input type="number" id="price-min" placeholder="Min price" min="0" style="width: 100px;">
<input type="number" id="price-max" placeholder="Max price" min="0" style="width: 100px;">
```

**第二步：在 JS 里获取这两个值：**
```js
const priceMinInput = document.getElementById('price-min');
const priceMaxInput = document.getElementById('price-max');
```

**第三步：在 `applyFilters()` 函数里，加价格过滤逻辑：**

找到 `applyFilters` 函数里已有的 filter 逻辑（已有关键字和类型筛选），在其中加：
```js
const minPrice = parseFloat(priceMinInput.value) || 0;
const maxPrice = parseFloat(priceMaxInput.value) || Infinity;

list = list.filter(item => {
  const price = parseFloat(item.price) || 0;
  return price >= minPrice && price <= maxPrice;
});
```

**第四步：绑定事件（触发 applyFilters）：**
```js
priceMinInput.addEventListener('input', applyFilters);
priceMaxInput.addEventListener('input', applyFilters);
```

**第五步：双语 placeholder 跟着语言切换：**
在 `i18n` 的 `en` 和 `zh` 对象中加：
```js
// en:
priceMinPh: 'Min price',
priceMaxPh: 'Max price',
// zh:
priceMinPh: '最低价',
priceMaxPh: '最高价',
```
然后在 `setLang()` 里加：
```js
priceMinInput.placeholder = t('priceMinPh');
priceMaxInput.placeholder = t('priceMaxPh');
```

---

### 📋 任务 B：联系卖家功能（script-detail.html）

**目标：** "Contact Seller" 按钮现在只弹 alert，改为真实显示卖家邮箱并支持一键发邮件。

**第一步：修改 `loadAuthor()` 函数，让它同时返回 email：**

找到现有的 `loadAuthor` 函数：
```js
async function loadAuthor(userId) {
  ...
  return data.full_name || data.email || 'Unknown author';
}
```
改为返回一个对象：
```js
async function loadAuthor(userId) {
  if (!userId) return { name: 'Unknown author', email: null };
  const { data, error } = await window.supabase_client
    .from('profiles')
    .select('full_name, email')
    .eq('user_id', userId)
    .maybeSingle();
  if (error || !data) return { name: 'Unknown author', email: null };
  return {
    name: data.full_name || data.email || 'Unknown author',
    email: data.email || null
  };
}
```

**第二步：在调用处保存 email：**

找到使用 loadAuthor 的地方（大约如下）：
```js
const author = await loadAuthor(data.user_id);
document.getElementById('script-author').textContent = escapeHtml(author);
```
改为：
```js
const { name: authorName, email: authorEmail } = await loadAuthor(data.user_id);
document.getElementById('script-author').textContent = escapeHtml(authorName);
// 把 email 存起来供联系按钮使用
window._authorEmail = authorEmail;
```

**第三步：改 contact-btn 的点击事件：**

找到：
```js
document.getElementById('contact-btn').addEventListener('click', () => {
  alert('Contact feature coming soon...');
});
```
改为：
```js
document.getElementById('contact-btn').addEventListener('click', () => {
  const email = window._authorEmail;
  if (email) {
    window.location.href = `mailto:${email}`;
  } else {
    const msg = document.body.classList.contains('zh')
      ? '暂无卖家联系方式。'
      : 'No contact info available for this seller.';
    alert(msg);
  }
});
```

---

### ✅ 完成后

```bash
git add scripts-browse.html script-detail.html
git commit -m "feat: Add price range filter to browse page and enable contact seller

- Add min/max price inputs to browse filters with bilingual placeholder
- Wire price filter into applyFilters() function
- Update loadAuthor() to return email alongside name
- Contact Seller button now opens mailto: link with seller's email"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（价格筛选）：完成/失败
✅ 任务B（联系卖家）：完成/失败
✅ 推送状态：成功/失败
```

✅ 完成时间：2026-05-09 11:43 (UTC+8)
✅ 任务A（价格筛选）：完成
✅ 任务B（联系卖家）：完成
✅ 推送状态：成功

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：公开市场页（marketplace.html）+ 首页入口**

---

### 背景

现在 `scripts-browse.html` 需要登录才能看，陌生访客根本无法了解平台上有什么内容。
需要一个**不需要登录就能浏览**的公开市场页，作为平台的"橱窗"。

---

### 📋 任务 A：新建 marketplace.html（公开市场页）

**新建文件** `marketplace.html`，放在项目根目录。

**核心逻辑：**
- **不需要登录** 即可浏览所有已上架作品
- 从 Supabase `scripts` 表读取数据（公开 SELECT，无需 auth）
- 有搜索框、类型筛选、价格排序（与 `scripts-browse.html` 一致）
- 每张作品卡片点击后：
  - **未登录** → 跳转 `login.html`（登录后才能查看详情/联系卖家）
  - **已登录** → 跳转 `script-detail.html?id=xxx`

**页面结构（参考 `scripts-browse.html`，但去掉 requireAuth）：**

```js
// 不需要 requireAuth()，直接加载数据
window.addEventListener('DOMContentLoaded', async () => {
  setLang(currentLang);
  await loadScripts();
  // 检查是否已登录（影响卡片点击行为）
  const { data: { session } } = await window.supabase_client.auth.getSession();
  window._isLoggedIn = !!session;
});
```

**卡片点击逻辑：**
```js
function onCardClick(scriptId) {
  if (window._isLoggedIn) {
    window.location.href = 'script-detail.html?id=' + scriptId;
  } else {
    window.location.href = 'login.html';
  }
}
```

**导航栏（未登录状态显示登录/注册，已登录显示个人主页）：**
```js
// 根据登录状态动态显示
if (window._isLoggedIn) {
  // 显示"个人主页"按钮
} else {
  // 显示"登录"和"注册"按钮
}
```

**样式要求：**
- 与 `scripts-browse.html` 完全一致的视觉风格
- 双语支持（en-only / zh-only）
- 引入 `js/theme.js`、`js/nav-mobile.js`、`css/common.css`、`js/supabase-client.js`
- **不引入** `js/auth.js`（因为不强制登录）

**页面标题：**
- EN: `Browse Marketplace — ScriptBridge`
- ZH: `浏览市场 — ScriptBridge`

**空状态文案（暂时没有上架作品时）：**
- EN: `No scripts available yet. Check back soon.`
- ZH: `暂无上架作品，敬请期待。`

---

### 📋 任务 B：修改 index.html，加市场入口

在首页导航栏右侧（Sign In 按钮旁边），加一个"Browse"入口链接：

```html
<!-- 在 nav-right 里，Sign In 按钮前面加 -->
<a href="marketplace.html" class="btn btn-outline en-only">Browse</a>
<a href="marketplace.html" class="btn btn-outline zh-only">浏览市场</a>
```

同时在首页 Hero 区域（候补表单下方，或 CTA 按钮旁边），加一行小字引导：
```html
<p style="margin-top:12px; font-size:13px; color:rgba(245,240,232,0.5);" class="en-only">
  Already a creator or buyer? <a href="marketplace.html" style="color:rgba(245,240,232,0.75); text-decoration:underline;">Browse the marketplace →</a>
</p>
<p style="margin-top:12px; font-size:13px; color:rgba(245,240,232,0.5);" class="zh-only">
  已经是创作者或买家？<a href="marketplace.html" style="color:rgba(245,240,232,0.75); text-decoration:underline;">浏览市场 →</a>
</p>
```

---

### ✅ 完成后

```bash
git add marketplace.html index.html
git commit -m "feat: Add public marketplace page and homepage entry

- Add marketplace.html: public browse page, no login required
- Clicking script card prompts login if not authenticated
- Add Browse link to index.html nav and hero section
- Bilingual support throughout"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（marketplace.html）：完成/失败
✅ 任务B（首页入口）：完成/失败
✅ 推送状态：成功/失败
```

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：作品状态管理（公开/下架/重新上架）**

> ⚠️ 前置条件（Claude 已确认完成）：Supabase `scripts` 表已新增 `status` 字段，默认值 `'published'`

---

### 📋 任务 A：上传页加"可见性"选项（scripts-upload.html）

在定价字段下方，加一个可见性选择：

```html
<div class="form-group">
  <label id="label-visibility">
    <span class="en-only">Visibility</span>
    <span class="zh-only">可见性</span>
  </label>
  <div style="display:flex; gap:16px; margin-top:8px;">
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
      <input type="radio" name="visibility" value="published" checked>
      <span class="en-only">Public — visible in marketplace</span>
      <span class="zh-only">公开 — 在市场中可见</span>
    </label>
    <label style="display:flex;align-items:center;gap:6px;cursor:pointer;">
      <input type="radio" name="visibility" value="draft">
      <span class="en-only">Draft — only visible to me</span>
      <span class="zh-only">草稿 — 仅自己可见</span>
    </label>
  </div>
</div>
```

在 `insert` 的数据里加上 `status` 字段：
```js
status: document.querySelector('input[name="visibility"]:checked').value,
```

---

### 📋 任务 B：我的作品列表加下架/上架按钮（scripts-list-author.html）

**第一步：** 从 Supabase 读取作品时，额外选取 `status` 字段：
```js
.select('id, title, script_type, price, created_at, status')
```

**第二步：** 每行操作按钮区加下架/上架按钮（根据当前 status 动态显示）：
```js
// 如果 status === 'published'，显示"下架"按钮
// 如果 status === 'draft' 或 'unpublished'，显示"上架"按钮

const isPublished = item.status === 'published';
const toggleBtn = isPublished
  ? `<button class="btn btn-outline btn-sm" onclick="toggleStatus('${item.id}','draft')">
       ${currentLang === 'zh' ? '下架' : 'Unpublish'}
     </button>`
  : `<button class="btn btn-primary btn-sm" onclick="toggleStatus('${item.id}','published')">
       ${currentLang === 'zh' ? '上架' : 'Publish'}
     </button>`;
```

**第三步：** 加 `toggleStatus` 函数：
```js
async function toggleStatus(scriptId, newStatus) {
  const label = newStatus === 'published'
    ? (currentLang === 'zh' ? '上架' : 'publish')
    : (currentLang === 'zh' ? '下架' : 'unpublish');
  if (!confirm(`${currentLang === 'zh' ? '确认' : 'Confirm'} ${label}?`)) return;

  const { error } = await window.supabase_client
    .from('scripts')
    .update({ status: newStatus })
    .eq('id', scriptId)
    .eq('user_id', currentUser.id);

  if (error) {
    showAlert((currentLang === 'zh' ? '操作失败：' : 'Failed: ') + error.message, 'error');
  } else {
    showAlert(currentLang === 'zh' ? '操作成功' : 'Done!', 'success');
    setTimeout(() => loadScripts(), 800);
  }
}
window.toggleStatus = toggleStatus;
```

**第四步：** 在作品列表里加一列"状态"，显示当前是否公开：
```js
// 在 status 列显示：
const statusBadge = item.status === 'published'
  ? `<span style="color:var(--sage);font-size:12px;font-weight:600;">● ${currentLang==='zh'?'已上架':'Live'}</span>`
  : `<span style="color:var(--muted);font-size:12px;font-weight:600;">○ ${currentLang==='zh'?'草稿':'Draft'}</span>`;
```

---

### 📋 任务 C：浏览页和市场页只显示已上架作品

**在 `scripts-browse.html` 和 `marketplace.html` 的 Supabase 查询里加过滤条件：**
```js
.from('scripts')
.select('...')
.eq('status', 'published')   // ← 加这一行
.order('created_at', { ascending: false })
```

---

### 📋 任务 D：编辑页同步加可见性选项（script-edit.html）

与任务 A 一样，在 `script-edit.html` 里：
1. 加可见性单选框（public/draft）
2. 加载已有数据时预选当前 status
3. 保存时把 `status` 一起 update 进 Supabase

---

### ✅ 完成后

```bash
git add scripts-upload.html scripts-list-author.html scripts-browse.html script-edit.html marketplace.html
git commit -m "feat: Add script visibility and publish/unpublish management

- scripts-upload.html: add visibility selector (public/draft) on upload
- scripts-list-author.html: add status badge and publish/unpublish button per script
- scripts-browse.html: filter to only show published scripts
- marketplace.html: filter to only show published scripts
- script-edit.html: add visibility selector synced with current status"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（上传页可见性）：完成/失败
✅ 任务B（下架/上架按钮）：完成/失败
✅ 任务C（浏览页过滤）：完成/失败
✅ 任务D（编辑页可见性）：完成/失败
✅ 推送状态：成功/失败
```

---

### 执行记录（Cursor）

✅ 完成时间：2026-05-09 12:42 CST（UTC+8）
✅ 任务A（上传页可见性）：完成
✅ 任务B（下架/上架按钮）：完成
✅ 任务C（浏览页过滤）：完成（含新建 `marketplace.html` 仅展示 `published`）
✅ 任务D（编辑页可见性）：完成
✅ 推送状态：成功

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：用户资料编辑 + 服务条款 + 隐私政策**

---

### 📋 任务 A：用户资料编辑页（profile-edit.html）

**新建文件** `profile-edit.html`，放在项目根目录。

**功能：**
1. 页面加载时从 Supabase `profiles` 表读取当前用户的 `full_name`、`bio`，填入表单
2. 用户可修改：
   - 显示名称（full_name）
   - 个人简介（bio）
3. 点击保存后调用：
```js
const { error } = await window.supabase_client
  .from('profiles')
  .update({ full_name: nameInput.value.trim(), bio: bioInput.value.trim() })
  .eq('user_id', currentUser.id);
```
4. 保存成功后提示"已保存"，2秒后跳回 `dashboard.html`

**样式：** 与 `scripts-upload.html` 完全一致，引入 `js/theme.js`、`js/nav-mobile.js`、`css/common.css`、`js/supabase-client.js`、`js/auth.js`

**双语文案：**
- 页面标题：Edit Profile / 编辑资料
- 显示名称：Display Name / 显示名称
- 个人简介：Bio / 个人简介
- 保存按钮：Save Changes / 保存修改
- 取消：← Back to Dashboard / ← 返回主页

**同时修改 `dashboard.html`：**
在"账号信息"卡片里，简介那行旁边加一个编辑入口按钮：
```html
<a href="profile-edit.html" class="btn btn-outline" style="font-size:13px;padding:6px 14px;">
  <span class="en-only">Edit Profile</span>
  <span class="zh-only">编辑资料</span>
</a>
```

---

### 📋 任务 B：服务条款页（terms.html）

**新建文件** `terms.html`，放在项目根目录。

**页面框架：** 与 `404.html` 类似的简洁静态页，引入 `css/common.css`、`js/theme.js`、`js/nav-mobile.js`

**导航栏：** 只需要 Logo + 返回首页按钮，不需要登录状态

**页面内容（直接用以下文本，中英双语分块）：**

```html
<article style="max-width:760px;margin:0 auto;padding:100px 40px 80px;line-height:1.8;">

  <h1 style="font-family:'Fraunces',serif;font-size:36px;margin-bottom:8px;">
    <span class="en-only">Terms of Service</span>
    <span class="zh-only">服务条款</span>
  </h1>
  <p style="color:var(--muted);font-size:14px;margin-bottom:40px;">
    <span class="en-only">Last updated: May 2026 · This is a draft for MVP stage and has not been reviewed by legal counsel.</span>
    <span class="zh-only">最后更新：2026年5月 · 本文档为MVP阶段草稿，尚未经过专业法律审查。</span>
  </p>

  <!-- Section 1 -->
  <h2 class="en-only">1. Platform Nature</h2>
  <h2 class="zh-only">1. 平台性质</h2>
  <p class="en-only">ScriptBridge is an information platform that connects script creators and buyers. We facilitate copyright transactions but are not a party to any transaction between users.</p>
  <p class="zh-only">ScriptBridge 是一个连接剧本创作者与买家的信息撮合平台。平台为用户之间的版权交易提供技术支持，但不作为任何交易的当事方。</p>

  <!-- Section 2 -->
  <h2 class="en-only">2. User Registration</h2>
  <h2 class="zh-only">2. 用户注册</h2>
  <p class="en-only">You must provide accurate information when registering. You are responsible for keeping your account credentials secure. Each user may only register one account.</p>
  <p class="zh-only">注册时须提供真实有效的信息。用户须自行妥善保管账号密码。每位用户仅可注册一个账号。</p>

  <!-- Section 3 -->
  <h2 class="en-only">3. Creator Responsibilities</h2>
  <h2 class="zh-only">3. 创作者责任</h2>
  <p class="en-only">By uploading content, you confirm that: (a) you are the original author or hold the rights to distribute the work; (b) the content does not infringe any third party's intellectual property; (c) you take full legal responsibility for any copyright disputes arising from your uploads.</p>
  <p class="zh-only">上传作品即表示你确认：(a) 你是作品原创作者或拥有合法的版权授权；(b) 作品内容不侵犯任何第三方知识产权；(c) 因你上传的内容引发的任何版权纠纷，由你承担全部法律责任。</p>

  <!-- Section 4 -->
  <h2 class="en-only">4. Platform Disclaimer</h2>
  <h2 class="zh-only">4. 平台免责声明</h2>
  <p class="en-only">ScriptBridge does not verify the originality or legal status of uploaded works. We are not liable for disputes between users. The platform reserves the right to remove content that violates these terms.</p>
  <p class="zh-only">ScriptBridge 不对上传作品的原创性或版权状态进行核实。平台不对用户之间产生的纠纷承担责任。平台保留删除违规内容的权利。</p>

  <!-- Section 5 -->
  <h2 class="en-only">5. Prohibited Activities</h2>
  <h2 class="zh-only">5. 禁止行为</h2>
  <p class="en-only">Users must not: upload plagiarized or infringing content; impersonate others; attempt to circumvent platform fees; harass other users.</p>
  <p class="zh-only">用户不得：上传抄袭或侵权内容；冒充他人身份；绕过平台收费机制；骚扰其他用户。</p>

  <!-- Section 6 -->
  <h2 class="en-only">6. Changes to Terms</h2>
  <h2 class="zh-only">6. 条款变更</h2>
  <p class="en-only">We may update these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.</p>
  <p class="zh-only">平台可随时更新本条款。继续使用平台视为接受更新后的条款。</p>

  <!-- Contact -->
  <h2 class="en-only">7. Contact</h2>
  <h2 class="zh-only">7. 联系方式</h2>
  <p>
    <span class="en-only">For questions about these terms, contact us at </span>
    <span class="zh-only">如对本条款有疑问，请联系 </span>
    <a href="mailto:qtian904@gmail.com">qtian904@gmail.com</a>
  </p>

</article>
```

---

### 📋 任务 C：隐私政策页（privacy.html）

**新建文件** `privacy.html`，放在项目根目录。同样的页面框架。

**页面内容：**

```html
<article style="max-width:760px;margin:0 auto;padding:100px 40px 80px;line-height:1.8;">

  <h1 style="font-family:'Fraunces',serif;font-size:36px;margin-bottom:8px;">
    <span class="en-only">Privacy Policy</span>
    <span class="zh-only">隐私政策</span>
  </h1>
  <p style="color:var(--muted);font-size:14px;margin-bottom:40px;">
    <span class="en-only">Last updated: May 2026</span>
    <span class="zh-only">最后更新：2026年5月</span>
  </p>

  <h2 class="en-only">1. Information We Collect</h2>
  <h2 class="zh-only">1. 我们收集的信息</h2>
  <p class="en-only">We collect: your email address (for registration and login); your display name and bio (optional, set by you); content you upload (scripts and associated files); usage data such as login times.</p>
  <p class="zh-only">我们收集：你的邮箱地址（用于注册和登录）；你设置的显示名称和简介（可选）；你上传的内容（作品文件及相关信息）；使用数据（如登录时间）。</p>

  <h2 class="en-only">2. How We Use Your Information</h2>
  <h2 class="zh-only">2. 信息用途</h2>
  <p class="en-only">Your information is used to: provide and maintain platform services; enable communication between creators and buyers; send important platform notifications (no marketing spam).</p>
  <p class="zh-only">你的信息用于：提供和维护平台服务；促成创作者与买家之间的联系；发送重要平台通知（不发送垃圾营销邮件）。</p>

  <h2 class="en-only">3. Data Sharing</h2>
  <h2 class="zh-only">3. 数据共享</h2>
  <p class="en-only">We do not sell your personal data. Your email is only visible to platform administrators. Your display name is shown publicly on your uploaded works.</p>
  <p class="zh-only">我们不出售你的个人信息。你的邮箱仅平台管理员可见。你的显示名称会在你上传的作品页面公开显示。</p>

  <h2 class="en-only">4. Data Storage</h2>
  <h2 class="zh-only">4. 数据存储</h2>
  <p class="en-only">Your data is stored securely via Supabase (supabase.com). Uploaded files are stored in Supabase Storage. We apply reasonable security measures to protect your data.</p>
  <p class="zh-only">你的数据通过 Supabase（supabase.com）安全存储。上传的文件存储在 Supabase Storage 中。我们采取合理的安全措施保护你的数据。</p>

  <h2 class="en-only">5. Your Rights</h2>
  <h2 class="zh-only">5. 你的权利</h2>
  <p class="en-only">You may request deletion of your account and associated data at any time by contacting us. You can update your profile information from your dashboard.</p>
  <p class="zh-only">你可随时联系我们申请删除账号及相关数据。你可在个人主页中自行更新资料信息。</p>

  <h2 class="en-only">6. Contact</h2>
  <h2 class="zh-only">6. 联系方式</h2>
  <p>
    <span class="en-only">Privacy questions: </span>
    <span class="zh-only">隐私相关问题：</span>
    <a href="mailto:qtian904@gmail.com">qtian904@gmail.com</a>
  </p>

</article>
```

---

### 📋 任务 D：在 Footer 加条款链接

在所有主要页面的底部（或 `index.html` 的 footer 里），加上：
```html
<a href="terms.html" class="en-only">Terms of Service</a>
<span> · </span>
<a href="privacy.html" class="en-only">Privacy Policy</a>
<a href="terms.html" class="zh-only">服务条款</a>
<span> · </span>
<a href="privacy.html" class="zh-only">隐私政策</a>
```

至少在 `index.html` 的 footer 里加上就行，其他页面有时间再加。

---

### ✅ 完成后

```bash
git add profile-edit.html terms.html privacy.html dashboard.html index.html
git commit -m "feat: Add profile editing, terms of service, and privacy policy

- profile-edit.html: edit display name and bio, saves to Supabase profiles table
- dashboard.html: add Edit Profile button linking to profile-edit.html
- terms.html: bilingual terms of service (MVP draft)
- privacy.html: bilingual privacy policy (MVP draft)
- index.html footer: add links to terms and privacy pages"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（资料编辑）：完成/失败
✅ 任务B（服务条款）：完成/失败
✅ 任务C（隐私政策）：完成/失败
✅ 任务D（Footer链接）：完成/失败
✅ 推送状态：成功/失败
```

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：购买询盘系统**

---

### 背景

现在买家点"Purchase / 购买"按钮只弹出"under development"提示，交易无法发生。
MVP 阶段不需要真实支付，但需要一个**询盘流程**——买家发意向，创作者收到通知，平台管理员撮合。

---

### ⚠️ 前置步骤（RJ 需要在 Supabase 控制台执行以下 SQL）

在 Supabase 控制台 > SQL Editor 运行：

```sql
-- 创建询盘表
CREATE TABLE IF NOT EXISTS purchase_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  script_id UUID REFERENCES scripts(id) ON DELETE CASCADE,
  script_title TEXT,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 启用 RLS
ALTER TABLE purchase_requests ENABLE ROW LEVEL SECURITY;

-- 买家可以创建询盘
CREATE POLICY "buyers can create requests" ON purchase_requests
  FOR INSERT TO authenticated
  WITH CHECK (buyer_id = auth.uid());

-- 买家和卖家可以查看自己相关的询盘
CREATE POLICY "users can view own requests" ON purchase_requests
  FOR SELECT TO authenticated
  USING (buyer_id = auth.uid() OR seller_id = auth.uid());

-- 卖家可以更新状态（接受/拒绝）
CREATE POLICY "sellers can update status" ON purchase_requests
  FOR UPDATE TO authenticated
  USING (seller_id = auth.uid());
```

SQL 执行成功后，通知 Claude 或直接让 Cursor 继续执行下面的任务。

---

### 📋 任务 A：修改 script-detail.html — 购买按钮改为询盘弹窗

找到 `script-detail.html` 中的购买按钮（`id="buy-btn"` 或类似）。

**第一步：** 在页面内加一个询盘弹窗（modal）：

```html
<!-- 询盘 Modal -->
<div id="inquiry-modal" style="display:none; position:fixed; inset:0;
     background:rgba(0,0,0,0.5); z-index:1000; align-items:center; justify-content:center;">
  <div style="background:var(--warm-white); border-radius:18px; padding:32px;
       max-width:480px; width:90%; position:relative;">
    <button onclick="closeInquiryModal()"
      style="position:absolute;top:14px;right:18px;background:none;border:none;
             font-size:20px;cursor:pointer;color:var(--muted);">✕</button>
    <h3 style="font-family:'Fraunces',serif;font-size:22px;margin-bottom:8px;">
      <span class="en-only">Send Purchase Inquiry</span>
      <span class="zh-only">发送购买询盘</span>
    </h3>
    <p style="color:var(--muted);font-size:13px;margin-bottom:20px;">
      <span class="en-only">Tell the creator why you're interested. They'll review and get back to you.</span>
      <span class="zh-only">告诉创作者你的购买意向，他们会尽快与你联系。</span>
    </p>
    <textarea id="inquiry-message" rows="4" placeholder="e.g. I'm a producer looking for short drama scripts..."
      style="width:100%;border:1px solid var(--border);border-radius:10px;
             padding:12px;font-size:14px;resize:vertical;font-family:inherit;
             background:var(--bg);color:var(--text);box-sizing:border-box;"></textarea>
    <div style="margin-top:14px; display:flex; gap:10px; justify-content:flex-end;">
      <button onclick="closeInquiryModal()"
        class="btn btn-outline" style="font-size:13px;">
        <span class="en-only">Cancel</span>
        <span class="zh-only">取消</span>
      </button>
      <button onclick="submitInquiry()"
        class="btn btn-primary" id="inquiry-submit-btn" style="font-size:13px;">
        <span class="en-only">Send Inquiry</span>
        <span class="zh-only">发送询盘</span>
      </button>
    </div>
    <p id="inquiry-result" style="margin-top:12px;font-size:13px;text-align:center;display:none;"></p>
  </div>
</div>
```

**第二步：** 修改购买按钮的点击事件，改为打开 modal：

```js
// 找到原来的 buy 按钮点击处理，改为：
document.getElementById('buy-btn').addEventListener('click', () => {
  // 未登录 → 跳转登录
  const { data: { session } } = ... // 用已有的 session 检查
  // 如果已有登录用户检查逻辑，直接复用；否则：
  if (!window._currentUser) {
    window.location.href = 'login.html';
    return;
  }
  openInquiryModal();
});
```

**第三步：** 加 modal 控制和提交函数：

```js
function openInquiryModal() {
  const modal = document.getElementById('inquiry-modal');
  modal.style.display = 'flex';
  document.getElementById('inquiry-message').value = '';
  document.getElementById('inquiry-result').style.display = 'none';
}

function closeInquiryModal() {
  document.getElementById('inquiry-modal').style.display = 'none';
}
window.closeInquiryModal = closeInquiryModal;

async function submitInquiry() {
  const btn = document.getElementById('inquiry-submit-btn');
  const resultEl = document.getElementById('inquiry-result');
  const message = document.getElementById('inquiry-message').value.trim();

  btn.disabled = true;
  btn.textContent = document.body.classList.contains('zh') ? '发送中...' : 'Sending...';

  // scriptId 和 sellerId 应该在 loadScript() 时已经读取并存到 window._scriptData
  const { error } = await window.supabase_client
    .from('purchase_requests')
    .insert({
      script_id: window._scriptData.id,
      script_title: window._scriptData.title,
      buyer_id: window._currentUser.id,
      seller_id: window._scriptData.user_id,
      message: message,
      status: 'pending'
    });

  btn.disabled = false;
  btn.innerHTML = document.body.classList.contains('zh')
    ? '<span class="zh-only">发送询盘</span>'
    : '<span class="en-only">Send Inquiry</span>';

  resultEl.style.display = 'block';
  if (error) {
    resultEl.style.color = 'var(--coral)';
    resultEl.textContent = error.message;
  } else {
    resultEl.style.color = 'var(--sage)';
    resultEl.textContent = document.body.classList.contains('zh')
      ? '✅ 询盘已发送！创作者会尽快与你联系。'
      : '✅ Inquiry sent! The creator will be in touch soon.';
    setTimeout(closeInquiryModal, 2500);
  }
}
window.submitInquiry = submitInquiry;
```

**重要：** 确保 `loadScript()` 函数里把 script 数据存到 `window._scriptData`（如果已经有类似变量就复用），当前用户存到 `window._currentUser`。

---

### 📋 任务 B：新建 my-inquiries.html（我的询盘页）

**新建文件** `my-inquiries.html`，放在项目根目录。

**功能：**
- 需要登录（引入 `js/auth.js`，调用 `requireAuth()`）
- 根据用户角色显示不同内容：
  - **创作者**：显示"收到的询盘"（`seller_id = currentUser.id`）
  - **买家**：显示"我发出的询盘"（`buyer_id = currentUser.id`）
  - （如果角色未知，两种都显示）

**读取数据：**
```js
// 收到的询盘（创作者）
const { data: received } = await window.supabase_client
  .from('purchase_requests')
  .select('*')
  .eq('seller_id', currentUser.id)
  .order('created_at', { ascending: false });

// 发出的询盘（买家）
const { data: sent } = await window.supabase_client
  .from('purchase_requests')
  .select('*')
  .eq('buyer_id', currentUser.id)
  .order('created_at', { ascending: false });
```

**每条询盘显示：**
- 作品标题（可点击 → `script-detail.html?id=xxx`）
- 消息内容
- 状态徽章：`pending`（待处理）/ `accepted`（已接受）/ `rejected`（已拒绝）
- 发送时间

**创作者可以接受/拒绝询盘：**
```js
async function updateStatus(id, newStatus) {
  await window.supabase_client
    .from('purchase_requests')
    .update({ status: newStatus })
    .eq('id', id);
  loadInquiries(); // 刷新列表
}
```

**样式：** 与 `scripts-list-author.html` 保持一致，用卡片列表。引入 `css/common.css`、`js/theme.js`、`js/nav-mobile.js`、`js/auth.js`、`js/supabase-client.js`。

**双语文案：**
- 页面标题：My Inquiries / 我的询盘
- 收到的询盘：Received / 收到的询盘
- 发出的询盘：Sent / 发出的询盘
- 状态：Pending/待处理，Accepted/已接受，Rejected/已拒绝
- 空状态：No inquiries yet. / 暂无询盘。

---

### 📋 任务 C：在 dashboard.html 加入口

在 dashboard.html 的功能卡片区，加"我的询盘"入口：

```html
<a href="my-inquiries.html" class="dash-card">
  <div class="dash-card-icon">💬</div>
  <div class="dash-card-title">
    <span class="en-only">My Inquiries</span>
    <span class="zh-only">我的询盘</span>
  </div>
  <div class="dash-card-desc">
    <span class="en-only">View purchase inquiries you've sent or received</span>
    <span class="zh-only">查看你发出或收到的购买询盘</span>
  </div>
</a>
```

加在现有卡片的后面（创作者和买家都显示这个入口）。

---

### ✅ 完成后

```bash
git add script-detail.html my-inquiries.html dashboard.html
git commit -m "feat: Add purchase inquiry system

- script-detail.html: Buy button opens inquiry modal, submits to purchase_requests table
- my-inquiries.html: buyers see sent inquiries, creators see received inquiries with accept/reject
- dashboard.html: add My Inquiries entry card for all users"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（询盘弹窗）：完成/失败
✅ 任务B（my-inquiries.html）：完成/失败
✅ 任务C（Dashboard入口）：完成/失败
✅ 推送状态：成功/失败
```

---

### 执行记录（Cursor）

✅ 完成时间：2026-05-09 17:38 CST（UTC+8）
✅ 任务A（询盘弹窗）：完成
✅ 任务B（my-inquiries.html）：完成
✅ 任务C（Dashboard入口）：完成
✅ 推送状态：成功

> ⚠️ 提醒：RJ 需要先在 Supabase SQL Editor 运行本任务开头的 SQL，
> 否则 INSERT 会因为表不存在而报错。

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：下载权限保护**

---

### 背景

目前 `script-detail.html` 的下载按钮对所有登录用户开放——任何人登录后都能直接下载完整文件，根本不需要发询盘。这是一个严重的内容泄露漏洞，必须修复。

**目标规则：**
- ✅ 创作者本人 → 可以下载（自己的文件）
- ✅ 买家已有"已接受"的询盘（status = 'accepted'）→ 可以下载
- ❌ 其他所有人（普通浏览者、未发过询盘的买家）→ **不能**下载，显示引导提示

---

### 📋 任务：修改 script-detail.html 下载权限逻辑

#### 第一步：在 `loadScript()` 完成后，调用权限检查函数

在你原有的 `loadScript()` 或 `window.addEventListener('DOMContentLoaded', ...)` 里，
加载完 script 数据 + 当前用户后，调用：

```js
await checkDownloadAccess();
```

#### 第二步：实现 `checkDownloadAccess()` 函数

```js
async function checkDownloadAccess() {
  const downloadBtn = document.getElementById('download-btn');
  const previewBtn  = document.getElementById('preview-btn'); // 如果有单独 preview 按钮

  // 1. 未登录 → 隐藏下载按钮（已登录才到这里，通常不会触发）
  if (!window._currentUser) {
    lockDownload(downloadBtn);
    return;
  }

  // 2. 是创作者本人 → 直接放行
  if (window._currentUser.id === window._scriptData.user_id) {
    return; // 按钮保持可用
  }

  // 3. 查询是否有 accepted 询盘
  const { data: accepted } = await window.supabase_client
    .from('purchase_requests')
    .select('id')
    .eq('script_id', window._scriptData.id)
    .eq('buyer_id', window._currentUser.id)
    .eq('status', 'accepted')
    .maybeSingle();

  if (accepted) {
    return; // 有已接受询盘 → 放行
  }

  // 4. 其他情况 → 锁定
  lockDownload(downloadBtn);
  if (previewBtn) lockDownload(previewBtn);
}

function lockDownload(btn) {
  if (!btn) return;
  btn.removeAttribute('href');
  btn.removeAttribute('download');
  btn.style.opacity = '0.45';
  btn.style.cursor  = 'not-allowed';
  btn.style.pointerEvents = 'none';

  // 在下载按钮旁边插入提示文字
  const hint = document.createElement('p');
  hint.style.cssText = 'font-size:13px;color:var(--muted);margin-top:8px;';
  hint.innerHTML = document.body.classList.contains('zh')
    ? '🔒 发送询盘并等待创作者接受后可下载完整文件。'
    : '🔒 Send an inquiry and wait for the creator to accept before downloading.';
  btn.parentNode.insertBefore(hint, btn.nextSibling);
}
```

#### 第三步：确保 `window._scriptData` 和 `window._currentUser` 在 loadScript 时被赋值

检查现有代码，在读取 script 数据后加上：
```js
window._scriptData = script; // script 是从 Supabase 读到的那条记录
```

在获取当前用户后加上：
```js
window._currentUser = currentUser; // 已有的 getCurrentUser() 结果
```

如果这两个变量已经以其他名字存在，直接在 `checkDownloadAccess()` 里改用对应名字即可。

---

### ✅ 完成后

```bash
git add script-detail.html
git commit -m "feat: Gate file download behind inquiry acceptance

- Download button locked for users without accepted purchase request
- Creator can always download their own files
- Other users see lock hint: send inquiry first
- Uses purchase_requests table (status = 'accepted') to check access"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 下载权限保护：完成/失败
✅ 推送状态：成功/失败
```

---

### 执行记录（Cursor）

✅ 完成时间：2026-05-09 17:55 CST（UTC+8）
✅ 下载权限保护：完成
✅ 推送状态：成功

---

## 🎯 新任务（Claude 分配，2026-05-09）

**优先级：🔴 立即执行**
**任务名：授权流程完善（7个问题一次打包）**

> 本次任务对应问题清单 P2/P3/P4/P5/P6/P8/P10
> Supabase `scripts` 表已新增字段：`region`、`rights_years`、`copyright_confirmed`（RJ 已执行 SQL）

---

### 📋 任务 A：全站用词统一（P10）

以下替换在所有 HTML 文件中执行：

| 原文 | 改为 |
|------|------|
| Send Inquiry / 发送询盘 | Apply for License / 申请授权 |
| My Inquiries / 我的询盘 | My Applications / 我的申请 |
| Received Inquiries / 收到的询盘 | Received Applications / 收到的申请 |
| Sent Inquiries / 发出的询盘 | Sent Applications / 发出的申请 |
| Purchase Inquiry / 购买询盘 | License Application / 授权申请 |
| Contact Seller / 联系卖家 | Contact Creator / 联系创作者 |
| inquiry-modal / inquiry-message 等 id 名 | 保留不变（只改显示文字，不改 JS 变量名） |

页面范围：`script-detail.html`、`my-inquiries.html`、`dashboard.html`

---

### 📋 任务 B：上传/编辑页加三个新字段（P3/P8）

**修改 `scripts-upload.html` 和 `script-edit.html`，在"版权类型"字段下方加：**

#### B1：授权地区（仅当 rights_type ≠ 买断时显示）

```html
<div class="form-group" id="region-group">
  <label>
    <span class="en-only">License Region</span>
    <span class="zh-only">授权地区</span>
  </label>
  <select id="region-select">
    <option value="mainland">中国大陆 / Mainland China</option>
    <option value="greater_china">大中华区 / Greater China</option>
    <option value="asia">亚洲 / Asia</option>
    <option value="global" selected>全球 / Global</option>
  </select>
</div>
```

#### B2：授权年限（仅当 rights_type ≠ 买断时显示）

```html
<div class="form-group" id="rights-years-group">
  <label>
    <span class="en-only">License Duration</span>
    <span class="zh-only">授权年限</span>
  </label>
  <select id="rights-years-select">
    <option value="1year">1年 / 1 Year</option>
    <option value="3years">3年 / 3 Years</option>
    <option value="5years">5年 / 5 Years</option>
    <option value="permanent" selected>永久 / Permanent</option>
  </select>
</div>
```

#### B2 逻辑：当选择"买断"时隐藏这两个字段

```js
// 在版权类型选择的 change 事件里加：
const isBuyout = document.querySelector('input[name="rights_type"]:checked')?.value === 'buyout';
document.getElementById('region-group').style.display = isBuyout ? 'none' : '';
document.getElementById('rights-years-group').style.display = isBuyout ? 'none' : '';
```

#### B3：版权声明确认框（放在提交按钮上方）

```html
<div class="form-group">
  <label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">
    <input type="checkbox" id="copyright-confirm" required style="margin-top:3px;flex-shrink:0;">
    <span style="font-size:13px;color:var(--muted);line-height:1.6;">
      <span class="en-only">I confirm that I am the sole copyright holder of this work. I take full legal responsibility for any copyright disputes arising from this upload.</span>
      <span class="zh-only">我确认我是本作品的唯一版权持有人。如因上传内容引发任何版权纠纷，由我承担全部法律责任。</span>
    </span>
  </label>
</div>
```

**在 Supabase INSERT / UPDATE 里加入新字段：**

```js
// scripts-upload.html 的 INSERT 加：
region: isBuyout ? 'global' : document.getElementById('region-select').value,
rights_years: isBuyout ? 'permanent' : document.getElementById('rights-years-select').value,
copyright_confirmed: true,  // 勾选了才能提交，所以必然是 true

// scripts-upload.html 提交前检查：
if (!document.getElementById('copyright-confirm').checked) {
  showError('请勾选版权确认 / Please confirm copyright ownership.');
  return;
}
```

**script-edit.html 加载数据时预填这两个字段（region / rights_years）。**

---

### 📋 任务 C：详情页展示试读片段（P4）

**修改 `script-detail.html`，在简介和购买按钮之间加试读区块：**

在读取 script 数据后，加：

```js
// 在 loadScript() 里，填充完 title/description 后加：
if (script.preview_text && script.preview_text.trim()) {
  document.getElementById('preview-section').style.display = 'block';
  document.getElementById('preview-text').textContent = script.preview_text;
}
```

HTML 结构（加在 description 下方、购买按钮上方）：

```html
<div id="preview-section" style="display:none; margin: 24px 0;">
  <h3 style="font-size:16px;font-weight:600;margin-bottom:12px;">
    <span class="en-only">📖 Preview</span>
    <span class="zh-only">📖 试读片段</span>
  </h3>
  <div id="preview-text"
    style="white-space:pre-wrap;font-size:14px;line-height:1.9;
           background:var(--warm-white);border:1px solid var(--border);
           border-radius:12px;padding:20px;color:var(--text);
           max-height:300px;overflow-y:auto;">
  </div>
  <p style="font-size:12px;color:var(--muted);margin-top:8px;">
    <span class="en-only">🔒 Full script available after your application is accepted.</span>
    <span class="zh-only">🔒 申请授权并获创作者接受后，可下载完整作品。</span>
  </p>
</div>
```

同时，在详情页展示授权地区和年限（如果有）：

```js
// 在作品信息区加两行显示：
if (script.region) {
  const regionMap = { mainland:'中国大陆', greater_china:'大中华区', asia:'亚洲', global:'全球' };
  document.getElementById('script-region').textContent = regionMap[script.region] || script.region;
}
if (script.rights_years) {
  const yearsMap = { '1year':'1年', '3years':'3年', '5years':'5年', 'permanent':'永久' };
  document.getElementById('script-rights-years').textContent = yearsMap[script.rights_years] || script.rights_years;
}
```

在 HTML 信息列表里加对应的 `<span id="script-region">` 和 `<span id="script-rights-years">`。

---

### 📋 任务 D：我的申请页——已接受状态加下载链接（P6）

**修改 `my-inquiries.html`，在已接受的申请卡片里加下载入口：**

找到渲染申请列表的部分，对 `status === 'accepted'` 的条目加：

```js
const downloadLink = req.status === 'accepted'
  ? `<a href="script-detail.html?id=${req.script_id}" class="btn btn-primary btn-sm" style="margin-top:10px;">
       <span class="en-only">↓ Go to Download</span>
       <span class="zh-only">↓ 前往下载</span>
     </a>`
  : '';
```

在卡片 HTML 里把 `${downloadLink}` 渲染出来。

---

### 📋 任务 E：独家授权接受后自动下架（P2）

**修改 `my-inquiries.html` 的 `updateStatus()` 函数：**

在创作者点"接受"后，额外检查该作品是否为独家授权。如果是，自动将作品 status 改为 `'sold'`：

```js
async function updateStatus(requestId, newStatus) {
  // ... 现有逻辑 ...

  if (newStatus === 'accepted') {
    // 找到这条申请对应的 script_id
    const req = (_receivedData || []).find(r => r.id === requestId);
    if (req && req.script_id) {
      // 查作品的 rights_type
      const { data: scriptData } = await window.supabase_client
        .from('scripts')
        .select('rights_type')
        .eq('id', req.script_id)
        .maybeSingle();

      if (scriptData && scriptData.rights_type === 'exclusive') {
        // 独家授权 → 自动下架（改为 sold）
        await window.supabase_client
          .from('scripts')
          .update({ status: 'sold' })
          .eq('id', req.script_id);
      }
    }
  }

  // ... 后续刷新列表逻辑 ...
}
```

> `marketplace.html` 和 `scripts-browse.html` 已过滤只显示 `status = 'published'`，
> 所以改成 `'sold'` 后自动从市场消失，无需额外修改。

---

### 📋 任务 F：买家申请时邮件通知（P5）

**修改 `script-detail.html` 的 `submitInquiry()` 函数：**

在 Supabase INSERT 成功后，静默发一封邮件通知到管理员：

```js
// Supabase insert 成功后加：
// 静默发通知邮件（失败不影响主流程）
try {
  const WEB3FORMS_KEY = 'cbfde96d-d025-42af-a16b-81461d91783c';
  const notifyBody = new FormData();
  notifyBody.append('access_key', WEB3FORMS_KEY);
  notifyBody.append('subject', `[ScriptBridge] 新授权申请：${window._scriptData?.title || '未知作品'}`);
  notifyBody.append('message',
    `作品：${window._scriptData?.title || ''}\n` +
    `买家邮箱：${window._currentUser?.email || ''}\n` +
    `申请留言：${message || '（无留言）'}\n` +
    `时间：${new Date().toLocaleString('zh-CN')}\n\n` +
    `请登录平台处理：https://8844-code.github.io/scriptbridge/my-inquiries.html`
  );
  fetch('https://api.web3forms.com/submit', { method: 'POST', body: notifyBody });
} catch (_) {}
```

---

### ✅ 完成后

```bash
git add script-detail.html my-inquiries.html dashboard.html scripts-upload.html script-edit.html
git commit -m "feat: Complete license flow — unified terms, new fields, preview, notifications

- Rename inquiry → license application throughout (P10)
- scripts-upload/edit: add region, rights_years, copyright confirmation (P3/P8)
- script-detail: show preview_text excerpt and license details (P4)
- script-detail: email admin on new application via Web3Forms (P5)
- my-inquiries: show download link for accepted applications (P6)
- my-inquiries: auto-unpublish script when exclusive license accepted (P2)"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（用词统一）：完成/失败
✅ 任务B（新字段）：完成/失败
✅ 任务C（试读片段）：完成/失败
✅ 任务D（下载链接）：完成/失败
✅ 任务E（独家自动下架）：完成/失败
✅ 任务F（邮件通知）：完成/失败
✅ 推送状态：成功/失败
```

---

### 执行记录（Cursor）

✅ 完成时间：2026-05-09 19:15 CST（UTC+8）
✅ 任务A（用词统一）：完成
✅ 任务B（新字段）：完成
✅ 任务C（试读片段）：完成
✅ 任务D（下载链接）：完成
✅ 任务E（独家自动下架）：完成
✅ 任务F（邮件通知）：完成
✅ 推送状态：成功

---

## 🎯 新任务（Claude 分配，2026-05-12）

**优先级：🔴 立即执行**
**任务名：推送 + 深色模式深度检查**

---

### 📋 任务 A：推送已有 commit

Claude 修复了 `css/common.css` 的深色模式问题，commit 已在本地（`5d0d074`）。
只需要执行：

```bash
git push origin main
```

---

### 📋 任务 B：深色模式全页检查与修复

逐一打开以下页面，切换到深色模式，检查并修复：

**检查清单（每个页面）：**
- [ ] 文字是否清晰可读（无浅色文字在浅色背景上）
- [ ] 输入框背景与文字是否对比足够
- [ ] 按钮是否可见（尤其是 outline 类型）
- [ ] 卡片背景是否正确变暗（不能出现亮米色卡片在深色背景上）
- [ ] 价格、标签、徽章颜色是否适配

**优先检查这些页面：**
1. `marketplace.html` — 公开页面，访客最多看到这个
2. `script-detail.html` — 详情页
3. `scripts-upload.html` — 上传页
4. `dashboard.html` — 个人主页
5. `my-inquiries.html` — 申请页

**发现问题直接在对应 HTML 或 CSS 修复。**

---

### ✅ 完成后

```bash
git add -A
git commit -m "fix(theme): dark mode polish across all pages

- Fix any remaining light-on-light or dark-on-dark contrast issues
- Ensure all cards, inputs, buttons visible in dark mode"
git push origin main
```

在本文件末尾写完成状态：
```
✅ 完成时间：[时间]
✅ 任务A（推送）：完成/失败
✅ 任务B（深色模式检查）：完成/失败
✅ 推送状态：成功/失败
```

---

### 执行记录（Cursor · 2026-05-12）

✅ 完成时间：2026-05-12（UTC+8，以本机为准）
✅ 任务A（推送）：**失败**（本环境无 GitHub HTTPS 凭据：`could not read Username for 'https://github.com'`）。**请在本机终端执行：** `git push origin main`，将本地 `main` 自 `5d0d074` 起的提交全部推送（含 `eb9c849`、`c78002e` 与 `docs: mark task as completed`）。
✅ 任务B（深色模式检查）：**完成**（`css/common.css`：`marketplace` 空状态 `.empty-state`、副标题 `.browse-header p`；`script-detail`：`.license-extra-panel`、`.inquiry-modal-panel`、`#preview-text`、价格区/类型 pill/rights badge；`script-detail.html`：弹窗内层 class、授权条 class、`#inquiry-message` 使用 `var(--warm-white)` / `var(--ink)`）。
✅ 推送状态：**失败**（同上）。样式改动：`eb9c849`；`CURSOR_TASK.md` 已从误截断恢复并追加本段执行记录，文档 commit：`docs: mark task as completed`。

---

## 🎯 新任务（Claude 分配，2026-05-12）

**优先级：🔴 立即执行**  
**任务名：提交深色 Logo 文件**

---

### 背景

Claude 已完成深色模式 Logo 修复，涉及两个文件：
- `images/scriptbridge-mark-dark.svg`（新建）— 深色背景版 Logo，保持与亮色版相同的 S 形设计语言
- `css/common.css`（已修改）— 深色模式下隐藏亮色 img，用 `::after` 伪元素展示深色 SVG

这两个文件**尚未提交**（`git status` 可验证），需要 Cursor 提交。

---

### 📋 任务 A：提交 Logo 修复

```bash
cd "/Users/gia/Desktop/RJ's AI Brian/03 项目/ScriptBridge"
git add images/scriptbridge-mark-dark.svg css/common.css
git commit -m "feat(brand): add dark mode logo mark SVG + CSS swap

- Add images/scriptbridge-mark-dark.svg: dark navy background version
  of the logo mark, same S-curve design as light version
- css/common.css: in dark mode, hide light img (visibility:hidden),
  show dark SVG via ::after pseudo-element + background-image
- Add position:relative to .nav-logo-mark for ::after positioning"
```

推送仍会失败（无 GitHub 凭据）。**提交完成后，RJ 在本机终端运行：**
```bash
git push origin main
```
这一次 push 会把所有积压的本地 commits（`5d0d074`、`eb9c849`、`c78002e`、`93d7dbc`、`5cce348` 等）一并推上去。

---

### ✅ 完成后在此写：
```
✅ 完成时间：2026-05-12（UTC+8）
✅ 任务A（Logo commit）：完成
```

### 执行记录（Cursor）

✅ 完成时间：2026-05-12（UTC+8）
✅ 任务A（Logo commit）：完成（`5cce348` `feat(brand): add dark mode logo mark SVG + CSS swap`；`CURSOR_TASK` 已另提交 `docs: mark task as completed`。）
✅ 推送状态：失败（本环境无 GitHub HTTPS 凭据；请本机执行 `git push origin main`，将本地 `main` 全部推送，含 `5cce348` 与文档 commit。）

---

## 任务 2026-05-17

**优先级：🟠 执行**
**任务名：清理未提交文件 + 注册邮箱验证**

---

### 背景

距上次提交已过了5天。`git status` 目前有：
- **已修改未提交**：`WORKFLOW.md`、`images/favicon.svg`、`images/scriptbridge-mark.svg`（Logo 微调）
- **未追踪文件**：`images/mark-a.svg`、`images/mark-b.svg`、`images/mark-c.svg`、`C-logo-concepts-preview.html`、`logo-preview.html`（Logo 设计草稿，已废弃）；`03 上线推广/` 下有几个小红书内容文件

自定义域名已生效（CNAME 已配置），github.io 已替换。

---

### 📋 任务 A：提交已修改的 Logo 和 WORKFLOW 文件

```bash
# 只提交真正需要的修改，Logo 草稿不进 git
git add images/favicon.svg images/scriptbridge-mark.svg WORKFLOW.md
git commit -m "style(brand): update favicon and logo mark SVG

Minor refinements to favicon.svg and scriptbridge-mark.svg;
update WORKFLOW.md to reflect current project state"
```

然后把 Logo 草稿文件加进 `.gitignore`，避免误提交：
打开 `.gitignore`，在末尾加：
```
# Logo design drafts
images/mark-a.svg
images/mark-b.svg
images/mark-c.svg
C-logo-concepts-preview.html
logo-preview.html
```

```bash
git add .gitignore
git commit -m "chore: ignore logo design draft files"
```

---

### 📋 任务 B：注册后邮箱验证

**目标：** 用户注册后收到验证邮件，未验证前无法正常使用平台功能。

**实现方式：**

Supabase Auth 已内置邮箱验证功能，默认是开启的但 `signup.html` 目前直接跳转 dashboard，没有处理验证状态。

**步骤：**

1. **检查 Supabase 后台设置**（Cursor 在代码里确认，不需要手动进后台）
   - 打开 `js/supabase-client.js`，确认 Supabase project URL（用于定位后台）
   - 在 Supabase Dashboard → Authentication → Email Templates，确认验证邮件已启用（默认应启用）

2. **修改 `signup.html`**
   注册成功后不跳转 dashboard，改为显示提示页面：
   ```
   "注册成功！请检查邮箱，点击验证链接后即可登录。"
   （英文：Registration successful! Please check your email to verify your account.）
   ```
   不需要新建页面，在 `signup.html` 里用条件渲染显示这个提示即可。

3. **修改 `login.html`**
   登录时检测用户是否已验证邮箱（`session.user.email_confirmed_at`）：
   - 已验证 → 正常跳转 dashboard
   - 未验证 → 显示提示："请先验证邮箱，验证邮件已发送到 xxx@xxx.com。"并提供「重新发送验证邮件」按钮（调用 `supabase.auth.resend({ type: 'signup', email })`）

4. **处理验证回调**
   Supabase 验证链接默认会带 token 参数，回调 URL 需要在 Supabase Dashboard → Authentication → URL Configuration 里配置（如果自定义域名已生效，回调 URL 改成你的域名，不是 github.io）。
   
   在代码层面：`auth.js` 的 `requireAuth()` 已在多个页面使用，在此函数里加一个验证检查：
   ```javascript
   // 在 requireAuth() 里，获取 session 后加：
   if (session && !session.user.email_confirmed_at) {
     window.location.href = '/login.html?unverified=1';
     return null;
   }
   ```

5. **commit**
   ```bash
   git add signup.html login.html js/auth.js
   git commit -m "feat(auth): add email verification flow on signup

   - signup.html: show verification prompt instead of redirect after registration
   - login.html: detect unverified users, show resend option
   - auth.js: redirect unverified users to login with ?unverified=1 param"
   ```

---

### ⚠️ 注意事项

- Supabase Free tier 每月邮件发送有上限（3封/小时/用户，100封/天总计）——目前用户量极少，够用
- 如果测试时注册的邮箱收不到验证邮件，检查 Supabase Dashboard → Authentication → Email → 是否开启了「Enable email confirmations」
- 任务 B 完成后，RJ 用一个新邮箱注册测试一遍，确认流程走通

---

### ✅ 完成后在此写：
```
✅ 完成时间：2026-05-19（UTC+8）
✅ 任务A（提交Logo+WORKFLOW）：完成（1ae2575、4a3e3a3）
✅ 任务B（邮箱验证）：完成（feat commit 见 git log -1）
✅ 推送状态：待本机 push
```

### 执行记录（Cursor）

✅ 完成时间：2026-05-19（UTC+8）
✅ 任务A（提交Logo+WORKFLOW）：完成 — `1ae2575` style(brand)、`4a3e3a3` chore gitignore
✅ 任务B（邮箱验证）：完成 — signup 验证提示、login 未验证拦截+重发、auth.js requireAuth 检查
✅ 推送状态：未在本环境执行（请本机 `git push origin main`）
