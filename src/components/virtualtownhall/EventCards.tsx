import { Stack, Box, Typography } from "@mui/material";
import NewsCard from "../shared/NewsCards";
import ViewAllButton from "../shared/ViewAllButton";
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';    
import { useTranslation } from "react-i18next";
import useCategoriesById from "../../hooks/useCategoriesById";
const EventCards = () => {  
    const {t} = useTranslation();
    const eventlist = useCategoriesById("3")
    if(!eventlist) return
    return(
        <Stack spacing={2}>
            <Box sx={{ display: 'flex'}}>
                <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px' }}>
                    {t("virtualtownhall.eventcard.title")}
                </Typography>
                <Box sx={{ padding:'5px'}}>
                <ArrowForwardIcon/>
                </Box>
            </Box>
            <Box sx={{bgcolor: (theme) => theme.palette.secondary.main,p:2}}>
                {eventlist&&eventlist.categoriesDetailsById.map((item, index) => (
                    <Box 
                        sx={{ display: 'inline-block', marginRight: '16px', marginBottom: '16px' }} 
                        key={index}
                    >
                        <NewsCard
                            id={item.id}
                            key={index}
                            imageUrl={item.logo}
                            cityId={item.cityId}
                            date={"04.09.2024"}
                            description={item.description}
                            location={item.title}
                            favoriteFet={true}
                            alt={item.title}
                            dateFet={true}
                            locationFet={true}
                            descriptionFet={true}
                            isFavorite={item.isFavorite}
                        />
                    </Box>
                ))}
            </Box>
            <ViewAllButton Icon={EventIcon} content={t("virtualtownhall.eventcard.button")}/>
        </Stack>
    )
}

export default EventCards;