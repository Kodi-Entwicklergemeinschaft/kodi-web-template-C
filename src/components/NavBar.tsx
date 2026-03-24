import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import AppsIcon from '@mui/icons-material/Apps';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TuneIcon from '@mui/icons-material/Tune';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import useNavbar from '../hooks/useNavbar';
import PlaceIcon from '@mui/icons-material/Place';
import { useRouter, useRouterState } from '@tanstack/react-router';
import { useLocation } from '@tanstack/react-router';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import { APPROUTES } from '../utilities/routes';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import SearchBar from './home/Search';
import { useState, useEffect } from 'react';
import useGetUserDetails from '../hooks/useGetUser';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocationOnIcon from '@mui/icons-material/LocationOn'; 
import { useMatomo } from '@datapunt/matomo-tracker-react';
const NavBar = ({ username }: { username: string }) => {
  const {
    anchorEl,
    handleMenuOpen,
    handleLogout,
    handleMenuClose,
    searchOpen,
    setSearchOpen,
    handleSettingChange,
    handleLoginChange,
    handleSignupChange,
    handleFavoritesChange,
    handleFavoritesCities
  } = useNavbar();
  const { userData } = useGetUserDetails();
  const location = useLocation();
  const { t } = useTranslation();
  const router = useRouter();
  const { trackEvent } = useMatomo();
  const matches = useRouterState({ select: (s) => s.matches });
  // const isAuthenticatedUser = matches?.[0]?.context?.auth?.isAuthenticated;
  const isAuthenticatedUser = Boolean(localStorage.getItem('access_token'));
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [hamburgerAnchorEl, setHamburgerAnchorEl] = useState<null | HTMLElement>(null);
  const handleHamburgerClick = (event: React.MouseEvent<HTMLElement>) => {
  setHamburgerAnchorEl(event.currentTarget);
};

const handleHamburgerClose = () => {
  setHamburgerAnchorEl(null);
};

const canAccessAdminMenu = userData?.roleId === 1 || userData?.roleId === 5;

useEffect(() => {
  window.scrollTo(0, 0);
}, [location?.pathname]);
  return (
      <AppBar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
        <Box sx={{ maxWidth: 1400, m: 'auto', width: '100%' ,'@media (max-width:400px)': {px: 1,maxWidth: '100%',  },}}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isMobile ? (
  <>
    <IconButton
      color="inherit"
      onClick={handleHamburgerClick}
      sx={{
        '&:hover': {
          color: (theme) => theme.palette.action.active,
        },
      }}
    >
      <MenuIcon />
    </IconButton>
    <Menu
      anchorEl={hamburgerAnchorEl}
      open={Boolean(hamburgerAnchorEl)}
      onClose={handleHamburgerClose}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      <MenuItem onClick={() => { handleHamburgerClose(); router.navigate({ to: APPROUTES.HOME }); }}>
        <HomeIcon sx={{ mr: 1 }} />
        {t('navbar.home_page')}
      </MenuItem>
      <MenuItem onClick={() => { handleHamburgerClose(); router.navigate({ to: APPROUTES.MAPS }); }}>
        <MapIcon sx={{ mr: 1 }} />
        {t('navbar.map')}
      </MenuItem>
      <MenuItem onClick={() => { handleHamburgerClose(); router.navigate({ to: APPROUTES.DISCOVER }); }}>
        <AppsIcon sx={{ mr: 1 }} />
        {t('navbar.discover')}
      </MenuItem>
    </Menu>
  </>
) : (
  <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
    <IconButton
      color="inherit"
      disableRipple
      sx={{
        color: (theme) =>
          location.pathname === '/' ? theme.palette.action.active : 'inherit',
        '&:hover': {
          color: (theme) => theme.palette.action.active,
        },
      }}
      onClick={() => {
        trackEvent({
          category: 'Navbar',
          action: 'Click',
          name: 'Home',
        });

        router.navigate({ to: APPROUTES.HOME });
      }}
    >
      <HomeIcon />
      <Typography sx={{ ml: 1 }}>{t('navbar.home_page')}</Typography>
    </IconButton>
    <IconButton
      color="inherit"
      disableRipple
      sx={{
        color: (theme) =>
          location.pathname === APPROUTES.MAPS
            ? theme.palette.action.active
            : 'inherit',
        '&:hover': {
          color: (theme) => theme.palette.action.active,
        },
      }}
      onClick={() => {
        trackEvent({
          category: 'Navbar',
          action: 'Click',
          name: 'Map',
        });

        router.navigate({ to: APPROUTES.MAPS });
      }}
    >
      <MapIcon />
      <Typography sx={{ ml: 1 }}>{t('navbar.map')}</Typography>
    </IconButton>
    <IconButton
      color="inherit"
      disableRipple
      sx={{
        color: (theme) =>
          location.pathname === APPROUTES.DISCOVER
            ? theme.palette.action.active
            : 'inherit',
        '&:hover': {
          color: (theme) => theme.palette.action.active,
        },
      }}
      onClick={() => {
        trackEvent({
          category: 'Navbar',
          action: 'Click',
          name: 'Discover',
        });

        router.navigate({ to: APPROUTES.DISCOVER });
      }}
    >
      <AppsIcon />
      <Typography sx={{ ml: 1 }}>{t('navbar.discover')}</Typography>
    </IconButton>
    {canAccessAdminMenu && (
                <IconButton
                  color="inherit"
                  disableRipple
                  sx={{
                    color: (theme) =>
                      location.pathname.startsWith(APPROUTES.DASHBOARD)
                        ? theme.palette.action.active
                        : 'inherit',
                    '&:hover': {
                      color: (theme) => theme.palette.action.active,
                    },
                  }}
                  onClick={() => {
                    trackEvent({
                      category: 'Navbar',
                      action: 'Click',
                      name: 'Dashboard',
                    });

                    router.navigate({ to: APPROUTES.DASHBOARD });
                  }}
                >
                  <DashboardIcon />
                  <Typography sx={{ ml: 1 }}>{t('navbar.dashboard')}</Typography>
                </IconButton>
              )}
              {canAccessAdminMenu && (
                <>
                  <IconButton
                    color="inherit"
                    disableRipple
                    sx={{
                      color: (theme) =>
                        location.pathname.startsWith(APPROUTES.CITIES)
                          ? theme.palette.action.active
                          : 'inherit',
                      '&:hover': {
                        color: (theme) => theme.palette.action.active,
                      },
                      ml: 2,
                    }}
                    onClick={() => {
                      trackEvent({
                        category: 'Navbar',
                        action: 'Click',
                        name: 'Cities',
                      });

                      router.navigate({ to: APPROUTES.CITIES });
                    }}
                  >
                    <LocationCityIcon />
                    <Typography sx={{ ml: 1 }}>{t('navbar.cities')}</Typography>
                  </IconButton>
                </>
              )}
  </Box>
)}
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <SearchBar />
              {/* <IconButton
                disableRipple
                onClick={() => setSearchOpen(!searchOpen)}
                sx={{
                  bgcolor: (theme) => (searchOpen ? theme.palette.action.active : 'transparent'),
                  color: (theme) =>
                    searchOpen ? theme.palette.primary.main : theme.palette.common.white,
                  '&:hover': {
                    color: (theme) =>
                      searchOpen ? theme.palette.common.white : theme.palette.action.active,
                  },
                }}
              >
                <SearchIcon />
              </IconButton> */}
              <IconButton
                disableRipple
                onClick={handleMenuOpen}
                sx={{
                  bgcolor: (theme) => (anchorEl ? theme.palette.action.active : 'transparent'),
                  color: (theme) =>
                    anchorEl ? theme.palette.primary.main : theme.palette.common.white,
                  '&:hover': {
                    color: (theme) =>
                      searchOpen ? theme.palette.common.white : theme.palette.action.active,
                  },
                }}
              >
                <PersonOutlinedIcon />
              </IconButton>
            </Box>
          </Toolbar>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: {
                sx: {
                  bgcolor: (theme) => theme.palette.common.white,
                  borderRadius: '10px',
                  boxShadow: 3,
                  width: '100%',
                  maxWidth: 300,
                  minWidth: 250,
                },
              },
            }}
          >
            <MenuItem
              sx={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center',gap: 1, py: 2,   flexWrap: 'wrap',}}
            >
              <Typography variant="body1" color="primary" fontWeight={600} sx={{
      maxWidth: '70%',        
      wordBreak: 'break-word' 
    }}>
                {t('navbar.hey')} {username}
              </Typography>{' '}
              <LanguageSwitcher />
            </MenuItem>
            {isAuthenticatedUser ? (
              <Box>
                <MenuItem
                  onClick={handleFavoritesChange}
                  sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    gap: 1,
                    py: 2,
                  }}
                >
                  <FavoriteBorderIcon color="primary" />
                  {t('navbar.favorite')}
                </MenuItem>
                <MenuItem
                  onClick={handleFavoritesCities}
                  sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    gap: 1,
                    py: 2,
                  }}
                >
                  <PlaceIcon color="primary" />
                  {t('navbar.favoritecities')}
                </MenuItem>
                <MenuItem
                  onClick={handleSettingChange}
                  sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    gap: 1,
                    py: 2,
                  }}
                >
                  <TuneIcon />
                  {t('navbar.settings')}
                </MenuItem>
                <MenuItem onClick={handleLogout} sx={{ gap: 1, py: 2 }}>
                  <LogoutIcon />
                  {t('navbar.logout')}
                </MenuItem>
              </Box>
            ) : (
              <Box>
                <MenuItem
                  onClick={handleLoginChange}
                  sx={{
                    borderBottom: (theme) => `1px solid ${theme.palette.grey[400]}`,
                    gap: 1,
                    py: 2,
                  }}
                >
                  <LoginOutlinedIcon color="primary" />
                  {t('login_btn')}      
                </MenuItem>
                <MenuItem
                  onClick={handleSignupChange}
                  sx={{
                    gap: 1,
                    py: 2,
                  }}
                >
                  <AppRegistrationIcon />
                  {t('signup_btn')}
                </MenuItem>
              </Box>
            )}
          </Menu>
        </Box>
      </AppBar>
      /* { {searchOpen && (
        <Box
          sx={{
            bgcolor: (theme) => theme.palette.action.active,
            px: 4,
            pt: 10,
            pb: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="primary" sx={{ fontStyle: 'italic', mr: 2 }}>
            {t('navbar.search')}
          </Typography>
          <TextField
            sx={{ border: 'none', minWidth: '50%' }}
            placeholder={t('navbar.search_placeholder')}
            size="medium"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ mr: 1 }} color="primary" />
                  </InputAdornment>
                ),
                sx: { borderRadius: '50px' },
              },
              htmlInput: {
                sx: { borderRadius: '50px' },
              },
            }}
          />
          <IconButton onClick={() => setSearchOpen(false)} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>
      )} } */
  );
};

export default NavBar;
