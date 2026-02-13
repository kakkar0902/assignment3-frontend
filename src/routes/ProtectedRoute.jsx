import { Navigate, Outlet, useOutletContext } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthContext(); // Get authentication status from context
  const { customers, isLoading, error } = useOutletContext();
  
  // If the user is authenticated, render child routes via Outlet, otherwise redirect to login
  return isAuthenticated ? (
    <Outlet context={{ customers, isLoading, error }} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
