import TownHallDetails from "../shared/EventDetailsMap"
import { useTranslation } from "react-i18next"
import useGetVTH from "../../hooks/useGetVTH"
const Details = () => { 
    const { t } = useTranslation()
    const {VTHList} = useGetVTH()
    const eventDetails = { latitude: VTHList.latitude, longitude: VTHList.longitude }
    const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDOzBSSz5d6ktRygxSP0X8NyliHiNyKJVo&q=${eventDetails.latitude},${eventDetails.longitude}&zoom=15`
    return(
        <TownHallDetails
        Location={VTHList?.address}
        LocationURL={url}
        Place={t("virtualtownhall.details.place")}
        OpeningHours={VTHList?.openUntil}
        PhoneNumber={VTHList?.phone}
        Email={VTHList?.email}
        Website={t("virtualtownhall.details.visit_website")}
        websiteUrl={VTHList?.websiteUrl ?? undefined}
        />
    )
}

export default Details