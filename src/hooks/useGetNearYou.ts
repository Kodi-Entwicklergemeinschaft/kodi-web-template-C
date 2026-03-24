import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { STORAGE_KEYS } from '../utilities/constants';
import { IUserDetailsResponse } from '../types/user';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import { useEffect, useState } from 'react';

const useGetUserDetails = () => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const { data, isPending } = useQuery({
    queryKey: [queryKeys.USER_DETAILS, userId],
    queryFn: async (): Promise<IUserDetailsResponse> => {
      return await axiosInstance.get(ApiRoutes.USERS);
    },
    enabled: !!userId,
  });
  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
      },
      (err) => {
        return;
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);
  return { userData: data?.data, loading: isPending };
};

export default useGetUserDetails;
