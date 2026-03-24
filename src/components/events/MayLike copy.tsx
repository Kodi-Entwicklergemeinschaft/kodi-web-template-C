import {
  Box,
  Grid,
  Typography,
  Stack,
  Button,
} from '@mui/material';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import { useTranslation } from 'react-i18next';
import EventCard from '../shared/EventsCards';
// import { EventCardVariant } from '../../types/listing';
import { APPROUTES } from '../../utilities/routes';
import { useSearch } from '@tanstack/react-router';
import { useRouter } from '@tanstack/react-router';
import { CATEGORIES } from '../../utilities/constants';
import { getRecomm } from '../../hooks/useGetRecomm';
// const MayLike = () => {
//   const { cityId, startAfterDate, endBeforeDate } = useSearch({ from: APPROUTES.EVENT_BY_ID, strict: true });
// const { listingDetails: todaysEventsData } = useGetListingsWithCategories({
//   pageSize: 3,
//   cityId,
//   startAfterDate,
//   endBeforeDate,
//   sortByStartDate: true,
//   isLocationEnabled: true,
//   categoryId: CATEGORIES.TODAYS_EVENTS,
//   isKuselLoc: true
// });

import DataLoaderWrapper from '../loader/DataLoaderWrapper';

const MayLike = () => {
  const { listingDetails: todaysEventsData, isLoading } = getRecomm() || [];
  enum EventCardVariant {
    VERTICAL = 'vertical',
    HORIZONTAL = 'horizontal'
  }
  const { t } = useTranslation();
  const { navigate } = useRouter();

  return (

    <Box sx={{ px: 6, py: 8 }}>
      <Grid
        container
        spacing={6}
        alignItems="flex-start"
        direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row' }}
        justifyContent="center"
      >
        <DataLoaderWrapper isLoading={isLoading} height={400} width="100%" >
          <Grid item xs={12} md={7}>
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
                {todaysEventsData.length === 0 && (
                  <Typography variant="h6" sx={{ mb: 3 }}>
                    {t('mayLikeEvents.no_events')}
                  </Typography>
                )}
                <Stack spacing={3}>
                  {todaysEventsData.map(({ id, title, createdAt, address, description, logo, isFavorite, userId, cityId, startDate }) => (
                    <EventCard
                      key={id}
                      id={id}
                      date={startDate ?? createdAt}
                      title={title}
                      address={address}
                      description={description}
                      variant={EventCardVariant.HORIZONTAL}
                      logo={logo}
                      isFavorite={isFavorite}
                      userId={userId}
                      cityId={cityId}
                    />
                  ))}
                  {todaysEventsData.length === 0 && (
                    <Typography variant="body1" sx={{ mb: 4 }}>
                      {t('mayLikeEvents.fallback_message')}
                    </Typography>
                  )}
                </Stack>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              pb: { xs: 4, md: 0 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h4" sx={{ mb: 4 }} fontWeight={600}>
              {t('mayLikeEvents.title')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {t('mayLikeEvents.description')}
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {t('mayLikeEvents.subDescription')}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Button
                variant="contained"
                startIcon={<InsertInvitationOutlinedIcon />}
                sx={{ borderRadius: '50px' }}
                size="medium"
                onClick={() => navigate({ to: APPROUTES.EVENTS })}
              >
                {t('mayLikeEvents.buttonLabel')}
              </Button>
            </Stack>
          </Grid>
        </DataLoaderWrapper>
      </Grid>

    </Box>
  );
};

export default MayLike;
