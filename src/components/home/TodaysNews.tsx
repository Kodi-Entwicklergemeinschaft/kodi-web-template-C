import {
    Box,
    Grid,
    Typography,
    Stack,
    Button,
} from '@mui/material';
import InsertInvitationOutlinedIcon from '@mui/icons-material/InsertInvitationOutlined';
import CampaignIcon from '@mui/icons-material/Campaign';
import useGetListingsWithCategories from '../../hooks/useGetHiglights';
import { CATEGORIES } from '../../utilities/constants';
import { useRouter } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { APPROUTES } from '../../utilities/routes';
import EventCard from '../shared/EventsCards';
import { EventCardVariant } from '../../types/listing.d';
import DataLoaderWrapper from '../loader/DataLoaderWrapper';

const TodaysNews = () => {
    const { listingDetails: todaysNewsData , isLoading } = useGetListingsWithCategories(
        {
            categoryId: CATEGORIES.TODAYS_NEWS,
            pageSize: 3, sortByStartDate:true
        }
    );
    const { navigate } = useRouter();
    const { t } = useTranslation();

    return (
        <Box sx={{ px: 6, py: 8 }}>
            <Grid container spacing={6} alignItems="flex-start" direction={{ xs: 'column-reverse', sm: 'column-reverse', md: 'row' }} >
                <Grid item xs={12} md={5}>
                    <Typography variant="h4" sx={{ mb: 4 }} fontWeight={600}>
                        {t('todaysNews.title')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2 }}>
                        {t('todaysNews.description1')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        {t('todaysNews.description2')}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4 }}>
                        {t('todaysNews.description3')}
                    </Typography>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="contained"
                            startIcon={<CampaignIcon />}
                            sx={{ borderRadius: '50px' }}
                            size="medium"
                            onClick={() => navigate({ to: APPROUTES.NEWS })}
                        >
                            {t("virtualtownhall.newscard.button")}
                        </Button>
                    </Stack>
                </Grid>
                <Grid item xs={12} md={7}>
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
                                {todaysNewsData.map((event) => (
                                    <EventCard
                                        key={event.id}
                                        date={event.createdAt}
                                        id={event.id}
                                        createdAt={event.createdAt}
                                        title={event.title}
                                        address={event.address}
                                        description={event.description}
                                        variant={EventCardVariant.HORIZONTAL}
                                        logo={event.logo}
                                        isFavorite={event.isFavorite}
                                        userId={event.userId}
                                        cityId={event.cityId}
                                        categoryId={event.categoryId}
                                    />
                                ))}
                                {todaysNewsData.length === 0 && (
                                    <Typography variant="body1" sx={{ mb: 4 }}>
                                        {t('todaysNews.fallback_message')}
                                    </Typography>
                                )}
                            </Stack>
                        </Box>
                    </Box>
                </DataLoaderWrapper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default TodaysNews;
