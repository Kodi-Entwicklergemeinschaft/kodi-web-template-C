import { useEffect, useMemo, useRef, useState } from "react";
import useCategories from "./useCategories";
import useGetListingsWithCategories from "./useGetHiglights";
import { groupBy, pick } from "lodash-es";
import { useMutation } from "@tanstack/react-query";
import { ApiRoutes, queryKeys } from "../utilities/routes";
import axiosInstance from "../axiosConfig";
import { IDatum, IHiglightsDetailsSections } from "../types/listing";

const useMaps = () => {
  const [selectedEvent, setSelectedEvent] = useState<IDatum | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedItems, setSearchedItems] = useState<IDatum[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<null | number | string>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const { listingDetails , isLoading } = useGetListingsWithCategories({ categoryId: selectedCategory?.toString() , sortByStartDate:true });
  const { categoriesDetails } = useCategories();
  const categoryData = useMemo(() => groupBy(categoriesDetails, 'id'), [categoriesDetails]);
  const allListingData = useMemo(() => groupBy(listingDetails, 'categoryId'), [listingDetails]);
  const allListingDataKeys = Object.keys(allListingData)
  const listedCategoriesDetails = pick(categoryData, allListingDataKeys);
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
      setSelectedCategory(null);
    }
  });
  useEffect(() => {
    if (!searchTerm.trim()) return;

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      mutateSearchedQuery.mutateAsync(searchTerm.trim());
    }, 500);
  }, [searchTerm]);
  return {
    categoryData,
    allListingData,
    listedCategoriesDetails,
    selectedCategory,
    setSelectedCategory,
    selectedEvent,
    setSelectedEvent,
    searchedItems,
    setSearchedItems,
    searchTerm,
    setSearchTerm,
    isLoading
  }
};

export default useMaps;
