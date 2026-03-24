import { Stack, Typography } from "@mui/material";
import VTHCard from "../shared/IconCard";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { ServiceItem } from "../../types/mobility";

const IconCards = ({serviceList}:{serviceList:ServiceItem[]}) => {
    const {t} = useTranslation();
    return (
        <Stack spacing={1}>
            <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px', fontWeight:'500px' }}>
                {t("mobility.Iconcard.title")}
            </Typography>
            {serviceList.map((item, index) => (
                <VTHCard
                    key={index}
                    title={item.title}
                    description={item.description??''}
                    IconUrl={item.iconUrl??'#'}
                    RightIcon={OpenInNewIcon}
                    href={item.linkUrl ?? ''}
                />
            ))}            
        </Stack>
    )
}

export default IconCards;