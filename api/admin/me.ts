import { requireAdmin } from "../_lib/auth.js";
import { ensureMethod, sendJson } from "../_lib/http.js";

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET"])) return;

  const session = await requireAdmin(req, res);
  if (!session) return;

  return sendJson(res, 200, {
    user: {
      email: session.email,
      role: session.role,
    },
  });
}
