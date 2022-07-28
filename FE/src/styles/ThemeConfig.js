import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
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
