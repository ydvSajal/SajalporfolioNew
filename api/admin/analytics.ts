import { getAuditSummary } from "../_lib/audit.js";
import { requireAdmin } from "../_lib/auth.js";
import { ensureMethod, sendJson } from "../_lib/http.js";
import { getPostCounts } from "../_lib/posts.js";

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET"])) return;

  const session = await requireAdmin(req, res);
  if (!session) return;

  const [posts, audit] = await Promise.all([getPostCounts(), getAuditSummary()]);

  return sendJson(res, 200, {
    posts,
    audit,
  });
}
