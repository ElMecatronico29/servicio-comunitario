import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../features/auth/Login";
import Dashboard from "../pages/Dashboard";
//import NotFound from "../pages/NotFound"; // Página de error si la ruta no existe

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
};

export default AppRouter;
