import { createFileRoute } from '@tanstack/react-router'
import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import { CATEGORIES } from '../../utilities/constants';
import EventCard from '../../components/shared/EventsCards';
import { EventCardVariant } from '../../types/listing.d';
import PrivateLayout from '../../layouts/PrivateLayout';
export const Route = createFileRoute('/nearyou/')({
  component: () => (
    <PrivateLayout>
      <Nearyou />
    </PrivateLayout>
  ),
})

function Nearyou() {
  const { listingDetails: nearYouData } = useGetListingsWithCategories({ categoryId: CATEGORIES.TODAYS_EVENTS, isLocationEnabled: true, sortByStartDate: true });
  const { t } = useTranslation();
  return (
    <Box sx={{ px: 8, py: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }} fontWeight={600}>
        {t('nearYou.title')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        {t('allEvents.description')}
      </Typography>
      <Grid container spacing={2}>
        {nearYouData.map(({ id, title, createdAt, address, description, logo, isFavorite, userId, cityId, categoryId, startDate }, index) => (
          <Grid item md={12} lg={6} key={id} sx={{ width: '800px' }}>
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
          </Grid>
        ))}
      </Grid>
      {nearYouData.length === 0 && <Typography variant="body1" sx={{ mb: 4 }}>
        {t('nearYou.fallback_message')}
      </Typography>}
    </Box>
  )
}
