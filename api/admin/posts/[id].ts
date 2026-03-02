import { z } from "zod";
import { checkAdminWriteRateLimit, requireAdmin } from "../../_lib/auth.js";
import {
  deletePostById,
  EventType,
  getAdminPostById,
  PostBlock,
  PostStatus,
  PostType,
  toSlug,
  updatePost,
} from "../../_lib/posts.js";
import { writeAuditLog } from "../../_lib/audit.js";
import { ensureMethod, parseBody, sendJson } from "../../_lib/http.js";

const resolveEffectiveMethod = (req: any): string => {
  const method = String(req.method || "").toUpperCase();
  
  // Check query param first (most reliable on restrictive hosts)
  const queryOverrideRaw = req.query?._method;
  const queryOverride = Array.isArray(queryOverrideRaw)
    ? String(queryOverrideRaw[0] || "").toUpperCase()
    : String(queryOverrideRaw || "").toUpperCase();
  if (queryOverride === "PATCH" || queryOverride === "DELETE") {
    return queryOverride;
  }

  // Check header second
  const headerValue = req.headers?.["x-http-method-override"];
  const rawOverride = Array.isArray(headerValue) ? headerValue[0] : headerValue;
  const override = typeof rawOverride === "string" ? rawOverride.toUpperCase() : "";
  if (override === "PATCH" || override === "DELETE") {
    return override;
  }

  // Fall back to actual method
  return method;
};

const toStorableMediaUrl = (value?: string) => {
  if (!value) return undefined;
  const prefix = "/api/blob?url=";
  if (!value.startsWith(prefix)) return value;
  try {
    return decodeURIComponent(value.slice(prefix.length));
  } catch {
    return value;
  }
};

const blockSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["heading", "paragraph", "image"]),
  headingLevel: z.number().int().min(1).max(3).optional(),
  text: z.string().optional(),
  imageUrl: z.string().url().optional(),
  imageAlt: z.string().optional(),
});

const updateSchema = z.object({
  type: z.enum(["blog", "news"]).optional(),
  title: z.string().min(3).max(160).optional(),
  slug: z.string().min(1).max(190).optional(),
  excerpt: z.string().min(1).max(300).optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["draft", "published", "scheduled", "archived"]).optional(),
  publishedAt: z.string().datetime().optional().or(z.literal("")),
  featured: z.boolean().optional(),
  eventType: z.enum(["hackathon", "competition", "techfest", "workshop", "meetup"]).optional(),
  organizedBy: z.string().max(200).optional(),
  eventStartDate: z.string().datetime().optional().or(z.literal("")),
  eventEndDate: z.string().datetime().optional().or(z.literal("")),
  location: z.string().max(180).optional(),
  highlight: z.string().max(180).optional(),
  shortDescription: z.string().max(600).optional(),
  detailedExperience: z.string().max(8000).optional(),
  techStack: z.array(z.string().min(1).max(60)).optional(),
  teamMembers: z.array(z.string().min(1).max(80)).optional(),
  projectLink: z.string().url().optional().or(z.literal("")),
  certificateUrl: z.string().url().optional().or(z.literal("")),
  images: z.array(z.object({ url: z.string().url(), alt: z.string().max(140).optional() })).optional(),
  tags: z.array(z.string().min(1).max(30)).optional(),
  blocks: z.array(blockSchema).optional(),
});

const normalizeDate = (status?: PostStatus, publishedAt?: string) => {
  if (!status && !publishedAt) {
    return undefined;
  }

  if (status === "published") {
    return publishedAt || new Date().toISOString();
  }

  if (publishedAt === "") {
    return undefined;
  }

  return publishedAt;
};

export default async function handler(req: any, res: any) {
  const session = await requireAdmin(req, res);
  if (!session) return;

  const id = String(req.query?.id || "");
  if (!id) {
    return sendJson(res, 400, { error: "Post id is required" });
  }

  const method = resolveEffectiveMethod(req);
  if (!ensureMethod({ ...req, method }, res, ["GET", "POST", "PATCH", "DELETE"])) return;

  if (method === "GET") {
    const post = await getAdminPostById(id);
    if (!post) {
      return sendJson(res, 404, { error: "Post not found" });
    }
    return sendJson(res, 200, { item: post });
  }

  const writeAllowed = await checkAdminWriteRateLimit(req, session.email);
  if (!writeAllowed) {
    return sendJson(res, 429, { error: "Too many write requests. Please wait a moment and try again." });
  }

  if (method === "DELETE") {
    const deleted = await deletePostById(id);
    if (!deleted) {
      return sendJson(res, 404, { error: "Post not found" });
    }

    await writeAuditLog({
      actorEmail: session.email,
      action: "post_delete",
      resourceType: "post",
      resourceId: id,
    });

    return sendJson(res, 200, { ok: true });
  }

  try {
    const existing = await getAdminPostById(id);
    if (!existing) {
      return sendJson(res, 404, { error: "Post not found" });
    }

    const body = parseBody<unknown>(req);
    const parsed = updateSchema.parse(body);
    const slugBase = parsed.slug || parsed.title;
    const slug = slugBase ? await toSlug(slugBase, id) : existing.slug;
    const safeImages = parsed.images?.map((image) => ({
      url: (toStorableMediaUrl(image.url) || image.url).trim(),
      alt: image.alt?.trim() || undefined,
    }));

    const updated = await updatePost(id, {
      type: parsed.type as PostType | undefined,
      title: parsed.title,
      slug,
      excerpt: parsed.shortDescription?.trim() || parsed.excerpt,
      coverImageUrl: parsed.coverImageUrl === "" ? undefined : toStorableMediaUrl(parsed.coverImageUrl) || parsed.coverImageUrl,
      status: parsed.status as PostStatus | undefined,
      publishedAt: normalizeDate(parsed.status as PostStatus | undefined, parsed.publishedAt as string | undefined),
      featured: parsed.featured,
      eventType: parsed.eventType as EventType | undefined,
      organizedBy: parsed.organizedBy?.trim() || undefined,
      eventStartDate: parsed.eventStartDate === "" ? undefined : parsed.eventStartDate,
      eventEndDate: parsed.eventEndDate === "" ? undefined : parsed.eventEndDate,
      location: parsed.location?.trim() || undefined,
      highlight: parsed.highlight?.trim() || undefined,
      shortDescription: parsed.shortDescription?.trim() || undefined,
      detailedExperience: parsed.detailedExperience?.trim() || undefined,
      techStack: parsed.techStack,
      teamMembers: parsed.teamMembers,
      projectLink: parsed.projectLink === "" ? undefined : parsed.projectLink,
      certificateUrl: parsed.certificateUrl === "" ? undefined : toStorableMediaUrl(parsed.certificateUrl) || parsed.certificateUrl,
      images: safeImages,
      tags: parsed.tags,
      blocks: parsed.blocks as PostBlock[] | undefined,
      authorEmail: session.email,
    });

    if (!updated) {
      return sendJson(res, 404, { error: "Post not found" });
    }

    await writeAuditLog({
      actorEmail: session.email,
      action: "post_update",
      resourceType: "post",
      resourceId: updated.id,
      metadata: { slug: updated.slug, type: updated.type, status: updated.status },
    });

    return sendJson(res, 200, { item: updated });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendJson(res, 400, { error: "Invalid payload", issues: error.issues });
    }
    const message = error instanceof Error ? error.message : "Failed to update post";
    return sendJson(res, 500, { error: message });
  }
}
