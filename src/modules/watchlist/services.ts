import { apiClient } from '@/lib/api-client';
import type { MediaItem } from '@/modules/shared/types';
import type {
  AccountDetails,
  ToggleWatchlistPayload,
  WatchlistMoviesResponse,
  WatchlistMutationResponse,
} from '@/modules/watchlist/types';

export const watchlistService = {
  getAccountDetails: async (): Promise<AccountDetails> => {
    const response = await apiClient.get<AccountDetails>('/account');
    return response.data;
  },

  getWatchlistMovies: async (accountId: number, page = 1): Promise<MediaItem[]> => {
    const response = await apiClient.get<WatchlistMoviesResponse>(
      `/account/${accountId}/watchlist/movies`,
      {
        params: {
          page,
          sort_by: 'created_at.desc',
        },
      }
    );
    return response.data.results.map((item) => ({
      ...item,
      media_type: item.media_type || 'movie',
    }));
  },

  toggleWatchlist: async (
    accountId: number,
    payload: ToggleWatchlistPayload
  ): Promise<WatchlistMutationResponse> => {
    const response = await apiClient.post<WatchlistMutationResponse>(
      `/account/${accountId}/watchlist`,
      payload
    );
    return response.data;
  },
};
