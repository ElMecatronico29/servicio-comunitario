import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido al Sistema de Servicio Comunitario</h1>
      <p className="text-gray-600 mb-6">Por favor, inicia sesión para acceder a la plataforma.</p>
      <Link to="/login" className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Iniciar Sesión
      </Link>
    </div>
  );
};

export default Home;
