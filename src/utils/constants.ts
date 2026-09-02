export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const DEFAULT_PLACEHOLDER_POSTER = 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop';
export const DEFAULT_PLACEHOLDER_BACKDROP = 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=1280&auto=format&fit=crop';

export const getImageUrl = (
  path: string | null | undefined,
  size: string = 'w500',
  fallback: string = DEFAULT_PLACEHOLDER_POSTER
): string => {
  if (!path) return fallback;
  if (path.startsWith('http')) return path;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};
