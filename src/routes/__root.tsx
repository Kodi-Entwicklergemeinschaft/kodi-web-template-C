import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Box } from '@mui/material';

export const Route = createRootRoute({
  component: () => (
    <Box>
      <Outlet />
    </Box>
  ),
});
