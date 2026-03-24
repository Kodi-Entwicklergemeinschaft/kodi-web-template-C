// index.tsx
import { createFileRoute } from '@tanstack/react-router';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Sidebar } from '../../components/sidebar';

import { Box } from '@mui/material';
import ListingsTable from '../../components/listingTable';

export const Route = createFileRoute('/dashboard/all-listings')({
  component: () => {
    const selectedTab = 'all';
    
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
          <Box
            sx={{
              width: {
                xs: '100%',
                sm: '220px',
                md: '240px',
              },
              flexShrink: 0, // Prevent sidebar from shrinking
            }}
          >
            <Sidebar />
          </Box>
          </Box>
          {/* Main Content */}
          <Box
            sx={{
              flexGrow: 1,
              ml: {
                xs: 0,  // No margin on extra small screens
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
            <ListingsTable selectedTab={selectedTab} />
          </Box>
       
      </DashboardLayout>
    );
  },
});