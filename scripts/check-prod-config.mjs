const args = new Set(process.argv.slice(2));
const reportOnly = args.has("--report-only");

const required = [
  "ADMIN_EMAIL",
  "ADMIN_JWT_SECRET",
  "DATABASE_URL",
  "BLOB_READ_WRITE_TOKEN",
  "CRON_SECRET",
];

const passwordOptions = ["ADMIN_PASSWORD_HASH", "ADMIN_PASSWORD"];

const optional = [
  "ADMIN_TOTP_SECRET",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "VERCEL_PROJECT_PRODUCTION_URL",
];

const getState = (key) => {
  const value = process.env[key];
  if (!value) return { ok: false, display: "missing" };
  if (value.length < 8) return { ok: true, display: "set (short)" };
  return { ok: true, display: "set" };
};

const lines = [];
lines.push("Production configuration check");
lines.push("--------------------------------");

let missingCount = 0;

for (const key of required) {
  const state = getState(key);
  if (!state.ok) missingCount += 1;
  lines.push(`${state.ok ? "✅" : "❌"} ${key}: ${state.display}`);
}

const hasPassword = passwordOptions.some((key) => Boolean(process.env[key]));
if (!hasPassword) {
  missingCount += 1;
}
lines.push(`${hasPassword ? "✅" : "❌"} ADMIN_PASSWORD_HASH | ADMIN_PASSWORD: ${hasPassword ? "set" : "missing"}`);

for (const key of optional) {
  const state = getState(key);
  lines.push(`${state.ok ? "🟡" : "⚪"} ${key}: ${state.display}`);
}

lines.push("");
lines.push("Quick smoke-test commands (after deploy):");
lines.push("1) Public posts endpoint:");
lines.push("   curl https://<your-domain>/api/posts");
lines.push("2) Scheduled publish endpoint (auth required):");
lines.push("   curl -X POST https://<your-domain>/api/internal/publish-scheduled -H \"Authorization: Bearer <CRON_SECRET>\"");
lines.push("3) Admin login endpoint:");
lines.push("   curl -X POST https://<your-domain>/api/admin/auth/login -H \"Content-Type: application/json\" -d '{\"email\":\"<ADMIN_EMAIL>\",\"password\":\"<PASSWORD>\"}'");

console.log(lines.join("\n"));

if (!reportOnly && missingCount > 0) {
  process.exitCode = 1;
}
