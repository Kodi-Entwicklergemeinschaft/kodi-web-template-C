import {
    Card,
    Box,
    IconButton,
    CardMedia,
    CardContent,
    Typography,
    Divider,
    Stack,
    Chip,
    useTheme,
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import { useNavigate } from '@tanstack/react-router';
import { APPROUTES } from '../../utilities/routes';
import { getFormattedDate } from '../../utilities/dateTime';
import { EventCardVariant, IEventCardProps } from '../../types/listing.d';
import useFavorite from '../../hooks/useFavorite';
import { STORAGE_KEYS } from '../../utilities/constants';
import { imageLoaderUtility } from '../../utilities/getImage';
import { useEffect, useState } from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';
const EventCard = ({
    id,
    date,
    title,
    address,
    description,
    variant = EventCardVariant.VERTICAL,
    isNews,
    logo,
    isFavorite,
    cityId
}: IEventCardProps) => {
    const navigate = useNavigate();
    const { trackEvent } = useMatomo();
    const theme = useTheme();
    const isVertical = variant === EventCardVariant.VERTICAL;
    const { deleteEventFavoriteMutation, markEventFavoriteMutation, isuserLoggedIn } = useFavorite();
    const user = localStorage.getItem(STORAGE_KEYS.USER_ID);
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
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                background: theme.palette.common.white,
                height: {
                    xs: isVertical ? '100%' : 520,
                    sm: isVertical ? '100%' : 360,
                    md: isVertical ? '100%' : 400,
                    lg: isVertical ? '100%' : 320,
                },
                display: 'flex',
                flexDirection: isVertical ? 'column' : { xs: 'column', sm: 'row' },
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 6 }
            }}
            onClick={() => {
                trackEvent({
                    category: isNews ? 'News Card' : 'Event Card',
                    action: 'Open Detail',
                    name: title,
                    value: Number(id),
                });

                if (isNews) {
                    navigate({ to: APPROUTES.NAVIGATE_NEWS_BY_ID(id?.toString() ?? '') });
                } else {
                    navigate({ to: APPROUTES.NAVIGATE_EVENTS_BY_ID(id?.toString() ?? '') });
                }
            }}
        >
            <Box
                sx={{
                    width: isVertical ? '100%' : { xs: '100%', sm:250, md: 260, lg: 300 },
                    minWidth: isVertical ? '100%' : { xs: '100%', sm:250, md: 260, lg: 300 },
                    height: isVertical ? 200 : '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: theme.palette.common.white,
                }}
            >
                <CardMedia
                    component="img"
                    image={logo}
                    alt={title}
                    sx={{
                        width: '100%',
                        height: isVertical ? 200 : '100%',
                        objectFit: 'cover',
                        borderRadius: 4,
                        padding: 1,
                    }}
                />
            </Box>
            <CardContent
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    p: isVertical ? 2 : 3,
                    width: '100%',
                    minWidth: 0,
                }}
            >
                <Box>
                    <Typography variant="caption" color="text.secondary" gutterBottom>
                        {getFormattedDate(date ?? '')}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {address}
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight={300}
                        sx={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            mb: 1,
                        }}
                        dangerouslySetInnerHTML={{ __html: description ?? '' }}
                    />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                        mt: 1,
                        flexWrap: 'wrap',
                        gap: 1,
                        maxWidth: '100%',
                        overflow: 'auto',   
                    }}
                >
                    <Chip label="Barrierefrei" icon={<EmojiPeopleOutlinedIcon color="primary" />} size="medium" />
                    <Chip label="Kostenlos" icon={<PetsOutlinedIcon color="primary" />} size="medium" />
                </Stack>
            </CardContent>
            {isuserLoggedIn && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: fav ? theme.palette.primary.main : theme.palette.common.white,
                        '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                        },
                        color: fav ? theme.palette.common.white : theme.palette.primary.main,
                        zIndex: 2,
                        boxShadow: 1,
                    }}
                    onClick={handleFavorite}
                >
                    <FavoriteBorderIcon />
                </IconButton>
            )}
        </Card>
    );
};

export default EventCard;