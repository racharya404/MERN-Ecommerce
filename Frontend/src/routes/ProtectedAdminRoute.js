import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { loading, isUser,user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isUser) {
      return <Navigate to="/login" replace />;
    } else if(user.role !== "Admin"){
        return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default ProtectedAdminRoute;
