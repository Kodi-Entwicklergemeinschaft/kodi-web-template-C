import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import { CATEGORIES } from '../../utilities/constants';
import { useTranslation } from 'react-i18next';
import EventCard from '../shared/EventsCards';
import { EventCardVariant } from '../../types/listing.d';
import { useNavigate } from '@tanstack/react-router';
import DataLoaderWrapper from '../loader/DataLoaderWrapper';

const NearYou = () => {
  const { listingDetails: nearYouData,isLoading,  location } = useGetListingsWithCategories({ pageSize: 3, isLocationEnabled: true, sortByStartDate: true, categoryId: CATEGORIES.TODAYS_EVENTS });
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const maphref = `https://www.google.com/maps/search/?api=1&query=${location?.lat ?? 49.5313004343823},${location?.lng ?? 7.39889969941407}`
  return (
    <Box sx={{ px: 8, py: 8, pr: 0 }}>
      <Grid container spacing={6} alignItems="flex-start">
        <Grid item xs={12} md={5} pr={6}>
          <Typography variant="h4" sx={{ mb: 4 }} fontWeight={600}>
            {t('nearYou.title')}
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            {t('nearYou.description1')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 3 }}>
            {t('nearYou.description2')}
          </Typography>
          <Typography variant="body2" sx={{ mb: 4 }}>
            {t('nearYou.description3')}
          </Typography>
          <Stack direction={{ md: 'column', lg: 'row' }} spacing={2} gap={2}>
            <Button
              variant="outlined"
              startIcon={<ArrowForwardIcon />}
              sx={{ borderRadius: '50px' }}
              size="medium"
              onClick={() => navigate({ to: "/nearyou" })}
            >
              {t('nearYou.viewAll')}
            </Button>
            <Button
              variant="contained"
              startIcon={<MapOutlinedIcon />}
              sx={{ borderRadius: '50px' }}
              size="medium"
              onClick={() => navigate({ to: "/maps" })}
            >
              {t('nearYou.map_view')}
            </Button>
          </Stack>
        </Grid>

        <Grid
          item
          xs={12}
          md={7}
        >
          <DataLoaderWrapper isLoading={isLoading} height={300}>
          <Box
            sx={{
              width: '100%',
              display: { xs: 'flex', md: 'block' },
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Box
              sx={{
                p: 2,
                width: '100%',
                maxWidth: { xs: '90%', md: '100%' },
                borderTopRightRadius: { xs: 0, md: 20 },
                borderBottomRightRadius: { xs: 0, md: 20 },
                bgcolor: (theme) => theme.palette.secondary.main,
              }}
            >
              <Stack spacing={3}>
                {nearYouData.map(({ id, title, createdAt, address, description, logo, isFavorite, userId, cityId, categoryId, startDate }, index) => (
                  <EventCard
                    id={id}
                    date={startDate ?? ''}
                    title={title}
                    address={address}
                    description={description}
                    variant={EventCardVariant.HORIZONTAL}
                    logo={logo}
                    isFavorite={isFavorite}
                    userId={userId}
                    cityId={cityId}
                    categoryId={categoryId}
                  />
                ))}
                {nearYouData.length === 0 && <Typography variant="body1" sx={{ mb: 4 }}>
                  {t('nearYou.fallback_message')}
                </Typography>}
              </Stack>
            </Box>
          </Box>
          </DataLoaderWrapper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NearYou;