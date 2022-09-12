import { Route, Routes } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { theme } from "./contexts/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QuestionsPage } from "./pages";
import { Wrapper } from "./layouts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Wrapper>
          <Routes>
            <Route path="/" element={<QuestionsPage />} />
          </Routes>
        </Wrapper>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
