import { CssBaseline, createTheme, colors, ThemeProvider } from "@mui/material";
import { QuestionsPage } from "./pages";
import { Route, Routes } from "react-router-dom";

const theme = createTheme({
  palette: {
    secondary: {
      main: colors.orange[500],
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<QuestionsPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
