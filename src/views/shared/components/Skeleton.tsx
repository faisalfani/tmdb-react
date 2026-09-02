import type { HTMLAttributes } from 'react';

export function Skeleton({ className = '', ...restProps }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`bg-neutral-800/80 animate-pulse rounded ${className}`}
      {...restProps}
    />
  );
}

export function MediaCardSkeleton() {
  return (
    <div className="flex-shrink-0 w-36 sm:w-44 md:w-52 rounded-lg overflow-hidden bg-neutral-900/60 animate-pulse border border-neutral-800/50">
      <div className="aspect-[2/3] bg-neutral-800" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  );
}

export function HeroBannerSkeleton() {
  return (
    <div className="relative w-full h-[65vh] md:h-[80vh] min-h-[480px] bg-neutral-900 animate-pulse flex items-end p-6 md:p-16">
      <div className="space-y-4 max-w-2xl w-full">
        <Skeleton className="h-10 md:h-14 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-3 pt-4">
          <Skeleton className="h-11 w-32 rounded-md" />
          <Skeleton className="h-11 w-36 rounded-md" />
        </div>
      </div>
    </div>
  );
}
