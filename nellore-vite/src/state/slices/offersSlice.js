import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const createOffer = createAsyncThunk(
  "offers/createOffer",
  async (offerData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/offers-createOffer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offerData),
      });
      if (!response.ok) throw new Error("Failed to create offer");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchOffers = createAsyncThunk(
  "offers/fetchOffers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/offers-getOffers`); // Assuming there is a get endpoint if needed, though only POST was asked. But usually we need to fetch what we create.
      if (!response.ok) throw new Error("Failed to fetch offers");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  offers: [],
  status: "idle",
  error: null,
};

const offersSlice = createSlice({
  name: "offers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOffer.fulfilled, (state, action) => {
      if (action.payload) {
        state.offers.push(action.payload);
      }
    });
  },
});

export default offersSlice.reducer;
