import { Bookmark } from 'lucide-react';
import type { MediaItem } from '@/modules/shared/types';
import { useWatchlistMovies } from '@/modules/watchlist/queries';
import { ImageWithFallback } from '@/views/shared/components/ImageWithFallback';
import { RatingBadge } from '@/views/shared/components/RatingBadge';
import { getImageUrl } from '@/utils/constants';
import { formatReleaseYear, getMediaTitle } from '@/utils/formatters';

interface MediaCardProps {
  item: MediaItem;
  onClick?: (item: MediaItem) => void;
  showRating?: boolean;
  isInWatchlist?: boolean;
  className?: string;
}

export function MediaCard({
  item,
  onClick,
  showRating = true,
  isInWatchlist,
  className = '',
}: MediaCardProps) {
  const { data: watchlistMovies } = useWatchlistMovies();
  const isSaved = isInWatchlist ?? Boolean(watchlistMovies?.some((m) => m.id === item.id));

  const title = getMediaTitle(item);
  const year = formatReleaseYear(item.release_date || item.first_air_date);

  return (
    <div
      onClick={() => onClick?.(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(item);
        }
      }}
      aria-label={`View details for ${title}`}
      className={`group relative flex-shrink-0 cursor-pointer select-none rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 hover:scale-[1.03] hover:z-10 shadow-lg hover:shadow-2xl ${className}`}
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
        <ImageWithFallback
          src={getImageUrl(item.poster_path, 'w500')}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {isSaved && (
          <div
            title="In Watchlist"
            className="absolute top-2 left-2 p-1.5 rounded-lg bg-red-600/90 text-white shadow-md backdrop-blur-xs"
          >
            <Bookmark className="w-3.5 h-3.5 fill-current" />
          </div>
        )}

        {showRating && item.vote_average > 0 && (
          <div className="absolute top-2 right-2">
            <RatingBadge rating={item.vote_average} size="sm" />
          </div>
        )}
      </div>

      <div className="p-2.5 sm:p-3">
        <h3 className="font-semibold text-xs sm:text-sm text-neutral-100 truncate group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-[11px] sm:text-xs text-neutral-400 mt-0.5 sm:mt-1 font-medium">{year}</p>
      </div>
    </div>
  );
}
