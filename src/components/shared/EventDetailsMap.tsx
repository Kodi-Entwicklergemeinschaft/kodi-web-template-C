import { Box, Link, Paper } from "@mui/material";
import Stack from '@mui/material/Stack';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { Typography } from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
type EventDetails = {
    Location: string;
    LocationURL: string;
    Place?: string;
    OpeningHours?: string;
    PhoneNumber?: string;
    Email?: string;
    Website?: string;
    websiteUrl?: string | undefined;
}

const TownHallDetails = ({Location,LocationURL,Place, OpeningHours, PhoneNumber, Email, Website, websiteUrl}: EventDetails) => {
    return (
        <Paper sx={{ backgroundColor: 'white', borderRadius: '16px' }}>
            <Box sx={{ p: 2, display: 'flex', flexFlow: 'row', gap: 1, fontSize: '16px', color: '#6972A8' }}>
                <PlaceOutlinedIcon sx={{ alignSelf: 'center' }} />
                <Typography>{Location}</Typography>
            </Box>
            <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
                <iframe
                    title="gppgle maps"
                    width={'100%'}
                    src={LocationURL}
                    style={{ border: 0 }}
                />
            </Box>
            <Stack sx={{ fontSize: '16px', color: '#6972A8' }}>
                {(Place)&&<Stack direction="row" spacing={1} sx={{ p: 2 }}>
                    <Stack sx={{ pt: 1 }}>
                        <EventIcon />
                    </Stack>
                    <Stack direction="column">
                        <Typography fontWeight={600} sx={{ color: '#18204F' }}>{Place}</Typography>
                        <Typography>{OpeningHours}</Typography>
                    </Stack>
                </Stack>}
                {(PhoneNumber)&&<Stack direction="row" spacing={1} sx={{ p: 2 }}>
                    <CallIcon />
                    <Typography sx={{ textDecoration: 'underline' }}>{PhoneNumber}</Typography>
                </Stack>}
                {Email && (
                <Stack direction="row" spacing={1} sx={{ p: 2 }}>
                  <EmailIcon />
                  <Link
                    href={`mailto:${Email}`}
                    sx={{ textDecoration: 'underline', color: '#6972A8' }}
                  >
                    {Email}
                  </Link>
                </Stack>
              )}
                 {(Website)&&<Stack direction="row" spacing={1} sx={{ p: 2, flexWrap: 'wrap', overflow: 'hidden' }}>
                    <OpenInNewIcon />
                    <Link sx={{ textDecoration: 'underline', wordBreak: 'break-word', maxWidth: '100%', color: '#6972A8'  }} href={websiteUrl} target="_blank">
                        {Website}
                    </Link>
                </Stack>}
            </Stack>
        </Paper>
    );
}

export default TownHallDetails;