import dayjs from 'dayjs';

export const formatReleaseYear = (dateString?: string): string => {
  if (!dateString) return 'N/A';
  const parsed = dayjs(dateString);
  return parsed.isValid() ? parsed.format('YYYY') : 'N/A';
};

export const formatRating = (rating?: number): string => {
  if (rating === undefined || rating === null) return '0.0';
  return rating.toFixed(1);
};

export const getMediaTitle = (item?: { title?: string; name?: string }): string => {
  if (!item) return 'Untitled';
  return item.title || item.name || 'Untitled';
};
