import { Box, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import UserDetails from './UserDetails';
import DeleteUserAccount from './DeleteAccount';
import TabPanel from './TabPanel';
import FavoritesWithFilter from './settingsFavourite';

const SettingsTabView = () => {
  const { t } = useTranslation();
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        width: '100%',
        overflowX: { xs: 'auto', sm: 'visible' },
      }}
    >
      <Box
        sx={{
          m: 'auto',
          p: 2,
          width: '100%',
          maxWidth: tabValue === 2 ? '80%' : 1000,
          boxSizing: 'border-box',
        }}
      >
        <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              width: { xs: '20rem', sm: '30rem' }
            }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label={t('settings.tab.user_details')} />
            <Tab label={t('settings.tab.delete_account')} />
            <Tab label={t('settings.tab.favorites')} />
          </Tabs>

          <TabPanel
            value={tabValue}
            index={0}
            sx={{
              px: { xs: 2, sm: 4 },
              py: 3,
              width: '100%',
              maxWidth: 900,
              boxSizing: 'border-box',
            }}
          >
            <UserDetails />
          </TabPanel>

          <TabPanel
            value={tabValue}
            index={1}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              padding: { xs: 2, sm: 4 },
              width: '100%',
              maxWidth: 900,
              boxSizing: 'border-box',
            }}
          >
            <DeleteUserAccount />
          </TabPanel>

          <TabPanel
            value={tabValue}
            index={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: 2,
              padding: { xs: 2, sm: 4 },
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <FavoritesWithFilter />
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsTabView;
