import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { MobilityServiceResponse, MobilityService } from "../types/mobility";

const useGetMobility = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.GET_Mobility],
    queryFn: async (): Promise<MobilityServiceResponse> => {
      return await axiosInstance.get(ApiRoutes.GET_MOBILITY_SERVICE);
    },
  });

  return {
    MobilityDetails: (data?.data ?? {}) as MobilityService,
    isLoading,
    isError,
    error,
  };
};

export default useGetMobility;
