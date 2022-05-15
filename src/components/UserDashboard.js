import {
  IconButton,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import PlayCircleOutlinedIcon from "@mui/icons-material/PlayCircleOutlined";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";

import React, { useState, useEffect } from "react";
import { Country } from "../service/utils";
import { getAudioFile } from "../service/userAuthService";

export default function UserDashboard({ authUser }) {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    country: "",
  });

  const [audio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.addEventListener("ended", (event) => {
      setPlaying(false);
    });
  }, [audio]);

  const onValueChange = (e) => {
    setPlaying(false);
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  const performPlayAction = async (value) => {
    try {
      const urlValue = await getAudioFile(value);
      audio.src = urlValue;
      setPlaying(true);
    } catch (exp) {}
  };

  return (
    <Container component="main" maxWidth="md" sx={{ mt: "10px" }}>
      <Typography variant="h6" gutterBottom>
        Name Pronunciation !
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            value={value.firstName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={onValueChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            value={value.lastName}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={onValueChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="preferredName"
            name="preferredName"
            label="Preferred Name"
            fullWidth
            autoComplete="preferred-name"
            variant="standard"
            value={value.preferredName}
            onChange={onValueChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl variant="standard" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              Country
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={value.country}
              onChange={onValueChange}
              label="Country"
              name="country"
            >
              {Country.map((value, index) => (
                <MenuItem key={index} value={value.value}>
                  {value.key}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {!playing && (
            <IconButton color="primary" onClick={performPlayAction}>
              <PlayCircleOutlinedIcon />
            </IconButton>
          )}
          {playing && (
            <IconButton color="primary" onClick={() => setPlaying(false)}>
              <PauseCircleOutlineIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
