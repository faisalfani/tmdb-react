import { useSearchParams } from 'react-router-dom';
import { useSearchMulti } from '@/modules/search/queries';
import type { MediaItem } from '@/modules/shared/types';
import { MediaCard } from '@/views/shared/components/MediaCard';
import { Pagination } from '@/views/shared/components/Pagination';
import { MediaCardSkeleton } from '@/views/shared/components/Skeleton';

interface SearchViewProps {
  onMediaSelect?: (media: MediaItem) => void;
}

export function SearchView({ onMediaSelect }: SearchViewProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const page = Number(searchParams.get('page') ?? 1);

  const { data, isLoading, isFetching } = useSearchMulti(query, page);

  const results = data?.results ?? [];
  const totalResults = data?.totalResults ?? 0;

  const isShowSkeleton = (isLoading || isFetching) && query.length > 1;
  const isShowEmpty = !isShowSkeleton && query.length > 1 && results.length === 0;
  const isShowResults = !isShowSkeleton && results.length > 0;

  const goToPage = (next: number) => {
    setSearchParams({ q: query, page: String(next) }, { replace: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-24 md:pt-32 px-4 md:px-12 max-w-7xl mx-auto pb-16 space-y-6">
      {query.length > 1 && (
        <div className="space-y-4">
          {isShowResults && (
            <p className="text-sm text-neutral-400">
              {totalResults.toLocaleString()} result{totalResults !== 1 ? 's' : ''} for{' '}
              <span className="text-white font-medium">"{query}"</span>
            </p>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {isShowSkeleton &&
              Array.from({ length: 10 }).map((_, i) => <MediaCardSkeleton key={i} />)}

            {isShowResults &&
              results.map((item) => (
                <MediaCard key={item.id} item={item} onClick={onMediaSelect} />
              ))}
          </div>

          {isShowEmpty && (
            <div className="py-20 text-center space-y-2">
              <p className="text-neutral-300 font-medium">No results found</p>
              <p className="text-sm text-neutral-500">
                Try a different keyword or check your spelling.
              </p>
            </div>
          )}

          {isShowResults && (
            <Pagination
              currentPage={page}
              totalData={totalResults}
              onPageChange={goToPage}
              pageLimit={20}
            />
          )}
        </div>
      )}

      {!query && (
        <div className="py-16 text-center text-neutral-500 text-sm">
          Start typing to search...
        </div>
      )}
    </div>
  );
}

export default SearchView;
