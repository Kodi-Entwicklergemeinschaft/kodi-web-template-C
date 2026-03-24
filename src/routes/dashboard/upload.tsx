// index.tsx
import { createFileRoute } from '@tanstack/react-router';
import DashboardLayout from '../../layouts/DashboardLayout';
import { Sidebar } from '../../components/sidebar';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { Box } from '@mui/material';
import ListingsTable from '../../components/listingTable';
import UploadListings from '../../components/UploadListings';
import ListingForm from '../../components/ListingForm';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export const Route = createFileRoute('/dashboard/upload')({
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
           <UploadListings isEdit={false} />
           </LocalizationProvider>
          </Box>
       
      </DashboardLayout>
    );
  },
});