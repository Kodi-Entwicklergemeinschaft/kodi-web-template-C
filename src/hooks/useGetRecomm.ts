import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./useListings";
import axiosInstance from "../axiosConfig";
import { ApiRoutes } from "../utilities/routes";
import { IHiglightsDetailsSections } from "../types/listing";
export const getRecomm = () => {
    const { data, isLoading } = useQuery({
        queryKey: [queryKeys.GET_RECOMMENDATION],
        queryFn: async (): Promise<IHiglightsDetailsSections> => {
            return await axiosInstance.get(ApiRoutes.GET_RECOMMEND);
        },
    });
    return { listingDetails: data?.data ?? [], isLoading };
}