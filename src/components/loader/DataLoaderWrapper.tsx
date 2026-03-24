import { CircularProgress, Box } from "@mui/material";
import React from "react";

interface Props {
  isLoading: boolean;
  children: React.ReactNode;
  height?: string | number; 
  width?: string | number;
}

const DataLoaderWrapper = ({ isLoading, children, height = 250 , width = "auto"}: Props) => {
  if (isLoading) {
    return (
      <Box
        sx={{
          position: "relative",
          minHeight: height,
          width: width,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.02)",
          borderRadius: 2,
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  return <>{children}</>;
};

export default DataLoaderWrapper;
