import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import Footer from '../components/home/Footer';
import HeroSection from '../components/home/HeroSection';
import { AuthLayoutProps } from '../types/layout';
import useGetUserDetails from '../hooks/useGetUser';
import { useTranslation } from 'react-i18next';

const PrivateLayout = ({ children, imageUrl }: AuthLayoutProps & { imageUrl?: string }) => {
  const { userData } = useGetUserDetails();
  const { t } = useTranslation();

  const username =
    userData?.firstname && userData?.firstname !== 'Hidden'
      ? `${userData.firstname} ${userData.lastname}`
      : t('guest_user');
  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, #e2ebf7, #ebf0f9, #f3f4fb, #f9fafd, #ffffff)`,
      }}
    >
      <NavBar username={username} />
      <HeroSection username={username} imageUrl={imageUrl} />
      <Box sx={{ maxWidth: 1400, m: 'auto' , pb:6 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default PrivateLayout;
