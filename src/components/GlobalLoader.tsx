import { useIsFetching } from '@tanstack/react-query';
import { LinearProgress } from '@mui/material';

const GlobalLoader = () => {
  const isFetching = useIsFetching();

  return isFetching ? <LinearProgress sx={{ position: 'fixed', top: 0, width: '100%' }} /> : null;
};

export default GlobalLoader;
