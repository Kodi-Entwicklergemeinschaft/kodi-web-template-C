import { Stack, Typography } from "@mui/material";
import VTHCard from "../shared/IconCard";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { Service } from "../../types/mitmachen";

const IconCards = ({servicesofferedLis}:{servicesofferedLis:Service[]}) => {
    const {t} = useTranslation();
    return (
        <Stack spacing={1}>
            <Typography variant="h6" sx={{ color: '#18204F', fontSize: '20px', fontWeight:'500px' }}>
                {t("mitchmachen.Iconcard.title")}
            </Typography>
            {servicesofferedLis.map((item, index) => (
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