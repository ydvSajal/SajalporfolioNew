import { ensureMethod, sendJson } from "./_lib/http.js";

const BLOB_URL_REGEX = /^https:\/\/[a-z0-9-]+\.(public|private)\.blob\.vercel-storage\.com\//i;

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET"])) return;

  const rawUrl = typeof req.query?.url === "string" ? req.query.url.trim() : "";
  if (!rawUrl || !BLOB_URL_REGEX.test(rawUrl)) {
    return sendJson(res, 400, { error: "Invalid blob url" });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return sendJson(res, 500, { error: "Blob token missing. Configure BLOB_READ_WRITE_TOKEN" });
  }

  try {
    // Use a direct fetch with Authorization header to actually retrieve blob content.
    // @vercel/blob's get() is metadata-only — it has no .stream property.
    const blobResponse = await fetch(rawUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!blobResponse.ok) {
      return sendJson(res, blobResponse.status === 404 ? 404 : 502, {
        error: "Blob not found or unreachable",
      });
    }

    const contentType = blobResponse.headers.get("content-type") || "application/octet-stream";
    const cacheControl = blobResponse.headers.get("cache-control") || "public, max-age=3600";
    const bytes = await blobResponse.arrayBuffer();

    res.statusCode = 200;
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", cacheControl);
    res.end(Buffer.from(bytes));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch blob";
    return sendJson(res, 500, { error: message });
  }
}
