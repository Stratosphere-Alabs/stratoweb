# SF Homepage API Server

Backend API for SF Homepage - Handles inquiries and waitlist management.

## Tech Stack

- Node.js 20+ with TypeScript
- Express.js
- Prisma ORM
- PostgreSQL (Aliyun RDS)
- PM2 for process management
- Nginx reverse proxy

## Features

- ✅ Health check endpoint
- ✅ Inquiry form submission
- ✅ Waitlist user management with event tracking
- ✅ **Admin Dashboard** - Secure data viewing and export (Basic Auth protected)
- ✅ Request validation with Zod
- ✅ Rate limiting
- ✅ CORS protection
- ✅ Structured logging

## Admin Dashboard

A secure admin interface for viewing and exporting data from inquiries, waitlist users, and waitlist events.

**Features:**
- 🔐 Protected by Nginx Basic Auth
- 📊 View all inquiries, waitlist users, and events
- 🔍 Search by email or name
- 📄 Pagination support
- 📥 CSV export for all data types

**Endpoints:**
- `GET /admin` - Admin UI (static HTML)
- `GET /admin-api/inquiries` - List inquiries
- `GET /admin-api/waitlist-users` - List waitlist users
- `GET /admin-api/waitlist-events` - List waitlist events
- `GET /admin-api/export/{resource}.csv` - Export data as CSV

**Setup:** See [ADMIN_DEPLOYMENT.md](./ADMIN_DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
api-server/
├── src/
│   ├── index.ts              # Main application entry
│   ├── lib/
│   │   ├── prisma.ts         # Prisma client singleton
│   │   └── logger.ts         # Logging utility
│   ├── middleware/
│   │   ├── cors.ts           # CORS configuration
│   │   ├── rateLimit.ts      # Rate limiting
│   │   ├── validation.ts     # Zod schemas
│   │   └── errorHandler.ts   # Error handling
│   └── routes/
│       ├── health.ts         # Health check
│       ├── inquiries.ts      # Inquiry submission
│       └── waitlist.ts       # Waitlist management
├── prisma/
│   └── schema.prisma         # Database schema
├── nginx/
│   └── api.conf              # Nginx configuration
├── deploy/
│   └── setup.sh              # ECS deployment script
└── ecosystem.config.cjs      # PM2 configuration
```

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or RDS)

### Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Edit `.env` with your database connection:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/sfhomepage?schema=public
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

4. Initialize database:
```bash
npx prisma generate
npx prisma db push
```

5. Start development server:
```bash
npm run dev
```

Server will run on `http://127.0.0.1:3001`

### Test Endpoints

```bash
# Health check
curl http://localhost:3001/health

# Submit inquiry
curl -X POST http://localhost:3001/inquiries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test inquiry",
    "sourcePage": "/contact"
  }'

# Join waitlist
curl -X POST http://localhost:3001/waitlist/upsert \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "event": "signup"
  }'
```

## Production Deployment (ECS)

### Prerequisites

- Aliyun ECS instance (Ubuntu 20.04+)
- Aliyun RDS PostgreSQL instance (VPC internal)
- SSH access to ECS
- Security group allowing inbound 22, 80, 443

### Deployment Steps

1. **Prepare deployment script**

Edit `deploy/setup.sh` and update:
- `GIT_REPO`: Your git repository URL
- `DATABASE_URL`: Your RDS connection string
- `ECS_PUBLIC_IP`: Your ECS public IP

2. **Upload code to ECS**

```bash
# From your local machine
scp -r api-server/ username@ECS_IP:/tmp/
```

3. **SSH to ECS and run setup**

```bash
ssh username@ECS_IP
cd /tmp/api-server
chmod +x deploy/setup.sh
./deploy/setup.sh
```

4. **Verify deployment**

```bash
# Check PM2 status
pm2 status

# Check logs
pm2 logs

# Test API
curl http://YOUR_ECS_IP/health

# View Nginx logs
sudo tail -f /var/log/nginx/api_access.log
```

### Manual Deployment Commands

If you prefer manual deployment:

```bash
# 1. Install Node.js 20
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# 2. Install PM2
npm install -g pm2

# 3. Clone and setup
cd /var/www
git clone YOUR_REPO sf-homepage-api
cd sf-homepage-api
npm ci

# 4. Configure environment
cp .env.example .env
nano .env  # Edit with production values

# 5. Setup database
npx prisma generate
npx prisma migrate deploy

# 6. Build
npm run build

# 7. Start with PM2
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup

# 8. Install and configure Nginx
sudo apt install nginx
sudo cp nginx/api.conf /etc/nginx/sites-available/api
sudo sed -i 's/47.74.8.197/47.74.8.197/g' /etc/nginx/sites-available/api
sudo ln -s /etc/nginx/sites-available/api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 9. Configure firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

### Database Migrations

When updating schema:

```bash
# Create migration
npx prisma migrate dev --name description

# Deploy to production
npx prisma migrate deploy
```

### Updating Deployment

```bash
# SSH to ECS
cd /var/www/sf-homepage-api

# Pull latest code
git pull

# Install dependencies
npm ci

# Run migrations
npx prisma migrate deploy

# Rebuild
npm run build

# Restart PM2
pm2 restart all
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port (localhost only) | `3001` |
| `DATABASE_URL` | PostgreSQL connection | `postgresql://user:pass@host:5432/db` |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `https://sf-homepage.vercel.app` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `60` |

## API Endpoints

### `GET /health`

Returns server health status.

**Response:**
```json
{
  "ok": true,
  "time": "2024-01-27T01:00:00.000Z",
  "env": "production"
}
```

### `POST /inquiries`

Submit a contact inquiry.

**Field Name Compatibility:**
- `sourcePage` (camelCase) - **Recommended** for frontend (e.g., React/Vite)
- `source_page` (snake_case) - Also supported
- Both map to the same database field. If both are provided, `sourcePage` takes precedence.

**Frontend Integration:**
The frontend should send `sourcePage: window.location.pathname` in the JSON body.
API Client handles this automatically in `src/lib/api.ts`.
Status Check: `POST /inquiries` should return 201 Created.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Inc",
  "message": "Interested in your services (must be at least 5 chars)",
  "sourcePage": "/contact"
}
```

**Validation Rules:**
- `name`: Required, non-empty
- `email`: Required, valid email format
- `message`: Required, min 5 characters
- `company`: Optional
- `sourcePage`: Optional, string

**Response:**
```json
{
  "id": "uuid",
  "createdAt": "2024-01-27T01:00:00.000Z"
}
```

### `POST /waitlist/upsert`

Join or update waitlist entry.

**Request:**
```json
{
  "email": "john@example.com",
  "name": "John Doe",
  "meta": { "source": "homepage" },
  "event": "signup"
}
```

**Response:**
```json
{
  "userId": "uuid",
  "email": "john@example.com",
  "lastSeenAt": "2024-01-27T01:00:00.000Z"
}
```

## Security

- Node.js listens only on `127.0.0.1:3001` (not accessible externally)
- Nginx reverse proxy handles all external traffic
- CORS restricted to whitelisted domains
- Rate limiting: 60 requests per minute per IP
- Request validation with Zod schemas
- Security headers configured in Nginx
- RDS only accessible from VPC internal network

## Monitoring

### PM2

```bash
# View status
pm2 status

# View logs
pm2 logs

# Monitor resources
pm2 monit

# Restart
pm2 restart all

# Stop
pm2 stop all
```

### Logs

- PM2 logs: `./logs/out.log`, `./logs/err.log`
- Nginx access: `/var/log/nginx/api_access.log`
- Nginx errors: `/var/log/nginx/api_error.log`

## Troubleshooting

### Database connection failed

1. Verify RDS internal endpoint in `.env`
2. Check ECS security group allows egress to RDS port 5432
3. Verify RDS security group allows inbound from ECS VPC CIDR
4. Test connection: `psql $DATABASE_URL`

### API not accessible

1. Check PM2 status: `pm2 status`
2. Check Nginx: `sudo systemctl status nginx`
3. Test locally: `curl http://127.0.0.1:3001/health`
4. Check firewall: `sudo ufw status`
5. Verify Nginx config: `sudo nginx -t`

### CORS errors

1. Verify `CORS_ORIGINS` in `.env`
2. Check frontend is using correct API URL
3. View browser console for exact error
4. Check Nginx logs for rejected requests

## License

MIT
