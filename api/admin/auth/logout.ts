import { clearSessionCookie, getSessionFromRequest, revokeSessionFromRequest } from "../../_lib/auth.js";
import { writeAuditLog } from "../../_lib/audit.js";
import { ensureMethod, sendJson } from "../../_lib/http.js";

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["POST"])) return;

  const session = await getSessionFromRequest(req);
  await revokeSessionFromRequest(req);

  if (session?.email) {
    await writeAuditLog({
      actorEmail: session.email,
      action: "logout",
      resourceType: "auth",
    });
  }

  clearSessionCookie(res);
  return sendJson(res, 200, { ok: true });
}
