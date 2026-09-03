import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { MediaItem } from '@/modules/shared/types';
import { MediaCard } from '@/views/shared/components/MediaCard';
import { MediaCardSkeleton } from '@/views/shared/components/Skeleton';

import 'swiper/css';

interface MediaCarouselProps {
  title: string;
  items?: MediaItem[];
  isLoading?: boolean;
  onItemClick?: (item: MediaItem) => void;
}

export function MediaCarousel({
  title,
  items,
  isLoading,
  onItemClick,
}: MediaCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="relative space-y-2 sm:space-y-3 px-4 md:px-12 my-4 sm:my-6 md:my-8 overflow-x-clip">
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
          <span className="w-1 h-4 sm:h-5 bg-red-600 rounded-full inline-block" />
          {title}
        </h2>

        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Previous ${title}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer border border-neutral-700/60"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Next ${title}`}
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition active:scale-95 cursor-pointer border border-neutral-700/60"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex gap-3 sm:gap-4 overflow-hidden py-3 sm:py-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <MediaCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="relative group">
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label={`Scroll ${title} left`}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 -ml-2 rounded-full bg-black/70 hover:bg-red-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hidden md:flex items-center justify-center border border-white/10 shadow-xl cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <Swiper
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={12}
            slidesPerView="auto"
            breakpoints={{
              640: { spaceBetween: 16 },
              1024: { spaceBetween: 20 },
            }}
            className="!overflow-visible py-3 sm:py-5 px-0.5"
          >
            {items?.map((item) => (
              <SwiperSlide key={item.id} className="!w-auto">
                <MediaCard
                  item={item}
                  onClick={onItemClick}
                  className="w-32 sm:w-40 md:w-48 lg:w-52"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label={`Scroll ${title} right`}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-10 sm:h-10 -mr-2 rounded-full bg-black/70 hover:bg-red-600 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 hidden md:flex items-center justify-center border border-white/10 shadow-xl cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>
      )}
    </section>
  );
}

export default MediaCarousel;
