# We Feel Web

个人网站，用于 AppStore 审核展示。

## 功能特性

### 公开展示页
- **首页**：个人信息展示、作品集
- **We Feel 应用页**：App 信息展示、功能特性介绍
- **中英双语**：支持中文和英文切换
- **响应式设计**：适配移动端和桌面端

## 技术栈

- **框架**：Next.js 14+ (App Router)
- **样式**：Tailwind CSS
- **UI 组件**：shadcn/ui
- **国际化**：自定义 i18n（中英双语）

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## 项目结构

```
weFeelWeb/
├── app/
│   ├── apps/wefeel        # We Feel 应用页
│   ├── contact/           # 联系我们
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/
│   ├── ui/                # shadcn/ui 组件
│   └── public/            # 公开页组件
├── lib/                   # 工具类
├── public/                # 静态资源
└── types/                 # 类型定义
```
