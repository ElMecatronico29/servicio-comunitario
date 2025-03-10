import { useSelector, useDispatch } from "react-redux";
import { approveProject, rejectProject } from "../../redux/jefeCarreraSlice";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";


const JefeCarreraDashboard = () => {
  const dispatch = useDispatch();
  const approvedProjects = useSelector((state) => state.admin.approvedProjects); // 🔥 Obtener proyectos aprobados por el administrador

  const handleApprove = (index) => {
    dispatch(approveProject(approvedProjects[index])); // 🔥 Enviar los datos completos a Redux
  };

  const handleReject = (index) => {
    dispatch(rejectProject(approvedProjects[index])); // 🔥 Enviar los datos completos a Redux
  };
  const handleLogout = () => {
    dispatch(logout()); // 🔥 Eliminamos la sesión
    navigate("/login"); // 🔄 Redirigir a login
  };
  const finalApprovedProjects = useSelector((state) => state.jefeCarrera.finalApprovedProjects);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100">
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        🔴 Cerrar Sesión
      </button>
      <h1 className="text-3xl font-bold">📋 Panel de Jefe de Carrera</h1>
      <p>Revisa los proyectos y verifica que sean acordes a la carrera del estudiante.</p>

      <h2 className="text-2xl font-bold mt-6">📌 Proyectos Pendientes</h2>
      {approvedProjects.length > 0 ? (
        approvedProjects.map((project, index) => (
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
      {finalApprovedProjects.length > 0 ? (
        finalApprovedProjects.map((project, index) => (
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

export default JefeCarreraDashboard;
