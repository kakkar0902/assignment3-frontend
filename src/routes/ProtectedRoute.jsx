


// ProtectedRoute.js
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext'; // Import your auth hook


const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext();  // Get current user from context
  const { customers, isloading, error } = useOutletContext(); // Get customers data and loading state
  
  // If user is authenticated, render child routes via Outlet, otherwise redirect to login
  return isAuthenticated ? <Outlet context={{ customers, isloading, error }} /> : <Navigate to="/login" replace />;
   
};


export default ProtectedRoute;
 