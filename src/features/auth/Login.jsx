import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [identification, setIdentification] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [error, setError] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate(`/${user.role}`);
    }
  }, [user, navigate]);

  // 🔹 Verificar cédula para cambiar la contraseña
  const handleVerifyIdentification = async () => {
    try {
      const response = await apiClient.post("/users/verifyIdentification", { identification });

      const userData = response.data.response;

      // 🔥 Guardamos los datos del usuario para cambiar la contraseña
      setVerifiedUser(userData);
      setIsChangingPassword(true);
    } catch (error) {
      setError("Cédula no encontrada. Verifica e intenta de nuevo.");
    }
  };

  // 🔥 **Nuevo useEffect para manejar la redirección a `ChangePassword`**
  useEffect(() => {
    if (isChangingPassword && verifiedUser) {
      navigate("/change-password", { state: { user: verifiedUser } });
    }
  }, [isChangingPassword, verifiedUser, navigate]);

  // 🔹 Manejar Login normal
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await apiClient.post("/users/auth", {
        email: form.email,
        password: form.password
      });

      if (response.data.response.token) {
        dispatch(login({ user: response.data.response.user, token: response.data.response.token }));
        localStorage.setItem("token", response.data.response.token);
        localStorage.setItem("user", JSON.stringify(response.data.response.user));
        navigate(`/${response.data.response.user.role}`);
      } else {
        setError("Credenciales incorrectas");
      }
    } catch (error) {
      setError("Error en la autenticación");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold">{isChangingPassword ? "Cambiar Contraseña" : "Iniciar Sesión"}</h2>
      
      {!isChangingPassword ? (
        <div className="bg-white p-6 shadow-md rounded-md w-96 mt-4">
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
          <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
            Iniciar Sesión
          </button>
          <p className="mt-4 text-sm">¿Olvidaste tu contraseña o aún no la has creado?</p>
          <input
            type="text"
            placeholder="Cédula"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-4"
          />
          <button onClick={handleVerifyIdentification} className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600">
            Verificar Cédula
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      ) : (
        <p>Redirigiendo...</p>
      )}
    </div>
  );
};

export default Login;
