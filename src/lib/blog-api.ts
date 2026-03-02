import { AdminAnalytics, Post, PostPayload, PostType, UserSession } from '@/types/posts';

const request = async <T>(url: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(url, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  });

  const raw = await response.text();
  const data = raw
    ? (() => {
        try {
          return JSON.parse(raw);
        } catch {
          return {};
        }
      })()
    : {};

  if (!response.ok) {
    const fallback = raw ? raw.slice(0, 180) : `HTTP ${response.status}`;
    throw new Error(data?.error || fallback || 'Request failed');
  }

  return data as T;
};

export const api = {
  login: (email: string, password: string) =>
    request<{ user: UserSession; security?: { totpEnabled: boolean } }>('/api/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  logout: () =>
    request<{ ok: boolean }>('/api/admin/auth/logout', {
      method: 'POST',
    }),

  me: () => request<{ user: UserSession }>('/api/admin/me'),

  getAdminAnalytics: () => request<AdminAnalytics>('/api/admin/analytics'),

  listPublicPosts: (params?: { type?: PostType; search?: string; tag?: string }) => {
    const query = new URLSearchParams();
    if (params?.type) query.set('type', params.type);
    if (params?.search) query.set('search', params.search);
    if (params?.tag) query.set('tag', params.tag);
    const suffix = query.toString() ? `?${query.toString()}` : '';

    return request<{ items: Post[]; tags: string[] }>(`/api/posts${suffix}`);
  },

  getPublicPost: (slug: string) => request<{ item: Post }>(`/api/posts/${encodeURIComponent(slug)}`),

  listAdminPosts: (params?: { page?: number; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.page) query.set('page', String(params.page));
    if (params?.limit) query.set('limit', String(params.limit));
    const suffix = query.toString() ? `?${query.toString()}` : '';

    return request<{ items: Post[]; page: number; limit: number; total: number; totalPages: number }>(`/api/admin/posts${suffix}`);
  },

  createPost: (payload: PostPayload) =>
    request<{ item: Post }>('/api/admin/posts', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updatePost: (id: string, payload: Partial<PostPayload>) =>
    request<{ item: Post }>(`/api/admin/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  deletePost: (id: string) =>
    request<{ ok: boolean }>(`/api/admin/posts/${id}`, {
      method: 'DELETE',
    }),

  uploadImage: async (file: File) => {
    const fileBase64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const value = String(reader.result || '');
        resolve(value.split(',')[1] || '');
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    return request<{ item: { url: string; pathname: string } }>('/api/admin/upload', {
      method: 'POST',
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type || 'application/octet-stream',
        base64: fileBase64,
      }),
    });
  },
};
