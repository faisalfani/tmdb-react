import { useQuery } from '@tanstack/react-query';
import { detailsService } from '@/modules/details/services';
import type { MediaType } from '@/modules/shared/types';

export const useMediaDetails = (type: MediaType, id: number | null, enabled = true) => {
  return useQuery({
    queryKey: ['details', type, id],
    queryFn: () => (id ? detailsService.getMediaDetails(type, id) : null),
    enabled: Boolean(id) && enabled,
  });
};
