import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { IInterest } from "../types/interest";

const useGetInterest = () => {
    const { data } = useQuery({
        queryKey: [queryKeys.GET_INTEREST],
        queryFn: async (): Promise<IInterest> => {
          return await axiosInstance.get(ApiRoutes.INTERESTS);
        },
      });
      return { interestList: data?.data ?? [] };
}

export default useGetInterest;
