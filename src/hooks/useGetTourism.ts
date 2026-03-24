import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { TourismServiceResponse } from "../types/tourism";
import { TourismService } from "../types/tourism";

const useGetTourism = () => {
    const { data } = useQuery({
        queryKey: [queryKeys.GET_Tourism],
        queryFn: async (): Promise<TourismServiceResponse> => {
          return await axiosInstance.get(ApiRoutes.GET_TOURISM_SERVICE);
        },
      });
      return { TourismDetails: data?.data ?? {} as TourismService };
}

export default useGetTourism;
