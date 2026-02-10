#!/bin/bash

# ECS 完整部署脚本（从零到运行）
# 用法：bash full-deploy.sh

set -e

echo "========================================="
echo "开始 ECS 部署"
echo "========================================="

# 配置变量
ECS_IP="47.74.8.197"
API_PORT="3001"

# 步骤 1: 安装依赖
echo -e "\n📦 步骤 1/7: 安装项目依赖..."
cd ~/api-server
npm ci

# 步骤 2: 生成 Prisma Client
echo -e "\n🔧 步骤 2/7: 生成 Prisma Client..."
npx prisma generate

# 步骤 3: 创建数据库
echo -e "\n🗄️  步骤 3/7: 创建 SQLite 数据库..."
npx prisma db push

# 步骤 4: 构建 TypeScript
echo -e "\n🏗️  步骤 4/7: 构建项目..."
npm run build

# 步骤 5: 启动 PM2
echo -e "\n🚀 步骤 5/7: 启动 PM2..."
pm2 delete sf-homepage-api 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup | grep -o 'sudo.*' | bash || echo "PM2 startup 配置完成"

# 步骤 6: 配置 Nginx
echo -e "\n🌐 步骤 6/7: 配置 Nginx..."

# 更新 Nginx 配置
sudo sed -i "s/YOUR_ECS_PUBLIC_IP/$ECS_IP/g" nginx/api.conf
sudo cp nginx/api.conf /etc/nginx/sites-available/api
sudo ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/

# 测试并重启 Nginx
sudo nginx -t
sudo systemctl reload nginx
sudo systemctl enable nginx

# 步骤 7: 配置防火墙
echo -e "\n🔒 步骤 7/7: 配置 UFW 防火墙..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
echo "y" | sudo ufw enable || sudo ufw --force enable

echo -e "\n========================================="
echo "✅ 部署完成！"
echo "========================================="
echo ""
echo "验证步骤："
echo "1. 查看 PM2 状态："
echo "   pm2 status"
echo ""
echo "2. 测试本地 API："
echo "   curl http://127.0.0.1:$API_PORT/health"
echo ""
echo "3. 测试公网访问："
echo "   curl http://$ECS_IP/health"
echo ""
echo "运行验证脚本："
echo "   bash deploy/verify-deployment.sh"
echo ""
