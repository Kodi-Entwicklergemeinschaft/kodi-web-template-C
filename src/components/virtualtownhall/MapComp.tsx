import { Box, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTranslation } from "react-i18next";
import { Municipality } from "../../types/virtualtownhall";
import { imageLoaderUtility } from "../../utilities/getImage";
import { STORAGE_KEYS } from "../../utilities/constants";
import MapComp1 from "./Mapcomp1";
const MapComp = ({ municipalityList }: { municipalityList: Municipality[] }) => {
    const { t } = useTranslation();
    const user = localStorage.getItem(STORAGE_KEYS.USER_ID);
    return (
        <Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto' }}>
                <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px' }}>
                    {t("virtualtownhall.mapcard.title")}
                </Typography>
                <Box sx={{ padding: '5px' }}>
                    <ArrowForwardIcon />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, overflowX: 'auto', pt: 2, pb: 2 }}
            >
                {
                    municipalityList.map((mapcard, index) => {
                        const mapImageUrl = imageLoaderUtility(mapcard?.mapImage, mapcard?.sourceId ?? 1)
                        return (
                            <MapComp1 isFavorite={mapcard.isFavorite??false} user={user??""} id={mapcard.id} mapImageUrl={mapImageUrl} name={mapcard.name} key={index}/>
                        )
                    }
                    )
                }
            </Box>
        </Box>
    );
}
export default MapComp;