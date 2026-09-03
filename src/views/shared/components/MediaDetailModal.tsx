import { useCallback, useEffect, useMemo, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ArrowLeft, Check, Clock, Film, Play, Plus, X } from 'lucide-react';
import { useMediaDetails } from '@/modules/details/queries';
import type { MediaItem } from '@/modules/shared/types';
import { useToggleWatchlist } from '@/modules/watchlist/mutations';
import { useWatchlistMovies } from '@/modules/watchlist/queries';
import { Button } from '@/views/shared/components/Button';
import { ImageWithFallback } from '@/views/shared/components/ImageWithFallback';
import { RatingBadge } from '@/views/shared/components/RatingBadge';
import { MediaDetailModalSkeleton } from '@/views/shared/components/Skeleton';
import { getImageUrl } from '@/utils/constants';
import { formatReleaseYear, getMediaTitle } from '@/utils/formatters';

interface MediaDetailModalProps {
  media: MediaItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MediaDetailModal({ media, isOpen, onClose }: MediaDetailModalProps) {
  const [isPlayingTrailer, setIsPlayingTrailer] = useState(false);

  const mediaType = media?.media_type || 'movie';
  const mediaId = media?.id ?? null;

  const { data: detail, isLoading } = useMediaDetails(mediaType, mediaId, isOpen);
  const { data: watchlistMovies } = useWatchlistMovies();
  const { mutate: onToggleWatchlist, isPending: isTogglePending } = useToggleWatchlist();

  const isSaved = useMemo(() => {
    return Boolean(mediaId && watchlistMovies?.some((item) => item.id === mediaId));
  }, [mediaId, watchlistMovies]);

  useEffect(() => {
    setIsPlayingTrailer(false);
  }, [mediaId, isOpen]);

  const title = media ? getMediaTitle(media) : '';
  const year = media ? formatReleaseYear(media.release_date || media.first_air_date) : '';
  const backdropUrl = getImageUrl(media?.backdrop_path || media?.poster_path, 'original');

  const trailer = useMemo(() => {
    const videos = detail?.videos?.results || [];
    return (
      videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ||
      videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ||
      videos.find((v) => v.site === 'YouTube')
    );
  }, [detail]);

  const cast = useMemo(() => {
    return (detail?.credits?.cast || []).slice(0, 6);
  }, [detail]);

  const handleToggleWatchlist = useCallback(() => {
    if (!media) return;
    onToggleWatchlist({
      media_type: mediaType,
      media_id: media.id,
      watchlist: !isSaved,
    });
  }, [media, mediaType, isSaved, onToggleWatchlist]);

  if (!media) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto">
        <DialogPanel
          transition
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-800 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 my-auto"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-2 rounded-full bg-neutral-950/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition cursor-pointer border border-neutral-700/60"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <div className="relative aspect-[16/10] sm:aspect-video w-full bg-neutral-950 overflow-hidden">
            {isPlayingTrailer && trailer ? (
              <div className="relative w-full h-full">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ArrowLeft className="w-3.5 h-3.5" />}
                  onClick={() => setIsPlayingTrailer(false)}
                  className="absolute top-3 left-3 sm:top-4 sm:left-4 z-30 rounded-full text-xs"
                >
                  Poster
                </Button>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0`}
                  title={`${title} Trailer`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <>
                <ImageWithFallback
                  src={backdropUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-neutral-900/10" />

                <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-2 min-w-0">
                    <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight drop-shadow-md line-clamp-2">
                      {title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-neutral-300">
                      {year && <span className="font-semibold text-white">{year}</span>}
                      {media.vote_average > 0 && (
                        <RatingBadge rating={media.vote_average} size="sm" />
                      )}
                      {detail?.runtime ? (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {detail.runtime}m
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 pt-1 sm:pt-0">
                    {trailer && (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={<Play className="w-3.5 h-3.5 fill-red-600 text-red-600" />}
                        onClick={() => setIsPlayingTrailer(true)}
                        className="shadow-xl text-xs sm:text-sm"
                      >
                        Trailer
                      </Button>
                    )}

                    <Button
                      variant={isSaved ? 'danger' : 'secondary'}
                      size="sm"
                      icon={isSaved ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      onClick={handleToggleWatchlist}
                      disabled={isTogglePending}
                      className="shadow-xl text-xs sm:text-sm"
                    >
                      {isSaved ? 'In Watchlist' : 'Watchlist'}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="p-4 sm:p-6 md:p-8 space-y-5 sm:space-y-6">
            {isLoading ? (
              <MediaDetailModalSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                <div className="md:col-span-2 space-y-4">
                  {detail?.tagline && (
                    <p className="text-xs sm:text-sm italic text-neutral-400 font-medium border-l-2 border-red-600 pl-3">
                      &ldquo;{detail.tagline}&rdquo;
                    </p>
                  )}

                  {detail?.genres && detail.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {detail.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-medium bg-neutral-800/80 text-neutral-200 border border-neutral-700/60"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1.5 sm:space-y-2 pt-1 sm:pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Overview
                    </h3>
                    <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed">
                      {detail?.overview || media.overview || 'No synopsis available.'}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" />
                    <span>Top Cast</span>
                  </h3>

                  {cast.length > 0 ? (
                    <div className="space-y-2 sm:space-y-2.5">
                      {cast.map((actor) => (
                        <div key={actor.id} className="flex items-center gap-2.5 sm:gap-3 group">
                          <ImageWithFallback
                            src={getImageUrl(actor.profile_path, 'w185')}
                            alt={actor.name}
                            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover shrink-0 border border-neutral-700 bg-neutral-800"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
                              {actor.name}
                            </p>
                            <p className="text-[10px] sm:text-[11px] text-neutral-400 truncate">
                              {actor.character}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500">No cast information available.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default MediaDetailModal;
