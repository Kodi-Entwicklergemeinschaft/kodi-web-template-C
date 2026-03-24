import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { VTH } from "../types/virtualtownhall";
import { DistrictAdmin } from "../types/virtualtownhall";

const useGetVTH = () => {
    const { data , isLoading } = useQuery({
        queryKey: [queryKeys.GET_VTH],
        queryFn: async (): Promise<VTH> => {
          return await axiosInstance.get(ApiRoutes.VIRTUAL_TOWN_HALL);
        },
      });
      return { VTHList: data?.data ?? {} as DistrictAdmin , isLoading};
}

export default useGetVTH;
