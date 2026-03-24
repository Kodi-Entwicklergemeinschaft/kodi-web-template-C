import { createFileRoute } from '@tanstack/react-router'
import PrivateLayout from '../../layouts/PrivateLayout'
import { Box, Grid, Typography, useTheme, Paper } from '@mui/material'
import IconCards from '../../components/mobility/IconCards'
import MailIcon from '@mui/icons-material/Mail';
import CallIcon from '@mui/icons-material/Call';
import { useTranslation } from 'react-i18next';
import useGetMobility from '../../hooks/useGetMobility';
import { MobilityService } from '../../types/mobility';
import Eventslayout from '../../layouts/EventsLayout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper';


export const Route = createFileRoute('/mobility/')({
  component: () => {
    const { MobilityDetails ,isLoading } = useGetMobility();
    if (!MobilityDetails) return;
    return (
      <Eventslayout imageurl={MobilityDetails.imageUrl ?? ''}>
        <DataLoaderWrapper isLoading={isLoading} height={500} width="100%">
        <Box sx={{ mt: '-60px' }}>
          <Mobility MobilityDetails={MobilityDetails} />
        </Box>
        </DataLoaderWrapper>
      </Eventslayout>
    )
  }
})

function Mobility({ MobilityDetails }: { MobilityDetails: MobilityService }) {
  const { t } = useTranslation()
  const theme = useTheme();
  const ServiceList = MobilityDetails.servicesOffered
  if (!ServiceList) return
  const MoreInfoList = MobilityDetails.moreInformations
  if (!MoreInfoList) return
  const ContactDetails = MobilityDetails.contactDetails
  if (!ContactDetails) return
  return (
    <Box sx={{ px: 4, color: '#18204F' }}>
      <Typography sx={{ fontSize: '28px', fontWeight: 600 }}>
        {MobilityDetails.title}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2, fontSize: '16px', fontWeight: 600 }}>
        {MobilityDetails.description}
      </Typography>
      <Grid sx={{ mt: 1 }} container spacing={2}>
        <Grid item xs={12} sm={6}>
          <IconCards serviceList={ServiceList} />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: '40px' }}>
          {MoreInfoList.map((item, idx) => (
            <Box>
              <Typography sx={{ fontSize: '16px', fontWeight: 600, padding: 1 }}>{item.title}</Typography>
              <Typography sx={{ fontSize: '16px', fontWeight: 400, padding: 1 }}>{item.description}</Typography>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  bgcolor: (theme) => theme.palette.common.white,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: 6,
                    cursor: 'pointer',
                  },
                }}
              >
                <CallIcon />
                <Typography>{item.phone}</Typography>
              </Paper>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
          {ContactDetails.length > 0 && < Typography sx={{ fontWeight: 600, fontSize: '20px', pt: 2, pb: 2 }}>{t("mobility.infocard.title")}</Typography>}
          {ContactDetails.length > 0 && ContactDetails.map((item, idx) =>
            <Box sx={{
              bgcolor: theme.palette.common.white, borderRadius: '16px', pt: 4, pb:4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, mt: 1, boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              width: '100%',
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2}}>
                <MailIcon />
                <Typography>{item.email}</Typography>
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box >
  )
}
