import type { MediaItem } from '@/modules/shared/types';
import { ImageWithFallback } from '@/views/shared/components/ImageWithFallback';
import { RatingBadge } from '@/views/shared/components/RatingBadge';
import { getImageUrl } from '@/utils/constants';
import { formatReleaseYear, getMediaTitle } from '@/utils/formatters';

interface MediaCardProps {
  item: MediaItem;
  onClick?: (item: MediaItem) => void;
  showRating?: boolean;
}

export function MediaCard({ item, onClick, showRating = true }: MediaCardProps) {
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
      className="group relative flex-shrink-0 w-36 sm:w-44 md:w-52 cursor-pointer select-none rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800/80 hover:border-neutral-600 transition-all duration-300 hover:scale-105 hover:z-10 shadow-lg hover:shadow-2xl"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-neutral-900">
        <ImageWithFallback
          src={getImageUrl(item.poster_path, 'w500')}
          alt={title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
        />
        {showRating && (
          <div className="absolute top-2 right-2">
            <RatingBadge rating={item.vote_average} size="sm" />
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-sm text-neutral-100 truncate group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-xs text-neutral-400 mt-1 font-medium">{year}</p>
      </div>
    </div>
  );
}
