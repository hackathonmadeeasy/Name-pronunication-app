import React, { useState } from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import AppNavBar from "./components/AppNavBar";
import SignIn from "./components/SignIn";
import theme from "./styles/Styles";
import { Navigate, Route, Routes } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import UserDashboard from "./components/UserDashboard";

export default function App() {
  const [authUser, setauthUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppNavBar authUser={authUser} setauthUser={setauthUser} />
      <Routes>
        <Route
          exact
          path="/dashboard"
          element={<UserDashboard authUser={authUser} />}
        />
        <Route
          exact
          path="/profile"
          element={<UserProfile authUser={authUser} />}
        />
        <Route exact path="/logout" element={<Navigate to="/" replace />} />
        <Route path="/" element={<SignIn setauthUser={setauthUser} />} />
      </Routes>
    </ThemeProvider>
  );
}
