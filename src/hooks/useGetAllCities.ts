import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { CityApiResponse } from "../types/virtualtownhall";
import { City } from "../types/virtualtownhall";

const useGetAllCitiesById = (id: string) => {
    const { data } = useQuery({
        queryKey: [queryKeys.GET_CITIES_BY_ID, id],
        queryFn: async (): Promise<CityApiResponse> => {
          return await axiosInstance.get(ApiRoutes.GET_CITIES_BY_ID(id));
        },
      });
      return { CitiesList: data?.data ?? [] as City[] };
}

export default useGetAllCitiesById;
