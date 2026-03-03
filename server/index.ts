import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Import API routes
import blobHandler from '../api/blob.js';
import postsHandler from '../api/posts.js';
import adminPostsHandler from '../api/admin/posts.js';
import adminPostByIdHandler from '../api/admin/posts/[id].js';
import adminUploadHandler from '../api/admin/upload.js';
import adminAnalyticsHandler from '../api/admin/analytics.js';
import adminMeHandler from '../api/admin/me.js';
import adminLoginHandler from '../api/admin/auth/login.js';
import adminLogoutHandler from '../api/admin/auth/logout.js';
import publishScheduledHandler from '../api/internal/publish-scheduled.js';
import postBySlugHandler from '../api/posts/[slug].js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Wrapper to convert Vercel handlers to Express
const wrapHandler = (handler: any) => async (req: express.Request, res: express.Response) => {
  try {
    // Map Express route params to query params for Vercel handlers
    req.query = { ...req.query, ...req.params };
    await handler(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// API Routes
app.all('/api/blob', wrapHandler(blobHandler));
app.all('/api/posts', wrapHandler(postsHandler));
app.all('/api/posts/:slug', wrapHandler(postBySlugHandler));

// Admin routes
app.all('/api/admin/posts', wrapHandler(adminPostsHandler));
app.all('/api/admin/posts/:id', wrapHandler(adminPostByIdHandler));
app.all('/api/admin/upload', wrapHandler(adminUploadHandler));
app.all('/api/admin/analytics', wrapHandler(adminAnalyticsHandler));
app.all('/api/admin/me', wrapHandler(adminMeHandler));
app.all('/api/admin/auth/login', wrapHandler(adminLoginHandler));
app.all('/api/admin/auth/logout', wrapHandler(adminLogoutHandler));

// Internal routes
app.all('/api/internal/publish-scheduled', wrapHandler(publishScheduledHandler));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
