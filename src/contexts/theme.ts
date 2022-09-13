import { colors, createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    background: {
      default: "#F5F6F8",
    },
    secondary: {
      main: "#3B6893",
      "100": colors.blue[400],
      "200": colors.blueGrey[700],
    },
    success:{
      "400" : "#0FA958"
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        textInfo: {
          color: colors.blueGrey[700],
        },
      },
    },
  },
});
