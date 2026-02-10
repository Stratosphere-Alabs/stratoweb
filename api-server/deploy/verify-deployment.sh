#!/bin/bash

# ECS 部署验证脚本
# 用法：bash verify-deployment.sh

set -e

echo "========================================="
echo "任务 1: 验证 PM2 和 Node.js 端口"
echo "========================================="

# 1. 检查 PM2 状态
echo -e "\n📋 1.1 PM2 状态："
pm2 status

# 2. 查看 PM2 日志（最近 20 行）
echo -e "\n📋 1.2 PM2 日志（查找监听端口）："
pm2 logs --lines 20 --nostream | grep -i "listening\|running\|port" || pm2 logs --lines 20 --nostream | tail -10

# 3. 检查 Node 进程监听的端口
echo -e "\n📋 1.3 Node 进程监听端口："
ss -tulpn | grep node || echo "未找到 node 进程监听"

# 4. 测试本地 API
echo -e "\n📋 1.4 本地 curl 测试："
echo "测试 http://127.0.0.1:3001/health ..."
curl -i http://127.0.0.1:3001/health

echo -e "\n========================================="
echo "任务 2: 配置并验证 Nginx"
echo "========================================="

# 5. 检查 Nginx 配置
echo -e "\n📋 2.1 Nginx 配置测试："
sudo nginx -t

# 6. 检查 Nginx 服务状态
echo -e "\n📋 2.2 Nginx 服务状态："
sudo systemctl status nginx --no-pager | head -15

# 7. 测试通过 Nginx 访问（本地）
echo -e "\n📋 2.3 通过 Nginx 访问 API（本地）："
echo "测试 http://127.0.0.1/health ..."
curl -i http://127.0.0.1/health

# 8. 测试通过公网 IP 访问
echo -e "\n📋 2.4 通过公网 IP 访问 API："
ECS_IP="47.74.8.197"
echo "测试 http://$ECS_IP/health ..."
curl -i http://$ECS_IP/health

echo -e "\n========================================="
echo "任务 3: 检查防火墙和安全组"
echo "========================================="

# 9. 检查 UFW 状态
echo -e "\n📋 3.1 UFW 防火墙状态："
sudo ufw status verbose

# 10. 检查开放的端口
echo -e "\n📋 3.2 监听的端口："
sudo netstat -tlnp | grep -E ':(80|443|3001|22)\s'

# 11. 测试 API 端点
echo -e "\n========================================="
echo "额外验证: 测试所有 API 端点"
echo "========================================="

echo -e "\n📋 测试 POST /inquiries："
curl -X POST http://127.0.0.1:3001/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "ECS Test User",
    "email": "test@ecs.example.com",
    "message": "Testing from ECS deployment script",
    "sourcePage": "/test"
  }' | jq . || echo "注意：如果没有安装 jq，请忽略格式化错误"

echo -e "\n📋 测试 POST /waitlist/upsert："
curl -X POST http://127.0.0.1:3001/waitlist/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@ecs.example.com",
    "name": "ECS Test User",
    "event": "signup"
  }' | jq . || echo "注意：如果没有安装 jq，请忽略格式化错误"

echo -e "\n========================================="
echo "✅ 验证完成！"
echo "========================================="
echo ""
echo "请将以上输出截图或复制保存。"
echo ""
echo "如果任何步骤失败，请查看错误信息并修复。"
echo ""
