# Welcome to your Lovable project

## How can I edit this code?

There are several ways of editing your application.


**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Admin + Blog/News backend (Vercel)

This project now includes:

- Admin route: `/admin`
- Password-protected admin login using secure HTTP-only cookies
- Blog/News publishing from admin panel
- Public stories pages:
	- `/stories`
	- `/stories/:slug`
- Vercel API routes under `api/`

### Environment variables

Create `.env.local` from `.env.example` and set:

- `ADMIN_EMAIL`: admin login email
- `ADMIN_PASSWORD_HASH`: bcrypt hash of your admin password (recommended)
- `ADMIN_PASSWORD`: plain password fallback (dev only)
- `ADMIN_TOTP_SECRET`: optional TOTP secret for 2FA login
- `ADMIN_JWT_SECRET`: random strong secret for JWT signing
- `DATABASE_URL`: Neon/Postgres connection string (primary data store)
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`: persistent post storage
- `BLOB_READ_WRITE_TOKEN`: image upload storage

### Database model

- Normalized Postgres schema lives in `db/schema.sql`
- Initial migration file: `db/migrations/001_initial.sql`
- Runtime adapter auto-creates required tables when `DATABASE_URL` is set
- Fallback mode (if no `DATABASE_URL`): Redis/memory storage

### Audit + admin seeding

- On first request with Postgres enabled, admin user is auto-seeded from:
	- `ADMIN_EMAIL`
	- `ADMIN_PASSWORD_HASH` (or `ADMIN_PASSWORD` fallback)
- Auth sessions are persisted in `sessions` table (token hash only)
- Audit events written to `audit_logs` for:
	- login success/failure
	- logout
	- post create/update/delete

### Scheduled publishing

- Internal endpoint: `/api/internal/publish-scheduled`
- Guarded by `CRON_SECRET`
- Vercel cron is configured in `vercel.json` to run every 10 minutes
- Any post with:
	- `status = scheduled`
	- `published_at <= now`
	is auto-promoted to `published`

### Phase 4 additions

- Admin analytics endpoint: `/api/admin/analytics`
- Admin dashboard cards: post counts + 24h activity
- Public stories filters:
	- type (blog/news)
	- search (title/excerpt)
	- tag filter

### Hardening additions

- Optional 2FA check during admin login when `ADMIN_TOTP_SECRET` is set
- Write endpoint throttling for admin create/update/delete/upload requests
- Admin post list pagination (`page`, `limit`) on `/api/admin/posts`

### Generate password hash

Run this once and copy output into `ADMIN_PASSWORD_HASH`:

```sh
node -e "import('bcryptjs').then(({default: b})=>b.hash('yourStrongPassword', 12).then(console.log))"
```

### Deploy

1. Push repository to GitHub.
2. Import project in Vercel.
3. Configure all environment variables in Vercel project settings.
4. Deploy.

`vercel.json` is configured so API routes work alongside SPA routes.

### Production runbook

Pre-deploy:

1. Set all required env vars in Vercel.
2. Run config check locally (or CI):

```sh
npm run check:prod-config
```

If you only want a report without failing exit code:

```sh
node scripts/check-prod-config.mjs --report-only
```

Post-deploy smoke checks:

1. Verify public list API:

```sh
curl https://<your-domain>/api/posts
```

2. Verify cron job endpoint manually:

```sh
curl -X POST https://<your-domain>/api/internal/publish-scheduled -H "Authorization: Bearer <CRON_SECRET>"
```

3. Verify admin login endpoint:

```sh
curl -X POST https://<your-domain>/api/admin/auth/login -H "Content-Type: application/json" -d '{"email":"<ADMIN_EMAIL>","password":"<PASSWORD>"}'
```
