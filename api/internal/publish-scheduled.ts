import { writeAuditLog } from "../_lib/audit.js";
import { ensureMethod, sendJson } from "../_lib/http.js";
import { publishDueScheduledPosts } from "../_lib/posts.js";

const isAuthorized = (req: any) => {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return false;
  }

  const authHeader = req.headers?.authorization;
  if (typeof authHeader === "string" && authHeader === `Bearer ${secret}`) {
    return true;
  }

  const headerSecret = req.headers?.["x-cron-secret"];
  if (typeof headerSecret === "string" && headerSecret === secret) {
    return true;
  }

  return false;
};

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET", "POST"])) return;

  if (!isAuthorized(req)) {
    return sendJson(res, 401, { error: "Unauthorized" });
  }

  const result = await publishDueScheduledPosts();

  await writeAuditLog({
    actorEmail: "system@cron",
    action: "scheduled_publish_run",
    resourceType: "job",
    metadata: { updatedCount: result.updatedCount, postIds: result.postIds },
  });

  return sendJson(res, 200, {
    ok: true,
    updatedCount: result.updatedCount,
    postIds: result.postIds,
  });
}
