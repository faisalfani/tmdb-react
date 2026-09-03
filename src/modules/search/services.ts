import { apiClient } from '@/lib/api-client';
import { TMDB_ENDPOINTS } from '@/modules/shared/endpoints';
import type { MediaItem, TMDBResponse } from '@/modules/shared/types';

export interface SearchResult {
  results: MediaItem[];
  totalPages: number;
  totalResults: number;
  page: number;
}

export const searchService = {
  searchMulti: async (query: string, page = 1): Promise<SearchResult> => {
    if (!query || query.trim() === '') {
      return { results: [], totalPages: 0, totalResults: 0, page: 1 };
    }
    const response = await apiClient.get<TMDBResponse<MediaItem>>(TMDB_ENDPOINTS.SEARCH.MULTI, {
      params: { query, page, include_adult: false },
    });
    return {
      results: response.data.results.filter(
        (item) =>
          (item.media_type === 'movie' || item.media_type === 'tv') &&
          (item.poster_path || item.backdrop_path)
      ),
      totalPages: Math.min(response.data.total_pages, 500),
      totalResults: response.data.total_results,
      page: response.data.page,
    };
  },
};
