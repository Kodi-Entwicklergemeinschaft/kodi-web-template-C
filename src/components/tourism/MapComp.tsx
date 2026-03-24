import {
    Typography,
    Box,
    Grid,
} from '@mui/material';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import { useTranslation } from 'react-i18next';
import EventCard from '../shared/EventsCards';
import { EventCardVariant } from '../../types/listing.d';
import DataLoaderWrapper from '../loader/DataLoaderWrapper';
import { CATEGORIES } from '../../utilities/constants';
import { useSearch } from '@tanstack/react-router';
import { APPROUTES } from '../../utilities/routes';
import { start } from 'repl';
import { getRecomm } from '../../hooks/useGetRecomm';

const HighLightsSection = () => {
    // const { listingDetails: highlightsData } = useGetListingsWithCategories({
    //     categoryId: CATEGORIES.HIGHLIGHTS,
    //     pageSize: 3,
    // });
    // const { cityId, startAfterDate, endBeforeDate } = useSearch({ from: APPROUTES.EVENT_BY_ID, strict: true });
    // const { listingDetails: highlightsData } = useGetListingsWithCategories({
    //     pageSize: 3,
    //     sortByStartDate: true,
    //     isLocationEnabled: true,
    //     isKuselLoc: true,
    //     categoryId: CATEGORIES.TODAYS_EVENTS
    // });
    let { listingDetails: highlightsData, isLoading } = getRecomm() || [];
    highlightsData = highlightsData.slice(0, 3);
    // const { listingDetails: highlightsData , isLoading } = useGetListingsWithCategories({
    //     pageSize: 3,
    //     sortByStartDate: false,
    //     isLocationEnabled: true,
    //     isKuselLoc: true
    // });
    const { t } = useTranslation();
    return (
        <Box sx={{ px: 0, pb: 6, pt: 0 }}>
            <Typography variant="h4" sx={{ mb: 3, fontSize: '24px' }}>
                {t("tourism.mapcard.title")}
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

            <Grid container spacing={2}>
                {highlightsData.map(({ id, createdAt, title, address, description, logo, isFavorite, startDate, userId, cityId, categoryId }) => (
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
                                date={startDate ?? createdAt}
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
