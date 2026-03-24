import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography, Stack, Theme, useTheme, CircularProgress } from '@mui/material'
import TodaysNews from '../../components/home/TodaysNews'
import MunicipalCard from '../../components/kuselaltenglan/Municipality'
import useGetCityById from '../../hooks/useGetCityById'
import TownHallDetails from '../../components/shared/EventDetailsMap'
import IconCards from '../../components/kuselaltenglan/IconCards'
import { useTranslation } from 'react-i18next'
import { imageLoaderUtility } from '../../utilities/getImage'
import TodaysEvents from '../../components/home/TodaysEvents'
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper';
import { useState } from 'react'

export const Route = createFileRoute('/virtualtownhall/$id')({
  component: () => (
    <PrivateLayout>
      <VTHById />
    </PrivateLayout>
  ),
})

function VTHById() {
  const { id } = Route.useParams()
  const { t } = useTranslation()
  const theme = useTheme()
  const {
    CityDetails: {
      topFiveCities,
      onlineServices,
      latitude,
      longitude,
      image,
      name,
      address,
      description,
      openUntil,
      phone,
      websiteUrl,
      sourceId = 1,
    },
  } = useGetCityById(id)
  const { isLoading } = useGetCityById(id)
  const eventDetails = { latitude: latitude, longitude: longitude }
  const imageUrl = imageLoaderUtility(image, sourceId)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDOzBSSz5d6ktRygxSP0X8NyliHiNyKJVo&q=${eventDetails.latitude},${eventDetails.longitude}&zoom=15`

  return (
    <Box sx={{ px: 4 }}>
      <Box
        sx={{
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 200,
          top: '500px',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          width: '14rem',
          height: '14rem',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
          backgroundColor: theme.palette.common.white,
          border: `4px solid ${theme.palette.common.white}`,
          '@media (max-width:900px)': {
            top: '516px',
            width: '11rem',
            height: '11rem',
          },
          '@media (max-width:398px)': {
            top: '520px',
            left: '50%',
            width: '8rem',
            height: '8rem',
          },
        }}
      >
        {/* ✅ Loader shows until image is fully loaded */}
        {!isImageLoaded && (
          <CircularProgress
            size={40}
            sx={{ color: theme.palette.primary.main, position: 'absolute' }}
          />
        )}

        <Box
          component="img"
          src={imageUrl}
          alt={name}
          onLoad={() => setIsImageLoaded(true)}
          sx={{
            width: { xs: 80, sm: 100, md: 120 },
            height: { xs: 80, sm: 100, md: 180 },
            objectFit: 'contain',
            objectPosition: 'center',
            display: isImageLoaded ? 'block' : 'none',
            transition: 'width 0.3s, height 0.3s',
          }}
        />
      </Box>
      <DataLoaderWrapper isLoading={isLoading} height={600} >
        <Typography sx={{ color: '#18204F', fontSize: '24px', fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="h6" sx={{ mt: 2, color: '#18204F', fontSize: '16px', fontWeight: 400 }}>
          {description}
        </Typography>
        <Grid sx={{ mt: 1 }} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TownHallDetails
              Location={address ?? ''}
              LocationURL={url}
              Place={t('virtualtownhall.details.place')}
              OpeningHours={openUntil}
              PhoneNumber={phone ?? ''}
              Email={''}
              Website={websiteUrl ?? ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <IconCards onlineserviceList={onlineServices} />
          </Grid>
          <Grid item xs={12}>
            <MunicipalCard
              title={t('kuselaltenglan.municipal.title')}
              CardList={topFiveCities}
              button={true}
              Id={id}
            />
          </Grid>
        </Grid>
      </DataLoaderWrapper>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <TodaysEvents />
        </Grid>
        <Grid item xs={12}>
          <TodaysNews />
        </Grid>
      </Grid>
    </Box>
  )
}
