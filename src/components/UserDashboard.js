import { Container } from "@mui/material";
import React from "react";

export default function UserDashboard({ authUser }) {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{ backgroundColor: "Blue", mt: "15px" }}
    >
      This is user dashbaord
    </Container>
  );
}
