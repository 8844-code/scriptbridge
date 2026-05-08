# ScriptBridge MVP 实施计划 — Supabase 路线

> 最后更新：2026-05-08  
> 状态：准备就绪，第一阶段启动

---

## 为什么选 Supabase？

| 功能 | Bubble | Softr + Airtable | Supabase | 选择理由 |
|------|--------|-----------------|----------|---------|
| 免费层数据库 | 有但受限 | 受限 | 500MB **充足** | ✅ |
| 文件存储 | 需升级付费 | 有 | 1GB **免费** | ✅ |
| 用户认证系统 | 内置 | 无需（Airtable） | 内置且强大 | ✅ |
| 月费 | ¥1000-2000 | ¥500-1000 | **0** | ✅ |
| JavaScript SDK | 有 | 通过 Airtable API | 友好 | ✅ |
| 学习曲线 | 中等 | 低 | 低 | ✅ |
| **推荐度** | — | — | **强烈推荐** | — |

**关键优势：** 基于你现有的 HTML/JS 框架，只需在 index.html 同级目录新建几个 HTML 页面，通过 Supabase JavaScript SDK 实现功能，无需学习新的 no-code 工具。

---

## 整个 MVP 四周计划

### Week 1 — 用户系统（第 1-7 天）

**目标：** 创作者和买家都能注册、登录、看到个人主页

| 日 | 任务 | 交付物 | 时间 | 前置条件 |
|----|------|--------|------|---------|
| Day 1-2 | Supabase 账号创建 + 数据库初始化 | 8 张表、权限配置 | 2h | 无 |
| Day 2-3 | 注册页面（signup.html）| 邮箱注册表单 + Supabase 集成 | 4h | DB 就绪 |
| Day 3-4 | 登录页面（login.html）| 邮箱登录表单 + 保存 session | 3h | signup 完成 |
| Day 5-6 | 个人主页框架（dashboard.html）| 显示登录用户信息 + 基础导航 | 3h | login 完成 |
| Day 7 | 测试 & 部署 | 能完整走通注册→登录→进入主页 | 2h | 全部完成 |

**关键里程碑：** Day 7 结束，RJ 能在本地网站上用邮箱完整注册和登录。

---

### Week 2-3 — 创作者上传功能（第 8-21 天）

**目标：** 创作者能上传 PDF/Word，系统存到 Supabase Storage，记录到数据库

| 阶段 | 任务 | 交付物 | 时间 |
|------|------|--------|------|
| **Day 8-10** | 上传表单页（scripts-upload.html） | 文件选择器、标题、简介、题材、价格 | 4h |
| **Day 10-12** | 文件上传到 Supabase Storage | 能真实上传 PDF，返回文件 URL | 3h |
| **Day 12-14** | 写入数据库（scripts 表） | 元数据保存：title, author, genre, price, file_url | 3h |
| **Day 15-17** | 创作者作品列表页（scripts-list-author.html） | 显示自己上传的所有作品 | 3h |
| **Day 17-21** | 测试 & 修正 | 能完整上传→查看自己的作品列表 | 3h |

**关键里程碑：** Day 21 结束，RJ 能在网站上上传一个剧本，然后在个人列表里看到它。

---

### Week 3-4 — 买家浏览 & 联系功能（第 18-28 天）

**目标：** 买家能搜索、筛选剧本，看详情，联系创作者

| 阶段 | 任务 | 交付物 | 时间 |
|------|------|--------|------|
| **Day 18-20** | 买家作品浏览页（scripts-browse.html） | 显示所有已上架剧本，卡片样式 | 4h |
| **Day 20-23** | 搜索 & 筛选功能 | 按题材、价格范围、关键词筛选 | 4h |
| **Day 23-25** | 作品详情页（script-detail.html） | 显示完整信息 + 创作者简介 | 3h |
| **Day 25-27** | 联系功能（暂时用邮箱） | 显示创作者邮箱 或 站内消息按钮 | 2h |
| **Day 27-28** | 全流程测试 | 能完整走通：搜索→查看→联系 | 2h |

**关键里程碑：** Day 28 结束，买家能在网站上找到上传的剧本并发起联系。

---

## 数据库表结构（8 张表）

```sql
-- 1. users（用户基本信息）
user_id (PK, UUID)
email (unique)
role (creator / buyer)
full_name
bio
avatar_url
created_at
updated_at

-- 2. scripts（剧本作品）
script_id (PK, UUID)
author_id (FK → users)
title
description
genre (short film / film / drama / other)
price (CNY)
file_url (Supabase Storage)
status (draft / published / sold)
created_at
updated_at

-- 3. messages（站内消息）
message_id (PK, UUID)
from_user_id (FK)
to_user_id (FK)
script_id (FK → scripts)
content
read (boolean)
created_at

-- 4. transactions（交易记录）
transaction_id (PK, UUID)
buyer_id (FK)
seller_id (FK)
script_id (FK)
amount
status (pending / completed / cancelled)
contract_signed (boolean)
created_at

-- 5. contracts（电子合同）
contract_id (PK, UUID)
transaction_id (FK)
contract_template (JSON)
signed_by_buyer (boolean)
signed_by_seller (boolean)
created_at

-- 6. reviews（作品评价）
review_id (PK, UUID)
script_id (FK)
user_id (FK)
rating (1-5)
comment
created_at

-- 7. audit_log（审核日志）
log_id (PK, UUID)
action (upload / delete / publish)
user_id (FK)
script_id (FK)
status (approved / rejected)
notes
created_at

-- 8. settings（平台设置）
key (text, unique)
value (JSON)
updated_at
```

---

## 技术细节：集成 Supabase

### Step 0: Supabase 账号创建
1. 去 supabase.com/dashboard 注册（邮箱注册）
2. 新建 Project → 选择 Region（Asia-Singapore 最近）
3. 获取 `SUPABASE_URL` 和 `SUPABASE_ANON_KEY`（Settings → API）
4. 在 HTML `<head>` 中引入 SDK：
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   ```

### Step 1: 初始化客户端（在每个 HTML 页面的 `<script>` 标签）
```javascript
const SUPABASE_URL = 'https://xxxxx.supabase.co';
const SUPABASE_KEY = 'eyJhbGc...';
const { createClient } = supabase;
const client = createClient(SUPABASE_URL, SUPABASE_KEY);
```

### Step 2: 注册功能
```javascript
async function signup(email, password, role) {
  const { data, error } = await client.auth.signUp({
    email: email,
    password: password,
  });
  if (error) console.error(error);
  
  // 插入用户信息到 users 表
  if (data.user) {
    const { error } = await client.from('users').insert({
      user_id: data.user.id,
      email: email,
      role: role,
    });
  }
  return data;
}
```

### Step 3: 登录功能
```javascript
async function login(email, password) {
  const { data, error } = await client.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) console.error(error);
  localStorage.setItem('user', JSON.stringify(data.user));
  return data;
}
```

### Step 4: 文件上传
```javascript
async function uploadScript(file, scriptMeta) {
  const fileName = `scripts/${Date.now()}_${file.name}`;
  const { data, error } = await client.storage
    .from('scripts-storage')
    .upload(fileName, file);
  
  if (error) console.error(error);
  
  // 插入数据库记录
  const { error: dbError } = await client.from('scripts').insert({
    author_id: currentUserId,
    title: scriptMeta.title,
    file_url: data.path,
    price: scriptMeta.price,
    // ... 其他字段
  });
  return data;
}
```

---

## 项目文件结构（执行完后）

```
ScriptBridge/
├── 02 开发/
│   ├── index.html                    ← 现有首页（不改）
│   ├── signup.html                   ← ✨ 新增：注册页
│   ├── login.html                    ← ✨ 新增：登录页
│   ├── dashboard.html                ← ✨ 新增：个人主页
│   ├── scripts-upload.html           ← ✨ 新增：上传表单
│   ├── scripts-list-author.html      ← ✨ 新增：我的作品列表
│   ├── scripts-browse.html           ← ✨ 新增：浏览所有作品
│   ├── script-detail.html            ← ✨ 新增：作品详情页
│   ├── css/
│   │   ├── common.css                ← 共享样式（nav, footer, etc）
│   │   └── components.css            ← 按钮、表单、卡片样式
│   ├── js/
│   │   ├── supabase-client.js        ← Supabase 初始化（所有页面用）
│   │   ├── auth.js                   ← 登录、注册、session 管理
│   │   └── api.js                    ← 数据库查询、文件上传的通用函数
│   └── C 实施计划-Supabase MVP.md   ← 本文档
```

---

## 部署到 GitHub Pages

每个新页面创建后，推送到 GitHub 就能立即部署（无需额外配置）：

```bash
cd /tmp/scriptbridge
git add .
git commit -m "Add signup, login, dashboard pages"
git push https://8844-code:[TOKEN]@github.com/8844-code/scriptbridge.git main
```

新页面访问：`https://8844-code.github.io/scriptbridge/signup.html`

---

## 风险和应对

| 风险 | 出现场景 | 应对方案 |
|------|---------|---------|
| **Supabase 免费层限制** | 文件太多 / 数据库行数超限 | 开始前清楚 free tier 限制，达到上限时升级到 $5/月方案 |
| **认证安全问题** | 忘记登录状态 / token 过期 | 使用 Supabase 内置的 session 管理，不要自己写 token 逻辑 |
| **跨域问题（CORS）** | JavaScript 调用 Supabase API 失败 | Supabase 默认配置好 CORS，不用担心；如出现问题，检查 API Key 权限 |
| **文件上传失败** | 文件过大 / 格式不支持 | 在客户端做文件验证（格式：PDF/Word；大小：<50MB） |

---

## 时间现实检查

这个计划假设：
- RJ 每天能投入 **4-6 小时**（包括学习 + 开发 + 测试）
- Claude 帮你 **100% 写代码**（你负责理解、测试、决策）
- **没有突发事件打扰**

如果时间紧张，可以**缩小 MVP 范围**：
- **最小化最小化版本（Day 14）：** 只做到"创作者上传"，暂时没有买家功能
- **Day 28 的买家功能** 可以推到 Week 5

---

## 执行检查清单

在开始每一个新的 Phase 前，确认：

- [ ] **Day 1 开始前**
  - [ ] Supabase 账号已创建
  - [ ] 数据库表已全部创建
  - [ ] SUPABASE_URL 和 KEY 已保存到 `js/supabase-client.js`
  - [ ] 本地测试环境就绪（能在浏览器打开 HTML 文件）

- [ ] **Phase 1 完成后**
  - [ ] signup.html 能完整注册
  - [ ] login.html 能登录并保存 session
  - [ ] dashboard.html 能显示当前登录用户信息
  - [ ] 推送到 GitHub 并验证网络地址能访问

- [ ] **Phase 2 完成后**
  - [ ] scripts-upload.html 能上传 PDF/Word
  - [ ] 文件真实存储在 Supabase Storage
  - [ ] 元数据真实存储在 scripts 表
  - [ ] scripts-list-author.html 能显示自己上传的所有作品

- [ ] **Phase 3 完成后**
  - [ ] scripts-browse.html 能列出所有公开剧本
  - [ ] 搜索和筛选功能工作正常
  - [ ] script-detail.html 能显示完整信息
  - [ ] 买家能联系到创作者

---

## 下一步

准备好开始？通知我，我们立即：
1. ✅ 帮你创建 Supabase 账号并初始化数据库
2. ✅ 生成第一个 HTML 页面（signup.html）+ Supabase 集成代码
3. ✅ 教你如何本地测试和推送到 GitHub

所有代码我写，你负责测试和反馈。
