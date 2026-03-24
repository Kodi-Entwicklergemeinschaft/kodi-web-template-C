import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import { ICategoriesDetailsResponse } from '../types/categories';

const useCategoryMap = () => {
    const { data } = useQuery({
      queryKey: [queryKeys.ALL_CATEGORIES_MAP],
      queryFn: async (): Promise<ICategoriesDetailsResponse> => {
        return await axiosInstance.get(ApiRoutes.ALL_CATEGORES);
      },
    });
  
    // Convert array to { [id]: name }
    const categoryMap = data?.data?.reduce((acc, category) => {
      acc[category.id] = category.name;
      return acc;
    }, {} as Record<number, string>);
  
    return { categoryMap: categoryMap ?? {} };
  };
  
  export default useCategoryMap;
  
