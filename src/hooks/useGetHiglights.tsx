import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { IHiglightsDetailsSections } from '../types/listing';
import { ApiRoutes, queryKeys } from '../utilities/routes';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { KUSEL_COORDINATES } from '../utilities/constants';
import { STORAGE_KEYS } from '../utilities/constants';
const RADIUS = 20;

const useGetListingsWithCategories = ({ categoryId, pageSize, cityId, startAfterDate, endBeforeDate, isLocationEnabled, sortByStartDate, isKuselLoc }: { categoryId?: string, pageSize?: number, cityId?: string, startAfterDate?: string, endBeforeDate?: string, isLocationEnabled?: boolean, sortByStartDate?: boolean, isKuselLoc?:boolean }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(KUSEL_COORDINATES);

    const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);

  const { data, isLoading} = useQuery({
    queryKey: [queryKeys.GET_LISTINGS, categoryId, pageSize, cityId,
      startAfterDate,
      endBeforeDate, isLocationEnabled],
    queryFn: async (): Promise<IHiglightsDetailsSections> => {

       if (categoryId === 'favorites' && userId) {
        return await axiosInstance.get(ApiRoutes.GET_USER_FAVORITES(userId));
      }

      return await axiosInstance.get(ApiRoutes.LISTINGS, {
        params: {
          categoryId,
          pageSize,
          cityId,
          startAfterDate: startAfterDate && DateTime.fromISO(startAfterDate).toFormat("yyyy-MM-dd"),
          endBeforeDate: endBeforeDate && DateTime.fromISO(endBeforeDate).toFormat("yyyy-MM-dd"),
          centerLatitude: isLocationEnabled ? location?.lat : undefined,
          centerLongitude: isLocationEnabled ? location?.lng : undefined,
          radius: isLocationEnabled ? RADIUS : undefined,
          sortByStartDate
        },
      });
    },
  });


  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(KUSEL_COORDINATES);
    }
    if(isKuselLoc) return;
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
    )
  }, [])
  return { listingDetails: data?.data ?? [], location , isLoading };
};

export default useGetListingsWithCategories;
