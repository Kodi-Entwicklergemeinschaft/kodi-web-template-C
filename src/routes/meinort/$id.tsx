
import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography, useTheme, Paper, CircularProgress } from '@mui/material'
import MapComp from '../../components/tourism/MapComp'
import HighLightsSection from '../../components/home/HighlightsSection'
import TodaysNews from '../../components/home/TodaysNews'
import { useTranslation } from 'react-i18next'
import VTHCard from '../../components/shared/IconCard'
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TownHallDetails from '../../components/shared/EventDetailsMap'
import useGetCityById from '../../hooks/useGetCityById'
import Avatar from '@mui/material/Avatar'
import { imageLoaderUtility } from '../../utilities/getImage'
import TodaysEvents from '../../components/home/TodaysEvents'
import useGetListingsWithCategories from '../../hooks/useGetHiglights'
import { useState } from 'react'
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper'

export const Route = createFileRoute('/meinort/$id')({
  component: () => (
    <PrivateLayout>
      <Kusel />
    </PrivateLayout>
  ),
})

function Kusel() {
  const { t } = useTranslation();
  const { id } = Route.useParams()
  const { CityDetails , isLoading } = useGetCityById(id);
  const mapList = useGetListingsWithCategories({ categoryId: "41" })
  const theme = useTheme();

  const [imageLoaded, setImageLoaded] = useState(false);

  if (!CityDetails) return
  const eventDetails = { latitude: CityDetails.latitude, longitude: CityDetails.longitude }
  const imageUrl = imageLoaderUtility(CityDetails.image, CityDetails.sourceId ?? 1)
  const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDOzBSSz5d6ktRygxSP0X8NyliHiNyKJVo&q=${eventDetails.latitude},${eventDetails.longitude}&zoom=15`

  return (
    <Box sx={{ px: 4 }}>
      <Box
        sx={{
          borderRadius: '50%',
          position: 'absolute',
          zIndex: 200,
          top: { xs: '520px', sm: '516px', md: '500px' },
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          width: { xs: 100, sm: 156, md: 222 },
          height: { xs: 100, sm: 156, md: 222 },
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: 3,
          backgroundColor: theme.palette.common.white,
          border: `4px solid ${theme.palette.common.white}`,
          overflow: 'hidden',
        }}
      >
        {!imageLoaded && <CircularProgress size={40} thickness={4} />}
        <Box
          component="img"
          src={imageUrl}
          alt={CityDetails.name}
          onLoad={() => setImageLoaded(true)}
          sx={{
            width: { xs: 60, sm: 80, md: 120 },
            height: { xs: 60, sm: 80, md: 180 },
            objectFit: 'contain',
            objectPosition: 'center',
            display: imageLoaded ? 'block' : 'none',
            transition: 'width 0.3s, height 0.3s',
          }}
        />
      </Box>
      <DataLoaderWrapper isLoading={isLoading} height={400}>
      <Typography sx={{ color: '#18204F', fontSize: '28px', fontWeight: 600 }}>
        {CityDetails.name}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, color: '#18204F', fontSize: '16px', fontWeight: 600 }}>
        {CityDetails.subtitle}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, color: '#18204F', fontSize: '16px', fontWeight: 400 }}>
        {CityDetails.description}
      </Typography>
      </DataLoaderWrapper>

      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12}>
          <HighLightsSection />
        </Grid>
        <Grid item xs={12}>
          <TodaysEvents />
        </Grid>
        <Grid item xs={12}>
          <TodaysNews />
        </Grid>
        
        <Grid xs={12} sm={6} sx={{ mt: 2, pl: 2 }}>
          <DataLoaderWrapper isLoading={mapList.isLoading} height={300}>
          <TownHallDetails
            Location='Schulstraße 3-7, 66885 Altenglan'
            Place={t("virtualtownhall.details.place")}
            OpeningHours={CityDetails.openUntil}
            LocationURL={url}
            PhoneNumber='06381 60800'
            Website='Website besuchen'
          />
           </DataLoaderWrapper>
        </Grid>
       

     
        {(CityDetails?.mayor_name) && (
          <Grid xs={12} sm={6} sx={{ mt: 2, pl: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DataLoaderWrapper isLoading={isLoading} height={200}>
            <Typography variant="h6" sx={{ color: '#18204F', fontSize: '16px', fontWeight: 600 }}>
              Rathaus Kusel
            </Typography>
            <Paper
              elevation={3}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                padding: 2,
                background: theme.palette.common.white,
                borderRadius: '16px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  cursor: 'pointer',
                },
              }}
            >
              <Avatar
                src={imageLoaderUtility(CityDetails?.mayor_image ?? '', CityDetails.sourceId ?? 1)}
                sx={{ width: 56, height: 56 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#18204F' }}>
                  {CityDetails?.mayor_name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#18204F' }}>
                  {CityDetails?.mayor_description}
                </Typography>
              </Box>
            </Paper>

            {(CityDetails.onlineServices) &&
              CityDetails?.onlineServices.map((service, index) => (
                <VTHCard
                  title={service.title}
                  IconUrl={service.iconUrl}
                  RightIcon={CheckBoxIcon}
                  description={service.description ?? ''}
                  key={index}
                  href={service.linkUrl}
                />
              ))
            }
            </DataLoaderWrapper>
          </Grid>
          
        )}
      </Grid>
    </Box>
  )
}
