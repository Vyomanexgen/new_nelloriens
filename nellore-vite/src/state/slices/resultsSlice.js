import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const fetchResults = createAsyncThunk(
  "results/fetchResults",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/results-getResults`);
      if (!response.ok) throw new Error("Failed to fetch results");
      const data = await response.json();
      console.log("✅ Results API Success:", data);
      return data;
    } catch (error) {
      console.error("❌ Results API Error:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchResultDetail = createAsyncThunk(
  "results/fetchResultDetail",
  async (resultId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/results-getResultDetail?id=${resultId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch result detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createResult = createAsyncThunk(
  "results/createResult",
  async (newResult, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/results-createResult`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newResult),
      });
      if (!response.ok) throw new Error("Failed to create result");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  resultsFilters: [
    { id: 1, label: "All" },
    { id: 2, label: "Schools" },
    { id: 3, label: "Universities" },
    { id: 4, label: "Govt Exams" },
    { id: 5, label: "Medical" },
  ],
  resultsList: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  currResultDetail: null,
  resultsPage: {
    currentPage: 1,
    totalPages: 9,
    isLoading: false,
  },
  recentlyViewed: [
    { id: 1, title: "Group-IV Merit List (Provisional)" },
    { id: 2, title: "SSC Supply Results - Sep 2025" },
    { id: 3, title: "Diploma Revaluation Results - Aug 2025" },
  ],
  importantLinks: [
    { id: 1, label: "AP SBTET Official Portal", url: "#" },
    { id: 2, label: "AP SSC Results", url: "#" },
    { id: 3, label: "NEET Counselling", url: "#" },
  ],
  resultTools: [
    { id: 1, label: "Select Exam Date", icon: "bi-calendar-event" },
    { id: 2, label: "Choose Region / District", icon: "bi-geo-alt" },
    { id: 3, label: "Set Alerts", icon: "bi-bell" },
    { id: 4, label: "Save this filter", icon: "bi-bookmark" },
  ],
};

const resultsSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResultsPage: (state, action) => {
      state.resultsPage.currentPage = action.payload;
    },
    setResultsLoading: (state, action) => {
      state.resultsPage.isLoading = action.payload;
    },
    addToRecentlyViewed: (state, action) => {
      const result = action.payload;
      // Remove if already exists
      state.recentlyViewed = state.recentlyViewed.filter(
        (item) => item.id !== result.id,
      );
      // Add to beginning
      state.recentlyViewed.unshift({ id: result.id, title: result.title });
      // Keep only last 5
      state.recentlyViewed = state.recentlyViewed.slice(0, 5);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResults.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchResults.fulfilled, (state, action) => {
        state.status = "succeeded";
        let items = [];
        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          items = action.payload.data;
        }

        // Ensure serialization of dates if needed or mapping properties
        state.resultsList = items.map((item) => ({
          ...item,
          // Ensure id is present or mapped if different from backend
          id: item.id || Math.random().toString(36).substr(2, 9),
        }));
      })
      .addCase(fetchResults.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createResult.fulfilled, (state, action) => {
        // improvements: fetch results again to ensure fresh state
        // For now, optimistic update or just simple append if structure matches
        if (action.payload && typeof action.payload === "object") {
          state.resultsList.unshift(action.payload);
        }
      })
      .addCase(fetchResultDetail.fulfilled, (state, action) => {
        state.currResultDetail = action.payload;
      });
  },
});

export const { setResultsPage, setResultsLoading, addToRecentlyViewed } =
  resultsSlice.actions;
export default resultsSlice.reducer;
