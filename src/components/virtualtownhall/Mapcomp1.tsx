import { useState, useEffect } from "react";
import { Card, Box, Typography, useTheme } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useFavoriteCities from "../../hooks/useFavoriteCity";
import { useNavigate } from "@tanstack/react-router";
function MapComp1({isFavorite, user, id, mapImageUrl, name }:{isFavorite:boolean, user:string, id:Number, mapImageUrl:string, name:string}) {
    const [fav, setFav] = useState<boolean>(isFavorite || false)
    const navigator = useNavigate();
    const theme = useTheme();
    const { markEventFavoriteMutation, deleteEventFavoriteMutation, isuserLoggedIn } = useFavoriteCities();
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (fav) {
            deleteEventFavoriteMutation.mutateAsync({ userId: user?.toString() ?? '', cityId: id?.toString() ?? '' })
        } else {
            markEventFavoriteMutation.mutateAsync({ userId: user?.toString() ?? '', cityId: id?.toString() ?? '' })
        }
        setFav(!fav);
    }
    useEffect(()=>{
        setFav(isFavorite ?? false);
    },[isFavorite])
    return (
        <Box onClick={() => navigator({ to: `/virtualtownhall/${id}` })}>
            <Card
                sx={{
                    borderRadius: 3,
                    boxShadow: 3,
                    width: '20rem',
                    height: '16rem',
                    background: theme.palette.common.white,
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 1,
                    flexDirection: 'column',
                    cursor: 'pointer',
                    position: 'relative'
                }}
            >

                <Box
                    sx={{
                        borderRadius: '1rem',
                        overflow: 'hidden',
                        flexShrink: 0,
                        width: '20rem',
                        height: '12rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${mapImageUrl})`,
                        backgroundSize: 'contain', // Changed from 'cover' to 'contain'
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                    }}
                >
                </Box>
                {(isuserLoggedIn) &&
                    <Box sx={{
                        position: 'absolute', top: 8, right: 8, zIndex: 100, borderRadius: '100%', height: '30px', bgcolor: fav ? theme.palette.primary.main : theme.palette.common.white, padding: 0.5,
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
                <Box sx={{ p: 1, display: 'flex', height: '4rem', flexDirection: 'column', alignItems: 'start', width: '100%' }}>
                    <Typography variant="h6" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {name}
                    </Typography>
                    <Typography sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {"Gemeinde"}
                    </Typography>
                </Box>
            </Card>
        </Box>
    )
}

export default MapComp1