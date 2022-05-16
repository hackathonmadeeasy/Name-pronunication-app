import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import { Country } from "../service/utils";

export default function UserProfile({ authUser }) {
  const [userInfo, setuserInfo] = useState(
    JSON.parse(JSON.stringify(authUser))
  );
  const onValueChange = (e) => {
    setuserInfo((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
  };

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
            <Grid
              container
              spacing={1}
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                Pronounce Existing :
              </Grid>
              <Grid item xs={12} sm={6}>
                <audio id="audio" controls="controls">
                  <source id="audioSource" src=""></source>
                </audio>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12} sm={6}>
        {/* Add record icon and record optin */}
      </Grid>
    </Container>
  );
}
