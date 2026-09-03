import { useNowPlayingMovies, usePopularMovies, useTopRatedMovies } from '@/modules/movies/queries';
import type { MediaItem } from '@/modules/shared/types';
import { HeroMovieBanner } from '@/views/movies/HeroMovieBanner';
import { MediaCarousel } from '@/views/shared/components/MediaCarousel';

interface MoviesViewProps {
  onMediaSelect?: (media: MediaItem) => void;
}

export function MoviesView({ onMediaSelect }: MoviesViewProps) {
  const { data: popular, isLoading: popularLoading } = usePopularMovies();
  const { data: topRated, isLoading: topRatedLoading } = useTopRatedMovies();
  const { data: nowPlaying, isLoading: nowPlayingLoading } = useNowPlayingMovies();

  return (
    <div className="space-y-4 pb-16">
      <HeroMovieBanner onPlay={onMediaSelect} />

      <div className="-mt-16 md:-mt-24 relative z-20 space-y-6">
        <MediaCarousel
          title="Popular Movies"
          items={popular}
          isLoading={popularLoading}
          onItemClick={onMediaSelect}
        />
        <MediaCarousel
          title="Top Rated"
          items={topRated}
          isLoading={topRatedLoading}
          onItemClick={onMediaSelect}
        />
        <MediaCarousel
          title="Now Playing in Theatres"
          items={nowPlaying}
          isLoading={nowPlayingLoading}
          onItemClick={onMediaSelect}
        />
      </div>
    </div>
  );
}

export default MoviesView;
