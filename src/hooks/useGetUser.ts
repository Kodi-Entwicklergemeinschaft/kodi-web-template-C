import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { STORAGE_KEYS } from '../utilities/constants';
import { IUserDetailsResponse } from '../types/user';
import { ApiRoutes, queryKeys } from '../utilities/routes';

const useGetUserDetails = () => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const { data, isPending } = useQuery({
    queryKey: [queryKeys.USER_DETAILS, userId],
    queryFn: async (): Promise<IUserDetailsResponse> => {
      return await axiosInstance.get(ApiRoutes.USERS);
    },
    enabled: !!userId,
  });
  return { userData: data?.data, loading: isPending };
};

export default useGetUserDetails;
