import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeContext } from '../App';

function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useThemeContext();

  return (
    <IconButton onClick={toggleDarkMode} color="primary">
      {darkMode ? <LightModeIcon sx={{ fontSize: 30 }} /> : <DarkModeIcon sx={{ fontSize: 30 }} />}
    </IconButton>
  );
}

export default DarkModeToggle;