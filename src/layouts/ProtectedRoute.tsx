import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
