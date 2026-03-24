import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import { IHiglightsDetailsSections } from '../types/listing';
import { IDatum } from '../types/listing';

const useCategoriesById = (id:string) => {
  const { data } = useQuery({
    queryKey: [queryKeys.GET_CATEGORY_BY_ID, id],
    queryFn: async (): Promise<IHiglightsDetailsSections> => {
      return await axiosInstance.get(ApiRoutes.GET_CATEGORY_BY_ID(id));
    },
  });
  return { categoriesDetailsById: data?.data ?? [] };
};

export default useCategoriesById;
