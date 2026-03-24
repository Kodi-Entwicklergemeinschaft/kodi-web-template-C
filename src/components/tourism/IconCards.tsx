import { Stack } from "@mui/material";
import VTHCard from "../shared/IconCard";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useTranslation } from 'react-i18next';
import { ServiceOffered } from "../../types/tourism";

const IconCards = ({ serviceList }: { serviceList: ServiceOffered[] }) => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            {serviceList.map((item, index) => {
                // Fallback link for Wanderwege App
                const fallbackUrl = item.linkUrl ?? "https://www.pfaelzerbergland.de/de/aktiv-in-der-natur/wandern?utm_source=chatgpt.com"

                return (
                    <VTHCard
                        key={index}
                        title={item.title}
                        description={item.description}
                        IconUrl={item.iconUrl}
                        RightIcon={OpenInNewIcon}
                        href={fallbackUrl}
                    />
                );
            })}
        </Stack>
    );
}

export default IconCards;