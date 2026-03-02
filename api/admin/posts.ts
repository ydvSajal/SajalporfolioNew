import { z } from "zod";
import { requireAdmin } from "../_lib/auth.js";
import {
  createPost,
  EventType,
  getPostCounts,
  listAdminPosts,
  PostBlock,
  PostEntity,
  PostImage,
  PostStatus,
  PostType,
  toSlug,
} from "../_lib/posts.js";
import { checkAdminWriteRateLimit } from "../_lib/auth.js";
import { writeAuditLog } from "../_lib/audit.js";
import { ensureMethod, parseBody, sendJson } from "../_lib/http.js";

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

const isAcceptableMediaUrl = (value: string) => {
  if (!value) return false;
  if (value.startsWith("/api/blob?url=")) return true;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const mediaUrlSchema = z.string().min(1).refine(isAcceptableMediaUrl, "Invalid media URL");

const blockSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["heading", "paragraph", "image"]),
  headingLevel: z.number().int().min(1).max(3).optional(),
  text: z.string().optional(),
  imageUrl: mediaUrlSchema.optional(),
  imageAlt: z.string().optional(),
});

const createSchema = z.object({
  type: z.enum(["blog", "news"]),
  title: z.string().min(3).max(160),
  slug: z.string().min(1).max(190).optional(),
  excerpt: z.string().min(1).max(300),
  coverImageUrl: mediaUrlSchema.optional().or(z.literal("")),
  status: z.enum(["draft", "published", "scheduled", "archived"]),
  publishedAt: z.string().datetime().optional(),
  featured: z.boolean().default(false),
  eventType: z.enum(["hackathon", "competition", "techfest", "workshop", "meetup"]).optional(),
  organizedBy: z.string().max(200).optional(),
  eventStartDate: z.string().datetime().optional(),
  eventEndDate: z.string().datetime().optional(),
  location: z.string().max(180).optional(),
  highlight: z.string().max(180).optional(),
  shortDescription: z.string().max(600).optional(),
  detailedExperience: z.string().max(8000).optional(),
  techStack: z.array(z.string().min(1).max(60)).default([]),
  teamMembers: z.array(z.string().min(1).max(80)).default([]),
  projectLink: z.string().url().optional().or(z.literal("")),
  certificateUrl: mediaUrlSchema.optional().or(z.literal("")),
  images: z.array(z.object({ url: mediaUrlSchema, alt: z.string().max(140).optional() })).default([]),
  tags: z.array(z.string().min(1).max(30)).default([]),
  blocks: z.array(blockSchema).optional(),
});

const buildBlocks = ({
  title,
  shortDescription,
  detailedExperience,
  images,
}: {
  title: string;
  shortDescription?: string;
  detailedExperience?: string;
  images: PostImage[];
}): PostBlock[] => {
  const blocks: PostBlock[] = [];

  if (shortDescription?.trim()) {
    blocks.push({ id: `block-${Date.now()}-summary`, type: "paragraph", text: shortDescription.trim() });
  }

  if (detailedExperience?.trim()) {
    blocks.push({ id: `block-${Date.now()}-detail`, type: "paragraph", text: detailedExperience.trim() });
  }

  images.forEach((image, index) => {
    blocks.push({
      id: `block-${Date.now()}-img-${index}`,
      type: "image",
      imageUrl: image.url,
      imageAlt: image.alt?.trim() || `${title.trim()} image ${index + 1}`,
    });
  });

  if (blocks.length === 0) {
    blocks.push({ id: `block-${Date.now()}-fallback`, type: "paragraph", text: "" });
  }

  return blocks;
};

const normalizeDate = (status: PostStatus, publishedAt?: string) => {
  if (status === "published") {
    return publishedAt ?? new Date().toISOString();
  }
  return publishedAt;
};

export default async function handler(req: any, res: any) {
  if (!ensureMethod(req, res, ["GET", "POST"])) return;

  const session = await requireAdmin(req, res);
  if (!session) return;

  if (req.method === "GET") {
    const page = Number(req.query?.page ?? 1);
    const limit = Number(req.query?.limit ?? 12);
    const safePage = Number.isFinite(page) && page > 0 ? page : 1;
    const safeLimit = Number.isFinite(limit) ? Math.min(Math.max(limit, 1), 50) : 12;
    const offset = (safePage - 1) * safeLimit;

    const [posts, counts] = await Promise.all([listAdminPosts(offset, safeLimit), getPostCounts()]);

    return sendJson(res, 200, {
      items: posts,
      page: safePage,
      limit: safeLimit,
      total: counts.total,
      totalPages: Math.max(1, Math.ceil(counts.total / safeLimit)),
    });
  }

  const writeAllowed = await checkAdminWriteRateLimit(req, session.email);
  if (!writeAllowed) {
    return sendJson(res, 429, { error: "Too many write requests. Please wait a moment and try again." });
  }

  try {
    const body = parseBody<unknown>(req);
    const parsed = createSchema.parse(body);
    const slug = await toSlug(parsed.slug || parsed.title);
    const safeImages = parsed.images.map((image) => ({
      url: (toStorableMediaUrl(image.url) || image.url).trim(),
      alt: image.alt?.trim() || undefined,
    }));
    const blocks = parsed.blocks?.length
      ? (parsed.blocks as PostBlock[])
      : buildBlocks({
          title: parsed.title,
          shortDescription: parsed.shortDescription,
          detailedExperience: parsed.detailedExperience,
          images: safeImages,
        });

    const created = await createPost({
      type: parsed.type as PostType,
      title: parsed.title,
      slug,
      excerpt: parsed.shortDescription?.trim() || parsed.excerpt,
      coverImageUrl: toStorableMediaUrl(parsed.coverImageUrl) || safeImages[0]?.url || undefined,
      status: parsed.status as PostStatus,
      publishedAt: normalizeDate(parsed.status as PostStatus, parsed.publishedAt),
      featured: parsed.featured,
      eventType: parsed.eventType as EventType | undefined,
      organizedBy: parsed.organizedBy?.trim() || undefined,
      eventStartDate: parsed.eventStartDate,
      eventEndDate: parsed.eventEndDate,
      location: parsed.location?.trim() || undefined,
      highlight: parsed.highlight?.trim() || undefined,
      shortDescription: parsed.shortDescription?.trim() || undefined,
      detailedExperience: parsed.detailedExperience?.trim() || undefined,
      techStack: parsed.techStack,
      teamMembers: parsed.teamMembers,
      projectLink: parsed.projectLink || undefined,
      certificateUrl: toStorableMediaUrl(parsed.certificateUrl) || undefined,
      images: safeImages,
      tags: parsed.tags,
      blocks,
      authorEmail: session.email,
    } as Omit<PostEntity, "id" | "createdAt" | "updatedAt">);

    await writeAuditLog({
      actorEmail: session.email,
      action: "post_create",
      resourceType: "post",
      resourceId: created.id,
      metadata: { slug: created.slug, type: created.type, status: created.status },
    });

    return sendJson(res, 201, { item: created });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return sendJson(res, 400, { error: "Invalid post payload", issues: error.issues });
    }
    const message = error instanceof Error ? error.message : "Failed to create post";
    return sendJson(res, 500, { error: message });
  }
}
