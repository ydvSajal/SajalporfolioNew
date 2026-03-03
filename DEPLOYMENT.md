# Backend Deployment Guide

Your backend API has been set up to run as a standalone Express server. This gives you the flexibility to deploy it anywhere that supports Node.js.

## 🚀 Quick Start Options

### Option 1: Railway (Recommended)

**Why Railway?**
- ✅ Easiest setup
- ✅ $5/month free credit
- ✅ Native support for all HTTP methods (DELETE, PATCH, etc.)
- ✅ Automatic HTTPS
- ✅ Great developer experience

**Steps:**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select this repository
5. Configure environment variables:
   ```
   DATABASE_URL=postgresql://...
   UPSTASH_REDIS_REST_URL=https://...
   UPSTASH_REDIS_REST_TOKEN=...
   BLOB_READ_WRITE_TOKEN=...
   ADMIN_PASSWORD=your-password
   CRON_SECRET=your-secret
   FRONTEND_URL=https://your-frontend.vercel.app
   NODE_ENV=production
   PORT=3001
   ```
6. Set build command: `cd server && npm install && npm run build`
7. Set start command: `cd server && npm start`
8. Deploy!

Railway will give you a URL like: `https://your-app.railway.app`

---

### Option 2: Render

**Steps:**
1. Go to [render.com](https://render.com)
2. Sign up and connect GitHub
3. Click "New +" → "Web Service"
4. Select this repository
5. Use these settings:
   - **Build Command:** `cd server && npm install && npm run build`
   - **Start Command:** `cd server && npm start`
   - **Environment:** Node
6. Add all environment variables (same as Railway)
7. Deploy!

Render provides: `https://your-app.onrender.com`

---

### Option 3: Fly.io

**Steps:**
1. Install flyctl: `npm install -g flyctl` or `curl -L https://fly.io/install.sh | sh`
2. Login: `flyctl auth login`
3. Create app: `flyctl launch --no-deploy`
4. Set secrets:
   ```bash
   flyctl secrets set DATABASE_URL="postgresql://..."
   flyctl secrets set UPSTASH_REDIS_REST_URL="https://..."
   flyctl secrets set UPSTASH_REDIS_REST_TOKEN="..."
   flyctl secrets set BLOB_READ_WRITE_TOKEN="..."
   flyctl secrets set ADMIN_PASSWORD="your-password"
   flyctl secrets set CRON_SECRET="your-secret"
   flyctl secrets set FRONTEND_URL="https://your-frontend.vercel.app"
   ```
5. Deploy: `flyctl deploy`

---

## 🔧 Local Development

Test the backend locally before deploying:

```bash
# Install dependencies
cd server
npm install

# Create .env file
cat > .env << EOF
DATABASE_URL=your-neon-db-url
UPSTASH_REDIS_REST_URL=your-redis-url
UPSTASH_REDIS_REST_TOKEN=your-redis-token
BLOB_READ_WRITE_TOKEN=your-blob-token
ADMIN_PASSWORD=your-password
CRON_SECRET=your-secret
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
PORT=3001
EOF

# Run dev server
npm run dev

# Test health check
curl http://localhost:3001/health
```

---

## 📝 Update Frontend API URLs

After deploying, update your frontend to use the new backend URL:

### In `src/lib/blog-api.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || 'https://your-backend.railway.app';

// Remove method override workarounds - use real HTTP methods
deletePost: (id: string) =>
  request<{ ok: boolean }>(`${API_BASE}/api/admin/posts/${id}`, {
    method: 'DELETE', // Real DELETE method now works!
  }),
```

### Add to `.env` (frontend):
```
VITE_API_URL=https://your-backend.railway.app
```

---

## 🔒 CORS Configuration

The backend is configured to accept requests from your frontend. Make sure to set `FRONTEND_URL` in your backend environment variables to your actual frontend URL.

---

## ⚡ Benefits of Separate Backend

✅ **Real HTTP Methods** - DELETE, PATCH work natively  
✅ **Better Performance** - No serverless cold starts  
✅ **Easier Debugging** - Standard Node.js logs  
✅ **More Control** - Full control over middleware and routing  
✅ **Cost Effective** - Free tiers on most platforms  

---

## 🆘 Troubleshooting

**Port Issues:**
- Railway/Render automatically set PORT - no action needed
- Fly.io uses port 8080 by default - update if needed

**CORS Errors:**
- Ensure FRONTEND_URL is set correctly
- Check that credentials are enabled in frontend fetch calls

**Database Connections:**
- Neon DB works from anywhere - just use the connection string
- Enable "Pooled connection" in Neon if you see connection issues

**Blob Storage:**
- Vercel Blob works from any platform - just needs the token
- Alternative: Switch to AWS S3 or Cloudinary

---

## 📊 Monitoring

- Railway: Built-in metrics and logs
- Render: Logs in dashboard
- Fly.io: `flyctl logs`

---

## 🔄 CI/CD

All platforms support automatic deployments:
- Push to `main` branch
- Backend automatically rebuilds and deploys
- Zero downtime deployments

Choose your platform and follow the steps above. Railway is the easiest to get started with!
