import { ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import AppNavBar from "./components/AppNavBar";
import SignIn from "./components/SignIn";
import theme from "./styles/Styles";

export default function App() {
  const [auth, setauth] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <AppNavBar />
      <SignIn />
    </ThemeProvider>
  );
}
