import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  authentication = true,
}) => {
  const authStatus = useSelector(
    (state) => state.auth.status
  );

  // Protected Route
  if (authentication && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  // Public Route
  if (!authentication && authStatus) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;