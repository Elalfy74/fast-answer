import { ReactQueryDevtools } from 'react-query/devtools';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './contexts/AuthContext';
import QueryProvider from './contexts/QueryProvider';
import AppTheme from './contexts/theme';
import {
  BottomNavigationLayout,
  MiniWrapper,
  ProtectedRoute,
  RightSideBarLayout,
  Wrapper,
} from './layouts';
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

  return (
    <AppTheme>
      <QueryProvider>
        {/* <ScriptsPlayground /> */}
        <Routes>
          <Route element={<BottomNavigationLayout />}>
            <Route element={<Wrapper />}>
              <Route element={<RightSideBarLayout />}>
                <Route path="/" element={<AllQuestions />} />
                <Route path="/questions/:qId" element={<QuestionDetails />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<UserProfile />} />
              </Route>

              <Route path="/users/:userId" element={<UserProfile />} />
            </Route>

            <Route element={<MiniWrapper />}>
              <Route path="/ask-question" element={<AskQuestion />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile-settings" element={<EditAccount />} />
                <Route path="/chat/*" element={<Chat />} />
              </Route>
            </Route>

            {/* <Route path="*" element={<Navigate to="/not-found" />} /> */}
            {/* <Routes path="/not-found" element={<NotFound />} /> */}
          </Route>
          <Route
            path="/auth/login"
            element={!currentUser ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/auth/signup"
            element={!currentUser ? <Signup /> : <Navigate to="/" />}
          />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryProvider>
    </AppTheme>
  );
};

export default App;
