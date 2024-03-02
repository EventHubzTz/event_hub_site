import React from "react";
import { createEmotionCache } from './Utils/create-emotion-cache';
import { CacheProvider } from "@emotion/react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

const clientSideEmotionCache = createEmotionCache();

function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <RouterProvider router={router} />
      </LocalizationProvider>
    </CacheProvider>
  );
}

export default App;
