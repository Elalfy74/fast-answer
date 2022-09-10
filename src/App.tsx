import {
  CssBaseline,
  createTheme,
  colors,
  ThemeProvider,
  Container,
  Grid,
} from "@mui/material";
import { QuestionsPage } from "./pages";

import { Route, Routes } from "react-router-dom";
import { LeftSideBar, RightSideBar } from "./components";

const theme = createTheme({
  palette: {
    background: {
      default: "#F5F6F8",
    },
    secondary: {
      main: "#3B6893",
      "100": colors.blue[400],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ pt: 10 }}>
        <Grid container spacing={4}>
          <Grid item xs={3}>
            <LeftSideBar />
          </Grid>
          <Grid item xs={7}>
            <Routes>
              <Route path="/" element={<QuestionsPage />} />
            </Routes>
          </Grid>
          <Grid item xs={2}>
            <RightSideBar />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
