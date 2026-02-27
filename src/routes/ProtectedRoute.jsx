import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;