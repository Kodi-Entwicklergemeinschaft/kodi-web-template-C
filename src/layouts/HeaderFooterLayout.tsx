import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import Footer from '../components/home/Footer';
import { AuthLayoutProps } from '../types/layout';

const headFootLayout= ({ children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, #e2ebf7, #ebf0f9, #f3f4fb, #f9fafd, #ffffff)`,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar username="" />
      <Box sx={{ flexGrow: 1, maxWidth: 1400, m: 'auto', width: '100%', py: 4 }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default headFootLayout;
