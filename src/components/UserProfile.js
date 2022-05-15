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
import React, { useEffect, useState } from "react";
import { Recorder } from "react-voice-recorder";
import { Country } from "../service/utils";
import "react-voice-recorder/dist/index.css";

export default function UserProfile({ authUser }) {
  const [userInfo, setuserInfo] = useState(
    JSON.parse(JSON.stringify(authUser))
  );
  const [audio] = useState(new Audio());
  const [playing, setPlaying] = useState(false);

  const onValueChange = (e) => {
    setPlaying(false);
    setuserInfo((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    audio.addEventListener("ended", (event) => {
      setPlaying(false);
    });
  }, [audio]);

  const performPlayAction = () => {
    try {
      audio.src = authUser.voiceRecordUrl;
      setPlaying(true);
    } catch (exp) {}
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [audio, playing]);

  return (
    <Container component="main" maxWidth="md" sx={{ mt: "10px" }}>
      <Typography variant="h6" gutterBottom>
        Welcome User !
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstName"
            name="firstName"
            label="First name"
            value={userInfo.firstName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastName"
            name="lastName"
            label="Last name"
            value={userInfo.lastName}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            InputProps={{
              readOnly: true,
            }}
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
            value={userInfo.preferredName}
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
              value={userInfo.country}
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
        {authUser.voiceRecordUrl && (
          <Grid item xs={12} sm={6}>
            Pre record available :
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
        )}
      </Grid>
      <Recorder record={true} title={"New recording"} showUIAudio />
    </Container>
  );
}
