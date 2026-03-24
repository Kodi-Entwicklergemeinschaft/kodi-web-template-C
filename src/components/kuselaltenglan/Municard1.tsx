import { Box, Typography, useTheme } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from '@tanstack/react-router';
import { STORAGE_KEYS } from '../../utilities/constants';
import useFavoriteCities from '../../hooks/useFavoriteCity';
import { useState, useEffect } from 'react';
function MuniCard1({ isFavorite, isAllFav, id, name, imageUrl }: { isFavorite: boolean, id: number, name: string, imageUrl: string, isAllFav: boolean }) {
    const navigator = useNavigate()
    const theme = useTheme();
    const user = localStorage.getItem(STORAGE_KEYS.USER_ID);
    const { markEventFavoriteMutation, deleteEventFavoriteMutation, isuserLoggedIn } = useFavoriteCities();
    const [fav, setFav] = useState<boolean>(isAllFav ? true : isFavorite);
    const handleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (fav) {
            deleteEventFavoriteMutation.mutateAsync({ userId: user?.toString() ?? '', cityId: id?.toString() ?? '' })
        } else {
            markEventFavoriteMutation.mutateAsync({ userId: user?.toString() ?? '', cityId: id?.toString() ?? '' })
        }
        !isAllFav && setFav(!fav);
    }
    useEffect(() => {
        if (!isAllFav) setFav(isFavorite ?? false);
    }, [isFavorite])
    return (
        <Box sx={{
            marginRight: '16px', marginBottom: '16px', bgcolor: (theme) => theme.palette.common.white, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden', boxShadow: 1, transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
                cursor: 'pointer',
            },
            padding: 1,
            position: 'relative',
        }} onClick={() => navigator({ to: `/meinort/${id}` })}>

            <Box sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8rem' }}>
                <Box
                    sx={{
                        overflow: 'hidden',
                        flexShrink: 0,
                        width: '6rem',
                        height: '9rem',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundImage: `url(${imageUrl})`,
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        position: 'relative',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                >
                </Box>
            </Box>
            <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>{name}</Typography>
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
        </Box>
    )
}

export default MuniCard1