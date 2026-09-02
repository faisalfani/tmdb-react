import { apiClient } from '@/lib/api-client';
import { TMDB_ENDPOINTS } from '@/modules/shared/endpoints';
import type { MediaItem, MediaType, TMDBResponse } from '@/modules/shared/types';

export const moviesService = {
  getTrendingHero: async (): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.TRENDING);
    return response.data.results.filter(
      (item) => item.backdrop_path && (item.title || item.name)
    );
  },

  getPopularMovies: async (page = 1): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.MOVIES.POPULAR, {
      params: { page },
    });
    return response.data.results.map((item) => ({ ...item, media_type: 'movie' as MediaType }));
  },

  getTopRatedMovies: async (page = 1): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.MOVIES.TOP_RATED, {
      params: { page },
    });
    return response.data.results.map((item) => ({ ...item, media_type: 'movie' as MediaType }));
  },

  getNowPlayingMovies: async (page = 1): Promise<MediaItem[]> => {
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.MOVIES.NOW_PLAYING, {
      params: { page },
    });
    return response.data.results.map((item) => ({ ...item, media_type: 'movie' as MediaType }));
  },
};
