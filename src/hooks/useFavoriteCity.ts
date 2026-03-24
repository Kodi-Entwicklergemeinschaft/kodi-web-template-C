import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import axiosInstance from '../axiosConfig';
import { STORAGE_KEYS } from '../utilities/constants';
import { getTokenValues } from './useAuth';

const useFavoriteCities = () => {
  const queryClient = useQueryClient();
  const { isTokeExpired } = getTokenValues(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? '');
  const isuserLoggedIn = !isTokeExpired;
  const markEventFavoriteMutation = useMutation({
    mutationKey: [queryKeys.MARK_CITY_FAVORITE],
    mutationFn: async ({ userId, cityId }: { userId:string, cityId:string }) => {
      return axiosInstance.post(ApiRoutes.MARK_CITY_FAVORITE(userId), {
        cityId
      });
    },
    onSuccess: (data, { categoryId }) => {
      queryClient.invalidateQueries(queryKeys.GET_LISTINGS);
    }
  });
  const deleteEventFavoriteMutation = useMutation({
    mutationKey: [queryKeys.DELETE_CITY_FAVORITE],
    mutationFn: async ({ userId, cityId }: { userId: string, cityId: string}) => {
      return axiosInstance.delete(ApiRoutes.DELETE_CITY_FAVORITE(userId, cityId));
    },
    onSuccess: (data, { categoryId }) => {
      queryClient.invalidateQueries(queryKeys.GET_LISTINGS);
    }
  });

  return { markEventFavoriteMutation, deleteEventFavoriteMutation, isuserLoggedIn };
};
export default useFavoriteCities;
