import { CssBaseline, ThemeProvider } from '@mui/material';
import React, { Navigate, Route, Routes } from 'react-router-dom';

import AuthProvider, { useAuth } from './contexts/AuthContext';
import { theme } from './contexts/theme';
import { Wrapper } from './layouts';
import {
  AllQuestions,
  Login,
  QuestionView,
  ScriptsPlayground,
  Signup,
} from './pages';

const App = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <ThemeProvider theme={theme}>
      {/* <AuthProvider> */}
      <CssBaseline />
      {/* <ScriptsPlayground /> */}
      <Routes>
        <Route path="/" element={<Wrapper />}>
          <Route path="/" element={<AllQuestions />} />
        </Route>
        <Route path="/questions/:qId" element={<Wrapper />}>
          <Route path="/questions/:qId" element={<QuestionView />} />
        </Route>
        <Route
          path="/auth/login"
          element={!currentUser ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/auth/signup"
          element={!currentUser ? <Signup /> : <Navigate to="/" />}
        />
        {/* <Route path="*" element={<Navigate to="/not-found" />} />
            <Routes path="/not-found" element={<NotFound />} /> */}
      </Routes>
      {/* </AuthProvider> */}
    </ThemeProvider>
  );
};

export default App;
