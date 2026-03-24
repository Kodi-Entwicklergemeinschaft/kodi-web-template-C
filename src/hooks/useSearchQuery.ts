import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { IHiglightsDetailsSections } from '../types/listing';
import { ApiRoutes, queryKeys } from '../utilities/routes';

const useSearchQueryData = () => {
  const mutateSearchedQuery = useMutation({
    mutationKey: [queryKeys.SEARCH_LISTING],
    mutationFn: async (searchQuery: string): Promise<IHiglightsDetailsSections> => {
      return await axiosInstance.get(ApiRoutes.SEARCH_LISTING, {
        params: {
          searchQuery,
        },
      });
    },
  });
  return { mutateSearchedQuery };
};

export default useSearchQueryData;
