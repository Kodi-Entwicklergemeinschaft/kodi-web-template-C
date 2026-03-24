import { Box, Typography, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { createFileRoute } from '@tanstack/react-router';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import EventCard from '../../components/shared/EventsCards';
import { CATEGORIES } from '../../utilities/constants';
import { EventCardVariant } from '../../types/listing.d';
import PrivateLayout from '../../layouts/PrivateLayout';
const News = () => {
  const { listingDetails: todaysEventsData } = useGetListingsWithCategories({ categoryId: CATEGORIES.TODAYS_NEWS , sortByStartDate:true});
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 8, py: 8 }}>
      <Typography variant="h4" sx={{ mb: 2 }} fontWeight={600}>
        {t('allNews.title')}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        {t('allNews.description')}
      </Typography>
      <Grid container spacing={2}>
        {todaysEventsData.map(({ id, title, createdAt, address, description, logo, isFavorite, userId, cityId }) => (
          <Grid item xs={12} md={6} key={id}>
            <EventCard
              id={id}
              date={createdAt}
              title={title}
              address={address}
              description={description}
              variant={EventCardVariant.HORIZONTAL}
              logo={logo}
              isFavorite={isFavorite}
              // isNews={true}
              userId={userId}
              cityId={cityId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export const Route = createFileRoute('/news/')({
  component: () => (
    <PrivateLayout>
      <News />
    </PrivateLayout>
  ),
});
