import {
  checkLoginRateLimit,
  createSessionToken,
  ensureAdminSeeded,
  getAdminEmail,
  persistSession,
  setSessionCookie,
  verifyAdminPassword,
} from "../../_lib/auth.js";
import { writeAuditLog } from "../../_lib/audit.js";
import { ensureMethod, parseBody, sendJson } from "../../_lib/http.js";

type LoginBody = {
  email?: string;
  password?: string;
};

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["POST"])) return;

  try {
    await ensureAdminSeeded();

    const body = parseBody<LoginBody>(req);
    const email = body.email?.trim().toLowerCase() ?? "";
    const password = body.password ?? "";

    const allowedAttempt = await checkLoginRateLimit(req, email || "anonymous");
    if (!allowedAttempt) {
      return sendJson(res, 429, { error: "Too many attempts. Please try again later." });
    }

    const adminEmail = getAdminEmail().toLowerCase();
    const validCredentials = email === adminEmail && (await verifyAdminPassword(password, email));

    if (!validCredentials) {
      await writeAuditLog({
        actorEmail: email || "anonymous",
        action: "login_failed",
        resourceType: "auth",
        metadata: { reason: "invalid_credentials" },
      });
      return sendJson(res, 401, { error: "Invalid credentials" });
    }

    const token = await createSessionToken({ sub: adminEmail, email: adminEmail, role: "admin" });
    await persistSession(req, adminEmail, token);
    setSessionCookie(res, token);

    await writeAuditLog({
      actorEmail: adminEmail,
      action: "login_success",
      resourceType: "auth",
      metadata: { ip: req.headers?.["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "unknown" },
    });

    return sendJson(res, 200, {
      ok: true,
      user: { email: adminEmail, role: "admin" },
      security: { totpEnabled: false },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    return sendJson(res, 500, { error: message });
  }
}
