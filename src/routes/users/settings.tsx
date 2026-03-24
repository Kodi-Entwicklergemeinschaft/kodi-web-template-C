import { createFileRoute, redirect } from '@tanstack/react-router';
import { Box } from '@mui/material';
import Footer from '../../components/home/Footer';
import NavBar from '../../components/NavBar';
import SettingsTabView from '../../components/settings/SettingsTabView';
import useGetUserDetails from '../../hooks/useGetUser';
import { IUserDatum } from '../../types/user';
import { createContext, useContext } from 'react';
import { IContextType } from '../../types/login';
import DataLoaderWrapper from '../../components/loader/DataLoaderWrapper';

export const Route = createFileRoute('/users/settings')({
  component: UserSettings,
  beforeLoad: ({ context }: { context: IContextType }) => {
    if (!context?.auth?.isAuthenticated) {
      context.auth?.removeToken();
      throw redirect({
        to: '/login',
        search: {},
      });
    }
  },
});

export const UserDetailsContext = createContext<IUserDatum | null>(null);

export const useUserDetailsContext = () => {
  const ctx = useContext(UserDetailsContext);
  if (!ctx) throw new Error('User details context not found');
  return ctx;
};

function UserSettings() {
  const { userData, loading } = useGetUserDetails();

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        backgroundImage: `linear-gradient(to bottom, #e2ebf7, #ebf0f9, #f3f4fb, #f9fafd, #ffffff)`,
      }}
    >
      {/* Top NavBar */}
      <NavBar username={userData ? `${userData.firstname} ${userData.lastname}` : ''} />

      {/* Main Content Area */}
      <DataLoaderWrapper isLoading={loading} height="80vh" width="100%">
      <Box sx={{ maxWidth: '100%', m: 'auto', mt: 10 }} flex="1">
          {userData && (
            <UserDetailsContext.Provider value={userData}>
              <SettingsTabView />
            </UserDetailsContext.Provider>
          )}
        
      </Box>
      </DataLoaderWrapper>

      {/* Footer */}
      <Footer />
    </Box>
  );
}
