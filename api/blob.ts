import { get } from "@vercel/blob";
import { ensureMethod, sendJson } from "./_lib/http.js";

const BLOB_URL_REGEX = /^https:\/\/[a-z0-9-]+\.(public|private)\.blob\.vercel-storage\.com\//i;

const getBlobAccess = (url: string): "public" | "private" =>
  url.includes(".private.blob.vercel-storage.com/") ? "private" : "public";

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET"])) return;

  const rawUrl = typeof req.query?.url === "string" ? req.query.url.trim() : "";
  if (!rawUrl || !BLOB_URL_REGEX.test(rawUrl)) {
    return sendJson(res, 400, { error: "Invalid blob url" });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return sendJson(res, 500, { error: "Blob token missing. Configure BLOB_READ_WRITE_TOKEN" });
  }

  try {
    const result = await get(rawUrl, {
      access: getBlobAccess(rawUrl),
      token: process.env.BLOB_READ_WRITE_TOKEN,
      useCache: true,
    });

    if (!result || result.statusCode !== 200 || !result.stream) {
      return sendJson(res, 404, { error: "Blob not found" });
    }

    const bytes = await new Response(result.stream).arrayBuffer();

    res.statusCode = 200;
    res.setHeader("Content-Type", result.blob.contentType || "application/octet-stream");
    res.setHeader("Cache-Control", result.blob.cacheControl || "public, max-age=3600");
    res.end(Buffer.from(bytes));
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch blob";
    return sendJson(res, 500, { error: message });
  }
}
