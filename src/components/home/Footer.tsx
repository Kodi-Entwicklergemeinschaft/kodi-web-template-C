import { Box, Grid, Stack, Typography, Button, Link } from '@mui/material';
import { Mask } from './assets/Mask';
import { GooglePlayStoreIcon } from './assets/GooglePlayStoreIcon';
import { AppleStoreIcon } from './assets/AppleStoreIcon';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { APPROUTES } from '../../utilities/routes';

const Footer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', mt: 0, bgcolor: '#0f1235', color: '#fff', px: 4, py: 6 }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '40%',
          height: '100px',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
  </Box>
        
        <Box sx={{ maxWidth: 1400, mx: 'auto', px: { xs: 2, sm: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Stack
              direction={{ xs: 'row', md: 'column' }}
              spacing={{ xs: 2, md: 2 }}
              justifyContent="space-between"
              alignItems={{ xs: 'center', md: 'flex-start' }}
              sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' }, '@media (max-width:398px)': {flexDirection: 'column',alignItems: 'center',gap: 3, },}}
            >
              <Box sx={{ flex: 1, minWidth: 0, '@media (max-width:398px)':{pb:3} }}>
                <Stack spacing={1} alignItems="flex-start" sx={{ '@media (max-width:398px)': { alignItems: 'center' } }}>
                  <Link component="button" underline="always" color="inherit" onClick={() => navigate({ to: APPROUTES.IMPRESSUM })}>
                    {t('footer.imprint')}
                  </Link>
                  <Link component="button" underline="always" color="inherit" onClick={() => navigate({ to: APPROUTES.TERMS })}>
                    {t('footer.terms_of_use')}
                  </Link>
                  <Link component="button" underline="always" color="inherit" onClick={() => navigate({ to: APPROUTES.PRIVACY_POLICY })}>
                    {t('footer.privacy_policy')}
                  </Link>
                </Stack>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'flex-end', md: 'flex-start' } }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}  sx={{'@media (max-width:398px)': {alignItems: 'center',}, }}>
                  <AppleStoreIcon />
                  <GooglePlayStoreIcon />
                </Stack>
              </Box>
            </Stack>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'center', md: 'flex-start' },
              textAlign: { xs: 'center', md: 'left' },
              gap: 4,
              mt: { xs: 4, md: 0 },
            }}
          >
       <Box
        sx={{
          width: 150,
          height: 150,
          minWidth: 150,
          minHeight: 150,
          maxWidth: 150,
          maxHeight: 150,
          borderRadius: '50%',
          backgroundColor: '#e0efc8',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexShrink: 0, 
        }}
      >
        <Box
          sx={{
            transform: 'scale(1.7) translateY(10%)',
            transformOrigin: 'top center',
            width: '100%',
            height: '100%',
          }}
        >
          <Mask />
        </Box>
      </Box>
      


            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{t('footer.feedbackQuestion')}</Typography>
              <Typography variant="body2" maxWidth={300} mt={2}>
                {t('footer.message')}
              </Typography>
              <Button
                variant="contained"
                sx={{ bgcolor: '#3741a0', borderRadius: 5, px: 4, mt: 4, width: '100%' }}
                onClick={() => navigate({ to: APPROUTES.FEEDBACK })}
              >
                {t('footer.feedback')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
