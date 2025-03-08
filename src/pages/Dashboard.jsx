import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user) {
      console.warn("Redirigiendo a login porque no hay usuario autenticado");
      navigate("/login");
    }
  }, [user, navigate]); 

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!user) {
    return null; 
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bienvenido, {user} 🎉
      </h1>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
