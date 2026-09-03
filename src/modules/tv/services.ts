import { apiClient } from '@/lib/api-client';
import { TMDB_ENDPOINTS } from '@/modules/shared/endpoints';
import type { MediaItem, MediaType, TMDBResponse } from '@/modules/shared/types';

export const tvService = {
  getTrendingTvHero: async (): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.TV.POPULAR);
    return response.data.results
      .filter((item) => item.backdrop_path && (item.title || item.name))
      .map((item) => ({ ...item, media_type: 'tv' as MediaType }));
  },

  getPopularTvShows: async (page = 1): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.TV.POPULAR, {
      params: { page },
    });
    return response.data.results.map((item) => ({ ...item, media_type: 'tv' as MediaType }));
  },

  getTopRatedTvShows: async (page = 1): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.TV.TOP_RATED, {
      params: { page },
    });
    return response.data.results.map((item) => ({ ...item, media_type: 'tv' as MediaType }));
  },
};
