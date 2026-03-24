import { Box, Typography } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from "react-i18next";
import MapCard from "../shared/MapCard";    
const mapcardlist = [
    {
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        location: "Berlin",
        title: "Berlin Town Hall",
        date: "04.09.2024",
        
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        location: "Munich",
        title: "Munich Town Hall",
        date: "01.10.2023",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        location: "Frankfurt",
        title: "Frankfurt Town Hall",
        date: "12.10.2023",
    },
    {
        imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
        location: "Hamburg",
        title: "Hamburg Town Hall",
        date: "10.10.2023",
    },
]
const MapComp = () => {
    const { t } = useTranslation();
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto'}}>
                <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px', fontWeight: 500 }}>
                Highlights
                </Typography>
                <Box sx={{ padding: '5px' }}>
                    <ArrowForwardIcon />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', pt: 2, pb:2 }}>
                {
                    mapcardlist.map((mapcard, index) => (
                        <MapCard
                            key={index}
                            imageUrl={mapcard.imageUrl}
                            location={mapcard.location}
                            title={mapcard.title}
                            date={mapcard.date}
                        />
                    ))
                }
            </Box>
        </Box>
    );
}
export default MapComp;