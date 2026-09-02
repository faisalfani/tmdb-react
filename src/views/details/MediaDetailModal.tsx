import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { ArrowLeft, Clock, Film, Play, X } from 'lucide-react';
import { useMediaDetails } from '@/modules/details/queries';
import type { MediaItem } from '@/modules/shared/types';
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

  if (!media) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <DialogPanel
          transition
          className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 transition-all data-[closed]:scale-95 data-[closed]:opacity-0 my-auto"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-30 p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
            {isPlayingTrailer && trailer ? (
              <div className="relative w-full h-full">
                <Button
                  variant="secondary"
                  size="sm"
                  icon={<ArrowLeft className="w-3.5 h-3.5" />}
                  onClick={() => setIsPlayingTrailer(false)}
                  className="absolute top-4 left-4 z-30 rounded-full"
                >
                  Back to Poster
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
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div className="space-y-2 min-w-0">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-md truncate">
                      {title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-300">
                      <span className="font-semibold text-white">{year}</span>
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

                  {trailer && (
                    <Button
                      variant="primary"
                      size="md"
                      icon={<Play className="w-4 h-4 fill-red-600 text-red-600" />}
                      onClick={() => setIsPlayingTrailer(true)}
                      className="shadow-xl shrink-0"
                    >
                      Watch Trailer
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {isLoading ? (
              <MediaDetailModalSkeleton />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                  {detail?.tagline && (
                    <p className="text-sm italic text-neutral-400 font-medium border-l-2 border-red-600 pl-3">
                      &ldquo;{detail.tagline}&rdquo;
                    </p>
                  )}

                  {detail?.genres && detail.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {detail.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-3 py-1 rounded-full text-xs font-medium bg-neutral-800/80 text-neutral-200 border border-neutral-700/60"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      Overview
                    </h3>
                    <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
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
                    <div className="space-y-2.5">
                      {cast.map((actor) => (
                        <div key={actor.id} className="flex items-center gap-3 group">
                          <ImageWithFallback
                            src={getImageUrl(actor.profile_path, 'w185')}
                            alt={actor.name}
                            className="w-9 h-9 rounded-full object-cover shrink-0 border border-neutral-700 bg-neutral-800"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-neutral-200 group-hover:text-white truncate">
                              {actor.name}
                            </p>
                            <p className="text-[11px] text-neutral-400 truncate">
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
