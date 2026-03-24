import { Box, Card, useTheme, Typography, Link } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "@tanstack/react-router";
import useFavorite from "../../hooks/useFavorite";
import { STORAGE_KEYS } from "../../utilities/constants";
import { useState, useEffect } from "react";
interface MapCardProps {
    id?: number;
    date?: string;
    imageUrl: string;
    location: string;
    title: string;
    isFavorite?: boolean;
    href?: string;
    cityId: number;
}

const MapCard: React.FC<MapCardProps> = ({ id, date, imageUrl, location, title, isFavorite, href, cityId }) => {
    const theme = useTheme();
    const navigator = useNavigate();
    const user = localStorage.getItem(STORAGE_KEYS.USER_ID);
    const { markEventFavoriteMutation, deleteEventFavoriteMutation, isuserLoggedIn } = useFavorite();
    const [fav, setFav] = useState<boolean>(isFavorite ?? false);
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (fav) {
            deleteEventFavoriteMutation.mutateAsync({ id: user?.toString() ?? '', listingId: id?.toString() ?? '', categoryId: '' });
        } else {
            markEventFavoriteMutation.mutateAsync({ id: user?.toString() ?? '', listingId: id?.toString() ?? '', cityId: cityId?.toString() ?? '', categoryId: '' });
        }
        setFav(!fav);
    }
    useEffect(() => {
        setFav(isFavorite ?? false);
    }, [isFavorite])
    return (
        <Box onClick={() => navigator({ to: href })}>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    background: theme.palette.common.white,
                    display: 'flex',
                    padding: 1,
                    flexDirection: 'column',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        borderRadius: '10px',
                        overflow: 'hidden',
                        p: 1,
                        flexShrink: 0,
                        width: '279px',
                        height: '194px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                    }}
                >
                </Box>
                {(isuserLoggedIn) &&
                    <Box sx={{
                        position: 'absolute', top: 12, right: 12, zIndex: 100, borderRadius: '100%', height: '40px', bgcolor: fav ? theme.palette.primary.main : theme.palette.common.white, padding: 1,
                        '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                        },
                        color: fav ? theme.palette.common.white : theme.palette.primary.main,
                    }}
                        onClick={handleFavorite}
                    >
                        <FavoriteBorderIcon />
                    </Box>
                }
                <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', width: '270px', overflow: 'hidden' }}>
                    {date && (
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                            {date}
                        </Typography>
                    )}
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {title}
                    </Typography>
                    <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {location}
                    </Typography>
                </Box>
            </Card>
        </Box>
    );
}

export default MapCard;