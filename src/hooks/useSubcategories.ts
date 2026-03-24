import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';

interface ISubcategory {
  id: string;
  name: string;
  // Add other subcategory properties as needed
}

const useSubcategories = (categoryId: string | null) => {
  const { data } = useQuery({
    queryKey: [ queryKeys.SUBCATEGORIES, categoryId],
    queryFn: async (): Promise<ISubcategory[]> => {
      if (!categoryId) return [];
      const response = await axiosInstance.get(
        `${ApiRoutes.ALL_CATEGORES}/${categoryId}/subcategories`
      );
      return response.data;
    },
    enabled: !!categoryId,
  });

  return { subcategories: data ?? [] };
};

export default useSubcategories;
