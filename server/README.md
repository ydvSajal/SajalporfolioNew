# Portfolio Backend Server

Standalone Express.js server for the portfolio API. This server wraps your existing Vercel serverless functions into a traditional Node.js Express application.

## 🎯 Why Separate Backend?

- ✅ **Real HTTP Methods**: DELETE, PATCH work natively (no workarounds)
- ✅ **No Cold Starts**: Always-on server, better performance
- ✅ **Free Hosting**: Deploy on Railway, Render, or Fly.io free tiers
- ✅ **Better Debugging**: Standard Node.js logging and error handling
- ✅ **More Control**: Full control over middleware and routing

## 🚀 Quick Start (Local Development)

```bash
# 1. Navigate to server directory
cd server

# 2. Install dependencies
npm install

# 3. Copy environment template
cp .env.example .env

# 4. Edit .env with your actual values
# - DATABASE_URL (from Neon)
# - UPSTASH_REDIS_REST_URL and TOKEN
# - BLOB_READ_WRITE_TOKEN
# - ADMIN_PASSWORD
# - etc.

# 5. Start dev server
npm run dev

# 6. Test health check
curl http://localhost:3001/health
```

## 📦 Available Scripts

```bash
npm run dev         # Development with hot reload
npm run build       # Build TypeScript to JavaScript
npm start           # Start production server
npm run start:dev   # Start dev server without watch mode
```

## 🌍 Deploy to Production

### Railway (Easiest - Recommended)

1. Push your code to GitHub
2. Go to [railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Set build command: `cd server && npm install && npm run build`
5. Set start command: `cd server && npm start`
6. Add environment variables (see .env.example)
7. Deploy! 🎉

Railway URL: `https://your-app.railway.app`

### Render

1. Go to [render.com](https://render.com)
2. New Web Service → Connect GitHub repo
3. Build command: `cd server && npm install && npm run build`
4. Start command: `cd server && npm start`
5. Add environment variables
6. Deploy!

### Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Launch (creates fly.toml)
flyctl launch --no-deploy

# Set secrets
flyctl secrets set DATABASE_URL="..."
flyctl secrets set UPSTASH_REDIS_REST_URL="..."
# ... etc

# Deploy
flyctl deploy
```

## 🔧 Environment Variables

Required environment variables (copy from `.env.example`):

```env
# Server
NODE_ENV=production
PORT=3001
FRONTEND_URL=https://your-frontend.vercel.app

# Database (Neon)
DATABASE_URL=postgresql://...

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://...
UPSTASH_REDIS_REST_TOKEN=...

# Blob Storage (Vercel Blob)
BLOB_READ_WRITE_TOKEN=...

# Admin Auth
ADMIN_PASSWORD=...

# Cron Security
CRON_SECRET=...
```

## 📁 Project Structure

```
server/
├── index.ts          # Main Express server
├── package.json      # Server dependencies
├── tsconfig.json     # TypeScript config
├── .env              # Environment variables (create from .env.example)
└── .env.example      # Environment template

api/                  # Your existing API handlers (imported by server)
├── blob.ts
├── posts.ts
├── admin/
└── _lib/
```

## 🔗 Update Frontend

After deploying backend, update frontend to use new API URL:

1. Add to frontend `.env`:
   ```env
   VITE_API_URL=https://your-backend.railway.app
   ```

2. Update `src/lib/blog-api.ts`:
   ```typescript
   const API_BASE = import.meta.env.VITE_API_URL || '';
   
   deletePost: (id: string) =>
     request<{ ok: boolean }>(`/api/admin/posts/${id}`, {
       method: 'DELETE',  // Real DELETE now works!
     }),
   ```

See [FRONTEND_UPDATE.md](../FRONTEND_UPDATE.md) for details.

## 🐳 Docker Support

```bash
# Build image
docker build -t portfolio-backend .

# Run container
docker run -p 3001:3001 --env-file server/.env portfolio-backend
```

## 📊 Health Check

```bash
curl http://localhost:3001/health
# Response: {"status":"ok","timestamp":"2026-03-03T..."}
```

## 🆘 Troubleshooting

**Connection refused:**
- Check PORT environment variable
- Ensure server is running: `npm run dev`

**CORS errors:**
- Set FRONTEND_URL in environment variables
- Check frontend is sending credentials

**Database connection errors:**
- Verify DATABASE_URL is correct
- Check Neon database is accessible
- Try enabling connection pooling in Neon

**Module not found:**
- Run `npm install` in server directory
- Check import paths use .js extension

## 📖 Full Documentation

- [DEPLOYMENT.md](../DEPLOYMENT.md) - Detailed deployment guide
- [FRONTEND_UPDATE.md](../FRONTEND_UPDATE.md) - Frontend integration guide

## 🎉 You're Done!

Deploy your backend to Railway/Render/Fly.io and enjoy native HTTP method support without workarounds!
