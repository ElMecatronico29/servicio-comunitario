import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600">404 - Página No Encontrada</h1>
      <p className="text-gray-700 mt-2">La ruta que intentaste acceder no existe.</p>

      <button 
        onClick={() => navigate(user ? `/${user.role}` : "/login")}
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Volver al Inicio
      </button>
    </div>
  );
};

export default NotFound;
