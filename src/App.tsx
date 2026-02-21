import { RouterProvider } from "react-router-dom";
import "./App.css";
import theme from "./Theme/Theme";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { Router } from "./Routing/Routing";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster position="top-center" richColors />
        <RouterProvider router={Router} />
      </ThemeProvider>
    </>
  );
}

export default App;
