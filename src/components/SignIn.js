import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { userAuth } from "../service/userAuthService";
import { useNavigate } from "react-router-dom";

export default function SignIn({ setauthUser }) {
  const [value, setValue] = useState({ userName: "", password: "" });
  const [submitDisable, setsubmitDisable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setsubmitDisable(value.userName !== "" && value.password !== "");
  }, [value]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await userAuth(value.userName, value.password);
      if (user) {
        setauthUser(user);
        navigate("/dashboard");
      } else {
        navigate("/logout");
      }
    } catch (exp) {
      console.log(exp);
    }
  };

  const onValueChange = (e) => {
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            value={value.userName}
            variant="standard"
            margin="normal"
            required
            fullWidth
            id="userName"
            label="Username"
            name="userName"
            autoComplete="Username"
            onChange={onValueChange}
            autoFocus
          />
          <TextField
            value={value.password}
            variant="standard"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onValueChange}
          />
          <Button
            disabled={!submitDisable}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
