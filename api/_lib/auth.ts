import bcrypt from "bcryptjs";
import { createHash, randomUUID } from "crypto";
import { SignJWT, jwtVerify } from "jose";
import { getEnv } from "./env.js";
import { getMemoryStore, getRedis } from "./store.js";
import { getRequestIp, readCookie, sendJson } from "./http.js";
import { ensurePostgresSchema, hasPostgresConfig, queryPg } from "./postgres.js";

const COOKIE_NAME = "admin_session";
const SESSION_DAYS = 7;
let passwordHashFromPlainPromise: Promise<string> | null = null;

type AdminClaims = {
  sub: string;
  email: string;
  role: "admin";
};

type DbUser = {
  id: string;
  email: string;
  password_hash: string;
  role: string;
  is_active: boolean;
};

type DbSessionStatus = {
  revoked_at: string | null;
  expires_at: string;
};

const secretKey = () => new TextEncoder().encode(getEnv("ADMIN_JWT_SECRET"));
const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");

const checkScopedRateLimit = async (req: any, key: string, maxAttempts: number, windowSeconds: number) => {
  const redis = getRedis();

  if (redis) {
    const count = await redis.incr(key);
    if (count === 1) {
      await redis.expire(key, windowSeconds);
    }
    return count <= maxAttempts;
  }

  const store = getMemoryStore();
  const now = Date.now();
  const current = store.rateLimit.get(key);
  if (!current || current.resetAt <= now) {
    store.rateLimit.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return true;
  }

  current.count += 1;
  store.rateLimit.set(key, current);
  return current.count <= maxAttempts;
};

const getAdminPasswordHash = async () => {
  const preHashed = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (preHashed) {
    return preHashed;
  }

  const plainPassword = process.env.ADMIN_PASSWORD?.trim();
  if (!plainPassword) {
    return "";
  }

  if (!passwordHashFromPlainPromise) {
    passwordHashFromPlainPromise = bcrypt.hash(plainPassword, 12);
  }

  return passwordHashFromPlainPromise;
};

export const ensureAdminSeeded = async () => {
  if (!hasPostgresConfig()) {
    return;
  }

  await ensurePostgresSchema();
  const email = getEnv("ADMIN_EMAIL").trim().toLowerCase();
  const passwordHash = await getAdminPasswordHash();
  if (!passwordHash) {
    return;
  }

  const existing = await queryPg<DbUser>(`SELECT id, email, password_hash, role, is_active FROM users WHERE email = $1 LIMIT 1`, [
    email,
  ]);

  if (!existing.rows[0]) {
    await queryPg(
      `
        INSERT INTO users (id, email, password_hash, role, is_active)
        VALUES ($1, $2, $3, 'admin', true)
      `,
      [randomUUID(), email, passwordHash]
    );
    return;
  }

  await queryPg(
    `
      UPDATE users
      SET password_hash = $1, role = 'admin', is_active = true, updated_at = NOW()
      WHERE email = $2
    `,
    [passwordHash, email]
  );
};

export const createSessionToken = async (claims: AdminClaims) => {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());
};

export const verifySessionToken = async (token: string) => {
  const { payload } = await jwtVerify(token, secretKey());
  return payload as unknown as AdminClaims;
};

export const setSessionCookie = (res: any, token: string) => {
  const isProd = process.env.NODE_ENV === "production";
  const cookie = [
    `${COOKIE_NAME}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${SESSION_DAYS * 24 * 60 * 60}`,
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
};

export const clearSessionCookie = (res: any) => {
  const isProd = process.env.NODE_ENV === "production";
  const cookie = [
    `${COOKIE_NAME}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0",
    isProd ? "Secure" : "",
  ]
    .filter(Boolean)
    .join("; ");

  res.setHeader("Set-Cookie", cookie);
};

export const getSessionFromRequest = async (req: any) => {
  const token = readCookie(req, COOKIE_NAME);
  if (!token) {
    return null;
  }

  try {
    const claims = await verifySessionToken(token);

    if (hasPostgresConfig()) {
      await ensurePostgresSchema();
      const hashed = tokenHash(token);
      const dbSession = await queryPg<DbSessionStatus>(
        `
          SELECT revoked_at, expires_at
          FROM sessions
          WHERE token_hash = $1
          ORDER BY created_at DESC
          LIMIT 1
        `,
        [hashed]
      );

      const row = dbSession.rows[0];
      if (!row || row.revoked_at) {
        return null;
      }

      if (new Date(row.expires_at).getTime() <= Date.now()) {
        return null;
      }
    }

    return claims;
  } catch {
    return null;
  }
};

export const requireAdmin = async (req: any, res: any) => {
  const session = await getSessionFromRequest(req);
  if (!session || session.role !== "admin") {
    sendJson(res, 401, { error: "Unauthorized" });
    return null;
  }
  return session;
};

export const verifyAdminPassword = async (password: string, email?: string) => {
  const adminEmail = getEnv("ADMIN_EMAIL").trim().toLowerCase();
  const normalizedEmail = (email ?? adminEmail).toLowerCase();

  if (normalizedEmail !== adminEmail) {
    return false;
  }

  if (hasPostgresConfig()) {
    await ensureAdminSeeded();

    const user = await queryPg<DbUser>(
      `
        SELECT id, email, password_hash, role, is_active
        FROM users
        WHERE email = $1
        LIMIT 1
      `,
      [normalizedEmail]
    );

    const row = user.rows[0];
    if (!row || !row.is_active || row.role !== "admin") {
      return false;
    }

    return bcrypt.compare(password, row.password_hash);
  }

  const passwordHash = await getAdminPasswordHash();
  if (!passwordHash) {
    return false;
  }

  return bcrypt.compare(password, passwordHash);
};

export const getAdminEmail = () => getEnv("ADMIN_EMAIL").trim().toLowerCase();

export const persistSession = async (req: any, email: string, token: string) => {
  if (!hasPostgresConfig()) {
    return;
  }

  await ensurePostgresSchema();
  await ensureAdminSeeded();

  const user = await queryPg<{ id: string }>(`SELECT id FROM users WHERE email = $1 LIMIT 1`, [email.toLowerCase()]);
  const userId = user.rows[0]?.id;
  if (!userId) {
    return;
  }

  const expiresAt = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000).toISOString();

  await queryPg(
    `
      INSERT INTO sessions (
        id, user_id, token_hash, ip_address, user_agent, expires_at, revoked_at
      ) VALUES ($1, $2, $3, $4, $5, $6, NULL)
    `,
    [randomUUID(), userId, tokenHash(token), getRequestIp(req), req.headers?.["user-agent"] ?? null, expiresAt]
  );

  await queryPg(`UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1`, [userId]);
};

export const revokeSessionFromRequest = async (req: any) => {
  if (!hasPostgresConfig()) {
    return;
  }

  const token = readCookie(req, COOKIE_NAME);
  if (!token) {
    return;
  }

  await ensurePostgresSchema();

  await queryPg(
    `
      UPDATE sessions
      SET revoked_at = NOW()
      WHERE token_hash = $1
        AND revoked_at IS NULL
    `,
    [tokenHash(token)]
  );
};

const getRateLimitKey = (req: any, email: string) => `portfolio:rl:login:${getRequestIp(req)}:${email}`;

export const checkLoginRateLimit = async (req: any, email: string) => {
  return checkScopedRateLimit(req, getRateLimitKey(req, email), 7, 10 * 60);
};

export const checkAdminWriteRateLimit = async (req: any, email: string) => {
  const key = `portfolio:rl:write:${getRequestIp(req)}:${email.toLowerCase()}`;
  return checkScopedRateLimit(req, key, 40, 10 * 60);
};
