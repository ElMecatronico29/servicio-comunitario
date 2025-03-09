import { createSlice } from "@reduxjs/toolkit";

// 🔥 Intentamos recuperar la sesión almacenada en localStorage
const storedUser = JSON.parse(localStorage.getItem("user")) || null;
const storedToken = localStorage.getItem("token") || null;
const storedRole = localStorage.getItem("role") || null;

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: storedUser, 
    token: storedToken, 
    role: storedRole 
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.role;

      // 🔥 Guardamos los datos en localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;

      // 🔥 Eliminamos los datos de localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
