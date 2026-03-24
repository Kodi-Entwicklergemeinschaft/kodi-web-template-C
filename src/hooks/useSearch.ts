import { useEffect, useRef, useState } from "react";
import { STORAGE_KEYS } from "../utilities/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiRoutes, APPROUTES, queryKeys } from "../utilities/routes";
import { IDatum, IHiglightsDetailsSections } from "../types/listing";
import axiosInstance from "../axiosConfig";
import { useRouter } from "@tanstack/react-router";
import { getRecommendationDate } from "../utilities/dateTime";

const useSearch = () => {
  const router = useRouter();
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID)
  const LOCAL_STORAGE_KEY = `${STORAGE_KEYS.SEARCH_QUERY}_${userId}`;
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isRecommendationSearched, setIsRecommendationSearched] = useState(false);
  const [ isNearbyLocation, setIsNearbyLocation] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [searchedItems, setSearchedItems] = useState<IDatum[]>([]);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { start, end } = getRecommendationDate();
  useQuery({
    queryKey: [queryKeys.GET_LISTINGS, start, end],
    queryFn: async () => {
      setSearchTerm("");
      const { data } = await axiosInstance.get(ApiRoutes.LISTINGS, {
        params: {

          startAfterDate: isRecommendationSearched ? start : undefined,
          endBeforeDate: isRecommendationSearched ? end : undefined,
          centerLatitude: isNearbyLocation ? location?.lat : undefined,
          centerLongitude: isNearbyLocation ? location?.lng : undefined,
          radius: isNearbyLocation ? 10 : undefined,
        },
      });
      setIsNearbyLocation(false);
      setIsRecommendationSearched(false)
      setSearchedItems(data)
    },
    enabled: (isRecommendationSearched && !!start && !!end) || (isNearbyLocation && !!location?.lat && !!location.lng)
  });
  const saveSearch = (term: { id: string, title: string }) => {
    let updatedHistory = [term, ...searchHistory.filter((t) => t !== term.id)];
    if (updatedHistory.length > 10) updatedHistory = updatedHistory.slice(0, 10);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHistory))
    router.navigate({ to: APPROUTES.NAVIGATE_EVENTS_BY_ID(term.id), reloadDocument: true })
  };

  const mutateSearchedQuery = useMutation({
    mutationKey: [queryKeys.SEARCH_LISTING],
    mutationFn: async (searchQuery: string): Promise<IHiglightsDetailsSections> => {
      return await axiosInstance.get(ApiRoutes.SEARCH_LISTING, {
        params: {
          searchQuery,
        },
      });
    },
    onSuccess: (data) => {
      setSearchedItems(data.data)
    }
  });

  const handleRecentClick = (term: string) => {
    router.navigate({ to: APPROUTES.NAVIGATE_EVENTS_BY_ID(term), reloadDocument: true })
  };

  useEffect(() => {
    if (!searchTerm.trim()) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      mutateSearchedQuery.mutateAsync(searchTerm.trim());
    }, 500);
  }, [searchTerm]);

  useEffect(() => {
    if (open) {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setSearchHistory(JSON.parse(stored));
      }
    }
  }, [open]);

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

  return {
    open,
    searchTerm,
    setSearchTerm,
    searchedItems,
    saveSearch,
    searchHistory,
    handleOpen,
    handleClose,
    handleRecentClick,
    setIsRecommendationSearched,
    setIsNearbyLocation
  }
};

export default useSearch;
