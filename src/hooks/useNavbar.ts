import { useState } from 'react';
import { STORAGE_KEYS } from '../utilities/constants';
import { useRouter } from '@tanstack/react-router';
import { APPROUTES } from '../utilities/routes';

const useNavbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { navigate } = useRouter();
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    navigate({ to: APPROUTES.LOGIN, reloadDocument: true });
    handleMenuClose();
  };

  const handleSettingChange = () => {
    navigate({ to: APPROUTES.USER_SETTINGS, reloadDocument: false });
    handleMenuClose();
  };

  const handleLoginChange = () => {
    navigate({ to: APPROUTES.USER_SETTINGS, reloadDocument: false });
    handleMenuClose();
  };
  const handleSignupChange = () => {
    navigate({ to: APPROUTES.REGISTER, reloadDocument: false });
    handleMenuClose();
  };
  const handleFavoritesChange = () => {
    navigate({ to: APPROUTES.FAVORITES, reloadDocument: false });
    handleMenuClose();
  };
  const handleFavoritesCities = () =>{
    navigate({ to: APPROUTES.FAVORITE_CITIES, reloadDocument: false });
    handleMenuClose();
  }
  return {
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
  };
};
export default useNavbar;
