// index.tsx
import { createFileRoute } from '@tanstack/react-router';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Sidebar } from '../../components/sidebar';

import { Box } from '@mui/material';
import ListingsTable from '../../components/listingTable';
import CityTable from '../../components/cityTable';

export const Route = createFileRoute('/cities/')({
  component: () => {
    const selectedTab = 'my';

    return (
      <DashboardLayout>
        <Box
          sx={{
            display: 'flex',
            mt: {
              xs: 0,
              sm: '90px',
            },
          }}
        >
          {/* Sidebar */}
        </Box>
        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            ml: {
              xs: 0, // No margin on extra small screens
              sm: '16px', // Small margin on small screens
              md: '24px', // Larger margin on medium screens
            },
            p: {
              xs: '8px', // Small padding on mobile
              sm: '16px', // Larger padding on larger screens
            },

            overflowX: 'auto', // Add horizontal scroll if content overflows
          }}
        >
          <CityTable  />
        </Box>
      </DashboardLayout>
    );
  },
});
