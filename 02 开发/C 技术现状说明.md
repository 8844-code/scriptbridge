# C 技术现状说明

> 最后更新：2026-05-05

---

## 当前技术架构

**纯静态网站，无后端。**

| 组件 | 工具 | 说明 |
|------|------|------|
| 网站托管 | GitHub Pages | 免费，自动部署 |
| 代码仓库 | github.com/8844-code/scriptbridge | 只有一个 index.html |
| 表单收集 | Web3Forms | 免费250封/月，收件到 qtian904@gmail.com |
| 字体 | Google Fonts（DM Sans / Fraunces / Noto Sans SC） | 免费 |
| 部署地址 | https://8844-code.github.io/scriptbridge/ | |

---

## 已实现功能

- 双语切换（中/英）
- 候补名单表单（真实收集邮件）
- 市场洞察轮播 ticker（5条，4.5秒切换）
- 候补人数展示（滚动触发计数动画）
- 提交成功后分享按钮（复制链接 + X/Twitter）
- Favicon（珊瑚红 S 图标）
- 手机端响应式布局

---

## 修改网站的方法

1. 本地克隆仓库到 `/tmp/scriptbridge/`
2. 修改 `index.html`
3. 推送到 GitHub（需要 Personal Access Token）

```bash
cd /tmp/scriptbridge
git add index.html
git commit -m "说明改了什么"
git push https://8844-code:[TOKEN]@github.com/8844-code/scriptbridge.git main
```

---

## 已知局限

- 所有数据存在 Web3Forms，无法在平台内查看注册用户
- 候补人数是写死的（需手动更新）
- 无后端，无法做用户系统、上传、支付

---

## 下一步技术决策

见 [[../01 产品/C MVP功能规划]] — 技术路线部分
