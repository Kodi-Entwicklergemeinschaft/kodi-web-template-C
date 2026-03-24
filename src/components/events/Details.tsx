import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography,
  Button,
  Divider,
  Chip,
  IconButton,
  Link,
  useTheme
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import { useState, useEffect } from 'react';
// import InputIcon from '@mui/icons-material/Input';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import SavingsIcon from '@mui/icons-material/Savings';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
import NavigationIcon from '@mui/icons-material/Navigation';
import EventIcon from '@mui/icons-material/Event';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import useGetEventDetails from '../../hooks/useGetEventDetails';
import useFavorite from '../../hooks/useFavorite';
import { isNil } from 'lodash-es';
import { STORAGE_KEYS } from '../../utilities/constants';
import { useTranslation } from 'react-i18next';
const Details = () => {
  const { eventDetails } = useGetEventDetails();
  const { deleteEventFavoriteMutation, markEventFavoriteMutation, isuserLoggedIn } = useFavorite();
  const theme = useTheme();
  const lat = 49.5401602, long = 7.3980093;
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID);
  const { t } = useTranslation();
  const [fav, setFav] = useState(eventDetails?.isFavorite);
  if (isNil(eventDetails)) return;
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fav) {
      deleteEventFavoriteMutation.mutateAsync({ id: userId?.toString() ?? '', listingId: eventDetails.id?.toString() ?? '', categoryId: '' });
    } else {
      markEventFavoriteMutation.mutateAsync({ id: userId?.toString() ?? '', listingId: eventDetails.id?.toString() ?? '', cityId: eventDetails.cityId?.toString() ?? '', categoryId: '' });
    }
    setFav(!fav);
  }
  useEffect(() => {
    setFav(eventDetails.isFavorite ?? false);
  }, [eventDetails.isFavorite])
  return (
    <Box sx={{ px: 4, py: 6, position: 'relative', zIndex: 400, marginTop: '-240px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 4,
              bgcolor: (theme) => theme.palette.common.white,
              height: '100%',
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  {eventDetails?.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {eventDetails.place}
                </Typography>
              </Box>
              <Stack direction="row" spacing={1}>
                <Button
                  startIcon={<FavoriteBorderIcon />}
                  variant="contained"
                  sx={{
                    bgcolor: fav ? theme.palette.primary.main : theme.palette.common.white,
                    '&:hover': {
                      bgcolor: theme.palette.primary.main,
                      color: theme.palette.common.white,
                    },
                    color: fav ? theme.palette.common.white : theme.palette.primary.main,
                  }}
                  onClick={handleFavorite}
                >
                  Liken
                </Button>
                {/* <Button startIcon={<ShareIcon />} variant="contained" sx={{ bgcolor: '#2f327d' }}>  
                  Teilen
                </Button> */}
              </Stack>
            </Stack>

            <Typography variant="subtitle2" sx={{ fontWeight: 300, my: 2 }}
              dangerouslySetInnerHTML={{ __html: eventDetails?.description ?? '' }}
            >
            </Typography>

            {/* <Typography variant="body2" color="text.secondary">
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
              eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est.
            </Typography> */}

            <Box sx={{ mt: 3, borderRadius: 2, overflow: 'hidden' }}>
              <iframe
                title="gppgle maps"
                width={'100%'}
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOzBSSz5d6ktRygxSP0X8NyliHiNyKJVo&q=${eventDetails.latitude ?? lat},${eventDetails.longitude ?? long}&zoom=15`}
                style={{ border: 0 }}
              />
            </Box>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
              sx={{ mt: 2, p: 2 }}
            >
              <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
                <PlaceOutlinedIcon sx={{ color: "text.secondary" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary" >{eventDetails?.place ?? ""}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {eventDetails?.address}
                  </Typography>
                </Box>
              </Box>
              <Button
                startIcon={<NavigationIcon />}
                variant="contained"
                sx={{ bgcolor: '#2f327d' }}
                component="a"
                href={`https://www.google.com/maps/search/?api=1&query=${eventDetails.latitude ?? lat},${eventDetails.longitude ?? long}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("eventDetail.showRoute")}
              </Button>
            </Stack>

          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            elevation={3}
            sx={{ p: 3, borderRadius: 4, bgcolor: (theme) => theme.palette.common.white }}
          >
            <Typography variant="h6" gutterBottom>
              Infos
            </Typography>
            <Link
              href={eventDetails?.website}
              underline="hover"
              target="_blank"
              sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
            >
              <OpenInNewIcon sx={{ fontSize: 18, mr: 1 }} /> {t("eventDetail.visitWeb")}
            </Link>

            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
              {t("eventDetail.nextDate")}
            </Typography>
            <Stack spacing={1} mb={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon fontSize="small" />
                <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                  <Typography variant="body2">
                    {eventDetails?.startDate
                      ? new Date(eventDetails.startDate).toLocaleDateString('de-DE', { timeZone: 'UTC' }) +
                      ', ' +
                      new Date(eventDetails.startDate).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'UTC',
                      })
                      : ''}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <EventIcon fontSize="small" />
                <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                  <Typography variant="body2">
                    {eventDetails?.endDate
                      ? new Date(eventDetails.endDate).toLocaleDateString('de-DE', { timeZone: 'UTC' }) +
                      ', ' +
                      new Date(eventDetails.endDate).toLocaleTimeString('de-DE', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'UTC',
                      })
                      : ''}
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2 }} />
            <Stack direction="column" spacing={1} flexWrap="wrap">
              <Chip
                icon={<EmojiPeopleOutlinedIcon color="primary" />}
                label={t("eventDetail.barrierFree")}
                sx={{ width: 'fit-content', fontSize: '16px', px: 1 }}
              />
              <Chip
                icon={<PetsOutlinedIcon color="primary" />}
                label={t("eventDetail.dogsAllowed")}
                sx={{ width: 'fit-content', fontSize: '16px', px: 1 }}
              />
              <Chip
                icon={<SavingsIcon color="primary" />}
                label={t("eventDetail.freeEntry")}
                sx={{ width: 'fit-content', fontSize: '16px', px: 1 }}
              />
            </Stack>
          </Paper>

          <Paper
            elevation={3}
            // sx={{
            //   mt: 3,
            //   p: 2,
            //   borderRadius: 4,
            //   display: 'flex',
            //   alignItems: 'center',
            //   bgcolor: (theme) => theme.palette.common.white,
            // }}
            onClick={() => {
              window.open(
                `https://www.google.com/maps/search/?api=1&query=${eventDetails.latitude ?? lat},${eventDetails.longitude ?? long}&zoom=15`,
                '_blank',
                'noopener,noreferrer'
              );
            }}
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              bgcolor: (theme) => theme.palette.common.white,
              cursor: 'pointer',
              '&:hover': {
                boxShadow: 6,
                bgcolor: (theme) => theme.palette.action.hover,
              },
            }}
          >
            <DirectionsCarIcon fontSize="large" sx={{ mr: 2 }} />
            <Box>
              <Typography fontWeight={600}>{t("eventDetail.public_transport")}</Typography>
              <Typography variant="body2" color="text.secondary">
                {t("eventDetail.checkOut")}
              </Typography>
            </Box>
            <IconButton>
              <OpenInNewIcon color="primary" />
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Details;