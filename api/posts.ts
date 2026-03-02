import { listPublicPosts, listPublicTags } from "./_lib/posts.js";
import { ensureMethod, sendJson } from "./_lib/http.js";

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET"])) return;

  const type = req.query?.type;
  const search = typeof req.query?.search === "string" ? req.query.search : "";
  const tag = typeof req.query?.tag === "string" ? req.query.tag : "";
  const page = Number(req.query?.page ?? 1);
  const limit = Number(req.query?.limit ?? 12);

  const safePage = Number.isFinite(page) && page > 0 ? page : 1;
  const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 12;

  const [items, tags] = await Promise.all([
    listPublicPosts(
      {
        type: type === "blog" || type === "news" ? type : undefined,
        search,
        tag,
      },
      (safePage - 1) * safeLimit,
      safeLimit
    ),
    listPublicTags(),
  ]);

  return sendJson(res, 200, {
    page: safePage,
    limit: safeLimit,
    filters: {
      type: type === "blog" || type === "news" ? type : "all",
      search,
      tag,
    },
    tags,
    items,
  });
}
