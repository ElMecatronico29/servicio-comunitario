import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/authSlice";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

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
    <> 
      <Header position="absolute" />
      <div className="flex flex-col items-center justify-center min-h-screen bg-[url(/assets/unet.webp)] bg-cover ">
      
        
        
        {!isChangingPassword ? (
          <div className="bg-secondary p-6 shadow-md rounded-md w-96 mt-4 box-border h-max  ">
            <label htmlFor="Email"className="text-primary ml-1">Email</label>
            <input
              type="text"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-3 py-2 mb-4 mr-4 bg-secondary text-black border-primary box-border border-b-2 focus:bg-primaryHover  focus-visible:outline-none "
            />
            
            <label htmlFor="Email"className="text-primary ml-1">Contraseña</label>
            <input
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-3 py-2 mb-4 bg-secondary text-black border-primary box-border   border-b-2 focus:bg-primaryHover  focus-visible:outline-none"
            />
            <button onClick={handleLogin} className="w-full bg-primary text-secondary py-2 rounded-md   hover:bg-blue-950 ">
              Iniciar Sesión
            </button>
            <p className="my-4 text-sm text-primary">¿Olvidaste tu contraseña o aún no la has creado?</p>
            <label htmlFor="Cedula"className="text-primary ml-1">Cedula</label>
            <input
              type="text"
              placeholder="Cédula"
              value={identification}
              onChange={(e) => setIdentification(e.target.value)}
              className="w-full px-3 py-2 mb-4 bg-secondary text-black border-primary box-border   border-b-2 focus:bg-primaryHover  focus-visible:outline-none"
            />
            <button onClick={handleVerifyIdentification} className="w-full bg-secondary text-primary py-2 border border-primary rounded-md hover:bg-primaryHover hover:border-primary">
              Verificar Cédula
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        ) : (
          <p>Redirigiendo...</p>
        )}
      </div>
    </>
  );
  
};

export default Login;
