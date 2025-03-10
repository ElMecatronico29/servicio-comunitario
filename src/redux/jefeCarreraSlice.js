import { createSlice } from "@reduxjs/toolkit";

const jefeCarreraSlice = createSlice({
  name: "jefeCarrera",
  initialState: { finalApprovedProjects: [], rejectedProjects: [] },
  reducers: {
    approveProject: (state, action) => {
      state.finalApprovedProjects.push(action.payload); // 🔥 Guardar el proyecto aprobado
    },
    rejectProject: (state, action) => {
      state.rejectedProjects.push(action.payload); // 🔥 Guardar el proyecto rechazado
    },
  },
});

export const { approveProject, rejectProject } = jefeCarreraSlice.actions;
export default jefeCarreraSlice.reducer;
