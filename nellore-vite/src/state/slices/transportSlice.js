import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const fetchTransports = createAsyncThunk(
  "transport/fetchTransports",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/transport-getTransports`);
      if (!response.ok) throw new Error("Failed to fetch transports");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchTransportDetail = createAsyncThunk(
  "transport/fetchTransportDetail",
  async (transportId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/transport-getTransportDetail?id=${transportId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch transport detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createTransport = createAsyncThunk(
  "transport/createTransport",
  async (transportData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/transport-createTransport`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transportData),
      });
      if (!response.ok) throw new Error("Failed to create transport");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  transports: [],
  status: "idle",
  error: null,
  currTransportDetail: null,
  // Mock data to fall back on if API fails or is empty, matching TransportCard usage
  mockTransports: [
    {
      id: "mock-1",
      name: "Jan Shatabdi Express",
      category: "train",
      number: "12077",
      from: "Nellore",
      to: "Chennai Central",
      departureTime: "15:30",
      arrivalTime: "18:50",
      duration: "3h 20m",
      runningDays: ["Mon", "Wed", "Thu", "Fri", "Sun"],
      price: { SL: 180, CC: 450, "2S": 105 },
      availability: { SL: "AVL 15", CC: "WL 10", "2S": "AVL 45" },
      status: "On Time",
    },
    {
      id: "mock-2",
      name: "APSRTC Garuda",
      category: "bus",
      type: "AC Semi Sleeper",
      from: "Nellore",
      to: "Tirupati",
      departureTime: "06:00 AM",
      arrivalTime: "09:00 AM",
      duration: "3h 00m",
      price: 350,
      seatsAvailable: 12,
      status: "Running",
    },
    {
      id: "mock-3",
      name: "Metro Rail",
      category: "metro",
      route: "RTC Bus Stand - VRC Centre",
      frequency: "Every 10 mins",
      estimatedTime: "25m",
      fare: 35,
      stops: 8,
      status: "Active",
    },
  ],
};

const transportSlice = createSlice({
  name: "transport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransports.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTransports.fulfilled, (state, action) => {
        state.status = "succeeded";
        let items = [];
        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          items = action.payload.data;
        }
        state.transports = items;
      })
      .addCase(fetchTransports.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        if (state.transports.length === 0) {
          state.transports = state.mockTransports;
        }
      })
      .addCase(fetchTransportDetail.fulfilled, (state, action) => {
        state.currTransportDetail = action.payload;
      })
      .addCase(createTransport.fulfilled, (state, action) => {
        if (action.payload) {
          state.transports.push(action.payload);
        }
      });
  },
});

export default transportSlice.reducer;
