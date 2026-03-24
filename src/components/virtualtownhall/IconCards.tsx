import { Stack } from "@mui/material";
import VTHCard from "../shared/IconCard";
import useGetVTH from "../../hooks/useGetVTH";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DeleteIcon from '@mui/icons-material/Delete';
import MapIcon from '@mui/icons-material/Map';
import { useTranslation } from 'react-i18next';

const IconCards = () => {
    const {t} = useTranslation();
    const {VTHList} = useGetVTH()
    if (!VTHList) return null;
    const onlineServices = VTHList.onlineServices;
    if (!onlineServices) return null;
    return (
        <Stack spacing={1}>
            {onlineServices.map((item, index) => (
                <VTHCard
                    key={index}
                    title={item.title??''}
                    description={item.description??''}
                    IconUrl={item.iconUrl}
                    RightIcon={OpenInNewIcon}
                    href={item.linkUrl}
                />
            ))}            
        </Stack>
    )
}

export default IconCards;