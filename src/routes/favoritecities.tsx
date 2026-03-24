import { createFileRoute, redirect } from '@tanstack/react-router';
import { IContextType } from '../types/login';
import useGetFavoriteCities from '../hooks/useGetFavoriteCities';
import { Box, Typography, Grid } from '@mui/material';
import { t } from 'i18next';
import { STORAGE_KEYS } from '../utilities/constants';
import MunicipalCard from '../components/kuselaltenglan/Municipality';
import PrivateLayout from '../layouts/PrivateLayout';
import DataLoaderWrapper from '../components/loader/DataLoaderWrapper';
const FavoritesCities = () => {
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) ?? ''
  const { CityList , isLoading } = useGetFavoriteCities(userId);
  return <Box sx={{ px: 6, pb: 6, pt: 0 }}>
    <Typography variant="h4" sx={{ mb: 3 }} fontWeight={600}>
      {t('favoritescities.title')}
    </Typography>
    <Typography variant="body1" sx={{ maxWidth: '60%', mb: 4 }}>
      {t('favoritescities.description')}
    </Typography>
    <DataLoaderWrapper isLoading={isLoading} height={400}>
    <Box sx={{ ml: 4, mr: 4, mt: 2, mb: 2 }} >
      <MunicipalCard CardList={CityList} isAllFav={true}/>
    </Box>
    </DataLoaderWrapper>
  </Box>
}

export const Route = createFileRoute('/favoritecities')({
  component: () => <PrivateLayout><FavoritesCities /></PrivateLayout>,
  beforeLoad: ({ context }: { context: IContextType }) => {
    if (!context?.auth?.isAuthenticated) {
      context.auth?.removeToken();
      throw redirect({
        to: '/login',
        search: {},
      });
    }
  },
})
