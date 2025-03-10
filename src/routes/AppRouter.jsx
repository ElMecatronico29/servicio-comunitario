import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import StudentDashboard from "../features/student/StudentDashboard";
import AdminDashboard from "../features/admin/AdminDashboard";
import JefeCarreraDashboard from "../features/jefeCarrera/JefeCarreraDashboard";
import TutorDashboard from "../features/tutor/TutorDashboard";
import ChangePassword from "../features/auth/ChangePassword";
import ProtectedRoute from "./ProtectedRoute"; 

const AppRouter = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Home />} />
        
        {/* Página de login */}
        <Route path="/login" element={user ? <Navigate to={`/${user.role}`} /> : <Login />} />

        {/* Rutas protegidas según rol */}
        <Route element={<ProtectedRoute allowedRoles={["estudiante"]} />}>
          <Route path="/estudiante" element={<StudentDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["jefe-carrera"]} />}>
          <Route path="/jefe-carrera" element={<JefeCarreraDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["tutor"]} />}>
          <Route path="/tutor" element={<TutorDashboard />} />
        </Route>

        {/* Redirección automática al Dashboard correcto según el rol */}
        <Route path="/dashboard" element={
          user ? <Navigate to={`/${user.role}`} /> : <Navigate to="/login" />
        } />

        <Route path="/change-password" element={<ChangePassword />} />        
        {/* Página no encontrada */}
        <Route path="*" element={<Navigate to={user ? `/${user.role}` : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
