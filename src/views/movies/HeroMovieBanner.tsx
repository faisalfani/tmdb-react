import type { ComponentProps } from 'react';
import { useTrendingHero } from '@/modules/movies/queries';
import { HeroBanner } from '@/views/shared/components/HeroBanner';

type HeroMovieBannerProps = Omit<ComponentProps<typeof HeroBanner>, 'media' | 'isLoading'>;

export function HeroMovieBanner(props: HeroMovieBannerProps) {
  const { data: movies, isLoading } = useTrendingHero();

  return (
    <HeroBanner
      media={movies?.[0]}
      isLoading={isLoading}
      {...props}
    />
  );
}
