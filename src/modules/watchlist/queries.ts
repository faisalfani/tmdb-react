import { useQuery } from '@tanstack/react-query';
import { watchlistService } from '@/modules/watchlist/services';

export const useAccountDetails = () => {
  return useQuery({
    queryKey: ['account'],
    queryFn: watchlistService.getAccountDetails,
    staleTime: 1000 * 60 * 60,
  });
};

export const useWatchlistMovies = () => {
  const { data: account } = useAccountDetails();

  return useQuery({
    queryKey: ['watchlist', 'movies', account?.id],
    queryFn: () => (account ? watchlistService.getWatchlistMovies(account.id) : []),
    enabled: Boolean(account?.id),
  });
};
