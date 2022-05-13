import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import AppNavBar from "./components/AppNavBar";
import SignIn from "./components/SignIn";
import theme from "./styles/Styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppNavBar />
      <SignIn />
    </ThemeProvider>
  );
}
