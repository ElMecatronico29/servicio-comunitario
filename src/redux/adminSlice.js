import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { uploadUsersFile } from "../api/apiClient";

// 🔥 Thunk para subir archivos .txt y cargar usuarios en la base de datos
export const uploadFile = createAsyncThunk(
  "admin/uploadFile",
  async (file, { rejectWithValue }) => {
    try {
      const response = await uploadUsersFile(file);
      return response.data.message; // ✅ Mensaje de éxito del backend
    } catch (error) {
      return rejectWithValue("Error al subir el archivo");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: { 
    approvedProjects: [], 
    rejectedProjects: [], 
    uploadStatus: null // Estado para el resultado de la carga del archivo
  },
  reducers: {
    approveProject: (state, action) => {
      state.approvedProjects.push(action.payload);
    },
    rejectProject: (state, action) => {
      state.rejectedProjects.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploadStatus = "Cargando archivo...";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploadStatus = `✅ ${action.payload}`;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploadStatus = `❌ ${action.payload}`;
      });
  }
});

export const { approveProject, rejectProject } = adminSlice.actions;
export default adminSlice.reducer;
