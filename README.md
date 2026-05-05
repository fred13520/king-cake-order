# King Cake 订单管理系统 V1

## 功能
- 输入客户聊天内容
- AI/规则解析为标准订单
- 订单列表
- 订单详情
- 生产单
- 配送单
- PostgreSQL + Prisma
- 可部署到 Vercel

## 本地运行

```bash
npm install
cp .env.example .env
# 修改 .env 里的 DATABASE_URL
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

打开：

```text
http://localhost:3000
```

## Vercel 部署步骤

1. 把本项目上传到 GitHub
2. 创建 Supabase PostgreSQL 数据库
3. 复制 Supabase 的 PostgreSQL connection string
4. 在 Vercel 导入 GitHub 项目
5. Vercel → Settings → Environment Variables 添加：

```text
DATABASE_URL=你的PostgreSQL连接地址
```

6. Deploy
7. 如果第一次没有建表，在本地或服务器执行：

```bash
npx prisma migrate deploy
```

## 注意
第一版 AI 解析使用“规则解析”，不需要 OpenAI API Key。  
后续可以升级为真正 GPT 解析。
