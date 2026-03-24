import { Box } from '@mui/material';
import NavBar from '../components/NavBar';
import Footer from '../components/home/Footer';
import HeroSection from '../components/home/HeroSection';
import { AuthLayoutProps } from '../types/layout';
import useGetUserDetails from '../hooks/useGetUser';
import { useTranslation } from 'react-i18next';

const DashboardLayout = ({ children }: AuthLayoutProps) => {
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

      <Box>{children}</Box>
    </Box>
  );
};

export default DashboardLayout;
