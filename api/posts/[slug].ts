import { getPublicPostBySlug } from "../_lib/posts.js";
import { ensureMethod, sendJson } from "../_lib/http.js";

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET"])) return;

  const slug = String(req.query?.slug || "").trim().toLowerCase();
  if (!slug) {
    return sendJson(res, 400, { error: "Slug is required" });
  }

  const post = await getPublicPostBySlug(slug);
  if (!post) {
    return sendJson(res, 404, { error: "Post not found" });
  }

  return sendJson(res, 200, { item: post });
}
