#!/bin/bash

# SF Homepage API - ECS Deployment Script
# This script sets up the entire backend from scratch on Ubuntu ECS

set -e  # Exit on error

echo "========================================="
echo "SF Homepage API - ECS Deployment"
echo "========================================="

# Variables (MODIFY THESE)
APP_DIR="/var/www/sf-homepage-api"
GIT_REPO="YOUR_GIT_REPO_URL"  # Replace with your git repository
DATABASE_URL="postgresql://USER:PASS@RDS_INTERNAL_ENDPOINT:5432/DB_NAME?schema=public"
ECS_PUBLIC_IP="47.74.8.197"

# 1. Update system
echo "Step 1: Updating system packages..."
sudo apt update
sudo apt upgrade -y

# 2. Install Node.js 20 via nvm
echo "Step 2: Installing Node.js 20..."
if [ ! -d "$HOME/.nvm" ]; then
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
fi
nvm install 20
nvm use 20
nvm alias default 20

# 3. Install PM2 globally
echo "Step 3: Installing PM2..."
npm install -g pm2

# 4. Install Nginx
echo "Step 4: Installing Nginx..."
sudo apt install -y nginx

# 5. Clone repository
echo "Step 5: Cloning repository..."
sudo mkdir -p $APP_DIR
sudo chown -R $USER:$USER $APP_DIR
cd $APP_DIR
# git clone $GIT_REPO .  # Uncomment when you have a git repo

# 6. Install dependencies
echo "Step 6: Installing dependencies..."
npm ci

# 7. Setup environment variables
echo "Step 7: Setting up environment..."
cat > .env <<EOF
NODE_ENV=production
PORT=3001
DATABASE_URL=$DATABASE_URL
CORS_ORIGINS=https://sf-homepage.vercel.app,http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60
EOF

# 8. Generate Prisma client and run migrations
echo "Step 8: Setting up database..."
npx prisma generate
npx prisma migrate deploy

# 9. Build TypeScript
echo "Step 9: Building application..."
npm run build

# 10. Create logs directory
mkdir -p logs

# 11. Start with PM2
echo "Step 10: Starting application with PM2..."
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u $USER --hp $HOME

# 12. Configure Nginx
echo "Step 11: Configuring Nginx..."
sudo sed "s/47.74.8.197/$ECS_PUBLIC_IP/g" nginx/api.conf | sudo tee /etc/nginx/sites-available/api
sudo ln -sf /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 13. Configure firewall
echo "Step 12: Configuring firewall..."
sudo ufw allow 22/tcp   # SSH
sudo ufw allow 80/tcp   # HTTP
sudo ufw allow 443/tcp  # HTTPS (for future)
sudo ufw --force enable

echo "========================================="
echo "Deployment Complete!"
echo "========================================="
echo ""
echo "✅ API is running on: http://$ECS_PUBLIC_IP"
echo ""
echo "Test commands:"
echo "  curl http://$ECS_PUBLIC_IP/health"
echo "  pm2 status"
echo "  pm2 logs"
echo ""
echo "Next steps:"
echo "1. Update /etc/nginx/sites-available/api with your domain when ready"
echo "2. Install SSL certificate with certbot (when using domain)"
echo "3. Verify RDS connection from ECS"
echo ""
