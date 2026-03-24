import { Box, Stack, Typography } from '@mui/material';
import bgImage from '../../assets/background.jpeg';
import { AppleStoreIcon } from './assets/AppleStoreIcon';
import { GooglePlayStoreIcon } from './assets/GooglePlayStoreIcon';
import HeroWaveIcon from './assets/HeroWaveIcon';
import { useTranslation } from 'react-i18next';

const HeroSection = ({ username, imageUrl }: { username: string, imageUrl?: string }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
      height: '600px',
      backgroundImage: `url(${imageUrl ? imageUrl : bgImage})`,
      backgroundSize: `${imageUrl ? 'contain' : 'cover'}`,
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'white',
      backgroundPosition: 'center',
      position: 'relative',
      maxWidth: '100%',
      margin: 'auto',
      }}
    >
      <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        height: '600px',
        width: '100%',
        backgroundColor: '#7D9FCB',
        opacity: `${imageUrl ? 0 : 0.7}`,
        zIndex: 100,
      }}
      />
      <Box
      sx={{
        height: '100%',
        position: 'absolute',
        bottom: 0,
        zIndex: 101,
        margin: 'auto',
        width: '100%',
      }}
      >
      {(!imageUrl) && <Box
        sx={{
        maxWidth: 1400,
        margin: 'auto',
        display: 'flex',
        height: '100%',
        width: '100%',
        padding: '1.5rem',
        justifyContent: { xs: 'center', md: 'space-between' },
        alignItems: 'center',
        flexDirection: { xs: 'column', md: 'row' },
        textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Box>
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
          color: (theme) => theme.palette.primary.dark,
          fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          {t('heroSection.hey')} {username}!
        </Typography>
        <Typography
          variant="h3"
          fontWeight={700}
          sx={{
          color: (theme) => theme.palette.primary.dark,
          fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          {t('heroSection.message')}
        </Typography>
        </Box>
        <Box
        sx={{
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mt: { xs: 4, md: 0 },
          background: 'rgba( 40, 53, 131, 0.5 )',
          backdropFilter: 'blur( 1px )',
          borderRadius: '10px',
          border: '1px solid rgba( 255, 255, 255, 0.18 )',
          alignSelf: { xs: 'center', md: 'auto' },
        }}
        >
        <Typography variant="subtitle1" sx={{ color: '#fff' }}>
          {t('heroSection.appStoreMessage')}
        </Typography>

        <Box
          sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          '@media (max-width:399px)': {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          },
          '@media (min-width:400px)': {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          },
          }}
        >
          <AppleStoreIcon />
          <GooglePlayStoreIcon />
        </Box>
        </Box>
      </Box>}
      </Box>
      <Box
      sx={{
        position: 'absolute',
        bottom: 0,
        height: '200px',
        zIndex: 101,
        width: '100%',
      }}
      >
      <HeroWaveIcon style={{ width: '100%',  margin: 'auto' }} />
      </Box>
    </Box>
  );
};

export default HeroSection;
