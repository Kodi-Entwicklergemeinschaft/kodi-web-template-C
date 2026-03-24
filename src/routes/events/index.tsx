import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createFileRoute } from '@tanstack/react-router';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import EventCard from '../../components/shared/EventsCards';
import Eventslayout from '../../layouts/EventsLayout';
import { CATEGORIES } from '../../utilities/constants';
import { EventCardVariant } from '../../types/listing.d';
import PrivateLayout from '../../layouts/PrivateLayout';
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper';
const Events = () => {
  const { listingDetails: todaysEventsData, isLoading } = useGetListingsWithCategories({ categoryId: CATEGORIES.TODAYS_EVENTS, sortByStartDate: true });
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 8, py: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }} fontWeight={600}>
        {t('allEvents.title')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        {t('allEvents.description')}
      </Typography>
      <DataLoaderWrapper isLoading={isLoading} height={300}>
        <Grid container spacing={2}>
          {todaysEventsData.map(({ id, title, createdAt, startDate, address, description, logo, isFavorite, userId, cityId }) => (
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
              />
            </Grid>
          ))}
        </Grid>
      </DataLoaderWrapper>
    </Box>
  );
};

export const Route = createFileRoute('/events/')({
  component: () => (
    <PrivateLayout>
      <Events />
    </PrivateLayout>
  ),
});
