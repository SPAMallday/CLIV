import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
          margin: 0,
          padding: 0,
        },
        html: {
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
          width: "100%",
        },
        "#root": {
          height: "100%",
          width: "100%",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#FBF8F1",
    },
    primary: {
      // Purple and green play nicely together.
      main: "#F7ECDE",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#DF7861",
    },
  },
});

export default theme;
