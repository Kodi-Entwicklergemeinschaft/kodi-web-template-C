import {
    ListAlt,
    CloudUpload,
    Dashboard as DashboardIcon,
    ChevronRight,
    Close,
  } from '@mui/icons-material';
  import {
    useMediaQuery,
    useTheme,
    Box,
    Typography,
    MenuItem,
    IconButton,
    Divider,
    Drawer,
  } from '@mui/material';
  import { Link, useRouterState } from '@tanstack/react-router';
  import { useState } from 'react';
  import { useTranslation } from 'react-i18next';
  import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
  export function Sidebar() {
    const theme = useTheme();
    const { t } = useTranslation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [open, setOpen] = useState(false);
    const location = useRouterState();
  
    const currentPath = location.location.pathname;
  
    const toggleDrawer = (openState: boolean) => () => {
      setOpen(openState);
    };
  
    const menuItems = [
      {
        icon: <ManageAccountsIcon fontSize="small" />,
        text: t('sidebar.my_entries'),
        to: '/dashboard',
      },
      {
        icon: <CloudUpload fontSize="small" />,
        text: t('sidebar.upload_listing'),
        to: '/dashboard/upload',
      },
      {
        icon: <ListAlt fontSize="small" />,
        text: t('sidebar.all_listings'),
        to: '/dashboard/all-listings',
      },
    ];
  
    const renderLink = (item: (typeof menuItems)[0]) => {
        const normalizePath = (path: string) => path.replace(/\/+$/, '');
        const isActive = normalizePath(currentPath) === normalizePath(item.to);
        

      
        return (
          <Link
            key={item.to}
            to={item.to}
            style={{ textDecoration: 'none' }}
            onClick={toggleDrawer(false)}
          >
            <MenuItem
              selected={isActive}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1.5,
                px: 2,
                borderRadius: 1,
                minHeight: 48,
                color: isActive ? '#66BB6A' : 'white',
                fontWeight: isActive ? 600 : 400,
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#66BB6A',
                },
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#66BB6A',
                  fontWeight: 600,
                },
              }}
            >
              {item.icon}
              <Typography variant="body2">{item.text}</Typography>
            </MenuItem>
          </Link>
        );
      };
      
    return (
      <>
        {!open && (
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              position: 'fixed',
              top: '10%',
              left: 0,
              transform: 'translateY(-50%)',
              zIndex: theme.zIndex.drawer + 1,
              backgroundColor: 'primary.main',
              color: 'white',
              borderRadius: '0 4px 4px 0',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            <ChevronRight />
            <ChevronRight sx={{ ml: '-6px' }} />
          </IconButton>
        )}
  
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer(false)}
          variant={isMobile ? 'temporary' : 'persistent'}
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              backgroundColor: 'primary.main',
              color: 'common.white',
            },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton
              onClick={toggleDrawer(false)}
              sx={{
                color: 'common.white',
                '&:hover': {
                  backgroundColor: 'action.active',
                  color: 'primary.main',
                },
              }}
            >
              <Close />
            </IconButton>
          </Box>
  
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />
  
          <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            {menuItems.map(renderLink)}
          </Box>
        </Drawer>
      </>
    );
  }
  