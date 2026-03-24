import { createFileRoute } from '@tanstack/react-router';
import { Box } from '@mui/material';
import PrivateLayout from '../layouts/PrivateLayout';
import HighLightsSection from '../components/home/HighlightsSection';
import NearYou from '../components/home/NearYou';
import TodaysEvents from '../components/home/TodaysEvents';
import WeatherCard from '../components/home/Weather';
import TodaysNews from '../components/home/TodaysNews';
const Index = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', pl: 4, pr: 6 }}>
      <HighLightsSection />
      <WeatherCard />
      <NearYou />
      <TodaysEvents />
      {/* <Box sx={{}}> */}
      <TodaysNews />
      {/* </Box> */}
    </Box>
  );
};

export const Route = createFileRoute('/')({
  component: () => (
    <PrivateLayout>
      <Index />
    </PrivateLayout>
  ),
});
