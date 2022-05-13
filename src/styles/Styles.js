import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#d71e28",
          borderBottom: "4px solid #ffcd41",
          height: "60px",
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableFocusRipple: true,
      },
    },
  },
});

export default theme;
