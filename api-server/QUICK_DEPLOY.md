# 快速部署指南（使用 SQLite）

本指南帮助您在 5 分钟内将后端 API 部署到阿里云 ECS，无需配置 RDS。

## 前提条件

- 阿里云 ECS 实例（Ubuntu 20.04+）
- SSH 访问权限
- ECS 公网 IP

## 部署步骤

### 1. 上传代码到 ECS

```bash
# 在本地执行
cd /Users/jianglan/sf-homepage
scp -r api-server/ ubuntu@YOUR_ECS_IP:~/
```

### 2. SSH 登录到 ECS

```bash
ssh ubuntu@YOUR_ECS_IP
```

### 3. 安装 Node.js 20

```bash
# 安装 nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 加载 nvm
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 安装 Node.js 20
nvm install 20
nvm use 20
nvm alias default 20

# 验证安装
node -v  # 应该显示 v20.x.x
```

### 4. 安装依赖和初始化数据库

```bash
cd ~/api-server

# 安装依赖
npm ci

# 生成 Prisma Client 和创建数据库
npx prisma generate
npx prisma db push

# 构建项目
npm run build
```

### 5. 安装和配置 PM2

```bash
# 全局安装 PM2
npm install -g pm2

# 启动应用
pm2 start ecosystem.config.cjs

# 设置开机自启
pm2 save
pm2 startup

# 查看状态
pm2 status
pm2 logs
```

### 6. 安装和配置 Nginx

```bash
# 安装 Nginx
sudo apt update
sudo apt install -y nginx

# 修改配置文件（替换为您的实际 IP）
sudo sed -i 's/YOUR_ECS_PUBLIC_IP/YOUR_ACTUAL_IP/g' nginx/api.conf

# 复制配置
sudo cp nginx/api.conf /etc/nginx/sites-available/api
sudo ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl reload nginx
sudo systemctl enable nginx
```

### 7. 配置防火墙

```bash
# 允许 SSH、HTTP
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp

# 启用防火墙
sudo ufw --force enable

# 查看状态
sudo ufw status
```

### 8. 验证部署

```bash
# 测试 API（替换为您的实际 IP）
curl http://YOUR_ECS_IP/health

# 应该返回：
# {"ok":true,"time":"2024-...","env":"production"}

# 测试提交 inquiry
curl -X POST http://YOUR_ECS_IP/inquiries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello from ECS","sourcePage":"/contact"}'

# 应该返回：
# {"id":"...","createdAt":"..."}
```

## 更新代码

当需要更新代码时：

```bash
# SSH 到 ECS
cd ~/api-server

# 拉取最新代码（如果使用 git）
git pull

# 或重新上传文件
# scp -r api-server/ ubuntu@YOUR_ECS_IP:~/

# 重新安装依赖（如果 package.json 有变化）
npm ci

# 重新生成 Prisma Client（如果 schema 有变化）
npx prisma generate
npx prisma db push

# 重新构建
npm run build

# 重启 PM2
pm2 restart all
```

## 查看日志

```bash
# PM2 日志
pm2 logs

# Nginx 访问日志
sudo tail -f /var/log/nginx/api_access.log

# Nginx 错误日志
sudo tail -f /var/log/nginx/api_error.log
```

## 数据库管理

```bash
# 查看数据库文件
ls -lh ~/api-server/dev.db

# 备份数据库
cp ~/api-server/dev.db ~/api-server/dev.db.backup.$(date +%Y%m%d)

# 查看数据（需要安装 sqlite3）
sudo apt install sqlite3
sqlite3 ~/api-server/dev.db "SELECT * FROM inquiries LIMIT 5;"
```

## 常见问题

### PM2 进程挂了

```bash
pm2 restart all
pm2 logs
```

### Nginx 502 错误

```bash
# 检查 Node.js 是否运行
pm2 status

# 检查端口
netstat -tlnp | grep 3001

# 重启服务
pm2 restart all
sudo systemctl restart nginx
```

### 无法访问 API

1. 检查 ECS 安全组是否开放 80 端口
2. 检查防火墙：`sudo ufw status`
3. 检查 Nginx 配置：`sudo nginx -t`
4. 查看 Nginx 日志：`sudo tail -f /var/log/nginx/error.log`

## 下一步

1. **配置前端**: 在 Vercel 环境变量中设置 `VITE_API_BASE_URL=http://YOUR_ECS_IP`
2. **测试集成**: 从 Vercel 前端提交表单，验证数据保存
3. **（可选）配置域名**: 申请域名并配置 SSL 证书
4. **（可选）切换到 RDS**: 等甲方提供 RDS 后，参考 `SQLITE_GUIDE.md` 切换

## 预计时间

- 安装 Node.js: 2 分钟
- 安装依赖和数据库: 2 分钟
- 配置 PM2 和 Nginx: 2 分钟
- 防火墙配置: 1 分钟

**总计: ~7 分钟**
