import { usePopularTvShows, useTopRatedTvShows } from '@/modules/tv/queries';
import type { MediaItem } from '@/modules/shared/types';
import { HeroTvBanner } from '@/views/tv/HeroTvBanner';
import { MediaCarousel } from '@/views/shared/components/MediaCarousel';

interface TvShowsViewProps {
  onMediaSelect?: (media: MediaItem) => void;
}

export function TvShowsView({ onMediaSelect }: TvShowsViewProps) {
  const { data: popular, isLoading: popularLoading } = usePopularTvShows();
  const { data: topRated, isLoading: topRatedLoading } = useTopRatedTvShows();

  return (
    <div className="space-y-2 sm:space-y-4 pb-16">
      <HeroTvBanner onPlay={onMediaSelect} />

      <div className="-mt-4 sm:-mt-10 md:-mt-16 relative z-20 space-y-4 sm:space-y-6">
        <MediaCarousel
          title="Popular TV Shows"
          items={popular}
          isLoading={popularLoading}
          onItemClick={onMediaSelect}
        />
        <MediaCarousel
          title="Top Rated TV Shows"
          items={topRated}
          isLoading={topRatedLoading}
          onItemClick={onMediaSelect}
        />
      </div>
    </div>
  );
}

export default TvShowsView;
