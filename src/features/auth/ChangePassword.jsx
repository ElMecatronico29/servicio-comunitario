import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const RegisterPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user; // 🔥 Obtenemos el usuario desde `state`

  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  // 🔹 Si no hay usuario, redirigir a login
  if (!user) {
    navigate("/login");
    return null;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Enviar la nueva contraseña al backend
      await apiClient.put(`/users/updatePassword/${user.identification}`, { password });

      alert("Contraseña creada con éxito. Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      setError("Hubo un problema al registrar la contraseña.");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url(/assets/unet.webp)] bg-cover">
     
      <form onSubmit={handleRegister} className="bg-secondary p-6 shadow-md rounded-md w-96 mt-4">
      <h2 className="text-3xl font-bold text-primary text-center my-4">Crear Contraseña</h2>
        {/* 🔹 Mostrar el correo en un campo de solo lectura */}
        <label className="block text-primary">Correo Electrónico</label>
        <input
          type="text"
          value={user.email} // 🔥 Aquí mostramos el correo
          disabled // 🔹 Deshabilitado para que no pueda modificarse
          className="w-full px-3 py-2 border rounded-md mb-4 bg-gray-200 text-black cursor-not-allowed"
        />

        <label className="block text-primary">Nueva Contraseña</label>
        <input
          type="password"
          placeholder="Ingrese su nueva contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 mb-4 mr-4 bg-secondary text-black border-primary box-border border-b-2 focus:bg-primaryHover  focus-visible:outline-none "
          />

        <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-blue-950">
          Guardar Contraseña
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPassword;
