import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { ICities } from "../types/cities";

const useCities = () => {
  const { data } = useQuery({
    queryKey: [queryKeys.GET_CITIES],
    queryFn: async (): Promise<ICities> => {
      return await axiosInstance.get(ApiRoutes.GET_CITIES);
    },
  });
  return { cityList: data?.data ?? [] };
};

export default useCities;