import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography, useTheme, CircularProgress } from '@mui/material'
import TownHallDetails from '../../components/virtualtownhall/Details'
import IconCards from '../../components/virtualtownhall/IconCards'
import NewsCards from '../../components/virtualtownhall/newsCard'
import MapComp from '../../components/virtualtownhall/MapComp'
import useGetVTH from '../../hooks/useGetVTH'
import { imageLoaderUtility } from '../../utilities/getImage'
import { useTranslation } from 'react-i18next'
import TodaysEvents from '../../components/home/TodaysEvents'
import TodaysNews from '../../components/home/TodaysNews'
import { useState } from 'react'
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper'

export const Route = createFileRoute('/virtualtownhall/')({
  component: () => (
    <PrivateLayout>
      <RouteComponent />
    </PrivateLayout>
  ),
})

function RouteComponent() {
  const { t } = useTranslation()
  const { VTHList, isLoading } = useGetVTH()
const { image, name, municipalities, sourceId = 1 } = VTHList

  const theme = useTheme()
  const imageUrl = imageLoaderUtility(image, sourceId)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

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
       
      <Typography sx={{ color: '#18204F', fontSize: '28px', fontWeight: 600 }}>
        {t('virtualtownhall.name')}
      </Typography>
      <Typography sx={{ color: '#18204F', fontSize: '20px', fontWeight: 500 }}>
        {t('virtualtownhall.title') + ' ' + name}
      </Typography>
      
      
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <DataLoaderWrapper isLoading={isLoading} height={400} width="100%" >
        <Grid item xs={12} sm={6}>
          
          <TownHallDetails />
          
        </Grid>
        <Grid item xs={12} sm={6}>
           
          <IconCards />
          
        </Grid>
        
        {municipalities && (
          <Grid item xs={12}>
            <MapComp municipalityList={municipalities} />
          </Grid>
        )}
        </DataLoaderWrapper>
       
        
        <Grid item xs={12}>
          <TodaysNews />
        </Grid>
        <Grid item xs={12}>
          <TodaysEvents />
        </Grid>
      </Grid>
    </Box>
  )
}
