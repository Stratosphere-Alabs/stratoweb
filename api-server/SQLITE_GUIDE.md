# SQLite 使用说明

## 快速开始（使用 SQLite）

当前项目默认使用 **SQLite** 作为数据库，无需配置 RDS 即可快速启动。

### 本地开发

1. 安装依赖：
```bash
cd api-server
npm install
```

2. 生成数据库（已配置使用SQLite）：
```bash
npx prisma generate
npx prisma db push
```

这将在项目根目录创建 `dev.db` 文件。

3. 启动开发服务器：
```bash
npm run dev
```

4. 测试 API：
```bash
# Health check
curl http://127.0.0.1:3001/health

# Submit inquiry
curl -X POST http://127.0.0.1:3001/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello world","sourcePage":"/contact"}'

# Join waitlist
curl -X POST http://127.0.0.1:3001/waitlist/upsert \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User","event":"signup"}'
```

### 生产部署（ECS 使用 SQLite）

1. 上传代码到 ECS：
```bash
scp -r api-server/ ubuntu@YOUR_ECS_IP:~/
```

2. SSH 登录并安装：
```bash
ssh ubuntu@YOUR_ECS_IP
cd ~/api-server

# 安装 Node.js 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 安装依赖
npm ci

# 生成数据库
npx prisma generate
npx prisma db push

# 构建
npm run build

# 安装 PM2
npm install -g pm2

# 启动服务
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

3. 配置 Nginx（假设您的 ECS 公网 IP 是 47.95.123.123）：
```bash
# 安装 Nginx
sudo apt update
sudo apt install -y nginx

# 修改配置文件中的 IP
sudo sed -i 's/YOUR_ECS_PUBLIC_IP/47.95.123.123/g' nginx/api.conf

# 复制配置
sudo cp nginx/api.conf /etc/nginx/sites-available/api
sudo ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/

# 测试并重启
sudo nginx -t
sudo systemctl reload nginx
```

4. 配置防火墙：
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw --force enable
```

5. 测试：
```bash
curl http://47.95.123.123/health
```

### 数据库文件位置

SQLite 数据库文件位置：`./dev.db`（项目根目录）

```bash
# 查看数据
npx prisma studio

# 备份数据库
cp dev.db dev.db.backup

# 查看数据库内容
sqlite3 dev.db "SELECT * FROM inquiries;"
sqlite3 dev.db "SELECT * FROM waitlist_users;"
```

---

## 切换到 PostgreSQL（RDS）

当甲方提供 RDS 后，按以下步骤切换：

### 1. 更新 Prisma Schema

编辑 `prisma/schema.prisma`：

```prisma
datasource db {
  provider = "postgresql"  // 改为 postgresql
  url      = env("DATABASE_URL")
}

model Inquiry {
  id         String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid  // 恢复 PostgreSQL UUID
  // ... 其他字段保持不变
}

model WaitlistUser {
  id         String           @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  email      String           @unique
  name       String?
  meta       Json?            // 改回 Json 类型
  // ... 其他字段
}

model WaitlistEvent {
  id        String        @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId    String        @map("user_id") @db.Uuid
  // ... 其他字段
}
```

### 2. 更新代码（恢复 JSON 支持）

编辑 `src/routes/waitlist.ts`，移除 JSON.stringify：

```typescript
const user = await prisma.waitlistUser.upsert({
  where: { email: validatedData.email },
  update: {
    name: validatedData.name || undefined,
    meta: validatedData.meta || undefined,  // 直接传入对象
    lastSeenAt: now,
  },
  create: {
    email: validatedData.email,
    name: validatedData.name || null,
    meta: validatedData.meta || null,      // 直接传入对象
    lastSeenAt: now,
  },
});
```

### 3. 更新环境变量

编辑 `.env`：

```env
DATABASE_URL="postgresql://username:password@rds-internal-endpoint:5432/dbname?schema=public"
```

### 4. 迁移数据

如果需要保留 SQLite 中的数据：

```bash
# 1. 导出 SQLite 数据
sqlite3 dev.db .dump > dump.sql

# 2. 手动迁移或使用工具转换
# （需要根据实际情况调整）
```

### 5. 重新生成 Prisma Client 和迁移

```bash
# 生成新的 Prisma Client
npx prisma generate

# 创建迁移（开发环境）
npx prisma migrate dev --name switch_to_postgresql

# 或直接推送（生产环境）
npx prisma migrate deploy
```

### 6. 重启服务

```bash
# 本地
npm run dev

# 生产（PM2）
pm2 restart all
```

---

## 对比总结

| 特性 | SQLite | PostgreSQL (RDS) |
|------|--------|------------------|
| 依赖 | 无需外部服务 | 需要 RDS 实例 |
| 成本 | 免费 | 按需付费 |
| 适用场景 | 开发/测试/MVP | 生产环境 |
| 并发性能 | 中等 | 高 |
| 数据类型 | 基础类型（JSON需手动序列化） | 完整支持（原生JSON） |
| UUID | Prisma 生成 | 数据库生成 |
| 备份 | 复制文件 | RDS 自动备份 |

## 常见问题

**Q: SQLite 能用于生产吗？**
A: 可以，但不推荐用于高并发场景。对于低流量的 MVP/demo 完全够用。

**Q: 数据会丢失吗？**
A: 只要 `dev.db` 文件存在，数据就不会丢失。建议定期备份。

**Q: 如何查看数据库内容？**
A: 运行 `npx prisma studio` 会打开可视化管理界面。

**Q: 切换到 PostgreSQL 后能切回 SQLite 吗？**
A: 可以，重复上述步骤即可。
