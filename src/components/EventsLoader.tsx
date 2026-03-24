import { Skeleton } from '@mui/material';

interface IEventsLoader {
  width?: number;
  height?: number;
}
const EventsLoader = ({ width = 250, height = 300 }: IEventsLoader) => (
  <Skeleton variant="rounded" width={width} height={height} />
);

export default EventsLoader;
