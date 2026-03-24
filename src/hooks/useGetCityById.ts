import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { CityByIdApiResponse } from "../types/virtualtownhall";
import { City } from "../types/virtualtownhall";

const useGetCityById = (id: string) => {
    const { data ,isLoading } = useQuery({
        queryKey: [queryKeys.GET_CITY_BY_ID, id],
        queryFn: async (): Promise<CityByIdApiResponse> => {
          return await axiosInstance.get(ApiRoutes.GET_CITY_BY_ID(id));
        },
      });
      return { CityDetails: data?.data ?? {} as City , isLoading };
}

export default useGetCityById;
