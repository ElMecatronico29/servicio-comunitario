import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: { projects: [] },
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
      console.log("Proyecto agregado:", action.payload);
    },
  },
});

export const { addProject } = studentSlice.actions;
export default studentSlice.reducer;
