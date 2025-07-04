import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isAuthenticated, status } = useSelector((state) => state.auth);

  // A better check to handle the initial loading state of auth
  const authIsLoading = useSelector(state => state.auth.status === 'loading');
  const authIsInitialized = useSelector(state => state.auth.user !== null || state.auth.error !== null || state.auth.status === 'idle');

  if(authIsLoading || !authIsInitialized) {
    return <div>Loading session...</div>; // Or a spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;