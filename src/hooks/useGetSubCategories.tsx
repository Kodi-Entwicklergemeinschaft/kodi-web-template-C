import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { useParams } from '@tanstack/react-router';
import { ICategoriesDetailsResponse } from '../types/categories';
import { ApiRoutes, APPROUTES, queryKeys } from '../utilities/routes';

const useGetSubCategories = () => {
  const { id } = useParams({ from: APPROUTES.DISCOVER_BY_ID });
  const { data } = useQuery({
    queryKey: [queryKeys.GET_SUB_CATEGORIES, id],
    queryFn: async (): Promise<ICategoriesDetailsResponse> => {
      return await axiosInstance.get(ApiRoutes.SUB_CATEGORIES_BY_ID(id));
    },
    enabled: !!id,
  });
  return { subCategoryDetails: data?.data ?? [] };
};

export default useGetSubCategories;
