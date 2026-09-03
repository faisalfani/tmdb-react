import { useTrendingHero } from '@/modules/movies/queries';
import type { MediaItem } from '@/modules/shared/types';
import { HeroBanner } from '@/views/shared/components/HeroBanner';

interface HeroMovieBannerProps {
  onPlay?: (media: MediaItem) => void;
}

export function HeroMovieBanner({ onPlay }: HeroMovieBannerProps) {
  const { data: movies, isLoading } = useTrendingHero();

  return (
    <HeroBanner
      media={movies?.[0]}
      isLoading={isLoading}
      onPlay={onPlay}
    />
  );
}
