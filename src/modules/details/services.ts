import { apiClient } from '@/lib/api-client';
import type { MediaDetail } from '@/modules/details/types';
import type { MediaType } from '@/modules/shared/types';

export const detailsService = {
  getMediaDetails: async (type: MediaType, id: number): Promise<MediaDetail> => {
    const response = await apiClient.get<MediaDetail>(`/${type}/${id}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return {
      ...response.data,
      media_type: type,
    };
  },
};
