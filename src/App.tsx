import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { Route, Routes } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext';
import { theme } from './contexts/theme';
import { Wrapper } from './layouts';
import { QuestionsPage, QuestionView } from './pages';
import DummyScript from './pages/DummyScript';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Wrapper>
          {/* <QuestionView /> */}
          {/* <DummyScript /> */}
          <Routes>
            <Route path="/" element={<QuestionsPage />} />
          </Routes>
        </Wrapper>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
