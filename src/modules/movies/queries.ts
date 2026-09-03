import { useQuery } from '@tanstack/react-query';
import { moviesService } from '@/modules/movies/services';
import type { MediaItem } from '@/modules/shared/types';

export const useTrendingHero = () => {
  return useQuery<MediaItem[]>({
    queryKey: ['movies', 'trending-hero'],
    queryFn: () => moviesService.getTrendingHero(),
  });
};

export const usePopularMovies = (page = 1) => {
  return useQuery<MediaItem[]>({
    queryKey: ['movies', 'popular', page],
    queryFn: () => moviesService.getPopularMovies(page),
  });
};

export const useTopRatedMovies = (page = 1) => {
  return useQuery<MediaItem[]>({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => moviesService.getTopRatedMovies(page),
  });
};

export const useNowPlayingMovies = (page = 1) => {
  return useQuery<MediaItem[]>({
    queryKey: ['movies', 'now-playing', page],
    queryFn: () => moviesService.getNowPlayingMovies(page),
  });
};

export const useUpcomingMovies = (page = 1) => {
  return useQuery<MediaItem[]>({
    queryKey: ['movies', 'upcoming', page],
    queryFn: () => moviesService.getUpcomingMovies(page),
  });
};
