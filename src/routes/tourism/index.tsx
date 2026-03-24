import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography } from '@mui/material'
import Details from '../../components/tourism/Details'
import IconCards from '../../components/tourism/IconCards'
import EventCardsTourism from '../../components/tourism/EventCards'
import MapComp from '../../components/tourism/MapComp'
import { useTranslation } from 'react-i18next'
import useGetTourism from '../../hooks/useGetTourism'
import useGetListingsWithCategories from '../../hooks/useGetHiglights'
import TodaysEvents from '../../components/home/TodaysEvents'
import NearYou from '../../components/home/NearYou'
export const Route = createFileRoute('/tourism/')({
  component: () => (
    <PrivateLayout>
      <RouteComponent />
    </PrivateLayout>
  ),
})

function RouteComponent() {
  const { t } = useTranslation()
  const { TourismDetails } = useGetTourism()
  const serviceList = TourismDetails?.servicesOffered
  return (
    <Box sx={{ px: 4 }}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 200,
          top: '500px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90vw',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
        </Box>
      </Box>
      <Typography variant="h6" sx={{ color: '#18204F', fontSize: '28px', fontWeight: 600 }}>
        {TourismDetails?.title}
      </Typography>
      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <MapComp />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Details />
        </Grid>
        {(serviceList) && <Grid item xs={12} sm={6}>
          <IconCards serviceList={serviceList} />
        </Grid>}
        <Grid item xs={12}>
          {/* <EventCardsTourism nearYouList={listingDetails} /> */}
          <NearYou />
        </Grid>
        <Grid item xs={12}>
          <TodaysEvents />
        </Grid> 
      </Grid>
    </Box>
  )
}
