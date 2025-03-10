import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { evaluateProject } from "../../redux/tutorSlice";
import { logout } from "../../redux/authSlice"; // 🔥 Importamos la acción de logout
import { useNavigate } from "react-router-dom";

const TutorDashboard = () => {
  const dispatch = useDispatch();
  const finalApprovedProjects = useSelector((state) => state.jefeCarrera.finalApprovedProjects); // 🔥 Proyectos aprobados por el Jefe de Carrera
  const [grades, setGrades] = useState({});

  const handleGradeChange = (index, value) => {
    setGrades({ ...grades, [index]: value });
  };

  const handleSubmit = (index) => {
    if (!grades[index]) {
      alert("Por favor, asigna una calificación antes de enviar.");
      return;
    }

    const projectWithGrade = {
      ...finalApprovedProjects[index],
      grade: grades[index],
    };

    dispatch(evaluateProject(projectWithGrade)); // 🔥 Guardar la evaluación en Redux
    alert("Proyecto evaluado correctamente.");
  };
  const handleLogout = () => {
    dispatch(logout()); // 🔥 Elimina el usuario de Redux
    localStorage.removeItem("token"); // 🔥 Borra el token
    localStorage.removeItem("user"); // 🔥 Borra la info del usuario
    navigate("/login"); // 🔥 Redirige al login
  };
  const evaluatedProjects = useSelector((state) => state.tutor.evaluatedProjects);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
      <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cerrar Sesión 🚪
        </button>
      <h1 className="text-3xl font-bold">🏅 Panel del Profesor Tutor</h1>
      <p>Evalúa los proyectos enviados por los estudiantes.</p>

      <h2 className="text-2xl font-bold mt-6">📌 Proyectos para Evaluación</h2>
      {finalApprovedProjects.length > 0 ? (
        finalApprovedProjects.map((project, index) => (
          <div key={index} className="bg-white p-4 mt-4 shadow-md rounded-md w-96">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <label className="block text-gray-700 mt-4">Calificación</label>
            <input
              type="number"
              min="0"
              max="20"
              value={grades[index] || ""}
              onChange={(e) => handleGradeChange(index, e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
            <button
              onClick={() => handleSubmit(index)}
              className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600"
            >
              Enviar Evaluación
            </button>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay proyectos pendientes de evaluación.</p>
      )}
      <h2 className="text-2xl font-bold mt-6">🏆 Proyectos Evaluados</h2>
      {evaluatedProjects.length > 0 ? (
        evaluatedProjects.map((project, index) => (
          <div key={index} className="bg-green-200 p-4 mt-4 shadow-md rounded-md w-96">
            <h3 className="text-lg font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <p className="font-bold">Nota: {project.grade}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No hay proyectos evaluados.</p>
      )}
    </div>
  );
};

export default TutorDashboard;
