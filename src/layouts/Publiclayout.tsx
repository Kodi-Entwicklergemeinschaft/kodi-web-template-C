import { Box, Paper } from '@mui/material';
import bgImage from '../assets/background.jpeg';
import { AuthLayoutProps } from '../types/layout';

const PublicLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          // opacity: 0.8
        }}
      />
      <Box sx={{ zIndex: 1, textAlign: 'center' }}>
        <Paper
          elevation={3}
          sx={{
            width:{  xs: '100%', sm: 450},
            py: { xs: 3, sm: 4 },
            px: { xs: 2, sm: 4 },
            borderRadius: 4,
            background: (theme) => theme.palette.secondary.main,
          }}
        >
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default PublicLayout;