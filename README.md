<div style="text-align: center;">

# Roey Mail

### 基于 Cloudflare 全家桶的自托管临时邮箱服务

##### 二次开发自 [xi-mail](https://github.com/PastKing/xi-mail) · UI 全面重设计 · 功能持续扩展

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/roeyqian/RoeyMail?style=flat&color=6366f1)](https://github.com/roeyqian/RoeyMail/stargazers)
[![Telegram](https://img.shields.io/badge/Telegram-@RoeyMail-26A5E4?logo=telegram)](https://t.me/RoeyMail)

#### [简体中文](#简体中文) | [English](#English)

</div>

---

# 简体中文

## 📖 项目简介

Roey Mail 是基于 **Cloudflare Workers / D1 / KV / R2** 构建的全栈自托管邮箱服务，在 [xi-mail](https://github.com/PastKing/xi-mail) 开源项目基础上进行二次开发，带来全面 UI 重设计与一系列新功能。

只需一个托管于 Cloudflare 的域名，即可免费部署支持多账户、多域名、层级权限的完整邮箱平台。

可自行前往上游项目以查看更多具体细节。

---

## 🛠️ 技术栈

| 层级 | 技术                 |
|------|--------------------|
| 运行时 | Cloudflare Workers |
| Web 框架 | Hono               |
| ORM | Drizzle ORM        |
| 数据库 | Cloudflare D1      |
| 缓存 / 会话 | Cloudflare KV      |
| 文件存储 | Cloudflare R2      |
| 前端框架 | Vue 3 + Vite       |
| UI 组件库 | Element Plus       |
| CSS 工具 | TailwindCSS 4      |
| 动画库 | @vueuse/motion     |
| 状态管理 | Pinia              |
| 路由 | Vue Router         |
| 国际化 | vue-i18n（简中 / 英文）  |

---

## 📁 目录结构

```
RoeyMail/
├── mail-worker/                 # Cloudflare Worker 后端
│   ├── src/
│   │   ├── api/                 # 接口路由层
│   │   ├── service/             # 业务逻辑层
│   │   ├── entity/              # Drizzle 数据库实体
│   │   ├── security/            # JWT 身份认证 + 权限中间件
│   │   ├── init/                # 数据库初始化 / 版本迁移
│   │   └── index.js             # Worker 入口
│   └── wrangler.example.toml    # 配置模板（复制为 wrangler.toml 后填写）
│
└── mail-view/                   # Vue 3 前端
    ├── src/
    │   ├── layout/              # 布局组件（侧边栏 / 顶栏 / 账号栏）
    │   ├── views/               # 页面组件
    │   ├── components/          # 通用组件
    │   ├── store/               # Pinia 状态管理
    │   ├── i18n/                # 国际化（zh / en）
    │   └── style.css            # 全局样式 / 设计 Token
    └── vite.config.js
```

---

## 🚀 快速部署

### 前置要求

- Node.js ≥ 20
- 已登录 Cloudflare 账户：`npx wrangler login`
- 一个托管在 Cloudflare 的域名，并配置好邮件路由（Email Routing）

### 步骤

```
# 1. 克隆项目
git clone https://github.com/roeyqian/RoeyMail.git
cd RoeyMail/mail-worker

# 2. 安装依赖
npm install

# 3. 创建 Cloudflare 资源
npx wrangler d1 create roey-mail-d1          # 记录输出的 database_id
npx wrangler kv namespace create roey-mail-kv     # 记录输出的 id
npx wrangler r2 bucket create roey-mail-r2

# 4. 配置 wrangler.toml
cp wrangler.example.toml wrangler.toml
# 编辑 wrangler.toml，填入上一步获得的 ID、域名列表、管理员邮箱、JWT 密钥

# 5. 构建前端
cd ../mail-view
npm install
npm run build

# 6. 初始化数据库并部署
cd ../mail-worker
npx wrangler deploy

# 7. 初始化数据库表结构（首次部署后访问）
# 在浏览器中访问：https://your-worker.workers.dev/api/init/<JWT_SECRET>
```

### wrangler.toml 关键字段说明

```toml
[vars]
domain      = ["mail.example.com"]   # 邮箱域名列表（JSON 数组）
admin       = "admin@example.com"    # 管理员邮箱（首次初始化后无法更改）
jwt_secret  = "your-secret"          # JWT 签名密钥（至少 32 位随机字符串）
```

> 部署更详细的说明请参考上上游项目：[xi-mail 部署文档](https://github.com/PastKing/xi-mail)

---

## 📡 全局 API Token

系统设置 → 安全 → **全局 API Token** 中开启并生成 Token 后，可通过以下接口无需登录查询邮件：

```
GET /api/admin/mails?limit=20&offset=0&address=user@domain.com
x-admin-auth: <your-token>
```

响应格式：

```
{
  "results": [...],
  "count": 100
}
```

---

## 💬 社区 & 支持

| 渠道 | 链接                                                        |
|------|-----------------------------------------------------------|
| GitHub | [roeyqian/RoeyMail](https://github.com/roeyqian/RoeyMail) |
| Telegram 频道 | [@RoeyMail](https://t.me/RoeyMail)                        |
| 上游项目 | [PastKing/xi-mail](https://github.com/PastKing/xi-mail)   |

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

---

<div style="text-align: center;">

# Roey Mail

**Self-hosted temporary email service powered by the Cloudflare stack**

Forked from [xi-mail](https://github.com/PastKing/xi-mail) · Complete UI redesign · Ongoing feature extensions

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stars](https://img.shields.io/github/stars/roeyqian/RoeyMail?style=flat&color=6366f1)](https://github.com/roeyqian/RoeyMail/stargazers)
[![Telegram](https://img.shields.io/badge/Telegram-@RoeyMail-26A5E4?logo=telegram)](https://t.me/RoeyMail)

[简体中文](#简体中文) | [English](#English)

</div>

---

# English

## 📖 Project Overview

Roey Mail is a full-stack self-hosted email service built on **Cloudflare Workers / D1 / KV / R2**, forked from the open-source project [xi-mail](https://github.com/PastKing/xi-mail) with a complete UI redesign and a range of new features.

With just a domain hosted on Cloudflare, you can deploy a full email platform supporting multiple accounts, multiple domains, and hierarchical permissions — all for free.

Please refer to the upstream project for further details.

---

## 🛠️ Tech Stack

| Layer | Technology          |
|-------|---------------------|
| Runtime | Cloudflare Workers |
| Web Framework | Hono                |
| ORM | Drizzle ORM         |
| Database | Cloudflare D1       |
| Cache / Session | Cloudflare KV       |
| File Storage | Cloudflare R2       |
| Frontend Framework | Vue 3 + Vite        |
| UI Component Library | Element Plus        |
| CSS Utility | TailwindCSS 4       |
| Animation Library | @vueuse/motion      |
| State Management | Pinia               |
| Routing | Vue Router          |
| Internationalization | vue-i18n (zh / en)  |

---

## 📁 Directory Structure

```
RoeyMail/
├── mail-worker/                 # Cloudflare Worker backend
│   ├── src/
│   │   ├── api/                 # API route layer
│   │   ├── service/             # Business logic layer
│   │   ├── entity/              # Drizzle database entities
│   │   ├── security/            # JWT authentication + permission middleware
│   │   ├── init/                # Database initialization / version migration
│   │   └── index.js             # Worker entry point
│   └── wrangler.example.toml    # Configuration template (copy to wrangler.toml and fill in)
│
└── mail-view/                   # Vue 3 frontend
    ├── src/
    │   ├── layout/              # Layout components (sidebar / topbar / account bar)
    │   ├── views/               # Page components
    │   ├── components/          # Shared components
    │   ├── store/               # Pinia state management
    │   ├── i18n/                # Internationalization (zh / en)
    │   └── style.css            # Global styles / Design tokens
    └── vite.config.js
```

---

## 🚀 Quick Deploy

### Prerequisites

- Node.js ≥ 20
- Logged into Cloudflare account: `npx wrangler login`
- A domain hosted on Cloudflare with Email Routing configured

### Steps

```
# 1. Clone the project
git clone https://github.com/roeyqian/RoeyMail.git
cd RoeyMail/mail-worker

# 2. Install dependencies
npm install

# 3. Create Cloudflare resources
npx wrangler d1 create roey-mail-d1          # Note the output database_id
npx wrangler kv namespace create roey-mail-kv     # Note the output id
npx wrangler r2 bucket create roey-mail-r2

# 4. Configure wrangler.toml
cp wrangler.example.toml wrangler.toml
# Edit wrangler.toml, fill in the IDs, domain list, admin email, and JWT secret from the previous step

# 5. Build the frontend
cd ../mail-view
npm install
npm run build

# 6. Initialize the database and deploy
cd ../mail-worker
npx wrangler deploy

# 7. Initialize database schema (visit after first deployment)
# Open in browser: https://your-worker.workers.dev/api/init/<JWT_SECRET>
```

### Key wrangler.toml Fields

```toml
[vars]
domain      = ["mail.example.com"]   # Email domain list (JSON array)
admin       = "admin@example.com"    # Admin email (cannot be changed after initial setup)
jwt_secret  = "your-secret"          # JWT signing key (random string, at least 32 characters)
```

> For more detailed deployment instructions, please refer to the upstream project: [xi-mail Deployment Docs](https://github.com/PastKing/xi-mail)

---

## 📡 Global API Token

After enabling and generating a token in System Settings → Security → **Global API Token**, you can query mail without logging in via the following endpoint:

```
GET /api/admin/mails?limit=20&offset=0&address=user@domain.com
x-admin-auth: <your-token>
```

Response format:

```
{
  "results": [...],
  "count": 100
}
```

---

## 💬 Community & Support

| Channel | Link                                                        |
|---------|-------------------------------------------------------------|
| GitHub | [roeyqian/RoeyMail](https://github.com/roeyqian/RoeyMail)   |
| Telegram Channel | [@RoeyMail](https://t.me/RoeyMail)                          |
| Upstream Project | [PastKing/xi-mail](https://github.com/PastKing/xi-mail)     |

---

## 📄 License

This project is open-sourced under the [MIT License](LICENSE).