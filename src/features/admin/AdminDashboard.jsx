import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { logout } from "../../redux/authSlice";
import { uploadUsersFile } from "../../api/apiClient";
import { approveProject, rejectProject } from "../../redux/adminSlice";

const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.student.projects); // 🔥 Obtenemos los proyectos enviados por los estudiantes

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ Debes seleccionar un archivo .txt");
      return;
    }

    try {
      const response = await uploadUsersFile(file);
      setMessage(`✅ Archivo subido exitosamente: ${response.data.message}`);
      setFile(null);
    } catch (error) {
      setMessage("❌ Error al subir el archivo. Inténtalo de nuevo.");
    }
  };


  const handleApprove = (index) => {
    dispatch(approveProject(projects[index]));
  };

  const handleReject = (index) => {
    dispatch(rejectProject(projects[index]));
  };
  const handleLogout = () => {
    dispatch(logout()); // 🔥 Eliminamos la sesión
    navigate("/login"); // 🔄 Redirigir a login
  };
  const approvedProjects = useSelector((state) => state.admin.approvedProjects);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100">
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        🔴 Cerrar Sesión
      </button>
      <h1 className="text-3xl font-bold">🔧 Panel de Administrador</h1>
      
      <p>Aquí puedes cargar la lista de usuarios desde un archivo .txt</p>

      <div className="mt-6 bg-white p-6 shadow-md rounded-md">
        <input type="file" accept=".txt" onChange={handleFileChange} className="mb-4" />
        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          📤 Subir Archivo
        </button>
      </div>

      {message && <p className="mt-4 text-lg font-semibold">{message}</p>}
      
      <p>Aquí puedes gestionar los proyectos subidos por los estudiantes.</p>

      <h2 className="text-2xl font-bold mt-6">📌 Proyectos Pendientes</h2>
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div key={index} className="bg-white p-4 mt-4 shadow-md rounded-md w-96">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleApprove(index)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                ✅ Aprobar
              </button>
              <button
                onClick={() => handleReject(index)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                ❌ Rechazar
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay proyectos pendientes.</p>
      )}
        <h2 className="text-2xl font-bold mt-6">✅ Proyectos Aprobados</h2>
        {approvedProjects.length > 0 ? (
        approvedProjects.map((project, index) => (
            <div key={index} className="bg-green-200 p-4 mt-4 shadow-md rounded-md w-96">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p>{project.description}</p>
            </div>
        ))
        ) : (
        <p className="text-gray-500">No hay proyectos aprobados.</p>
        )}

    </div>
  );
};

export default AdminDashboard;
