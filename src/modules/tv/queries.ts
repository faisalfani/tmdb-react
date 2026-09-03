import { useQuery } from '@tanstack/react-query';
import { tvService } from '@/modules/tv/services';
import type { MediaItem } from '@/modules/shared/types';

export const useTrendingTvHero = () => {
  return useQuery<MediaItem[]>({
    queryKey: ['tv', 'trending-hero'],
    queryFn: () => tvService.getTrendingTvHero(),
  });
};

export const usePopularTvShows = (page = 1) => {
  return useQuery<MediaItem[]>({
    queryKey: ['tv', 'popular', page],
    queryFn: () => tvService.getPopularTvShows(page),
  });
};

export const useTopRatedTvShows = (page = 1) => {
  return useQuery<MediaItem[]>({
    queryKey: ['tv', 'top-rated', page],
    queryFn: () => tvService.getTopRatedTvShows(page),
  });
};
