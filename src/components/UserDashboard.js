import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import React, { useState } from "react";
import { Country } from "../service/utils";
import { getAudioFile } from "../service/userAuthService";

export default function UserDashboard({ authUser }) {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    country: "",
  });

  const onValueChange = (e) => {
    loadAndPlayAudio("");
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  const performPlayAction = async (value) => {
    try {
      const urlValue = await getAudioFile(value);
      loadAndPlayAudio(urlValue, true);
    } catch (exp) {}
  };

  const loadAndPlayAudio = (url, play = false) => {
    var audio = document.getElementById("audio");
    var source = document.getElementById("audioSource");
    source.src = url;
    audio.load();
    if (play) audio.play();
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
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                onClick={performPlayAction}
              >
                Pronounce
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <audio id="audio" controls="controls">
                <source id="audioSource" src=""></source>
              </audio>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
