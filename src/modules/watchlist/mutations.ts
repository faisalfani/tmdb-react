import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAccountDetails } from '@/modules/watchlist/queries';
import { watchlistService } from '@/modules/watchlist/services';
import type { ToggleWatchlistPayload } from '@/modules/watchlist/types';

export const useToggleWatchlist = () => {
  const queryClient = useQueryClient();
  const { data: account } = useAccountDetails();

  return useMutation({
    mutationFn: (payload: ToggleWatchlistPayload) => {
      if (!account?.id) throw new Error('Account ID not loaded');
      return watchlistService.toggleWatchlist(account.id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['watchlist'] });
    },
  });
};
