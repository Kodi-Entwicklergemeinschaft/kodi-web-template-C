import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { CityApiResponse } from "../types/virtualtownhall";
import { City } from "../types/virtualtownhall";

const useGetFavoriteCities = (id: string) => {
    const { data , isLoading } = useQuery({
        queryKey: [queryKeys.GET_FAV_CITIES, id],
        queryFn: async (): Promise<CityApiResponse> => {
          return await axiosInstance.get(ApiRoutes.FAVORITES_CITIES(id));
        },
      });
      return { CityList: data?.data ?? [] as City[] , isLoading };
}

export default useGetFavoriteCities;
