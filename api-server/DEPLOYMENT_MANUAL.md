# ECS 部署和前端集成完整操作手册

本文档提供完整的 ECS 部署步骤和前端集成验证流程。

---

## 第一部分：ECS 后端部署

###  前提条件

- ECS 服务器已启动（Ubuntu 20.04+）
- 您有 SSH 访问权限
- ECS 公网 IP: `47.74.8.197`

### 步骤 1: 上传代码到 ECS

在**本地终端**执行：

```bash
cd /Users/jianglan/sf-homepage
scp -r api-server/ root@47.74.8.197:~/
```

### 步骤 2: SSH 登录 ECS

```bash
ssh root@47.74.8.197
```

### 步骤 3: 运行自动部署脚本

```bash
cd ~/api-server

# 给脚本执行权限
chmod +x deploy/full-deploy.sh
chmod +x deploy/verify-deployment.sh

# 运行完整部署
bash deploy/full-deploy.sh
```

**预计时间**: 5-8 分钟

部署脚本会执行：
1. ✅ 安装 npm 依赖
2. ✅ 生成 Prisma Client
3. ✅ 创建 SQLite 数据库
4. ✅ 构建 TypeScript
5. ✅ 启动 PM2
6. ✅ 配置 Nginx
7. ✅ 配置防火墙

### 步骤 4: 运行验证脚本

```bash
cd ~/api-server
bash deploy/verify-deployment.sh
```

**验证脚本会输出**：
- ✅ PM2 状态
- ✅ PM2 日志（监听端口）
- ✅ Node 进程监听端口
- ✅ 本地 curl 测试
- ✅ Nginx 配置测试
- ✅ 公网 IP 访问测试
- ✅ UFW 防火墙状态
- ✅ API 端点测试

**请截图保存所有输出！**

---

## 第二部分：阿里云安全组配置

### 检查安全组

登录**阿里云控制台** → **ECS 实例** → **安全组**

确保有以下入方向规则：

| 端口范围 | 授权策略 | 优先级 | 授权对象 |
|---------|---------|--------|---------|
| 22/22   | 允许 | 1 | 您的 IP（或 0.0.0.0/0） |
| 80/80   | 允许 | 1 | 0.0.0.0/0 |
| 443/443 | 允许 | 1 | 0.0.0.0/0 |

**注意**：
- **禁止开放** 3001 端口（Node.js 只监听localhost）
- 80 和 443 必须对 0.0.0.0/0 开放

### 从本地测试公网访问

```bash
# 从您的本地Mac执行
curl http://47.74.8.197/health

# 应该返回：
# {"ok":true,"time":"...","env":"production"}
```

如果失败，检查：
1. 安全组是否正确配置
2. ECS 上 UFW 是否允许 80 端口
3. Nginx 是否正常运行

---

## 第三部分：前端集成

### 步骤 1: 更新前端环境变量

将 `.env.production.api` 的内容添加到 `.env.production`：

```bash
cd /Users/jianglan/sf-homepage

# 合并环境变量
cat .env.production.api >> .env.production

# 查看最终配置
cat .env.production
```

应包含：
```env
VITE_API_BASE_URL=http://47.74.8.197
```

### 步骤 2: 配置 Vercel 环境变量

1. 登录 [Vercel Dashboard](https://vercel.com)
2. 进入 `sf-homepage` 项目
3. 点击 **Settings** → **Environment Variables**
4. 添加新变量：
   - **Name**: `VITE_API_BASE_URL`
   - **Value**: `http://47.74.8.197`
   - **Environments**: 选择 `Production`, `Preview`, `Development`
5. 点击 **Save**

### 步骤 3: 重新部署前端

```bash
cd /Users/jianglan/sf-homepage

# 提交更改
git add .
git commit -m "feat: integrate backend API for contact and waitlist forms"
git push origin main

# Vercel 会自动部署
```

或者在 Vercel Dashboard 手动触发重新部署。

---

## 第四部分：验收测试

### 测试 1: 直接测试 API（从您的Mac）

```bash
# 测试健康检查
curl http://47.74.8.197/health

# 测试提交问询
curl -X POST http://47.74.8.197/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "测试用户",
    "email": "test@example.com",
    "message": "这是一个测试消息",
    "sourcePage": "/contact"
  }'

# 应该返回 {"id":"...","createdAt":"..."}

# 测试加入waitlist
curl -X POST http://47.74.8.197/waitlist/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "测试用户",
    "event": "signup"
  }'

# 应该返回 {"userId":"...","email":"test@example.com","lastSeenAt":"..."}
```

### 测试 2: 从 Vercel 前端提交表单

**Contact Form 测试**:
1. 访问 `https://sf-homepage.vercel.app/contact-sales`
2. 填写表单：
   - 姓名：测试用户
   - 邮箱：your-email@example.com
   - 公司：测试公司
   - 消息：测试从 Vercel 提交
3. 点击**提交**
4. 应该显示"送信が完了しました"成功消息

**Waitlist 测试**:
1. 访问任何页面，点击 "Join Waitlist" 按钮
2. 在弹出的 Modal 中填写：
   - Email: your-email@example.com
   - Name: 测试用户
   - Company: 测试公司
3. 点击**ウェイティングリストに登録**
4. 应该显示"登録完了！"成功消息

### 测试 3: 验证数据已保存

SSH 到 ECS，查询数据库：

```bash
ssh root@47.74.8.197
cd ~/api-server

# 查看所有问询
sqlite3 dev.db "SELECT name, email, message, created_at FROM inquiries ORDER BY created_at DESC LIMIT 5;"

# 查看所有 waitlist 用户
sqlite3 dev.db "SELECT email, name, created_at FROM waitlist_users ORDER BY created_at DESC LIMIT 5;"

# 或使用 Prisma Studio（可视化）
npx prisma studio
# 然后在浏览器打开 http://localhost:5555
```

---

## 常见问题排查

### 问题 1: 前端提交后显示错误

**检查**:
```bash
# 1. 查看 PM2 日志
ssh root@47.74.8.197
pm2 logs --lines 50

# 2. 查看 Nginx 错误日志
sudo tail -f /var/log/nginx/api_error.log

# 3. 检查 CORS 配置
cat ~/api-server/.env | grep CORS
```

**解决**:
- 确认 `.env` 中 `CORS_ORIGINS` 包含 `https://sf-homepage.vercel.app`
- 重启 PM2: `pm2 restart all`

### 问题 2: curl 测试 47.74.8.197 失败

**检查**:
1. 阿里云安全组是否开放 80 端口
2. UFW 是否允许 80: `sudo ufw status`
3. Nginx 是否运行: `sudo systemctl status nginx`
4. Node 是否监听 3001: `ss -tulpn | grep 3001`

### 问题 3: PM2 进程挂掉

**解决**:
```bash
cd ~/api-server
pm2 delete all
pm2 start ecosystem.config.cjs
pm2 save
pm2 logs
```

### 问题 4: 数据库文件丢失

**恢复**:
```bash
cd ~/api-server
npx prisma db push
```

---

## 下一步（可选）

### 1. 配置域名和 HTTPS

当您有域名后（例如 `api.yourdomain.com`）：

```bash
# 1. 更新 DNS 解析
#    A 记录: api.yourdomain.com -> 47.74.8.197

# 2. SSH 到 ECS
ssh root@47.74.8.197

# 3. 安装 Certbot
sudo apt install certbot python3-certbot-nginx

# 4. 获取 SSL 证书
sudo certbot --nginx -d api.yourdomain.com

# 5. 自动续期
sudo certbot renew --dry-run

# 6. 更新前端环境变量
# VITE_API_BASE_URL=https://api.yourdomain.com
```

### 2. 切换到 PostgreSQL RDS

参考 `api-server/SQLITE_GUIDE.md`

### 3. 监控和日志

```bash
# 设置日志轮转
sudo apt install logrotate

# 配置 PM2 监控
pm2 install pm2-logrotate
```

---

## 验收清单

- [ ] ECS 部署脚本运行成功
- [ ] PM2 status 显示 online
- [ ] Nginx 配置测试通过
- [ ] 本地 curl 127.0.0.1:3001/health 返回 200
- [ ] 公网 curl 47.74.8.197/health 返回 200
- [ ] 阿里云安全组配置正确（80 端口开放）
- [ ] UFW 防火墙允许 22/80/443
- [ ] Vercel 环境变量已配置
- [ ] 前端重新部署完成
- [ ] Contact form 提交成功（从 Vercel）
- [ ] Waitlist modal 提交成功（从 Vercel）
- [ ] 数据库中可以查到提交的数据

---

## 联系支持

如有问题，请提供：
1. 验证脚本的完整输出
2. PM2 日志: `pm2 logs --lines 100`
3. Nginx 错误日志: `sudo tail -50 /var/log/nginx/api_error.log`
4. 浏览器控制台错误截图
