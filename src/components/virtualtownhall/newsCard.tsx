import { Stack, Typography, Box, Grid } from "@mui/material";
import NewsCard from "../shared/NewsCards";
import ViewAllButton from "../shared/ViewAllButton";
import CampaignIcon from '@mui/icons-material/Campaign';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from "react-i18next";
import useCategoriesById from '../../hooks/useCategoriesById';
const NewsCards = () => {
    const { t } = useTranslation();
    const newsList  = useCategoriesById("1") 
    return (
        <Stack spacing={2}>
            <Box sx={{ display: 'flex' }}>
                <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px' }}>
                    {t("virtualtownhall.newscard.title")}
                </Typography>
                <Box sx={{ padding: '5px' }}>
                    <ArrowForwardIcon />
                </Box>
            </Box>
            <Box sx={{bgcolor: (theme) => theme.palette.secondary.main,p:2}}>
                {newsList.categoriesDetailsById&&newsList.categoriesDetailsById.map((item, index) => (
                    <Box 
                        sx={{ display: 'inline-block', marginRight: '16px', marginBottom: '16px' }} 
                        key={index}
                    >
                        <NewsCard
                            id={item.id}
                            key={index}
                            cityId={item.cityId}
                            imageUrl={item.logo}
                            date={"04.09.2024"}
                            description={item.title}
                            location={item.description}
                            favoriteFet={false}
                            alt={item.title}
                            dateFet={true}
                            locationFet={true}
                            descriptionFet={true}
                            isFavorite={item.isFavorite}
                        />
                    </Box>
                    
                ))}
            </Box>
            <ViewAllButton Icon={CampaignIcon} content={t("virtualtownhall.newscard.button")} />
        </Stack>
    )
}

export default NewsCards;