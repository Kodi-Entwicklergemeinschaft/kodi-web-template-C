import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import { ICategoriesDetailsResponse } from '../types/categories';

const useCategories = () => {
  const { data } = useQuery({
    queryKey: [queryKeys.ALL_CATEGORIES],
    queryFn: async (): Promise<ICategoriesDetailsResponse> => {
      return await axiosInstance.get(ApiRoutes.ALL_CATEGORES);
    },
  });
  return { categoriesDetails: data?.data ?? [] };
};

export default useCategories;
