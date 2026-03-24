import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { DiscoverServiceResponse, DiscoverService } from "../types/mitmachen";

const useGetMitchmen = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.GET_MITCHMEN],
    queryFn: async (): Promise<DiscoverServiceResponse> => {
      return await axiosInstance.get(ApiRoutes.MITCHMEN);
    },
  });

  return {
    Mitchmendata: (data?.data ?? {}) as DiscoverService,
    isLoading,
    isError,
    error,
  };
};

export default useGetMitchmen;
