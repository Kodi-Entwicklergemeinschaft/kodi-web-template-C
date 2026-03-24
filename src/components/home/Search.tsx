import {
    Box,
    Modal,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemButton,
    IconButton,
    Chip,
    Divider,
    InputAdornment,
    Card,
    CardContent,
    CardMedia,
    ListItemIcon,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { StarOutlineOutlined } from "@mui/icons-material";
import useSearch from "../../hooks/useSearch";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
    const { t } = useTranslation();
    const {
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
    } = useSearch();
    return (
        <Box>
            <IconButton
                disableRipple
                onClick={() => handleOpen()}
                sx={{
                    bgcolor: (theme) => (open ? theme.palette.action.active : 'transparent'),
                    color: (theme) =>
                        open ? theme.palette.primary.main : theme.palette.common.white,
                    '&:hover': {
                        color: (theme) =>
                            open ? theme.palette.common.white : theme.palette.action.active,
                    },
                }}
            >
                <SearchIcon />
            </IconButton>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: (theme) => theme.palette.secondary.main,
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                        height: '80vh',
                        overflowY: 'scroll',
                        width: {
                             xs: '250px',
                             sm: '400px',
                             md: '400px', 
                          },
                        }}
                >
                    <Typography variant="h6" gutterBottom mb={4}>
                        {t("searches.title")}
                    </Typography>

                    <Box display={"flex"} flexDirection={"column"} gap={2}>
                        <Chip label={t("searches.buttons.nearby")} icon={<NearMeOutlinedIcon fontSize="small" color="primary" />} clickable onClick={() => setIsNearbyLocation(true)} />
                        <Chip label={t("searches.buttons.recommendations")} icon={<StarOutlineOutlined fontSize="small" color="primary" />} clickable onClick={() => setIsRecommendationSearched(true)} />
                        <Divider sx={{ my: 2 }} />
                        <TextField
                            label={t("searches.searchPlaceholder")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchTerm}
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchIcon sx={{ mr: 1 }} color="primary" />
                                        </InputAdornment>
                                    ),
                                    sx: { borderRadius: '50px' },
                                },
                                htmlInput: {
                                    sx: { borderRadius: '50px' },
                                },
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                gap: 4,
                            }}
                        >
                            {searchedItems.map(({ id, title, logo, description }) => <Card
                                key={id}
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    background: (theme) => theme.palette.common.white,
                                    width: '100%',
                                }}
                                onClick={() => saveSearch({ id: id.toString(), title })}
                            >
                                <CardContent sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
                                    <CardMedia
                                        component="img"
                                        image={`${import.meta.env.VITE_BUCKET_URL}${logo}`}
                                        alt="event"
                                        sx={{
                                            borderRadius: '10px', objectFit: 'cover',
                                            display: 'block',
                                            maxWidth: "100px"
                                        }}
                                    />
                                    <Box sx={{ textAlign: 'left'}}>
                                        <Typography sx={{ fontWeight: 600, fontSize: "14px" }} color='primary'>
                                            {title}
                                        </Typography>
                                        <Typography color='primary' sx={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            fontSize: "12px"
                                        }}
                                        dangerouslySetInnerHTML={{ __html: description ?? '' }}
                                        >
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>)}
                        </Box>
                        <Typography variant="subtitle1" fontWeight={600} mt={4} textAlign={"left"}>
                            {t("searches.recentSearches")}
                        </Typography>
                        <List dense sx={{ p: 0 }}>
                            {searchHistory?.length === 0 && <ListItem disablePadding>
                                <ListItemButton sx={{ p: 0 }}>
                                    {t("searches.noSearchItem")}
                                </ListItemButton>
                            </ListItem>}
                            {searchHistory?.map((term, idx) => (
                                <ListItem key={idx} disablePadding >
                                    <ListItemButton onClick={() => handleRecentClick(term.id)} sx={{ p: 0, fontSize: "14px" }}>
                                        <ListItemIcon>
                                            <StarOutlineOutlined color="primary" />
                                        </ListItemIcon>
                                        {term.title}
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

export default SearchBar;
