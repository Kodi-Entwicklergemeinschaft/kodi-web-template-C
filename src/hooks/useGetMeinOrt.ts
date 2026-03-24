import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { Municipality, MeinOrtApiResponse } from "../types/virtualtownhall";

const useGetMeinOrtData = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [queryKeys.Get_Mein_Ort],
    queryFn: async (): Promise<MeinOrtApiResponse> => {
      return await axiosInstance.get(ApiRoutes.Mein_Ort);
    },
  });

  return {
    MeinOrtList: data?.data ?? ([] as Municipality[]),
    isLoading,
    isError,
    error,
  };
};

export default useGetMeinOrtData;
