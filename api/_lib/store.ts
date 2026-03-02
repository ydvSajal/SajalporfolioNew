import { Redis } from "@upstash/redis";

const hasRedisEnv = Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);

const redis = hasRedisEnv
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

type MemoryStoreShape = {
  postsById: Map<string, string>;
  idBySlug: Map<string, string>;
  all: Array<{ id: string; score: number }>;
  published: Array<{ id: string; score: number }>;
  rateLimit: Map<string, { count: number; resetAt: number }>;
};

declare global {
  var __portfolioMemoryStore: MemoryStoreShape | undefined;
}

const createMemoryStore = (): MemoryStoreShape => ({
  postsById: new Map(),
  idBySlug: new Map(),
  all: [],
  published: [],
  rateLimit: new Map(),
});

export const getMemoryStore = () => {
  if (!globalThis.__portfolioMemoryStore) {
    globalThis.__portfolioMemoryStore = createMemoryStore();
  }
  return globalThis.__portfolioMemoryStore;
};

export const getRedis = () => redis;
