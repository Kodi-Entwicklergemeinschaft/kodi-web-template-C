import {
  Typography,
  Box,
  Grid,
} from '@mui/material';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import { CATEGORIES } from '../../utilities/constants';
import { useTranslation } from 'react-i18next';
import EventCard from '../shared/EventsCards';
import { EventCardVariant } from '../../types/listing.d';
import DataLoaderWrapper from '../loader/DataLoaderWrapper';

const HighLightsSection = () => {
  const { listingDetails: highlightsData , isLoading } = useGetListingsWithCategories({
    categoryId: CATEGORIES.HIGHLIGHTS,
    pageSize: 3,
    sortByStartDate:true
  });
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 0, pb: 6, pt: 0 }}>
      <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
        {t('highlights.title')}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: { xs: '100%', md: '60%' },
          mb: 4,
        }}
      >
        {t('highlights.description')}
      </Typography>
      <DataLoaderWrapper isLoading={isLoading} height={300}> 
      <Grid container spacing={0} sx={{bgcolor: (theme) => theme.palette.secondary.main}}>
        {highlightsData.map(({ id, createdAt, title, address, description, logo, isFavorite, userId, cityId, categoryId }) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={id}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: { xs: 340, sm: 400, md: '100%' } }}>
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
            </Box>
          </Grid>


        ))}

        {highlightsData.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
              {t('highlights.fallback_message')}
            </Typography>
          </Grid>
        )}
      </Grid>
    </DataLoaderWrapper>
    </Box>
  );
};

export default HighLightsSection;
