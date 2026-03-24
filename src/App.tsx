import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createContext, useContext, useState } from 'react';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { lightTheme } from './theme';
import { routeTree } from './routeTree.gen';
import useAuth from './hooks/useAuth';

export const useThemeContext = () => useContext(ThemeContext);
const ThemeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => { },
});

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

const App = () => {
  const queryClient = new QueryClient();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const theme = lightTheme;
  const auth = useAuth();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterLuxon}>
            <RouterProvider router={router} context={{ auth }} />
          </LocalizationProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
};

export default App;