import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography, useTheme, Button } from '@mui/material'
import IconCards from '../../components/mitchmachen/IconCards'
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import useGetMitchmen from '../../hooks/useGetMitchmen';
import { useTranslation } from 'react-i18next'
import { DiscoverService } from '../../types/mitmachen';
import Eventslayout from '../../layouts/EventsLayout';
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper';

export const Route = createFileRoute('/mitchmachen/')({
  component: () => {
    const { Mitchmendata , isLoading } = useGetMitchmen();
    return (
      
      <Eventslayout imageurl={Mitchmendata?.imageUrl ?? ''}>
        <DataLoaderWrapper isLoading={isLoading} height={500} width="100%">
        <Mobility Mitchmendata={Mitchmendata} />
        </DataLoaderWrapper>
      </Eventslayout>
     
    )
  }
})

function Mobility({ Mitchmendata }: { Mitchmendata: DiscoverService }) {
  const { t } = useTranslation()
  const theme = useTheme();
  return (
    <Box sx={{ px: 4, color: '#18204F' }}>
      <Typography sx={{ fontSize: '28px', fontWeight: 600 }}>
        {Mitchmendata.title}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, fontSize: '16px', fontWeight: 600 }}>
        {t("mitchmachen.subheading")}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, fontSize: '16px', fontWeight: 400 }}>
        {Mitchmendata.description}
      </Typography>
      {(Mitchmendata.links) && Mitchmendata.links.map((item, index) => (
        <Button sx={{ background: '#283583', color: 'white', width: '200px', height: '50px', borderRadius: '24px', mt: 2, '&:hover': { background: '#283583', color: 'white' } }} key={index} href={item.linkUrl ?? '#'} target="_blank" rel="noopener noreferrer">
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {item.title}
          </Box>
        </Button>
      ))}
      <Grid sx={{ mt: 1 }} container spacing={2}>
        {(Mitchmendata.servicesOffered) && <Grid item xs={12} sm={6}>
          <IconCards servicesofferedLis={Mitchmendata.servicesOffered} />
        </Grid>}
        <Grid item xs={12} sm={6} sx={{ mt: '40px', p: 2 }}>
          {Mitchmendata.moreInformations && Mitchmendata.moreInformations.map((item, index) => (
            <Box>
              <Typography variant="h6" sx={{ mt: 2, fontSize: '20px', fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="h6" sx={{ mt: 2, fontSize: '16px', fontWeight: 400 }}>
                {item.description}
              </Typography>
            </Box>
          )
          )}
        </Grid>
        <Grid item xs={12}>
          {(Mitchmendata.contactDetails?.length>0) && <Typography sx={{ fontWeight: 600, fontSize: '20px', pt: 2, pb: 2 }}>{t("mobility.infocard.title")}</Typography>}
          {Mitchmendata.contactDetails && Mitchmendata.contactDetails.map((item, index) => (
            <Box sx={{
              bgcolor: theme.palette.common.white, borderRadius: '16px', p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'scale(1.02)',
                boxShadow: 6,
                cursor: 'pointer',
              },
            }}>
              <Typography sx={{ fontWeight: 600 }}>{item.title}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <CallIcon />
                <Typography>{item.phone}</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <MailIcon />
                <Typography>{item.email}</Typography>
              </Box>
            </Box>
          ))
          }
        </Grid>
      </Grid>
    </Box>
  )
}
