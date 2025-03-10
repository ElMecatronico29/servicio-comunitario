import { createSlice } from "@reduxjs/toolkit";

const tutorSlice = createSlice({
  name: "tutor",
  initialState: { evaluatedProjects: [] },
  reducers: {
    evaluateProject: (state, action) => {
      state.evaluatedProjects.push(action.payload); // 🔥 Guardar proyecto evaluado con nota
    },
  },
});

export const { evaluateProject } = tutorSlice.actions;
export default tutorSlice.reducer;
