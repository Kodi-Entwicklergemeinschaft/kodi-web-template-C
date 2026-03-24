import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
import { STORAGE_KEYS, KUSEL_COORDINATES } from '../utilities/constants';



const isV2Backend = true;

export const queryKeys = {
  ALL_LISTINGS: 'allListings',
  MY_LISTINGS: 'myListings',
  LISTINGS_BY_ID: 'listingsById',
  SEARCH_LISTINGS: 'searchListings',
  LISTINGS_COUNT: 'listingsCount',
  RECOMMENDATION: 'recommendation',
  GET_RECOMMENDATION: 'getRecommendation',
};
const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
export const useAllListings = () =>
  useQuery({
    queryKey: [queryKeys.ALL_LISTINGS],
    queryFn: async () => (await axiosInstance.get(`/listings`)).data,
  });

export const useListings = (params: any) =>
  useQuery({
    queryKey: [queryKeys.ALL_LISTINGS, params],
    queryFn: async () => {
      params.showExternalListings = 'true';
      return (await axiosInstance.get(`/listings`, { params })).data;
    },
    enabled: !!params,
  });

export const useMyListings = (params: any) =>
  useQuery({
    queryKey: [queryKeys.MY_LISTINGS, params],
    queryFn: async () => {
      params.showExternalListings = 'true';
      return (await axiosInstance.get(`/users/myListings`, { params })).data;
    },
    enabled: !!params,
  });

export const useListingsById = (cityId: string, listingsId: string) =>
  useQuery({
    queryKey: [queryKeys.LISTINGS_BY_ID, listingsId],
    queryFn: async () =>
      (
        await axiosInstance.get(
          isV2Backend
            ? `/listings/${listingsId}`
            : `/cities/${cityId}/listings/${listingsId}`
        )
      ).data,
    enabled: !!listingsId,
    cacheTime: 0,
    staleTime: 0, // 👈 Default, but ensures no stale data is used
    keepPreviousData: false, // 👈 Default, but ensures no old data lingers
  });

export const useSearchListings = (params: any) =>
  useQuery({
    queryKey: [queryKeys.SEARCH_LISTINGS, params],
    queryFn: async () =>
      (await axiosInstance.get(`/listings/search`, { params })).data,
    enabled: !!params,
  });

export const useListingsCount = () =>
  useQuery({
    queryKey: [queryKeys.LISTINGS_COUNT],
    queryFn: async () => (await axiosInstance.get(`/categories/listingsCount`)).data,
  });

export const usePostListing = () =>
  useMutation({
    mutationFn: async (newData: any) =>
      (await axiosInstance.post(`/listings`, newData)).data,
  });

export const useUpdateListing = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingsId,
      newData,
    }: {
      cityId: string;
      listingsId: string;
      newData: any;
    }) =>
      (
        await axiosInstance.patch(
          isV2Backend
            ? `/listings/${listingsId}`
            : `/cities/${cityId}/listings/${listingsId}`,
          newData
        )
      ).data,
  });

export const useDeleteListing = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingsId,
    }: {
      cityId: string;
      listingsId: string;
    }) =>
      (
        await axiosInstance.delete(
          isV2Backend
            ? `/listings/${listingsId}`
            : `/cities/${cityId}/listings/${listingsId}`
        )
      ).data,
  });

export const useUploadListingImage = () =>
  useMutation({
    mutationFn: async ({

      cityId,
      listingsId,
      formData,
    }: {
      formData: FormData;
      cityId: string;
      listingsId: string;
    }) =>
      (
        await axiosInstance.post(

          `/listings/${listingsId}/imageUpload`,

          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      ).data,
  });

export const useUploadListingPDF = () =>
  useMutation({
    mutationFn: async ({
      formData,
      cityId,
      listingsId,
    }: {
      formData: FormData;
      cityId: string;
      listingsId: string;
    }) =>
      (
        await axiosInstance.post(
          isV2Backend
            ? `/listings/${listingsId}/pdfUpload`
            : `/cities/${cityId}/listings/${listingsId}/pdfUpload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        )
      ).data,
  });

export const useDeleteListingImage = () =>
  useMutation({
    mutationFn: async ({
      cityId,
      listingsId,
    }: {
      cityId: string;
      listingsId: string;
    }) =>
      (
        await axiosInstance.delete(
          isV2Backend
            ? `/listings/${listingsId}/imageDelete`
            : `/cities/${cityId}/listings/${listingsId}/imageDelete`
        )
      ).data,
  });

export const useUploadUserPDF = () =>
  useMutation({

    mutationFn: async (formData: FormData) =>
      (
        await axiosInstance.post(`/users/${userId}/pdfUpload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      ).data,
  });

export const getRecommendation = (pageSize: Number) => {
  const params = {
    centerLatitude: KUSEL_COORDINATES.lat,
    centerLongitude: KUSEL_COORDINATES.lng,
    radius: KUSEL_COORDINATES.radius,
    pageSize: pageSize
  }
  useQuery({
    queryKey: [queryKeys.RECOMMENDATION, params],
    queryFn: async () => {
      return (await axiosInstance.get(`/listings`, { params })).data;
    },
    enabled: !!params,
  })
}