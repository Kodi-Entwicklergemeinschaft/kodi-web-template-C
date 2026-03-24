import { Box, Typography, Grid } from '@mui/material';
import { t } from 'i18next';
import useGetAllFavorites from '../hooks/useGetAllFavorites';
import EventCard from './shared/EventsCards';
import { EventCardVariant } from '../types/listing.d';
import { STORAGE_KEYS } from '../utilities/constants';
import DataLoaderWrapper from './loader/DataLoaderWrapper';

const FavoritesContent = () => {
  const { listingDetails , isLoading } = useGetAllFavorites({
    userId: localStorage.getItem(STORAGE_KEYS.USER_ID) ?? '',
  });

  return (
    <Box sx={{ px: 6, pb: 6, pt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
        {t('favorites.title')}
      </Typography>
      <DataLoaderWrapper isLoading={isLoading} height={400}>

      <Grid container spacing={4}>
        {listingDetails.map(
          ({
            id,
            createdAt,
            title,
            address,
            description,
            logo,
            isFavorite,
            userId,
            cityId,
            categoryId,
          }) => (
            <Grid item xs={12} md={4} key={id}>
              <EventCard
                id={id}
                date={createdAt}
                title={title}
                address={address}
                description={description}
                variant={EventCardVariant.VERTICAL}
                logo={logo}
                isFavorite={isFavorite}
                userId={userId}
                cityId={cityId}
                categoryId={categoryId}
              />
            </Grid>
          )
        )}
      </Grid>
      </DataLoaderWrapper>
    </Box>
  );
};

export default FavoritesContent;
