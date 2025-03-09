import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userRole = null;
    let redirectPath = "/dashboard"; 

    if (form.username === "admin" && form.password === "admin") {
      userRole = "admin";
      redirectPath = "/admin";
    } else if (form.username === "jefe" && form.password === "jefe") {
      userRole = "jefeCarrera";
      redirectPath = "/jefe-carrera";
    } else if (form.username === "tutor" && form.password === "tutor") {
      userRole = "tutor";
      redirectPath = "/tutor";
    } else if (form.username === "estudiante" && form.password === "estudiante") {
      userRole = "student";
      redirectPath = "/student";
    } else {
      alert("Credenciales incorrectas");
      return;
    }

    dispatch(login({ user: form.username, token: "123456789", role: userRole }));
    console.log("Usuario:", form.username, "Rol:", userRole);
    
    navigate(redirectPath); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      <form className="bg-white p-6 shadow-md rounded-md" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Usuario</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
