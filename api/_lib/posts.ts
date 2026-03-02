import { randomUUID } from "crypto";
import { ensurePostgresSchema, hasPostgresConfig, queryPg } from "./postgres.js";
import { getMemoryStore, getRedis } from "./store.js";

export type PostType = "blog" | "news";
export type PostStatus = "draft" | "published" | "scheduled" | "archived";
export type BlockType = "heading" | "paragraph" | "image";
export type EventType = "hackathon" | "competition" | "techfest" | "workshop" | "meetup";

export type PostBlock = {
  id: string;
  type: BlockType;
  headingLevel?: 1 | 2 | 3;
  text?: string;
  imageUrl?: string;
  imageAlt?: string;
};

export type PostImage = {
  url: string;
  alt?: string;
};

export type PostEntity = {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl?: string;
  status: PostStatus;
  publishedAt?: string;
  featured: boolean;
  eventType?: EventType;
  organizedBy?: string;
  eventStartDate?: string;
  eventEndDate?: string;
  location?: string;
  highlight?: string;
  shortDescription?: string;
  detailedExperience?: string;
  techStack: string[];
  teamMembers: string[];
  projectLink?: string;
  certificateUrl?: string;
  images: PostImage[];
  tags: string[];
  blocks: PostBlock[];
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicPostFilters = {
  type?: PostType;
  search?: string;
  tag?: string;
};

type PostInput = Omit<PostEntity, "id" | "createdAt" | "updatedAt">;

const keyPost = (id: string) => `portfolio:post:${id}`;
const keySlug = (slug: string) => `portfolio:post:slug:${slug}`;
const keyAll = "portfolio:posts:all";
const keyPublished = "portfolio:posts:published";

const sortDesc = (a: { score: number }, b: { score: number }) => b.score - a.score;

const pushScored = (entries: Array<{ id: string; score: number }>, id: string, score: number) => {
  const filtered = entries.filter((entry) => entry.id !== id);
  filtered.push({ id, score });
  filtered.sort(sortDesc);
  return filtered;
};

const removeScored = (entries: Array<{ id: string; score: number }>, id: string) =>
  entries.filter((entry) => entry.id !== id);

const sanitizeSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

type PgPostRow = {
  id: string;
  type: PostType;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string | null;
  status: PostStatus;
  published_at: string | Date | null;
  featured: boolean;
  event_type: EventType | null;
  organized_by: string | null;
  event_start_date: string | Date | null;
  event_end_date: string | Date | null;
  location: string | null;
  highlight: string | null;
  short_description: string | null;
  detailed_experience: string | null;
  tech_stack_json: unknown;
  team_members_json: unknown;
  project_link: string | null;
  certificate_url: string | null;
  images_json: unknown;
  author_email: string;
  created_at: string | Date;
  updated_at: string | Date;
};

type PgBlockRow = {
  id: string;
  block_type: BlockType;
  heading_level: number | null;
  text_content: string | null;
  image_url: string | null;
  image_alt: string | null;
};

type PgTagRow = {
  name: string;
};

type PgCountRow = {
  count: number | string;
};

const toIso = (value: string | Date | null | undefined) =>
  value ? new Date(value).toISOString() : undefined;

const parseJsonArray = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string").map((item) => item.trim()).filter(Boolean);
      }
    } catch {
      return [];
    }
  }

  return [];
};

const parseImageArray = (value: unknown): PostImage[] => {
  const normalize = (arr: unknown[]) =>
    arr
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const maybe = item as { url?: unknown; alt?: unknown };
        if (typeof maybe.url !== "string" || !maybe.url.trim()) return null;
        return {
          url: maybe.url.trim(),
          alt: typeof maybe.alt === "string" && maybe.alt.trim() ? maybe.alt.trim() : undefined,
        };
      })
      .filter((item): item is PostImage => Boolean(item));

  if (Array.isArray(value)) {
    return normalize(value);
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? normalize(parsed) : [];
    } catch {
      return [];
    }
  }

  return [];
};

const mapPgRowToPost = (row: PgPostRow, blocks: PostBlock[], tags: string[]): PostEntity => ({
  id: row.id,
  type: row.type,
  title: row.title,
  slug: row.slug,
  excerpt: row.excerpt,
  coverImageUrl: row.cover_image_url ?? undefined,
  status: row.status,
  publishedAt: toIso(row.published_at),
  featured: Boolean(row.featured),
  eventType: row.event_type ?? undefined,
  organizedBy: row.organized_by ?? undefined,
  eventStartDate: toIso(row.event_start_date),
  eventEndDate: toIso(row.event_end_date),
  location: row.location ?? undefined,
  highlight: row.highlight ?? undefined,
  shortDescription: row.short_description ?? undefined,
  detailedExperience: row.detailed_experience ?? undefined,
  techStack: parseJsonArray(row.tech_stack_json),
  teamMembers: parseJsonArray(row.team_members_json),
  projectLink: row.project_link ?? undefined,
  certificateUrl: row.certificate_url ?? undefined,
  images: parseImageArray(row.images_json),
  tags,
  blocks,
  authorEmail: row.author_email,
  createdAt: toIso(row.created_at) ?? new Date().toISOString(),
  updatedAt: toIso(row.updated_at) ?? new Date().toISOString(),
});

const loadPgBlocks = async (postId: string): Promise<PostBlock[]> => {
  const { rows } = await queryPg<PgBlockRow>(
    `
      SELECT id, block_type, heading_level, text_content, image_url, image_alt
      FROM post_blocks
      WHERE post_id = $1
      ORDER BY sort_order ASC
    `,
    [postId]
  );

  return rows.map((row) => ({
    id: row.id,
    type: row.block_type,
    headingLevel: row.heading_level ? (row.heading_level as 1 | 2 | 3) : undefined,
    text: row.text_content ?? undefined,
    imageUrl: row.image_url ?? undefined,
    imageAlt: row.image_alt ?? undefined,
  }));
};

const loadPgTags = async (postId: string): Promise<string[]> => {
  const { rows } = await queryPg<PgTagRow>(
    `
      SELECT t.name
      FROM post_tags pt
      INNER JOIN tags t ON t.id = pt.tag_id
      WHERE pt.post_id = $1
      ORDER BY t.name ASC
    `,
    [postId]
  );

  return rows.map((row) => row.name);
};

const loadPgPostById = async (id: string): Promise<PostEntity | null> => {
  const { rows } = await queryPg<PgPostRow>(
    `
      SELECT
        id, type, title, slug, excerpt, cover_image_url,
        status, published_at, featured, event_type, organized_by,
        event_start_date, event_end_date, location, highlight,
        short_description, detailed_experience, tech_stack_json,
        team_members_json, project_link, certificate_url, images_json,
        author_email, created_at, updated_at
      FROM posts
      WHERE id = $1
      LIMIT 1
    `,
    [id]
  );

  const row = rows[0];
  if (!row) {
    return null;
  }

  const [blocks, tags] = await Promise.all([loadPgBlocks(row.id), loadPgTags(row.id)]);
  return mapPgRowToPost(row, blocks, tags);
};

const ensureTagId = async (tagName: string): Promise<string> => {
  const normalized = tagName.trim();
  const slug = sanitizeSlug(normalized);

  const existing = await queryPg<{ id: string }>(`SELECT id FROM tags WHERE slug = $1 LIMIT 1`, [slug]);
  if (existing.rows[0]?.id) {
    return existing.rows[0].id;
  }

  const id = randomUUID();
  await queryPg(
    `
      INSERT INTO tags (id, name, slug)
      VALUES ($1, $2, $3)
      ON CONFLICT (slug) DO NOTHING
    `,
    [id, normalized, slug]
  );

  const inserted = await queryPg<{ id: string }>(`SELECT id FROM tags WHERE slug = $1 LIMIT 1`, [slug]);
  return inserted.rows[0]?.id ?? id;
};

const persistPostToPg = async (post: PostEntity) => {
  await ensurePostgresSchema();

  await queryPg(
    `
      INSERT INTO posts (
        id, type, title, slug, excerpt, cover_image_url,
        status, published_at, featured, event_type, organized_by,
        event_start_date, event_end_date, location, highlight,
        short_description, detailed_experience, tech_stack_json,
        team_members_json, project_link, certificate_url, images_json,
        author_email, created_at, updated_at
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
      ON CONFLICT (id) DO UPDATE SET
        type = EXCLUDED.type,
        title = EXCLUDED.title,
        slug = EXCLUDED.slug,
        excerpt = EXCLUDED.excerpt,
        cover_image_url = EXCLUDED.cover_image_url,
        status = EXCLUDED.status,
        published_at = EXCLUDED.published_at,
        featured = EXCLUDED.featured,
        event_type = EXCLUDED.event_type,
        organized_by = EXCLUDED.organized_by,
        event_start_date = EXCLUDED.event_start_date,
        event_end_date = EXCLUDED.event_end_date,
        location = EXCLUDED.location,
        highlight = EXCLUDED.highlight,
        short_description = EXCLUDED.short_description,
        detailed_experience = EXCLUDED.detailed_experience,
        tech_stack_json = EXCLUDED.tech_stack_json,
        team_members_json = EXCLUDED.team_members_json,
        project_link = EXCLUDED.project_link,
        certificate_url = EXCLUDED.certificate_url,
        images_json = EXCLUDED.images_json,
        author_email = EXCLUDED.author_email,
        updated_at = EXCLUDED.updated_at
    `,
    [
      post.id,
      post.type,
      post.title,
      post.slug,
      post.excerpt,
      post.coverImageUrl ?? null,
      post.status,
      post.publishedAt ?? null,
      post.featured,
      post.eventType ?? null,
      post.organizedBy ?? null,
      post.eventStartDate ?? null,
      post.eventEndDate ?? null,
      post.location ?? null,
      post.highlight ?? null,
      post.shortDescription ?? null,
      post.detailedExperience ?? null,
      JSON.stringify(post.techStack || []),
      JSON.stringify(post.teamMembers || []),
      post.projectLink ?? null,
      post.certificateUrl ?? null,
      JSON.stringify(post.images || []),
      post.authorEmail,
      post.createdAt,
      post.updatedAt,
    ]
  );

  await queryPg(`DELETE FROM post_blocks WHERE post_id = $1`, [post.id]);

  for (let index = 0; index < post.blocks.length; index += 1) {
    const block = post.blocks[index];
    await queryPg(
      `
        INSERT INTO post_blocks (
          id, post_id, sort_order, block_type, heading_level, text_content, image_url, image_alt
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      `,
      [
        block.id || randomUUID(),
        post.id,
        index,
        block.type,
        block.headingLevel ?? null,
        block.text ?? null,
        block.imageUrl ?? null,
        block.imageAlt ?? null,
      ]
    );
  }

  await queryPg(`DELETE FROM post_tags WHERE post_id = $1`, [post.id]);

  for (const tag of post.tags) {
    if (!tag.trim()) continue;
    const tagId = await ensureTagId(tag);
    await queryPg(
      `
        INSERT INTO post_tags (post_id, tag_id)
        VALUES ($1, $2)
        ON CONFLICT (post_id, tag_id) DO NOTHING
      `,
      [post.id, tagId]
    );
  }
};

const removePostFromPg = async (id: string) => {
  await ensurePostgresSchema();
  await queryPg(`DELETE FROM posts WHERE id = $1`, [id]);
};

export const toSlug = async (base: string, excludeId?: string): Promise<string> => {
  const safeBase = sanitizeSlug(base) || "post";
  let candidate = safeBase;
  let index = 1;

  while (true) {
    const existing = await getPostIdBySlug(candidate);
    if (!existing || existing === excludeId) {
      return candidate;
    }
    candidate = `${safeBase}-${index}`;
    index += 1;
  }
};

const getPostIdBySlug = async (slug: string): Promise<string | null> => {
  if (hasPostgresConfig()) {
    await ensurePostgresSchema();
    const { rows } = await queryPg<{ id: string }>(`SELECT id FROM posts WHERE slug = $1 LIMIT 1`, [slug]);
    return rows[0]?.id ?? null;
  }

  const redis = getRedis();
  if (redis) {
    const value = await redis.get<string>(keySlug(slug));
    return value ?? null;
  }

  const store = getMemoryStore();
  return store.idBySlug.get(slug) ?? null;
};

const parsePost = (raw: string | null): PostEntity | null => {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<PostEntity>;
    if (!parsed.id || !parsed.slug || !parsed.title || !parsed.type || !parsed.status || !parsed.authorEmail) {
      return null;
    }

    return {
      id: parsed.id,
      type: parsed.type,
      title: parsed.title,
      slug: parsed.slug,
      excerpt: parsed.excerpt ?? "",
      coverImageUrl: parsed.coverImageUrl,
      status: parsed.status,
      publishedAt: parsed.publishedAt,
      featured: Boolean(parsed.featured),
      eventType: parsed.eventType,
      organizedBy: parsed.organizedBy,
      eventStartDate: parsed.eventStartDate,
      eventEndDate: parsed.eventEndDate,
      location: parsed.location,
      highlight: parsed.highlight,
      shortDescription: parsed.shortDescription,
      detailedExperience: parsed.detailedExperience,
      techStack: Array.isArray(parsed.techStack) ? parsed.techStack : [],
      teamMembers: Array.isArray(parsed.teamMembers) ? parsed.teamMembers : [],
      projectLink: parsed.projectLink,
      certificateUrl: parsed.certificateUrl,
      images: Array.isArray(parsed.images) ? parsed.images : [],
      tags: Array.isArray(parsed.tags) ? parsed.tags : [],
      blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
      authorEmail: parsed.authorEmail,
      createdAt: parsed.createdAt ?? new Date().toISOString(),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
};

const getPostById = async (id: string): Promise<PostEntity | null> => {
  if (hasPostgresConfig()) {
    return loadPgPostById(id);
  }

  const redis = getRedis();
  if (redis) {
    const raw = await redis.get<string>(keyPost(id));
    return parsePost(raw ?? null);
  }
  const store = getMemoryStore();
  return parsePost(store.postsById.get(id) ?? null);
};

const persistPost = async (post: PostEntity) => {
  if (hasPostgresConfig()) {
    await persistPostToPg(post);
    return;
  }

  const redis = getRedis();
  const createdScore = new Date(post.createdAt).getTime();
  const publishedScore = post.publishedAt ? new Date(post.publishedAt).getTime() : null;

  if (redis) {
    await redis.set(keyPost(post.id), JSON.stringify(post));
    await redis.set(keySlug(post.slug), post.id);
    await redis.zadd(keyAll, { score: createdScore, member: post.id });

    if (post.status === "published" && publishedScore) {
      await redis.zadd(keyPublished, { score: publishedScore, member: post.id });
    } else {
      await redis.zrem(keyPublished, post.id);
    }
    return;
  }

  const store = getMemoryStore();
  store.postsById.set(post.id, JSON.stringify(post));
  store.idBySlug.set(post.slug, post.id);
  store.all = pushScored(store.all, post.id, createdScore);
  if (post.status === "published" && publishedScore) {
    store.published = pushScored(store.published, post.id, publishedScore);
  } else {
    store.published = removeScored(store.published, post.id);
  }
};

const removePost = async (post: PostEntity) => {
  if (hasPostgresConfig()) {
    await removePostFromPg(post.id);
    return;
  }

  const redis = getRedis();
  if (redis) {
    await redis.del(keyPost(post.id));
    await redis.del(keySlug(post.slug));
    await redis.zrem(keyAll, post.id);
    await redis.zrem(keyPublished, post.id);
    return;
  }

  const store = getMemoryStore();
  store.postsById.delete(post.id);
  store.idBySlug.delete(post.slug);
  store.all = removeScored(store.all, post.id);
  store.published = removeScored(store.published, post.id);
};

const listByIndex = async (indexKey: string, offset: number, limit: number): Promise<string[]> => {
  if (hasPostgresConfig()) {
    await ensurePostgresSchema();
    const isPublic = indexKey === keyPublished;
    const where = isPublic ? `WHERE status = 'published'` : "";
    const orderBy = isPublic ? `ORDER BY published_at DESC NULLS LAST, created_at DESC` : `ORDER BY created_at DESC`;

    const { rows } = await queryPg<{ id: string }>(
      `
        SELECT id
        FROM posts
        ${where}
        ${orderBy}
        OFFSET $1 LIMIT $2
      `,
      [offset, limit]
    );

    return rows.map((row) => row.id);
  }

  const redis = getRedis();
  if (redis) {
    return redis.zrange<string[]>(indexKey, offset, offset + limit - 1, { rev: true });
  }

  const store = getMemoryStore();
  const source = indexKey === keyPublished ? store.published : store.all;
  return source.slice(offset, offset + limit).map((item) => item.id);
};

export const listAdminPosts = async (offset = 0, limit = 50): Promise<PostEntity[]> => {
  const ids = await listByIndex(keyAll, offset, limit);
  const posts = await Promise.all(ids.map((id) => getPostById(id)));
  return posts.filter(Boolean) as PostEntity[];
};

export const listPublicPosts = async (filters: PublicPostFilters = {}, offset = 0, limit = 20): Promise<PostEntity[]> => {
  const search = filters.search?.trim().toLowerCase();
  const tag = filters.tag?.trim().toLowerCase();

  if (hasPostgresConfig()) {
    await ensurePostgresSchema();

    const clauses = ["p.status = 'published'"];
    const params: unknown[] = [];
    let index = 1;

    if (filters.type) {
      clauses.push(`p.type = $${index}`);
      params.push(filters.type);
      index += 1;
    }

    if (search) {
      clauses.push(`(LOWER(p.title) LIKE $${index} OR LOWER(p.excerpt) LIKE $${index})`);
      params.push(`%${search}%`);
      index += 1;
    }

    if (tag) {
      clauses.push(
        `EXISTS (
          SELECT 1
          FROM post_tags pt
          INNER JOIN tags t ON t.id = pt.tag_id
          WHERE pt.post_id = p.id AND LOWER(t.slug) = $${index}
        )`
      );
      params.push(sanitizeSlug(tag));
      index += 1;
    }

    const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";

    params.push(offset, limit);

    const { rows } = await queryPg<PgPostRow>(
      `
        SELECT
          p.id, p.type, p.title, p.slug, p.excerpt, p.cover_image_url,
          p.status, p.published_at, p.featured, p.event_type, p.organized_by,
          p.event_start_date, p.event_end_date, p.location, p.highlight,
          p.short_description, p.detailed_experience, p.tech_stack_json,
          p.team_members_json, p.project_link, p.certificate_url, p.images_json,
          p.author_email, p.created_at, p.updated_at
        FROM posts p
        ${where}
        ORDER BY p.published_at DESC NULLS LAST, p.created_at DESC
        OFFSET $${index} LIMIT $${index + 1}
      `,
      params
    );

    const posts = await Promise.all(
      rows.map(async (row) => {
        const [blocks, tags] = await Promise.all([loadPgBlocks(row.id), loadPgTags(row.id)]);
        return mapPgRowToPost(row, blocks, tags);
      })
    );

    return posts;
  }

  const ids = await listByIndex(keyPublished, offset, limit * 3);
  const posts = await Promise.all(ids.map((id) => getPostById(id)));

  return (posts.filter(Boolean) as PostEntity[])
    .filter((post) => post.status === "published")
    .filter((post) => (filters.type ? post.type === filters.type : true))
    .filter((post) => {
      if (!search) return true;
      return post.title.toLowerCase().includes(search) || post.excerpt.toLowerCase().includes(search);
    })
    .filter((post) => {
      if (!tag) return true;
      return post.tags.some((t) => sanitizeSlug(t) === sanitizeSlug(tag));
    })
    .slice(0, limit);
};

export const listPublicTags = async (): Promise<string[]> => {
  if (hasPostgresConfig()) {
    await ensurePostgresSchema();
    const { rows } = await queryPg<PgTagRow>(
      `
        SELECT DISTINCT t.name
        FROM tags t
        INNER JOIN post_tags pt ON pt.tag_id = t.id
        INNER JOIN posts p ON p.id = pt.post_id
        WHERE p.status = 'published'
        ORDER BY t.name ASC
      `
    );
    return rows.map((row) => row.name);
  }

  const posts = await listPublicPosts({}, 0, 500);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
};

export const publishDueScheduledPosts = async (): Promise<{ updatedCount: number; postIds: string[] }> => {
  if (hasPostgresConfig()) {
    await ensurePostgresSchema();

    const due = await queryPg<{ id: string }>(
      `
        SELECT id
        FROM posts
        WHERE status = 'scheduled'
          AND published_at IS NOT NULL
          AND published_at <= NOW()
      `
    );

    const ids = due.rows.map((row) => row.id);
    if (ids.length === 0) {
      return { updatedCount: 0, postIds: [] };
    }

    await queryPg(
      `
        UPDATE posts
        SET status = 'published', updated_at = NOW()
        WHERE status = 'scheduled'
          AND published_at IS NOT NULL
          AND published_at <= NOW()
      `
    );

    return { updatedCount: ids.length, postIds: ids };
  }

  const posts = await listAdminPosts(0, 1000);
  const due = posts.filter(
    (post) => post.status === "scheduled" && post.publishedAt && new Date(post.publishedAt).getTime() <= Date.now()
  );

  for (const post of due) {
    await updatePost(post.id, { status: "published" });
  }

  return { updatedCount: due.length, postIds: due.map((post) => post.id) };
};

export const getPostCounts = async (): Promise<{ total: number; published: number; scheduled: number; drafts: number }> => {
  if (hasPostgresConfig()) {
    await ensurePostgresSchema();

    const [all, published, scheduled, drafts] = await Promise.all([
      queryPg<PgCountRow>(`SELECT COUNT(*)::int AS count FROM posts`),
      queryPg<PgCountRow>(`SELECT COUNT(*)::int AS count FROM posts WHERE status = 'published'`),
      queryPg<PgCountRow>(`SELECT COUNT(*)::int AS count FROM posts WHERE status = 'scheduled'`),
      queryPg<PgCountRow>(`SELECT COUNT(*)::int AS count FROM posts WHERE status = 'draft'`),
    ]);

    return {
      total: Number(all.rows[0]?.count ?? 0),
      published: Number(published.rows[0]?.count ?? 0),
      scheduled: Number(scheduled.rows[0]?.count ?? 0),
      drafts: Number(drafts.rows[0]?.count ?? 0),
    };
  }

  const posts = await listAdminPosts(0, 1000);
  return {
    total: posts.length,
    published: posts.filter((post) => post.status === "published").length,
    scheduled: posts.filter((post) => post.status === "scheduled").length,
    drafts: posts.filter((post) => post.status === "draft").length,
  };
};

export const getPublicPostBySlug = async (slug: string): Promise<PostEntity | null> => {
  const id = await getPostIdBySlug(slug);
  if (!id) return null;

  const post = await getPostById(id);
  if (!post || post.status !== "published") {
    return null;
  }

  return post;
};

export const getAdminPostById = async (id: string): Promise<PostEntity | null> => getPostById(id);

export const createPost = async (input: PostInput): Promise<PostEntity> => {
  const now = new Date().toISOString();
  const post: PostEntity = {
    ...input,
    techStack: input.techStack || [],
    teamMembers: input.teamMembers || [],
    images: input.images || [],
    id: randomUUID(),
    createdAt: now,
    updatedAt: now,
  };

  await persistPost(post);
  return post;
};

export const updatePost = async (
  id: string,
  updater: Partial<Omit<PostEntity, "id" | "createdAt">>
): Promise<PostEntity | null> => {
  const current = await getPostById(id);
  if (!current) return null;

  const previousSlug = current.slug;
  const next: PostEntity = {
    ...current,
    ...updater,
    techStack: updater.techStack ?? current.techStack ?? [],
    teamMembers: updater.teamMembers ?? current.teamMembers ?? [],
    images: updater.images ?? current.images ?? [],
    id,
    createdAt: current.createdAt,
    updatedAt: new Date().toISOString(),
  };

  const redis = getRedis();
  if (previousSlug !== next.slug) {
    if (redis) {
      await redis.del(keySlug(previousSlug));
    } else {
      getMemoryStore().idBySlug.delete(previousSlug);
    }
  }

  await persistPost(next);
  return next;
};

export const deletePostById = async (id: string): Promise<boolean> => {
  const current = await getPostById(id);
  if (!current) return false;

  await removePost(current);
  return true;
};
