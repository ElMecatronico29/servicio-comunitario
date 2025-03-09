import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import StudentDashboard from "../features/student/StudentDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";
import JefeCarreraDashboard from "../features/jefeCarrera/JefeCarreraDashboard";
import TutorDashboard from "../features/tutor/TutorDashboard";
import ProtectedRoute from "./ProtectedRoute"; 

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["jefeCarrera"]} />}>
          <Route path="/jefe-carrera" element={<JefeCarreraDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["tutor"]} />}>
          <Route path="/tutor" element={<TutorDashboard />} />
        </Route>

        <Route path="*" element={<h2>Página no encontrada</h2>} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
