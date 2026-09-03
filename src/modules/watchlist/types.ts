import type { MediaItem, TMDBResponse } from '@/modules/shared/types';

export interface AccountDetails {
  id: number;
  username: string;
  name: string;
}

export interface ToggleWatchlistPayload {
  media_type: 'movie' | 'tv';
  media_id: number;
  watchlist: boolean;
}

export interface WatchlistMutationResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export type WatchlistMoviesResponse = TMDBResponse<MediaItem>;
