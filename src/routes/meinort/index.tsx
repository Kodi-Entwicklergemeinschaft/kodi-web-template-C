import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography } from '@mui/material'
import MunicipalCard from '../../components/kuselaltenglan/Municipality'
import MapComp from '../../components/virtualtownhall/MapComp'
import { useTranslation } from 'react-i18next'
import useGetMeinOrtData from '../../hooks/useGetMeinOrt'
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper'

export const Route = createFileRoute('/meinort/')({
  component: () => (
    <PrivateLayout>
      <Meinort />
    </PrivateLayout>
  ),
})

function Meinort() {
  const { t } = useTranslation()
  const {MeinOrtList , isLoading} = useGetMeinOrtData()
  if(!MeinOrtList){
    return
  }
  return (
    <Box sx={{ px: 4 }}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: 200,
          top: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '90vw',
        }}
      >
      </Box>
      <Typography  sx={{ color: '#18204F', fontSize: '28px', fontWeight:600 }}>
          {t("burgerservice.secondcard.Name")}
      </Typography>
      <Typography variant="h6" sx={{ mt:2, color: '#18204F', fontSize: '16px', fontWeight:400 }}>
          {t("meinort.description")}
      </Typography>
      <DataLoaderWrapper isLoading={isLoading} height={500}>
      <Grid sx={{mt:1}} container spacing={2}>
        <Grid item xs={12}>
          <MapComp municipalityList={MeinOrtList} />
        </Grid>
        <Grid item xs={12}>
          {
            MeinOrtList.map((municipalities, idx) => (
              <MunicipalCard CardList={municipalities?.topFiveCities} key={idx} title={municipalities.name} button={true} Id={municipalities.id}/>
            ))
          }
        </Grid>
      </Grid>
      </DataLoaderWrapper>
    </Box>
  )
}
