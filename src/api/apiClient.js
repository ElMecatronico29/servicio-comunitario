import axios from "axios";

// Base URL del backend
const API_URL = "http://localhost:5000/api/v1"; // ⚠️ Ajusta esto si la API tiene otro dominio/puerto

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// 🔹 Interceptor para agregar el token JWT en las peticiones protegidas
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔍 1️⃣ Verificar si la cédula existe en la base de datos
export const verifyIdentification = (identification) => {
  return apiClient.post("/users/verifyIdentification", { identification });
};

// 🔑 2️⃣ Actualizar la contraseña de un usuario
export const updatePassword = (identification, password) => {
  return apiClient.put(`/users/updatePassword/${identification}`, { password });
};

export default apiClient;
