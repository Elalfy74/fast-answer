import { Route, Routes } from "react-router-dom";
import { theme } from "./theme/theme";
import { CssBaseline, ThemeProvider, Container, Grid } from "@mui/material";
import { QuestionsPage } from "./pages";

import { LeftSideBar, RightSideBar } from "./components";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container spacing={{ xs: 2, lg: 4 }}>
          <Grid
            item
            xs={3}
            sm={2}
            md={1.5}
            xl={3}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
          >
            <LeftSideBar />
          </Grid>
          <Grid item xs={12} sm={10} md={8} xl={6.5}>
            <Routes>
              <Route path="/" element={<QuestionsPage />} />
            </Routes>
          </Grid>
          <Grid
            item
            md={2.5}
            xl={2.5}
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <RightSideBar />
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
