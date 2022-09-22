import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext';
import { theme } from './contexts/theme';
import { SecondaryWrapper, Wrapper } from './layouts';
import {
  AllQuestions,
  Chat,
  Login,
  QuestionDetails,
  ScriptsPlayground,
  Signup,
  UserProfile,
} from './pages';
import AskQuestion from './pages/AskQuestion/AskQuestion';
import EditAccount from './pages/EditAccount/EditAccount';

const App = () => {
  const { currentUser } = useAuth();

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <ChatProvider> */}
      <QueryClientProvider client={queryClient}>
        {/* <ScriptsPlayground /> */}
        <Routes>
          <Route path="/" element={<Wrapper />}>
            <Route path="/" element={<AllQuestions />} />
          </Route>
          <Route path="/questions/:qId" element={<Wrapper />}>
            <Route path="/questions/:qId" element={<QuestionDetails />} />
          </Route>

          <Route element={<SecondaryWrapper />}>
            <Route path="/user" element={<UserProfile />} />
          </Route>

          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/edit-account" element={<EditAccount />} />

          {/* <Route path="/chat/*" element={<ChatWrapper />}> */}
          <Route path="/chat/*" element={<Chat />} />
          {/* </Route> */}

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
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      {/* </ChatProvider> */}
    </ThemeProvider>
  );
};

export default App;
