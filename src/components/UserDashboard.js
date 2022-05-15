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

export default function UserDashboard({ authUser }) {
  const [value, setValue] = useState({
    firstName: "",
    lastName: "",
    preferredName: "",
    country: "",
  });

  const onValueChange = (e) => {
    setValue((preValue) => ({
      ...preValue,
      [e.target.name]: e.target.value,
    }));
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
      </Grid>
    </Container>
  );
}
