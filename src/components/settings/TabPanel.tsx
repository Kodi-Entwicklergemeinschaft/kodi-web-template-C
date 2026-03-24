import { SxProps, Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
  sx: SxProps;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, sx, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={sx}>{children}</Box>}
    </Box>
  );
};

export default TabPanel;
