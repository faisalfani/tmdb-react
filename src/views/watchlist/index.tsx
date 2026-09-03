import { useMemo } from 'react';
import { Bookmark, Film } from 'lucide-react';
import { useWatchlistMovies } from '@/modules/watchlist/queries';
import type { MediaItem } from '@/modules/shared/types';
import { Button } from '@/views/shared/components/Button';
import { MediaCard } from '@/views/shared/components/MediaCard';
import { MediaCardSkeleton } from '@/views/shared/components/Skeleton';
import { Link } from 'react-router-dom';

interface WatchlistViewProps {
  onMediaSelect?: (media: MediaItem) => void;
}

export function WatchlistView({ onMediaSelect }: WatchlistViewProps) {
  const { data: movies, isLoading } = useWatchlistMovies();

  const count = useMemo(() => movies?.length ?? 0, [movies]);

  return (
    <div className="pt-20 sm:pt-24 md:pt-32 px-4 md:px-12 max-w-7xl mx-auto space-y-6 sm:space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-5 sm:pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-2.5 rounded-xl bg-red-600/10 border border-red-600/20 text-red-600 shrink-0">
            <Bookmark className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
              My Watchlist
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
              Saved movies synced directly with your TMDB account
            </p>
          </div>
        </div>

        {count > 0 && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-semibold bg-neutral-800 text-neutral-200 border border-neutral-700/60">
            {count} {count === 1 ? 'Movie' : 'Movies'}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <MediaCardSkeleton key={i} className="w-full" />
          ))}
        </div>
      ) : count === 0 ? (
        <div className="py-16 sm:py-20 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto px-4">
          <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-500">
            <Film className="w-8 h-8 sm:w-10 sm:h-10" />
          </div>
          <div className="space-y-1">
            <h2 className="text-base sm:text-lg font-semibold text-white">Your watchlist is empty</h2>
            <p className="text-xs sm:text-sm text-neutral-400">
              Browse the catalog and add movies you want to watch later.
            </p>
          </div>
          <Link to="/">
            <Button variant="primary" size="md">
              Explore Movies
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
          {movies?.map((movie) => (
            <MediaCard
              key={movie.id}
              item={movie}
              onClick={onMediaSelect}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WatchlistView;
