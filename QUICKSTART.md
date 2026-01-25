# 快速启动指南

## 1. 安装依赖

```bash
npm install
```

如果遇到 npm 日志错误，可以尝试：

```bash
npm install --loglevel=error
```

或者使用 yarn：

```bash
yarn install
```

## 2. 配置环境变量

创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
ADMIN_PASSWORD=your-secure-password-here
```

## 3. 确认 Supabase 表结构

确保你的 Supabase 数据库中有 `moments` 表（或修改 `lib/supabase.ts` 中的 `TABLE_NAME`）：

```sql
CREATE TABLE moments (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  content TEXT,
  moodColorHex TEXT,
  meTooCount BIGINT DEFAULT 0,
  authorID UUID,
  moodType SMALLINT,
  lang TEXT,
  status SMALLINT DEFAULT 0  -- 0=pending, 1=approved, 2=rejected
);
```

## 4. 启动开发服务器

```bash
npm run dev
```

访问：
- 公开展示页：http://localhost:3000
- 后台登录：http://localhost:3000/admin/login

## 5. 测试功能

### 公开展示页
- 访问首页，查看 App 信息展示
- 切换中英文语言
- 查看用户反馈列表

### 后台管理
- 使用配置的密码登录
- 查看数据统计
- 测试筛选和搜索功能
- 审核数据（单个/批量）
- 导出 CSV

## 常见问题

### 1. Supabase 连接失败
- 检查环境变量是否正确
- 确认 Supabase 项目 URL 和 Anon Key
- 检查网络连接

### 2. 表名不匹配
如果表名不是 `moments`，修改 `lib/supabase.ts` 第 9 行：

```typescript
const TABLE_NAME = "your_table_name"
```

### 3. 认证失败
- 检查 `ADMIN_PASSWORD` 环境变量
- 清除浏览器 cookies 后重试

### 4. 数据不显示
- 确认 Supabase RLS (Row Level Security) 配置允许读取
- 检查数据中的 `status` 字段值（公开展示页只显示 status=1 的数据）

## 下一步

1. 根据 `IMAGE_PROMPTS.md` 生成图片资源
2. 自定义样式和内容
3. 部署到生产环境（Vercel、Netlify 等）
