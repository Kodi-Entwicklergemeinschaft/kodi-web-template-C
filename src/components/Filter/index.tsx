import {
    Box,
    Button,
    FormControlLabel,
    Switch,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    ToggleButtonGroup,
    ToggleButton,
    Divider,
    Badge,
    IconButton,
    useTheme,
    Modal
} from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import useEventFilter, { dateRangeFilter, EventtSortBy, optionsFilter } from "../../hooks/useEventsFilter";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers";
import useCities from "../../hooks/useCities";
import { DateTime } from "luxon";

const renderLabel = (label: string, isSelected: boolean) => (
    <>
        {label}
        {isSelected && <CheckOutlinedIcon fontSize="small" sx={{ ml: 1 }} />}
    </>
);

const selectSx = { borderRadius: '50px' };

const inputProps = {
    sx: {
        borderRadius: '50px',
        fontSize: "14px"
    },
};

const menuProps = {
    slotProps: {
        paper: {
            sx: {
                backgroundColor: (theme) => theme.palette.common.white,
                borderRadius: '10px',
                boxShadow: 3,
                width: 250,
            },
        },
    },
};


const FilterSidebar = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { cityList } = useCities();
    const {
        onSubmitFilters,
        handleOptionToggle,
        handleClose,
        dateRange,
        setDateRange,
        targetGroup,
        setTargetGroup,
        location,
        setLocation,
        options,
        sortBy,
        setSortBy,
        isOpen,
        setIsOpen,
        customStartDate,
        setCustomStartDate,
        customEndDate,
        setCustomEndDate,
        disableSubmit,
        handleReset,
        filterCount } = useEventFilter();
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, py: 6 }}>
                <IconButton
                    sx={{
                        bgcolor: theme.palette.primary.main,
                        color: theme.palette.common.white,
                        '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                        },
                    }}
                    onClick={() => setIsOpen(true)}
                >
                    <Badge badgeContent={filterCount} color={"success"}>
                        <FilterAltOutlinedIcon />
                    </Badge>
                </IconButton>
            </Box>
            <Modal
                open={isOpen}
                onClose={handleClose}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box p={3} width={400} maxHeight={'90vh'} sx={{ background: theme.palette.secondary.main, borderRadius: 4, overflowY: "auto" }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                        <Typography variant="h6">{t("filter_event.title")}</Typography>
                        <Button variant="outlined" size="small" onClick={handleReset}>{t("filter_event.reset")}</Button>
                    </Box>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>{t("filter_event.dateRange")}</InputLabel>
                        <Select value={dateRange} label={t("filter_event.period")} size="small" onChange={(e) => setDateRange(e.target.value)}
                            sx={selectSx}
                            inputProps={inputProps}
                            MenuProps={menuProps}
                        >
                            {dateRangeFilter.map((range) => <MenuItem value={range}>{t(`filter_event.date_filter.${range}`)}</MenuItem>)}
                        </Select>
                    </FormControl>

                    {dateRange === "custom" && (
                        <Box display="flex" flexDirection="column" gap={2} mt={1}>
                            <DatePicker closeOnSelect disableFuture
                                sx={{
                                    '& .MuiPickersOutlinedInput-root': {
                                        borderRadius: "50px",
                                        backgroundColor: theme.palette.common.white
                                    }
                                }}
                                slotProps={{
                                    openPickerIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    leftArrowIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    rightArrowIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    switchViewIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },

                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [0, 10],
                                                },
                                            },
                                        ],
                                        sx: {
                                            '& .MuiPaper-root': {
                                                backgroundColor: '#fff',
                                            },
                                        },
                                    },
                                }}
                                onChange={(e) => setCustomStartDate(e)}
                                value={DateTime.fromISO(customStartDate)}
                            />
                            <DatePicker closeOnSelect disableFuture
                                value={DateTime.fromISO(customEndDate)}
                                sx={{
                                    '& .MuiPickersOutlinedInput-root': {
                                        borderRadius: "50px",
                                        backgroundColor: theme.palette.common.white
                                    }
                                }}
                                slotProps={{
                                    openPickerIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    leftArrowIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    rightArrowIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    switchViewIcon: {
                                        sx: { color: theme.palette.primary.main },
                                    },
                                    popper: {
                                        modifiers: [
                                            {
                                                name: 'offset',
                                                options: {
                                                    offset: [0, 10],
                                                },
                                            },
                                        ],
                                        sx: {
                                            '& .MuiPaper-root': {
                                                backgroundColor: theme.palette.common.white
                                            },
                                        },
                                    },
                                }}
                                onChange={(e) => setCustomEndDate(e)}
                            />
                        </Box>
                    )}

                    <FormControl fullWidth margin="normal">
                        <InputLabel>{t("filter_event.targetGroup")}</InputLabel>
                        <Select value={targetGroup} size="small" label={t("filter_event.targetGroup")}  onChange={(e) => setTargetGroup(e.target.value)}
                            sx={selectSx}
                            inputProps={inputProps}
                            MenuProps={menuProps}
                        >
                            <MenuItem value="alone">{t("filter_event.alone")}</MenuItem>
                            <MenuItem value="couple">{t("filter_event.couple")}</MenuItem>
                            <MenuItem value="children">{t("filter_event.children")}</MenuItem>
                            <MenuItem value="groups">{t("filter_event.groups")}</MenuItem>
                            <MenuItem value="seniors">{t("filter_event.seniors")}</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>{t("onboarding.resident_step.residenceTitle")}</InputLabel>
                        <Select value={location} label={t("onboarding.resident_step.residenceTitle")} size="small" onChange={(e) => setLocation(e.target.value)}
                            sx={selectSx}
                            inputProps={inputProps}
                            MenuProps={menuProps}
                        >
                            {cityList.map((city) => <MenuItem value={city.id}>{city.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {/** options */}
                    <Typography mt={2} mb={1} fontWeight="bold">{t("filter_event.options")}</Typography>
                    <Box display="flex" flexDirection="column" gap={2} sx={{ background: theme.palette.common.white, p: 2, borderRadius: 4 }}>
                        {optionsFilter.map((option) => (
                            <FormControlLabel
                                key={option}
                                control={<Switch checked={options[option]} onChange={() => handleOptionToggle(option)} />}
                                label={<Typography sx={{ fontWeight: 600, ml: 1 }} fontSize={"small"}>
                                    {t(`filter_event.optionsValues.${option}`)}
                                </Typography>}
                            />
                        ))}
                    </Box>
                    {/** Sort by */}
                    <Typography mb={1} fontWeight="bold" mt={2}>
                        {t("filter_event.sortBy")}
                    </Typography>

                    <ToggleButtonGroup
                        value={sortBy}
                        exclusive
                        onChange={(e, val) => val && setSortBy(val)}
                        fullWidth
                        color="primary"
                        sx={{ gap: 1.5, p: 0 }}
                    >
                        <ToggleButton value={EventtSortBy.RECENT}>
                            {renderLabel(t("filter_event.recent"), sortBy === EventtSortBy.RECENT)}
                        </ToggleButton>
                        <ToggleButton value={EventtSortBy.DISTANCE}>
                            {renderLabel(t("filter_event.distance"), sortBy === EventtSortBy.DISTANCE)}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    <Divider sx={{ mt: 4 }} />
                    {/**Actions */}
                    <Box display="flex" justifyContent="space-between" mt={2}>
                       <Button onClick={handleClose}>{t("filter_event.cancel")}</Button>
                       <Button variant="contained" color="primary" disabled={disableSubmit} endIcon={<CheckOutlinedIcon />} onClick={onSubmitFilters}>
                            {t("filter_event.apply")}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default FilterSidebar;
