import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Auth/AuthService";

const ProtectedRoute = ({ children }) => {
  // if authenticated return children otherwise redirect to login
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
