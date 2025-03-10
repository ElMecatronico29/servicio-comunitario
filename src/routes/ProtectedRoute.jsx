import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  const needsPasswordSetup = useSelector((state) => state.auth.needsPasswordSetup);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (needsPasswordSetup) {
    return <Navigate to="/register-password" />; // 🔥 Si necesita contraseña, redirigir a la vista de registro
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}`} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
