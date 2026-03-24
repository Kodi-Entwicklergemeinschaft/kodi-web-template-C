import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { ApiRoutes, queryKeys } from '../utilities/routes';

export interface IUser {
  id: number;
  username: string;
  email: string;
}

export const useGetUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.GET_USERS],
    queryFn: async (): Promise<IUser[]> => {
      const response = await axiosInstance.get(ApiRoutes.USERS_LIST);
      return response.data;
    },
  });

  return {
    userList: data ?? [],
    loading: isLoading,
  };
};
