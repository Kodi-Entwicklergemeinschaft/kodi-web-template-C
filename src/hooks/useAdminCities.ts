import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';

const useAdminCities = () => {
  const { data } = useQuery({
    queryKey: [queryKeys.GET_ADMIN_CITIES],
    queryFn: async () => {
      return await axiosInstance.get(ApiRoutes.GET_CITIES_FOR_CITY_ADMIN);
    },
  });
  return { cityList: data?.data ?? [] };
};

export default useAdminCities;
