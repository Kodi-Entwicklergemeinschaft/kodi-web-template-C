import { Stack } from "@mui/material";
import VTHCard from "../shared/IconCard";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { OnlineService } from "../../types/virtualtownhall";
import { useTranslation } from 'react-i18next';

const IconCards = ({ onlineserviceList }: { onlineserviceList: OnlineService[] }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1}>
            {onlineserviceList?.map((item, index) => (
                <VTHCard
                    key={index}
                    title={item.title}
                    description={item.description ?? ''}
                    href={item.linkUrl}
                    IconUrl={item.iconUrl}
                    RightIcon={OpenInNewIcon}
                />
            ))}
        </Stack>
    )
}

export default IconCards;