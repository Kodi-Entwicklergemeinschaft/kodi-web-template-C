import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../axiosConfig';
// import { getUserId } from './usersApi';
import { ApiRoutes, queryKeys } from '../utilities/routes';

// Helper function for handling API errors
const handleApiError = (error: any) => {
  return error.response?.data || new Error(error.message);
};

// User Profile Hook
export const useProfile = (userId?: string, params: any = {}) => {
  return useQuery({
    queryKey: queryKeys.PROFILE(userId, params),
    queryFn: async () => {
      try {
        // if (!userId) userId = getUserId();
        let url;
        if (params.cityId && params.cityUser) {
          url = `/users?cityUser=true&cityId=${params.cityId}`;
        } else {
          url = `/users`;
        }
        const response = await axiosInstance.get(url);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: !!userId,
  });
};

// Listings Hook
export const useListings = (params: any = {}) => {
  return useQuery({
    queryKey: queryKeys.LISTINGS(params),
    queryFn: async () => {
      try {
        params.showExternalListings = 'true';
        const response = await axiosInstance.get(ApiRoutes.LISTINGS, { params });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

// My Listings Hook
export const useMyListings = (params: any = {}) => {
  return useQuery({
    queryKey: queryKeys.MY_LISTINGS(params),
    queryFn: async () => {
      try {
        params.showExternalListings = 'true';
        const response = await axiosInstance.get(`/users/myListings`, { params });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

// Categories Hook
export const useCategories = () => {
  return useQuery({
    queryKey: queryKeys.CATEGORIES,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(ApiRoutes.ALL_CATEGORES);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

// Cities Hook
export const useCities = () => {
  return useQuery({
    queryKey: queryKeys.CITIES,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(ApiRoutes.GET_CITIES);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
  });
};

// Listing Mutations
export const useListingMutations = () => {
  const queryClient = useQueryClient();
  const isV2Backend = true;

  // Create Listing
  const createListing = useMutation({
    mutationFn: async (newListingsDataObj: any) => {
      try {
        const response = await axiosInstance.post(ApiRoutes.LISTINGS, newListingsDataObj);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.LISTINGS() });
      queryClient.invalidateQueries({ queryKey: queryKeys.MY_LISTINGS() });
    },
  });

  // Update Listing
  const updateListing = useMutation({
    mutationFn: async ({
      cityId,
      listingsId,
      data,
    }: {
      cityId?: string;
      listingsId: string;
      data: any;
    }) => {
      try {
        const url = isV2Backend
          ? `${ApiRoutes.LISTINGS}/${listingsId}`
          : `/cities/${cityId}/listings/${listingsId}`;
        const response = await axiosInstance.patch(url, data);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.LISTINGS() });
      queryClient.invalidateQueries({ queryKey: queryKeys.MY_LISTINGS() });
    },
  });

  // Delete Listing
  const deleteListing = useMutation({
    mutationFn: async ({ cityId, listingsId }: { cityId?: string; listingsId: string }) => {
      try {
        const url = isV2Backend
          ? `${ApiRoutes.LISTINGS}/${listingsId}`
          : `/cities/${cityId}/listings/${listingsId}`;
        const response = await axiosInstance.delete(url);
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.LISTINGS() });
      queryClient.invalidateQueries({ queryKey: queryKeys.MY_LISTINGS() });
    },
  });

  const updateListingStatus = useMutation({
    mutationFn: async ({ listingsId, data }: { listingsId: string; data: any }) => {
      try {
        const response = await axiosInstance.patch(
          `${ApiRoutes.LISTINGS}/${listingsId}/status`,
          data,
        );
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.LISTINGS() });
      queryClient.invalidateQueries({ queryKey: queryKeys.MY_LISTINGS() });
    },
  });

  // Upload Image
  const uploadListingImage = useMutation({
    mutationFn: async ({
      formData,
      cityId,
      listingsId,
    }: {
      formData: FormData;
      cityId?: string;
      listingsId: string;
    }) => {
      try {
        const url = isV2Backend
          ? `${ApiRoutes.LISTINGS}/${listingsId}/imageUpload`
          : `/cities/${cityId}/listings/${listingsId}/imageUpload`;
        const response = await axiosInstance.post(url, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.LISTINGS() });
    },
  });

  return { createListing, updateListing, deleteListing, uploadListingImage, updateListingStatus };
};

// Search Listings Hook
export const useSearchListings = (params: any = {}) => {
  return useQuery({
    queryKey: queryKeys.SEARCH_LISTINGS(params),
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(`${ApiRoutes.LISTINGS}/search`, { params });
        return response.data;
      } catch (error) {
        throw handleApiError(error);
      }
    },
    enabled: Object.keys(params).length > 0,
  });
};

export async function updateListingsData(
  cityId: string,
  newListingsDataObj: any,
  listingsId: string,
) {
  return axiosInstance.patch(`/listings/${listingsId}`, newListingsDataObj);
}
