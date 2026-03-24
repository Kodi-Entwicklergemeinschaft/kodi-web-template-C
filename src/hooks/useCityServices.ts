import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import axiosInstance from '../axiosConfig';
import { ICities, ICity } from '../types/cities';
export interface IInvitedUser {
  id: number;
  email: string;
  roleId: number;
  status: string;
  createdAt: string;
  isRegistered: boolean;
}

// Original hook remains unchanged
export const useCityServices = () => {
  const { data } = useQuery({
    queryKey: [queryKeys.GET_CITIES],
    queryFn: async (): Promise<ICities> => {
      return await axiosInstance.get(ApiRoutes.GET_CITIES_FOR_CITY_ADMIN);
    },
  });
  return { cityList: data?.data ?? [] };
};

// New hook for getting single city
export const useGetCity = (id: number) => {
  return useQuery({
    queryKey: [queryKeys.GET_CITIES, id],
    queryFn: async (): Promise<ICity> => {
      const response = await axiosInstance.get(`${ApiRoutes.GET_CITIES}/${id}`);
      return response.data;
    },
    enabled: !!id, // Only fetch when id is available
  });
};

// New hook for updating city
export const useUpdateCity = () => {
  return useMutation({
    mutationFn: async ({ id, cityData }: { id: number; cityData: FormData }) => {
      const response = await axiosInstance.patch(`${ApiRoutes.GET_CITIES}/${id}`, cityData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
  });
};

export const useGetCityAdmins = (cityId: number) => {
  return useQuery({
    queryKey: [queryKeys.GET_CITY_ADMINS, cityId],
    queryFn: async () => {
      const response = await axiosInstance.get(ApiRoutes.CITY_ADMIN(cityId));
      return response.data;
    },
    enabled: !!cityId,
  });
};

export const useAssignCityAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cityId, userId }: { cityId: number; userId: number }) => {
      const response = await axiosInstance.post(ApiRoutes.CITY_ADMIN(cityId), { userId });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_CITY_ADMINS, variables.cityId],
      });
    },
  });
};

export const useRemoveCityAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cityId, userId }: { cityId: number; userId: number }) => {
      const response = await axiosInstance.delete(ApiRoutes.CITY_ADMIN(cityId), {
        params: { userId },
      });
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_CITY_ADMINS, variables.cityId],
      });
    },
  });
};

export const useCreateCityAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ cityId, email }: { cityId: number; email: string }) => {
      const response = await axiosInstance.post(`${ApiRoutes.GET_CITIES}/${cityId}/admin/create`, {
        email,
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.GET_CITY_ADMINS, variables.cityId],
      });
    },
  });
};

export const useInviteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      roleId,
      cityIds,
      language,
    }: {
      email: string;
      roleId: number;
      cityIds: number[];
      language: string;
    }) => {
      const response = await axiosInstance.post(ApiRoutes.INVITE_USER, {
        email,
        roleId,
        cityIds,
        language,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.INVITED_USERS],
      });
    },
  });
};

export const useGetInvitedUsers = (open: boolean, cityId?: number) => {
  return useQuery({
    queryKey: [queryKeys.INVITED_USERS, cityId],
    queryFn: async (): Promise<IInvitedUser[]> => {
      const response = await axiosInstance.get(ApiRoutes.GET_INVITED_USERS, {
        params: {
          cityId,
        },
      });
      return response.data;
    },
    enabled: open && !!cityId,
  });
};

// Default export remains the original hook
export default useCityServices;
