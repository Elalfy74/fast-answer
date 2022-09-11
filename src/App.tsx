import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

import { theme } from "./context/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QuestionsPage } from "./pages";
import { Wrapper } from "./layouts";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Wrapper>
        <Routes>
          <Route path="/" element={<QuestionsPage />} />
        </Routes>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;
