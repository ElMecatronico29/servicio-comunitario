import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  // 🔥 Si aún no hemos cargado los datos desde localStorage, mostramos "Cargando..."
  if (user === undefined || role === undefined) {
    return <h2 className="text-center mt-10">Cargando...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
