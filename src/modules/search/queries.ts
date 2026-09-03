import { useQuery } from '@tanstack/react-query';
import { searchService } from '@/modules/search/services';

export const useSearchMulti = (query: string, page = 1) => {
  return useQuery({
    queryKey: ['search', 'multi', query, page],
    queryFn: () => searchService.searchMulti(query, page),
    enabled: query.trim().length > 1,
  });
};
