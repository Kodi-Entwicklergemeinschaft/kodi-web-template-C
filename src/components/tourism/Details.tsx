import TownHallDetails from "../shared/EventDetailsMap"
import { useTranslation } from "react-i18next"
const eventDetails = { latitude: 52.5200, longitude: 13.4050 }
const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDOzBSSz5d6ktRygxSP0X8NyliHiNyKJVo&q=${eventDetails.latitude},${eventDetails.longitude}&zoom=15`
const Details = () => { 
    const { t } = useTranslation()
    return(
        <TownHallDetails
        Location="In deiner Nähe"
        LocationURL={url}
        />
    )
}

export default Details