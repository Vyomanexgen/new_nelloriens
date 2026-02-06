import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const fetchCommonAds = createAsyncThunk(
  "commonAds/fetchCommonAds",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/commonAds-getCommonAds`);
      if (!response.ok) throw new Error("Failed to fetch common ads");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchCommonAdDetail = createAsyncThunk(
  "commonAds/fetchCommonAdDetail",
  async (adId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/commonAds-getCommonAdDetail?id=${adId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch common ad detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createAd = createAsyncThunk(
  "commonAds/createAd",
  async (adData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/adsCreateAd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adData),
      });
      if (!response.ok) throw new Error("Failed to create ad");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createCommonAd = createAsyncThunk(
  "commonAds/createCommonAd",
  async (newAd, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/commonAds-createCommonAd`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAd),
      });
      if (!response.ok) throw new Error("Failed to create common ad");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  status: "idle",
  error: null,
  commonAds: [],
  sponsored: [],
  currentAdDetail: null,
  // Mock data for fallback
  mockCommonAds: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=250&fit=crop",
      title: "Festival Electronics Sale",
      buttonText: "Shop",
      buttonColor: "blue",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
      title: "Coaching Admissions Open",
      buttonText: "Enroll",
      buttonColor: "gray",
    },
  ],
  mockSponsored: [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
      title: "Explore Maldives & Sri Lanka",
      subtitle: "Curated packages from Chennai",
      buttonText: "Book Now",
      buttonColor: "blue",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop",
      title: "Nellore Meals Festival",
      subtitle: "20% off this week",
      buttonText: "Visit",
      buttonColor: "gray",
    },
  ],
};

const commonAdsSlice = createSlice({
  name: "commonAds",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommonAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCommonAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        const payload = action.payload;
        // Assume payload structure: { commonAds: [], sponsored: [] } or just list
        // If just list, we can split or just put all in commonAds

        if (payload.commonAds || payload.sponsored) {
          state.commonAds = payload.commonAds || [];
          state.sponsored = payload.sponsored || [];
        } else if (Array.isArray(payload)) {
          // If flat list, put all in commonAds
          state.commonAds = payload;
          // Or separate if 'type' exists
          // state.sponsored = payload.filter(ad => ad.type === 'sponsored');
          // state.commonAds = payload.filter(ad => ad.type !== 'sponsored');
        } else if (payload.data && Array.isArray(payload.data)) {
          state.commonAds = payload.data;
        }
      })
      .addCase(fetchCommonAds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Fallback
        if (state.commonAds.length === 0) state.commonAds = state.mockCommonAds;
        if (state.sponsored.length === 0) state.sponsored = state.mockSponsored;
      })
      .addCase(createCommonAd.fulfilled, (state, action) => {
        // Add to state
        if (action.payload) {
          state.commonAds.push(action.payload);
        }
      })
      .addCase(fetchCommonAdDetail.fulfilled, (state, action) => {
        state.currentAdDetail = action.payload;
      })
      .addCase(createAd.fulfilled, (state, action) => {
        // Assuming createAd returns an ad object, we can add it to commonAds or sponsored depending on type
        // For now, pushing to commonAds as default
        if (action.payload) {
          state.commonAds.push(action.payload);
        }
      });
  },
});

export default commonAdsSlice.reducer;
