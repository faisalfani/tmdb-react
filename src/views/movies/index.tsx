import type { MediaItem } from '@/modules/shared/types';
import { HeroMovieBanner } from '@/views/movies/HeroMovieBanner';

interface MoviesViewProps {
  onMediaSelect?: (media: MediaItem) => void;
}

export function MoviesView({ onMediaSelect }: MoviesViewProps) {
  return (
    <div className="space-y-4 pb-16">
      <HeroMovieBanner onMoreInfo={onMediaSelect} onPlay={onMediaSelect} />
    </div>
  );
}

export default MoviesView;
