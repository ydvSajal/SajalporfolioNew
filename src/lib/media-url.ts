const PRIVATE_BLOB_URL_REGEX = /\.private\.blob\.vercel-storage\.com\//i;

export const toRenderableMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('/api/blob?url=')) return url;
  if (!PRIVATE_BLOB_URL_REGEX.test(url)) return url;
  return `/api/blob?url=${encodeURIComponent(url)}`;
};
