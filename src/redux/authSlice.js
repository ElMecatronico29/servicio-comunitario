import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  needsPasswordSetup: false, // 🔹 Estado para usuarios sin contraseña
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.needsPasswordSetup = user.password === "-1"; // 🔥 Si tiene "-1", necesita registrar su contraseña
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.needsPasswordSetup = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
