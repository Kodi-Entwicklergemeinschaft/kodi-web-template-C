import { Stack, Box, Typography } from "@mui/material";
import NewsCard from "../shared/NewsCards";
import ViewAllButton from "../shared/ViewAllButton";
import EventIcon from '@mui/icons-material/Event';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from "react-i18next";
import { IDatum } from "../../types/listing";
import { getFormattedDate } from "../../utilities/dateTime";
 
const EventCardsTourism = ({nearYouList}:{nearYouList:IDatum[]}) => {  
    const {t} = useTranslation();
    return(
        <Stack spacing={2}>
            <Box sx={{ display: 'flex'}}>
                <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px' }}>
                    {t("tourism.nearyour.title")}
                </Typography>
                <Box sx={{ padding:'5px'}}>
                <ArrowForwardIcon/>
                </Box>
            </Box>
            <Box sx={{bgcolor: (theme) => theme.palette.secondary.main,p:2}}>
                {nearYouList.map((item, index) => (
                    <Box
                        sx={{ display: 'inline-block', marginRight: '16px', marginBottom: '16px' }}
                        key={index}
                    >
                    <NewsCard
                    id={item.id}
                    key={index}
                    imageUrl={item.logo}
                    date={getFormattedDate(item.startDate ?? "")}
                    description={item.description}
                    location={item.title}
                    favoriteFet={true}
                    alt={item.title}
                    dateFet={true}
                    locationFet={true}
                    cityId={item.cityId}
                    descriptionFet={true}
                />
                    </Box>
                ))}
            </Box>
            <ViewAllButton Icon={EventIcon} content={t("tourism.nearyour.button")}/>
        </Stack>
    )
}
 
export default EventCardsTourism;