import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import studentReducer from "./studentSlice";
import adminReducer from "./adminSlice";
import jefeCarreraReducer from "./jefeCarreraSlice";
import tutorReducer from "./tutorSlice"; // 🔥 Agregamos el nuevo reducer

export const store = configureStore({
  reducer: {
    auth: authReducer,
    student: studentReducer,
    admin: adminReducer,
    jefeCarrera: jefeCarreraReducer,
    tutor: tutorReducer, // 🔥 Importante agregarlo aquí
  },
});
