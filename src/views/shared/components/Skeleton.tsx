import type { HTMLAttributes } from 'react';

export function Skeleton({ className = '', ...restProps }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-neutral-800/80 animate-pulse rounded ${className}`}
      {...restProps}
    />
  );
}

export function MediaCardSkeleton({ className = 'w-32 sm:w-40 md:w-48 lg:w-52' }: { className?: string }) {
  return (
    <div className={`flex-shrink-0 rounded-xl overflow-hidden bg-neutral-900/60 animate-pulse border border-neutral-800/50 ${className}`}>
      <div className="aspect-[2/3] w-full bg-neutral-800" />
      <div className="p-2.5 sm:p-3 space-y-2">
        <Skeleton className="h-3.5 sm:h-4 w-3/4" />
        <Skeleton className="h-2.5 sm:h-3 w-1/2" />
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[55vh] sm:h-[65vh] md:h-[75vh] min-h-[420px] sm:min-h-[480px] bg-neutral-900 animate-pulse flex items-end p-4 sm:p-8 md:p-16">
      <div className="space-y-3 sm:space-y-4 max-w-2xl w-full">
        <Skeleton className="h-8 sm:h-12 md:h-14 w-3/4" />
        <Skeleton className="h-3.5 sm:h-4 w-full" />
        <Skeleton className="h-3.5 sm:h-4 w-4/5" />
        <div className="flex gap-2.5 sm:gap-3 pt-2 sm:pt-4">
          <Skeleton className="h-10 sm:h-11 w-28 sm:w-32 rounded-lg" />
          <Skeleton className="h-10 sm:h-11 w-32 sm:w-36 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function MediaDetailModalSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
      <div className="md:col-span-2 space-y-4">
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
        <div className="space-y-2 pt-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-full shrink-0" />
              <div className="space-y-1 w-full">
                <Skeleton className="h-3.5 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
