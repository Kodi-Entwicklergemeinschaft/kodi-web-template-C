import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import NavBar from '../components/NavBar';
import { AuthLayoutProps } from '../types/layout';
import useGetUserDetails from '../hooks/useGetUser';
import Footer from '../components/home/Footer';
import EventsHeroSection from '../components/events/EventsHeroSection';

const Eventslayout = ({ children, imageurl }: AuthLayoutProps & { imageurl?: string }) => {
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
      <EventsHeroSection imageUrl={imageurl} />
      <Box sx={{ maxWidth: 1400, margin: 'auto' , pb:6 }}>{children}</Box>
      <Footer />
    </Box>
  );
};

export default Eventslayout;