import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { MunicipalityApiResponse } from "../types/virtualtownhall";
import { Municipality } from "../types/virtualtownhall";

const useGetMunicipalById = (id: string) => {
    const { data } = useQuery({
        queryKey: [queryKeys.GET_MUNICIPAL_BY_ID, id],
        queryFn: async (): Promise<MunicipalityApiResponse> => {
          return await axiosInstance.get(ApiRoutes.MuNICIPAL_BY_ID(id));
        },
      });
      return { MunicipalList: data?.data ?? {} as Municipality };
}

export default useGetMunicipalById;
