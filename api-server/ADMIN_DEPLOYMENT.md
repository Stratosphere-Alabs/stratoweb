# Admin Dashboard Deployment Guide

This guide explains how to deploy and configure the Admin Dashboard feature on your ECS server.

## Prerequisites

- ECS server with Nginx and Node.js installed
- api-server deployed and running (see DEPLOYMENT_MANUAL.md)
- SSH access to the server (root@47.74.8.197)

## Step 1: Create Admin Credentials

First, install htpasswd utility and create the password file:

```bash
ssh root@47.74.8.197

# Install htpasswd utility
sudo apt update
sudo apt install -y apache2-utils

# Create password file with admin user
sudo htpasswd -c /etc/nginx/.htpasswd admin
# Enter password when prompted (choose a strong password!)

# Verify the file was created
cat /etc/nginx/.htpasswd
```

**Security Note**: Keep this password secure. It protects access to all admin functions.

## Step 2: Copy Admin UI Files to Server

From your local machine, copy the admin UI files:

```bash
# From local: /Users/jianglan/sf-homepage
cd api-server

# Upload admin files via SCP
scp -r public-admin root@47.74.8.197:~/api-server/
```

Then on the server, copy to the web directory:

```bash
ssh root@47.74.8.197

# Create web directory for admin UI
sudo mkdir -p /var/www/admin

# Copy files
sudo cp -r ~/api-server/public-admin/* /var/www/admin/

# Set proper ownership
sudo chown -R www-data:www-data /var/www/admin

# Verify files were copied
ls -la /var/www/admin
```

## Step 3: Update Nginx Configuration

On the ECS server:

```bash
# Backup current config
sudo cp /etc/nginx/sites-available/api /etc/nginx/sites-available/api.backup

# Edit the config
sudo nano /etc/nginx/sites-available/api
```

The updated config has already been prepared in `api-server/nginx/api.conf`. Copy the entire file content, or manually add these two location blocks before the `/health` location:

```nginx
# Admin UI (protected with Basic Auth)
location /admin {
    auth_basic "Admin Area";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    alias /var/www/admin;
    try_files $uri $uri/ /index.html;
    
    # Disable caching for admin
    add_header Cache-Control "no-store, no-cache, must-revalidate";
}

# Admin API (protected with Basic Auth)
location /admin-api/ {
    auth_basic "Admin API";
    auth_basic_user_file /etc/nginx/.htpasswd;
    
    # Proxy to Node.js
    proxy_pass http://127.0.0.1:3001/admin-api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
    # Timeouts
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

Save and exit (Ctrl+X, Y, Enter).

## Step 4: Test and Reload Nginx

```bash
# Test nginx configuration
sudo nginx -t

# If test passes, reload nginx
sudo systemctl reload nginx

# Check nginx status
sudo systemctl status nginx
```

## Step 5: Update and Restart Node.js App

Make sure the latest code with admin routes is deployed:

```bash
cd ~/api-server

# Pull latest code or re-upload
# Then rebuild and restart
npm install
npm run build
pm2 restart all

# Check PM2 status
pm2 status
pm2 logs --lines 20
```

## Step 6: Verify Deployment

### Test from ECS (local)

```bash
# Should return 401 Unauthorized (auth required)
curl -I http://127.0.0.1:3001/admin-api/inquiries

# Should succeed with auth
curl -u admin:yourpassword http://127.0.0.1:3001/admin-api/inquiries?limit=5
```

### Test from Public Internet

From your local machine:

```bash
# Test auth is required (should get 401)
curl -I http://47.74.8.197/admin

# Test with credentials
curl -u admin:yourpassword http://47.74.8.197/admin-api/inquiries?limit=5

# Test CSV export
curl -u admin:yourpassword http://47.74.8.197/admin-api/export/inquiries.csv -o test.csv
```

### Test in Browser

1. Open browser to: `http://47.74.8.197/admin`
2. You should see a Basic Auth login prompt
3. Enter username: `admin` and your password
4. You should see the Admin Dashboard with three tabs
5. Test each tab:
   - Click "Inquiries", "Waitlist Users", "Waitlist Events"
   - Try searching by email
   - Use pagination (Previous/Next)
   - Click "Download CSV" for each tab

## Security Checklist

- [ ] `/admin` requires Basic Auth ✓
- [ ] `/admin-api/*` requires Basic Auth ✓
- [ ] htpasswd file has strong password ✓
- [ ] Public API routes (`/inquiries`, `/waitlist/*`) still work without auth ✓
- [ ] Admin routes are not accessible without credentials ✓

## Troubleshooting

### Issue: 401 Unauthorized even with correct password

**Solution**:
```bash
# Check htpasswd file exists and has correct permissions
ls -la /etc/nginx/.htpasswd
sudo chmod 644 /etc/nginx/.htpasswd

# Recreate password
sudo htpasswd -c /etc/nginx/.htpasswd admin
sudo systemctl reload nginx
```

### Issue: 502 Bad Gateway on /admin-api

**Solution**:
```bash
# Check Node.js is running
pm2 status
pm2 logs

# Check if admin router is registered
pm2 logs --lines 50 | grep admin

# Restart Node.js
pm2 restart all
```

### Issue: Static files not loading

**Solution**:
```bash
# Check files exist
ls -la /var/www/admin

# Check nginx can read them
sudo chown -R www-data:www-data /var/www/admin
sudo chmod -R 755 /var/www/admin

# Check nginx error log
sudo tail -f /var/log/nginx/api_error.log
```

### Issue: CORS errors in browser console

**Solution**: Admin UI should be served from same domain (47.74.8.197), so CORS should not be an issue. If you see CORS errors:

```bash
# Check nginx is proxying correctly
sudo tail -f /var/log/nginx/api_access.log
sudo tail -f /var/log/nginx/api_error.log
```

## Adding Additional Admin Users

```bash
# Add another user (don't use -c flag, it overwrites)
sudo htpasswd /etc/nginx/.htpasswd newuser

# Remove a user
sudo htpasswd -D /etc/nginx/.htpasswd username

# List all users
cat /etc/nginx/.htpasswd
```

## Changing Admin Password

```bash
# Update existing user's password
sudo htpasswd /etc/nginx/.htpasswd admin

# Reload nginx
sudo systemctl reload nginx
```

## Production Recommendations

1. **Use HTTPS**: Set up SSL certificate with Let's Encrypt (see DEPLOYMENT_MANUAL.md)
2. **Restrict IP Access**: Add IP whitelist in nginx if possible
3. **Monitor Access**: Regularly check nginx access logs for admin routes
4. **Backup Data**: Regularly backup the SQLite database

## Next Steps

After successful deployment:

1. Create test data to verify admin dashboard displays correctly
2. Train client/stakeholders on how to use the admin dashboard
3. Set up monitoring/alerting for unauthorized access attempts
4. Consider implementing session-based auth for better UX (future enhancement)
