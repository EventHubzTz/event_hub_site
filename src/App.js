import React from "react";
import { createEmotionCache } from './Utils/create-emotion-cache';
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router";

const clientSideEmotionCache = createEmotionCache();

function App() {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <CssBaseline />
      <RouterProvider router={router} />
    </CacheProvider>
  );
}

export default App;
