import { Stack, Box, Typography, Avatar, useTheme } from "@mui/material";
import { City } from "../../types/virtualtownhall";
import ViewAllButton from "../shared/ViewAllButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from "react-i18next";
import { imageLoaderUtility } from "../../utilities/getImage";
import MuniCard1 from "./Municard1";
import React from "react";

const MunicipalCard: React.FC<{ CardList: City[], button?: boolean, isAllFav?:boolean, Id?: number, title?: string }> = ({ CardList, button, Id, title, isAllFav }) => {
    const { t } = useTranslation();
    
    return (
        <Stack spacing={2}>
            {(title) && <Box sx={{ display: 'flex', pt: 2 }}>
                <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px' }}>
                    {title}
                </Typography>
                <Box sx={{ padding: '5px' }}>
                    <ArrowForwardIcon />
                </Box>
            </Box>}
            <Box sx={{ ml: 4, mr: 4, mt: 2, mb: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 2, p: 2 }} >
                {CardList?.map((item, index) => {
                    const imageUrl = imageLoaderUtility(item.image ?? '', item.sourceId ?? 1)
                    return(
                        <MuniCard1 isFavorite={item.isFavorite??false} id={item.id} name={item.name} imageUrl={imageUrl} isAllFav={isAllFav??false}/>
                    )
                })}
            </Box>
            {(button) && <ViewAllButton content={t("kuselaltenglan.municipal.button")} href={`/virtualtownhall/viewAllcities/${Id}`} />}
        </Stack>
    )
}

export default MunicipalCard;