import { CircularProgress, Box, Fade } from "@mui/material";
import React from "react";

interface Props {
  isLoading: boolean;
}

const FullScreenLoader = ({ isLoading }: Props) => {
  return (
    <Fade in={isLoading} unmountOnExit>
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.2)", // subtle dark overlay
          zIndex: 2000,
          pointerEvents: "auto",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    </Fade>
  );
};

export default FullScreenLoader;
