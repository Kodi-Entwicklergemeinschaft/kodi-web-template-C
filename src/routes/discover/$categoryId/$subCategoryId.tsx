import EventCard from '../../../components/shared/EventsCards';
import { createFileRoute } from '@tanstack/react-router';
import PrivateLayout from '../../../layouts/PrivateLayout';
import { Box, Typography, Grid } from '@mui/material';
import useGetListingsWithCategories from '../../../hooks/useGetHiglights';
import { EventCardVariant } from '../../../types/listing.d';

const EventsInSubCategory = () => {
  const { categoryId, subCategoryId } = Route.useParams(); 
  const { listingDetails: events } = useGetListingsWithCategories({
    categoryId: subCategoryId, 
    sortByStartDate:true
  });

  return (
    <Box sx={{ px: 6, pb: 6, pt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
  
      </Typography>

      <Grid container spacing={4}>
        {events.length > 0 ? (
          events.map((event) => (
            <Grid item xs={12} md={4} key={event.id}>
              <EventCard
                id={event.id}
                title={event.title}
                description={event.description}
                address={event.address}
                date={event.startString ?? undefined}
                logo={event.logo}
                isFavorite={event.isFavorite}
                cityId={event.cityId}
                categoryId={event.categoryId}
                variant={EventCardVariant.VERTICAL} 
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mb: 4 }}>
            No Events found
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export const Route = createFileRoute('/discover/$categoryId/$subCategoryId')({
  component: () => (
    <PrivateLayout>
      <EventsInSubCategory />
    </PrivateLayout>
  ),
});
