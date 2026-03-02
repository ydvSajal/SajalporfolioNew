const PRIVATE_BLOB_URL_REGEX = /\.private\.blob\.vercel-storage\.com\//i;
const BLOB_PROXY_PREFIX = '/api/blob?url=';

export const toRenderableMediaUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith(BLOB_PROXY_PREFIX)) return url;
  if (!PRIVATE_BLOB_URL_REGEX.test(url)) return url;
  return `/api/blob?url=${encodeURIComponent(url)}`;
};

export const toStorableMediaUrl = (url?: string) => {
  if (!url) return '';
  if (!url.startsWith(BLOB_PROXY_PREFIX)) return url;
  const encoded = url.slice(BLOB_PROXY_PREFIX.length);
  try {
    return decodeURIComponent(encoded);
  } catch {
    return url;
  }
};
