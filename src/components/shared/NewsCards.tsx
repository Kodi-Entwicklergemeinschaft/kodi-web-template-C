import { Paper, Avatar, Box, Typography, useTheme } from "@mui/material";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate } from "@tanstack/react-router";
import useFavorite from "../../hooks/useFavorite";
import { STORAGE_KEYS } from "../../utilities/constants";
import { useState, useEffect } from "react";
interface NewsCardProps {
  id: number;
  imageUrl: string;
  alt: string;
  date: string;
  description?: string;
  location: string;
  favoriteFet: boolean;
  dateFet: boolean;
  descriptionFet: boolean;
  locationFet: boolean;
  href?: string;
  isFavorite?: boolean;
  cityId?: number;
}
 
const NewsCard: React.FC<NewsCardProps> = ({ id, imageUrl, date, description, location, favoriteFet, dateFet, descriptionFet, locationFet, href, isFavorite, cityId }) => {
  const navigation = useNavigate()
  const theme = useTheme();
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
    <Paper
 
      elevation={3}
      sx={{
        p: 1,
        borderRadius: '8px',
        width: { sm: '400px', xs: '280px' },
        display: 'flex',
        justifyContent: 'space-between',
        bgcolor: (theme) => theme.palette.common.white,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: 6,
          cursor: 'pointer',
        },
      }}
      onClick={() => navigation({ to: href })}
    >
      <Box sx={{ display: 'flex' }}>
        <Avatar src={imageUrl} variant="square" sx={{ width: 80, height: 80, borderRadius: '8px' }}></Avatar>
        <Box sx={{
          padding: 1, width: { sm: '260px', xs: '140px' }, overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}>
          {(dateFet) ? <Typography fontWeight={500} fontSize={'14px'} color="#6972A8">{date}</Typography> : <Typography fontWeight={500} fontSize={'14px'} color="#6972A8" sx={{ visibility: 'hidden' }}>{date}</Typography>}
          {descriptionFet ? (
  <Typography variant="body2" fontWeight={500} fontSize={'16px'} color="#18204F">
    {(description ?? '').replace(/<[^>]+>/g, '')}
  </Typography>
) : (
  <Typography variant="body2" fontWeight={500} fontSize={'16px'} color="#18204F" sx={{ visibility: 'hidden' }}>
    {description}
  </Typography>
)}
 
          {locationFet ? (
            <Typography variant="body2" fontWeight={500} fontSize={'14px'} color="#6972A8">
              {location}
            </Typography>
          ) : (
            <Typography variant="body2" fontWeight={500} fontSize={'14px'} color="#6972A8" sx={{ visibility: 'hidden' }}>
              {location}
            </Typography>
          )}
        </Box>
      </Box>
      {(isuserLoggedIn) &&
        <Box
          sx={{
            borderRadius: '100%',
            height: '40px',
            width: '40px',
            bgcolor: fav ? theme.palette.primary.main : theme.palette.common.white,
            '&:hover': {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.common.white,
            },
            color: fav ? theme.palette.common.white : theme.palette.primary.main,
            padding: 1
          }}
          onClick={handleFavorite}
        >
          <FavoriteBorderIcon />
        </Box>}
    </Paper>
  );
}
 
export default NewsCard;