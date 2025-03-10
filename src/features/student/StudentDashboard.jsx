import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "../../redux/studentSlice";
import { logout } from "../../redux/authSlice"; // 🔥 Importamos la acción de logout
import { useNavigate } from "react-router-dom"; // 🔥 Para redirigir al usuario al login

const StudentDashboard = () => {
  const [project, setProject] = useState({ title: "", description: "", file: null });
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 🔥 Hook para la navegación
  const projects = useSelector((state) => state.student.projects);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProject({ ...project, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProject(project));
    alert("Proyecto enviado correctamente.");
    setProject({ title: "", description: "", file: null });
  };

  const handleLogout = () => {
    dispatch(logout()); // 🔥 Elimina el usuario de Redux
    localStorage.removeItem("token"); // 🔥 Borra el token
    localStorage.removeItem("user"); // 🔥 Borra la info del usuario
    navigate("/login"); // 🔥 Redirige al login
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="w-full flex justify-between p-4">
        <h1 className="text-3xl font-bold">📘 Panel de Estudiante</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cerrar Sesión 🚪
        </button>
      </div>
      
      <p>Aquí puedes subir y hacer seguimiento de tu proyecto.</p>

      <form className="bg-white p-6 shadow-md rounded-md mt-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Título del Proyecto</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Subir Archivo</label>
          <input type="file" onChange={handleFileChange} className="w-full px-3 py-2 border rounded-md" required />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Enviar Proyecto
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-6">📌 Proyectos Subidos</h2>
      {projects.map((p, index) => (
        <div key={index} className="bg-white p-4 mt-4 shadow-md rounded-md w-96">
          <h3 className="text-lg font-bold">{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default StudentDashboard;
