import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import axiosInstance from '../axiosConfig';
import { STORAGE_KEYS } from '../utilities/constants';
import { getTokenValues } from './useAuth';

const useFavorite = () => {
  const queryClient = useQueryClient();
  // const { isTokeExpired } = getTokenValues(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) ?? '');
  // const isuserLoggedIn = !isTokeExpired;
  const isuserLoggedIn = Boolean(localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN));
  const markEventFavoriteMutation = useMutation({
    mutationKey: [queryKeys.MARK_EVENT_FAVORITE],
    mutationFn: async ({ id, listingId, cityId, categoryId }: { id: string; listingId: string, cityId: string, categoryId: string }) => {
      return axiosInstance.post(ApiRoutes.MARK_EVENT_FAVORITE(id), {
        listingId, cityId
      });
    },
    onSuccess: (data, { categoryId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_LISTINGS] });
    }
  });
  const deleteEventFavoriteMutation = useMutation({
    mutationKey: [queryKeys.DELETE_EVENT_FAVORITE],
    mutationFn: async ({ id, listingId, categoryId }: { id: string; listingId: string, categoryId: string }) => {
      return axiosInstance.delete(ApiRoutes.DELETE_EVENT_FAVORITE(id, listingId));
    },
    onSuccess: (data, { categoryId }) => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.GET_LISTINGS] });
    }
  });

  return { markEventFavoriteMutation, deleteEventFavoriteMutation, isuserLoggedIn };
};
export default useFavorite;
