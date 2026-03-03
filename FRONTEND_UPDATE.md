# Update Frontend to Use New Backend

After deploying your backend to Railway/Render/Fly.io, update the frontend to use the new API URL.

## Step 1: Add Environment Variable

Create or update `c:\Users\sajal\OneDrive\Documents\GitHub\SajalporfolioNew\.env`:

```env
VITE_API_URL=https://your-backend.railway.app
```

## Step 2: Update blog-api.ts

Replace the `deletePost` method in `src/lib/blog-api.ts`:

### OLD (with workarounds):
```typescript
deletePost: (id: string) =>
  request<{ ok: boolean }>(`/api/admin/posts/${id}?_method=DELETE`, {
    method: 'POST',
    headers: {
      'X-HTTP-Method-Override': 'DELETE',
    },
  }),
```

### NEW (clean, real DELETE):
```typescript
deletePost: (id: string) =>
  request<{ ok: boolean }>(`/api/admin/posts/${id}`, {
    method: 'DELETE',
  }),
```

## Step 3: Update API Base URL

At the top of `src/lib/blog-api.ts`:

```typescript
const API_BASE = import.meta.env.VITE_API_URL || '';

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = API_BASE + endpoint;
  // ... rest of code
};
```

## Step 4: Update vercel.json (Optional)

If you want to keep frontend on Vercel but use external backend, update `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend.railway.app/api/:path*"
    }
  ],
  "routes": [
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

This way you can still use `/api/...` paths in frontend without changing code.

## Step 5: Deploy

Push changes and Vercel will auto-deploy:
```bash
git add .
git commit -m "Update to use external backend API"
git push
```

Done! Your frontend will now communicate with the standalone backend.
