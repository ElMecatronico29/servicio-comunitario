import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: { approvedProjects: [], rejectedProjects: [] },
  reducers: {
    approveProject: (state, action) => {
      state.approvedProjects.push(action.payload);
    },
    rejectProject: (state, action) => {
      state.rejectedProjects.push(action.payload);
    },
  },
});

export const { approveProject, rejectProject } = adminSlice.actions;
export default adminSlice.reducer;
