import { useState } from "react";
import { getDateRangeFromFilter } from "../utilities/dateTime";
import { useLocation, useNavigate, useSearch } from "@tanstack/react-router";
import { APPROUTES } from "../utilities/routes";

export enum EventtSortBy {
    RECENT = "recent",
    DISTANCE = "distance"
}

export const optionsFilter = [
    "dog_friendly",
    "accessible",
    "public_transport",
    "free",
    "online",
    "openAir",
    "card_payment"
]

export type OptionsFilterType = typeof optionsFilter[number];

export const dateRangeFilter = [
    "today",
    "weekend",
    "7",
    "30",
    "custom"
]

export const filtersValue = [ "cityId",  "dateRange"]

export type DateRangeFilterType = typeof dateRangeFilter[number];

const useEventFilter = () => {
    const navigate = useNavigate();
    const filters = useSearch({ from: APPROUTES.EVENT_BY_ID, strict: true });
    const navigateLocation = useLocation();
    const [dateRange, setDateRange] = useState<DateRangeFilterType>(filters.dateRange ?? dateRangeFilter[0]);
    const [customStartDate, setCustomStartDate] = useState(filters.startAfterDate ?? "");
    const [customEndDate, setCustomEndDate] = useState(filters.endBeforeDate ?? "");
    const [targetGroup, setTargetGroup] = useState("alone");
    const [location, setLocation] = useState<string>(filters.cityId ?? "");
    const [options, setOptions] = useState<Record<OptionsFilterType, boolean>>({
        dog_friendly: true,
        accessible: false,
        public_transport: false,
        free: false,
        online: false,
        openAir: false,
        card_payment: false
    });
    const [sortBy, setSortBy] = useState<EventtSortBy | "">("");
    const [isOpen, setIsOpen] = useState(false);
    const handleOptionToggle = (key) => {
        setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    const handleClose = () => setIsOpen(false);

    const onSubmitFilters = () => {
        const isCustomRangeInvalid =
          dateRange === "custom" && (!customStartDate || !customEndDate);
      
        if (isCustomRangeInvalid) return; 
      
        const isResetApplied =
          !location && !customStartDate && !customEndDate && !dateRange;
      
        if (isResetApplied) {
          navigate({ to: navigateLocation.pathname });
        } else {
          const { startDate, endDate } = getDateRangeFromFilter(dateRange, {
            start: customStartDate,
            end: customEndDate,
          });
      
          navigate({
            to: `${navigateLocation.pathname}?cityId=${location}&dateRange=${dateRange}&startAfterDate=${startDate}&endBeforeDate=${endDate}`,
          });
        }
      
        handleClose(); 
      };
      
    const handleReset = () => {
        setDateRange("");
        setCustomStartDate("");
        setCustomEndDate("");
        setTargetGroup("");
        setLocation("");
        setOptions({
          dog_friendly: false,
          accessible: false,
          public_transport: false,
          free: false,
          online: false,
          openAir: false,
          card_payment: false,
        });
        setSortBy("");
};
    const disableSubmit = dateRange === "custom" && (!customStartDate || !customEndDate);
    const filterCount = Object.keys(filters).filter((key)=>filtersValue.includes(key)).length;
    return {
        handleOptionToggle,
        handleClose,
        dateRange,
        setDateRange,
        targetGroup,
        setTargetGroup,
        location,
        setLocation,
        options,
        setOptions,
        sortBy,
        setSortBy,
        isOpen,
        setIsOpen,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        onSubmitFilters,
        disableSubmit,
        filterCount,
        handleReset,
    }
};

export default useEventFilter;
