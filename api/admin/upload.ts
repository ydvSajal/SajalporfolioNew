import { put } from "@vercel/blob";
import { z } from "zod";
import { checkAdminWriteRateLimit, requireAdmin } from "../_lib/auth.js";
import { ensureMethod, parseBody, sendJson } from "../_lib/http.js";

const payloadSchema = z.object({
  filename: z.string().min(1).max(120),
  contentType: z.string().min(1).max(120),
  base64: z.string().min(10),
});

const sanitizeFilename = (input: string) =>
  input
    .toLowerCase()
    .replace(/[^a-z0-9.-]/g, "-")
    .replace(/-+/g, "-");

const resolveBlobAccess = (): "public" | "private" => {
  const configured = process.env.BLOB_ACCESS?.trim().toLowerCase();
  return configured === "private" ? "private" : "public";
};

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["POST"])) return;

  const session = await requireAdmin(req, res);
  if (!session) return;

  const writeAllowed = await checkAdminWriteRateLimit(req, session.email);
  if (!writeAllowed) {
    return sendJson(res, 429, { error: "Too many upload/write requests. Please wait and try again." });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return sendJson(res, 500, { error: "Blob token missing. Configure BLOB_READ_WRITE_TOKEN" });
  }

  try {
    const body = parseBody<unknown>(req);
    const parsed = payloadSchema.parse(body);

    const buffer = Buffer.from(parsed.base64, "base64");
    const sizeMB = buffer.byteLength / (1024 * 1024);
    if (sizeMB > 8) {
      return sendJson(res, 400, { error: "Image too large. Max 8MB." });
    }

    const safeName = sanitizeFilename(parsed.filename);
    const pathname = `posts/${Date.now()}-${safeName}`;

    const upload = async (access: "public" | "private") =>
      put(pathname, buffer, {
        access,
        contentType: parsed.contentType,
        addRandomSuffix: false,
      });

    let blob;
    try {
      blob = await upload(resolveBlobAccess());
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.includes("Cannot use public access on a private store")) {
        blob = await upload("private");
      } else {
        throw error;
      }
    }

    return sendJson(res, 201, {
      item: {
        url: blob.url,
        pathname: blob.pathname,
        uploadedBy: session.email,
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendJson(res, 400, { error: "Invalid upload payload", issues: error.issues });
    }
    const message = error instanceof Error ? error.message : "Upload failed";
    return sendJson(res, 500, { error: message });
  }
}
