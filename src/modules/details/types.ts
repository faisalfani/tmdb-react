import type { Genre, MediaItem } from '@/modules/shared/types';

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface VideoItem {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface MediaDetail extends MediaItem {
  tagline?: string;
  runtime?: number;
  genres: Genre[];
  credits?: {
    cast: CastMember[];
  };
  videos?: {
    results: VideoItem[];
  };
}
