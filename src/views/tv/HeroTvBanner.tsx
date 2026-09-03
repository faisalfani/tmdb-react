import { useTrendingTvHero } from '@/modules/tv/queries';
import type { MediaItem } from '@/modules/shared/types';
import { HeroBanner } from '@/views/shared/components/HeroBanner';

interface HeroTvBannerProps {
  onPlay?: (media: MediaItem) => void;
}

export function HeroTvBanner({ onPlay }: HeroTvBannerProps) {
  const { data: tvShows, isLoading } = useTrendingTvHero();

  return (
    <HeroBanner
      media={tvShows?.[0]}
      isLoading={isLoading}
      onPlay={onPlay}
    />
  );
}
