import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminProtectedRoute = ({ children }) => {

    const user = useSelector(
        state => state.auth.userData
    );

    if (!user)
        return <Navigate to="/login" replace />;

    if (user.role !== "admin")
        return <Navigate to="/dashboard" replace />;

    return children;
};

export default AdminProtectedRoute;