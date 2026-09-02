import { useMemo } from 'react';
import { Info, Play } from 'lucide-react';
import type { MediaItem } from '@/modules/shared/types';
import { Button } from '@/views/shared/components/Button';
import { RatingBadge } from '@/views/shared/components/RatingBadge';
import { HeroBannerSkeleton } from '@/views/shared/components/Skeleton';
import { getImageUrl } from '@/utils/constants';
import { formatReleaseYear, getMediaTitle } from '@/utils/formatters';

export interface HeroBannerProps {
  media?: MediaItem;
  isLoading?: boolean;
  onPlay?: (media: MediaItem) => void;
  onMoreInfo?: (media: MediaItem) => void;
}

export function HeroBanner({ media, isLoading, onPlay, onMoreInfo }: HeroBannerProps) {
  const title = useMemo(() => getMediaTitle(media), [media]);
  const year = useMemo(
    () => formatReleaseYear(media?.release_date || media?.first_air_date),
    [media?.release_date, media?.first_air_date]
  );
  const backdropUrl = useMemo(
    () => getImageUrl(media?.backdrop_path, 'original'),
    [media?.backdrop_path]
  );

  if (isLoading || !media) {
    return <HeroBannerSkeleton />;
  }

  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] min-h-[480px] select-none">
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={title}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/70 to-transparent w-full md:w-3/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-end pb-12 md:pb-20 px-4 md:px-12 space-y-4">
        <div className="flex items-center gap-3">
          <RatingBadge rating={media.vote_average} size="md" />
          <span className="text-sm font-medium text-neutral-300 bg-neutral-900/60 backdrop-blur-sm px-2.5 py-1 rounded-md border border-neutral-700">
            {year}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white max-w-2xl drop-shadow-lg">
          {title}
        </h1>

        <p className="text-sm md:text-base text-neutral-300 max-w-xl line-clamp-3 leading-relaxed drop-shadow">
          {media.overview}
        </p>

        <div className="flex items-center gap-3 pt-3">
          <Button
            variant="primary"
            size="lg"
            icon={<Play className="w-5 h-5 fill-black" />}
            onClick={() => onPlay?.(media)}
          >
            Watch Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            icon={<Info className="w-5 h-5" />}
            onClick={() => onMoreInfo?.(media)}
          >
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
}
