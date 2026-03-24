import { Box, Dialog, DialogContent, IconButton, CircularProgress } from '@mui/material';
import bgImage from '../../assets/eventsBg.jpeg';
import HeroWaveIcon from '../home/assets/HeroWaveIcon';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const EventsHeroSection = ({ imageUrl }: { imageUrl?: string }) => {
  const [open, setOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const bannerUrl = imageUrl ?? bgImage;
  const fullImageUrl = bannerUrl?.split('?')[0];

  return (
    <>
      {/* Clickable background banner */}
      <Box
        onClick={() => setOpen(true)}
        sx={{
          height: '600px',
          backgroundColor: 'white',
          overflow: 'hidden',
          position: 'relative',
          maxWidth: '100%',
          margin: 'auto',
          marginBottom: '5rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '@media (max-width: 900px)': { height: '520px' },
          '@media (max-width: 680px)': { height: '460px' },
          '@media (max-width: 500px)': { height: '420px' },
        }}
      >
        {/* Loader while banner image loads */}
        {!isImageLoaded && (
          <CircularProgress
            size={50}
            sx={{ color: 'primary.main', position: 'absolute', zIndex: 10 , marginBottom: '5rem'}}
          />
        )}

        {/* Banner image */}
        <Box
          component="img"
          src={fullImageUrl}
          alt="Event Banner"
          onLoad={() => setIsImageLoaded(true)}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: isImageLoaded ? 'block' : 'none',
          }}
        />

        {/* Wave icon at bottom */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            height: '20rem',
            zIndex: 101,
            width: '100%',
          }}
        >
          <HeroWaveIcon style={{ width: '100%', margin: 'auto' }} />
        </Box>
      </Box>

      {/* Fullscreen image modal */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xl">
        <DialogContent sx={{ p: 0, bgcolor: 'black', position: 'relative' }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 1000,
              color: 'white',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Optional: loader for fullscreen image too */}
          {!isImageLoaded && (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 500,
                bgcolor: 'rgba(0, 0, 0, 0.4)',
              }}
            >
              <CircularProgress size={60} sx={{ color: 'white' }} />
            </Box>
          )}

          <img
            src={fullImageUrl}
            alt="Fullscreen Event Banner"
            onLoad={() => setIsImageLoaded(true)}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              maxHeight: '90vh',
              display: isImageLoaded ? 'block' : 'none',
              margin: '0 auto',
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EventsHeroSection;
