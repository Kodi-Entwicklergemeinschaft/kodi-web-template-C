import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: { main: '#18204f', light: '#293583', dark: '#101534' },
    secondary: { main: '#E2EBF7' },
    background: { default: '#E2EBF7', paper: '#7D9FCB' },
    success: { main: '#4CAF50' },
    error: { main: '#D32F2F' },
    warning: { main: '#FFA000' },
    text: { primary: '#18204f', secondary: '#6972A8' },
    common: {
      black: '#000000',
      white: '#ffffff',
    },
    action: {
      active: '#AADB40',
    },
  },
  components: {
    MuiGrid: {
      styleOverrides: {
        root: {
          '& > .MuiGrid-item': {
            paddingTop: '16px',
            paddingLeft: '16px',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: 'Monsterrat, sans-serif',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#6972A8',
          opacity: 1,
          fontSize: '14px',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
        },
        input: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          cursor: 'pointer',
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          fontWeight: 600,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: '#18204f',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          display: 'flex',
        },
        switchBase: {
          padding: 0,
          margin: 2,
          transitionDuration: '300ms',
          '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              backgroundColor: '#65C466',
              opacity: 1,
              border: 0,
            },
            '& .MuiSwitch-thumb': {
              color: "#fff"
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: 'grey',
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
            
          }
        },
        thumb: {
          boxSizing: 'border-box',
          width: 22,
          height: 22,
          color: "#18204f"
        },
        track: {
          borderRadius: 26 / 2,
          backgroundColor: '#fff',
          border: "1px solid #18204f",
          opacity: 1,
          transition: 'background-color 0.3s',
        }
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '30px',
          padding: '8px 20px',
          fontWeight: 'bold',
          border: 'none',
          '&.Mui-selected': {
            backgroundColor: '#8bdc40',
            color: '#18204f',
            '&:hover': {
              backgroundColor: '#7ac931',
            },
          },
          '&:not(.Mui-selected)': {
            backgroundColor: '#fff',
            color: '#6972A8',
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          backgroundColor: '#e6effa',
          padding: '8px',
          borderRadius: '999px',
          gap: '8px',
          '& .MuiToggleButtonGroup-firstButton': {
            borderRadius: '999px',
          },
          '& .MuiToggleButtonGroup-lastButton': {
            borderRadius: '999px',
          }
        },
      },
    },
  },
};

const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: { main: '#7D9FCB', light: '#A0B9DB', dark: '#5A7AA8' },
    secondary: { main: '#293583' },
    background: { default: '#101534', paper: '#18204f' },
    success: { main: '#66BB6A' },
    error: { main: '#EF5350' },
    warning: { main: '#FFCA28' },
    text: { primary: '#E2EBF7', secondary: '#AAB4D2' },
    common: {
      black: '#000000',
      white: '#E2EBF7',
    },
    action: {
      active: '#AADB40',
    },
  },
  components: {},
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
