import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Box, TextField, Link, Typography, Paper, Avatar, useTheme, InputAdornment, Card, CardMedia, CardContent, Modal, Button, Chip, Divider, Grid, IconButton, Stack } from '@mui/material';
import { createFileRoute } from '@tanstack/react-router';
import NavBar from '../components/NavBar';
import Footer from '../components/home/Footer';
import useMaps from '../hooks/useMaps';
import useGetAllFavorites from '../hooks/useGetAllFavorites';
import SearchIcon from '@mui/icons-material/Search';
import { flatMap } from 'lodash-es';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import InputIcon from '@mui/icons-material/Input';
import SavingsIcon from '@mui/icons-material/Savings';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import NavigationIcon from '@mui/icons-material/Navigation';
import EventIcon from '@mui/icons-material/Event';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { getCategoryIconPath } from '../utilities/getCategoryIconPath';
import useFavorite from '../hooks/useFavorite';
import { STORAGE_KEYS } from '../utilities/constants';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CircularProgress } from '@mui/material';
import {useTranslation} from 'react-i18next';
import FullScreenLoader from '../components/loader/FullScreenLoader';

function getIcon(path?: string) {
  return L.icon({
    iconUrl: path || markerIconPng,
    shadowUrl: markerShadowPng,
    iconAnchor: [12, 41]
  })
}
L.Marker.prototype.options.icon = getIcon();

function getCategoryDivIcon(categoryId: number | string) {
  const iconPath = getCategoryIconPath(categoryId);
 
  return L.divIcon({
    className: "custom-category-marker",
    html: `
      <div style="
        background-color: #6972A8;
        border: 2px solid #283583;
        border-radius: 50%;
        width: 42px;
        height: 42px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
      ">
        <img src="/${iconPath}.svg"
             style="width:22px;height:22px;filter: brightness(0) invert(1);" />
      </div>
    `,
    iconSize: [42, 42],
    iconAnchor: [21, 42],  // bottom-center of the circle
    popupAnchor: [0, -42], // popup just above marker
  });
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
  p: 4,
  backgroundColor: (theme) => theme.palette.secondary.main,
  width: "80vw",
  borderRadius: 2,
  textAlign: 'center',
  height: '80vh',
  overflowY: 'scroll',
  cursor: 'pointer'
};

const Maps = () => {
  const theme = useTheme();
  const { deleteEventFavoriteMutation, markEventFavoriteMutation, isuserLoggedIn } = useFavorite();
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID) ?? '';
  const { listingDetails: favoriteListings } = useGetAllFavorites({ userId });


  const {
    allListingData,
    listedCategoriesDetails,
    selectedCategory,
    setSelectedCategory,
    selectedEvent,
    setSelectedEvent,
    searchedItems,
    searchTerm,
    setSearchTerm,
    setSearchedItems,
    categoryData,
    isLoading
  }
    = useMaps();
  const { t } = useTranslation();
  const [fav, setFav] = useState<boolean>(selectedEvent?.isFavorite ?? false);
  const [showCategoryResults, setShowCategoryResults] = useState(false);
  const lat = 49.5401602, long = 7.3980093;
  const navigate = useNavigate();
  useEffect(() => {
    setFav(selectedEvent?.isFavorite ?? false);
  }, [selectedEvent?.isFavorite])
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (fav) {
      deleteEventFavoriteMutation.mutateAsync({ id: userId?.toString() ?? '', listingId: selectedEvent?.id?.toString() ?? '', categoryId: selectedEvent?.categoryId?.toString() ?? '' })
    } else {
      markEventFavoriteMutation.mutateAsync({ id: userId?.toString() ?? '', listingId: selectedEvent?.id?.toString() ?? '', cityId: selectedEvent?.cityId?.toString() ?? '', categoryId: '' });
    }
    setFav(!fav);
  }
  const getCategoryNameById = (id: string | number | null) => {
  if (!id) return '';
  const cat = Object.values(categoryData).flat().find(c => c.id === id);
  return cat?.name ?? '';
};


const ALLOWED_CATEGORIES = [
  1,    // News
  3,    // Events
  13,   // Eat or drink (Gastro)
  17,   // Tourism
  41,   // Highlights
  "favorites" // Static
];

const filteredCategories = [
  ...Object.values(categoryData)
    .flat()
    .filter(cat => ALLOWED_CATEGORIES.includes(cat.id)),

  { id: "favorites", name: "Favorites" }
];



  return (
    <>

       <FullScreenLoader isLoading={isLoading} />
      <Box sx={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <MapContainer center={[49.54, 7.39]} zoom={13} style={{ height: '100vh', width: '100%' }}
            scrollWheelZoom={true}
            dragging={true}
            zoomControl={true}      >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {flatMap(Object.values(allListingData)).map(poi => {
              if (poi.latitude && poi.longitude) {
                if ( !selectedCategory || selectedCategory == poi.categoryId) {
                  return (
                    <Marker
                      icon={getCategoryDivIcon(poi.categoryId)}
                      key={poi.id}
                      position={[poi.latitude, poi.longitude]}
                      eventHandlers={{
                        click: () => {
                          setSelectedEvent(poi);
                        },
                      }}
                    />
                  );
                }
              }
            })}

          </MapContainer>
        </Box>

       <Paper
  elevation={6}
  sx={{
    position: 'absolute',
    top: 100,
    right: 20,
    width: { xs: '90vw', sm: '26rem', md: '26rem', lg: '26rem' },
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 3,
    p: 2,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    zIndex: 1000,

    minHeight: {md: '40vh'},
    maxHeight: { xs: '40vh', sm: '60vh', md: '80vh' },

    overflowY: 'auto',

    '@media (max-width: 600px)': {
      width: '90vw',
      right: '5vw',
      top: 80,
      p: 1.5,
    },
  }}
>
   <Box sx={{ position: 'relative', mb: 2 }}>
  <TextField
    label={t('maps.searchPlaceholder')}
    size="small"
    variant="outlined"
    fullWidth
    value={searchTerm}
    onChange={(e) => {
      const value = e.target.value;
      setSearchTerm(value);

      if (!value.trim()) {
        setSearchedItems([]);
      }
    }}
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <SearchIcon sx={{ mr: 1 }} color="primary" />
        </InputAdornment>
      ),
      sx: { borderRadius: '50px' },
    }}
  />

  {searchTerm.trim().length > 0 && (
    <Paper
      elevation={4}
      sx={{
        position: 'absolute',
        top: 50,
        width: '100%',
        maxHeight: 300,
        overflowY: 'auto',
        borderRadius: 2,
        zIndex: 1100,
      }}
    >
      {searchedItems.length === 0 ? (
        <Typography sx={{ p: 2, textAlign: 'center' }}>
          {t('maps.noData')}
        </Typography>
      ) : (
        searchedItems.map((item) => (
          <Card
            key={item.id}
            sx={{ m: 1, cursor: 'pointer' }}
            onClick={() => setSelectedEvent(item)}
          >
            <CardContent sx={{ display: 'flex', gap: 2 }}>
              <CardMedia
                component="img"
                src={item.logo}
                sx={{ width: 60, height: 60, borderRadius: 1 }}
              />
              <Box>
                <Typography fontWeight={600}>{item.title}</Typography>
                <Typography
                  variant="body2"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  dangerouslySetInnerHTML={{ __html: item.description ?? '' }}
                />
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Paper>
  )}
   </Box>
           
  {!showCategoryResults ? (
  <>
   

  {/* Category Bar */}
  <Box
  mt={2}
  sx={{
    display: { xs: 'grid', md: 'grid' },
    flexDirection: { xs: 'unset', md: 'unset' },
    flexWrap: { xs: 'nowrap', md: 'unset' },
    gap: 1,
    overflowX: { xs: 'auto', md: 'visible' },
    gridTemplateColumns: {  xs:'repeat(3, 1fr)' , md: 'repeat(3, 1fr)' }, // 🔹 3 per row on md+
    justifyItems: 'center',       
      '& > *:not(:last-child)': {
      mr: { xs: 1 },                // 🔹 add horizontal space between icons on xs
    },                 // center items in grid cells
    '&::-webkit-scrollbar': {
      height: 6,
    },
    '&::-webkit-scrollbar-thumb': {
      bgcolor: 'primary.main',
      borderRadius: 3,
    },
  }}
>
    {filteredCategories.map((category) => (
      <Box
        key={category.id}
        display="flex"
        flexDirection="column"
        gap={1}
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 72,
          minHeight: 100,
          textAlign: 'center',
          cursor: 'pointer',
        }}
        onClick={() => {
          setSelectedCategory(category.id);
          setSearchedItems([]);
          setShowCategoryResults(true);
        }}
      >
        <Avatar
          sx={{
            cursor: 'pointer',
            bgcolor:
              selectedCategory === category.id
                ? theme.palette.primary.main
                : theme.palette.common.white,
            width: 46,
            height: 46,
          }}
        >
          <Box
            component="img"
            src={`/${getCategoryIconPath(category.id)}.svg`}
            alt={category.name}
            sx={{
              width: 25,
              height: 25,
              filter:
                selectedCategory === category.id
                  ? 'brightness(0) invert(1)'
                  : 'none',
            }}
          />
        </Avatar>
        <Typography
          variant="caption"
          fontWeight={600}
          sx={{ fontSize: '12px' }}
        >
          {category.name}
        </Typography>
      </Box>
    ))}
  </Box>


  </>
) : (
  <>
    <Stack direction="row" alignItems="center" spacing={1} mb={2}>
      <IconButton
  onClick={() => {
    if (searchTerm.trim().length > 0) {
      setSearchTerm("");       // clear search
      setSearchedItems([]);    // reset results
    }
    setShowCategoryResults(false);
    setSelectedCategory(null);
  }}
  sx={{ color: theme.palette.text.primary }}
>
  <ArrowBackIosNewIcon fontSize="small" />
</IconButton>

      <Typography variant="h6" fontWeight={600}>
        {getCategoryNameById(selectedCategory)}
      </Typography>
    </Stack>

    <Box
      sx={{
        overflowY: 'auto',
        flex: 1,
        pr: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
      {(() => {
let data: any[] = [];

if (searchTerm.trim().length > 0) {
  data = searchedItems;   // search results first
} else if (selectedCategory === "favorites") {
  data = favoriteListings;
} else if (selectedCategory && allListingData[selectedCategory]) {
  data = flatMap(allListingData[selectedCategory]);
}


if (isLoading  ) {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mt: 4,
      }}
    >
      <CircularProgress size={32} color="primary" />
    </Box>
  );
}
 
  if (data.length === 0) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          width: '100%',
          textAlign: 'center',
          mt: 4,
          fontWeight: 500,
          fontSize: '1rem',
        }}
      >
      {t('maps.noData')}

      </Typography>
    );
  }

  return data.map((item) => {
    const { id, title, logo, description } = item;
    return (
      <Card
        key={id}
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          background: (theme) => theme.palette.common.white,
          width: '100%',
        }}
        onClick={() => {
          setSelectedEvent(item);
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
          <CardMedia
            component="img"
            src={`${logo}`}
            sx={{
              borderRadius: '10px',
              objectFit: 'cover',
              display: 'block',
              maxWidth: '100px',
            }}
          />
          <Box>
            <Typography
              sx={{ fontWeight: 600, fontSize: '14px' }}
              color="primary"
            >
              {title}
            </Typography>
            <Typography
              color="primary"
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '12px',
              }}
              component="div"
              dangerouslySetInnerHTML={{ __html: description ?? '' }}
            />
          </Box>
        </CardContent>
      </Card>
    );
  });
})()}

      </Box>
    </Box>
  </>
)}

        </Paper>

      </Box>
      <Modal
        open={!!selectedEvent?.id}
        onClose={() => {
          setSelectedEvent(null)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
          onClick={() => {
            navigate({ to: `/events/${selectedEvent?.id}` });
          }}>
          <Grid container spacing={4} >
            <Grid item xs={12} md={8}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: 4,
                  bgcolor: (theme) => theme.palette.common.white,
                  height: '100%',
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                  <Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {selectedEvent?.title}
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    {/* {(isuserLoggedIn) &&
                      <Button
                        startIcon={<FavoriteBorderIcon />}
                        variant="contained"
                        sx={{
                          bgcolor: selectedEvent?.isFavorite ? theme.palette.primary.main : theme.palette.common.white,
                          '&:hover': {
                            bgcolor: theme.palette.primary.main,
                            color: theme.palette.common.white,
                          },
                          color: selectedEvent?.isFavorite ? theme.palette.common.white : theme.palette.primary.main,
                        }}
                        onClick={handleFavorite}
                      >
                        Liken
                      </Button>} */}
                    {/* <Button startIcon={<ShareIcon />} variant="contained" sx={{ bgcolor: '#2f327d' }}>
                      Teilen
                    </Button> */}
                  </Stack>
                </Stack>

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, my: 2 }}
                  component="div"
                  dangerouslySetInnerHTML={{ __html: selectedEvent?.description ?? '' }}
                />


                {/* <Typography variant="body2" color="text.secondary">

                  tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                  eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                  takimata sanctus est.
                </Typography> */}

                <Box sx={{ mt: 3, borderRadius: 2, overflow: 'hidden' }}>
                  <iframe
                    title="gppgle maps"
                    width={'100%'}
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDOzBSSz5d6ktRygxSP0X8NyliHiNyKJVo&q=${selectedEvent?.latitude??lat},${selectedEvent?.longitude??long}&zoom=15`}
                    style={{ border: 0 }}
                  />
                </Box>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ mt: 2, p: 2 }}
                >
                  <Box sx={{ display: 'flex', flexFlow: 'row', justifyContent: 'center', gap: 1 }}>
                    <PlaceOutlinedIcon sx={{ alignSelf: 'center' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {selectedEvent?.address??"Kuselstraße 1, 12345 Musterstadt"}
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Button
                    startIcon={<NavigationIcon />}
                    variant="contained"
                    sx={{ bgcolor: '#2f327d' }}
                  >
                    Route anzeigen
                  </Button> */}
                </Stack>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{ p: 3, borderRadius: 4, bgcolor: (theme) => theme.palette.common.white }}
              >
                <Typography variant="h6" gutterBottom>
                  Infos
                </Typography>
                <Link
                  // href={selectedEvent?.website}
                  underline="hover"
                  target="_blank"
                  sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                >
                  <InputIcon sx={{ fontSize: 18, mr: 1 }} /> Website besuchen
                </Link>

                <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                  Nächste Termine
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EventIcon fontSize="small" />
                  <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                    <Typography variant="body2">
                      {selectedEvent?.startDate
                        ? new Date(selectedEvent.startDate).toLocaleDateString('de-DE', { timeZone: 'UTC' }) +
                        ', ' +
                        new Date(selectedEvent.startDate).toLocaleTimeString('de-DE', {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'UTC',
                        })
                        : ''}
                    </Typography>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EventIcon fontSize="small" />
                  <Box sx={{ display: 'flex', flexFlow: 'column' }}>
                    <Typography variant="body2">
                      {selectedEvent?.endDate
                        ? new Date(selectedEvent.endDate).toLocaleDateString('de-DE', { timeZone: 'UTC' }) +
                        ', ' +
                        new Date(selectedEvent.endDate).toLocaleTimeString('de-DE', {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: 'UTC',
                        })
                        : ''}
                    </Typography>
                  </Box>
                </Stack>

                <Divider sx={{ my: 2 }} />
                <Stack direction="column" spacing={1} flexWrap="wrap">
                  <Chip
                    icon={<EmojiPeopleOutlinedIcon color="primary" />}
                    label="Barrierefrei"
                    sx={{ width: 'fit-content', fontSize: '16px', px: 1 }}
                  />
                  <Chip
                    icon={<PetsOutlinedIcon color="primary" />}
                    label="Hunde erlaubt"
                    sx={{ width: 'fit-content', fontSize: '16px', px: 1 }}
                  />
                  <Chip
                    icon={<SavingsIcon color="primary" />}
                    label="Kostenfrei"
                    sx={{ width: 'fit-content', fontSize: '16px', px: 1 }}
                  />
                </Stack>
              </Box>

              <Box
                component={"div"}
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: (theme) => theme.palette.common.white,
                }}
              >
                <DirectionsCarIcon fontSize="large" sx={{ mr: 2 }} />
                <Box>
                  <Typography fontWeight={600}>ÖPNV Angebot</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Schau dir hier an, wie du am besten hinkommst
                  </Typography>
                </Box>
                <IconButton>
                  <InputIcon color="primary" />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}

export default Maps;

export const Route = createFileRoute('/maps')({
  component: () => (
    <Box
      sx={{
        backgroundImage: `linear-gradient(to bottom, #e2ebf7, #ebf0f9, #f3f4fb, #f9fafd, #ffffff)`,
      }}
    >
      <NavBar username={``} />
      <Maps />
      <Footer />
    </Box>
  )
});
