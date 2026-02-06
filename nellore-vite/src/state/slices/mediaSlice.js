import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const uploadMedia = createAsyncThunk(
  "media/uploadMedia",
  async (mediaData, { rejectWithValue }) => {
    try {
      // const formData = new FormData();
      // Assuming mediaData is an object with 'file' property or similar, or it is already FormData.
      // If it's a file selection event, we might need to handle it.
      // Here we assume mediaData is likely a File object or similar, or FormData.
      // If user sends formatted body, we use it.
      // But usually uploads are FormData.
      // Let's assume the component prepares FormData or we create it here.
      // If mediaData is { file, ...fields }

      // For now, let's assume mediaData is the body expected.
      // If it requires multipart/form-data, fetch handles it if body is FormData

      const response = await fetch(`${BASE_URL}/media-uploadMedia`, {
        method: "POST",
        // headers: { 'Content-Type': 'multipart/form-data' }, // Fetch automatically sets this with boundary for FormData
        body: mediaData,
      });

      if (!response.ok) throw new Error("Failed to upload media");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  uploadStatus: "idle",
  uploadedUrl: null,
  error: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    resetMediaState: (state) => {
      state.uploadStatus = "idle";
      state.uploadedUrl = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadMedia.pending, (state) => {
        state.uploadStatus = "loading";
      })
      .addCase(uploadMedia.fulfilled, (state, action) => {
        state.uploadStatus = "succeeded";
        state.uploadedUrl = action.payload.url;
      })
      .addCase(uploadMedia.rejected, (state, action) => {
        state.uploadStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetMediaState } = mediaSlice.actions;
export default mediaSlice.reducer;
