import { useQuery } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { IHiglightsDetailsSections } from "../types/listing";
import useFavorite from "./useFavorite";

const useGetAllFavorites = ({userId}: {userId: string}) => {
      const { data , isLoading } = useQuery({
        queryKey: [queryKeys.GET_ALL_Favorites, userId],
        queryFn: async (): Promise<IHiglightsDetailsSections> => {
          return await axiosInstance.get(ApiRoutes.GET_USER_FAVORITES(userId));
        },
      });
      return { listingDetails: data?.data ?? [] , isLoading };
};

export default useGetAllFavorites;
