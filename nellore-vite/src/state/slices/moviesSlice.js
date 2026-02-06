import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../services/config";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/movies-getMovies`);
      if (!response.ok) throw new Error("Failed to fetch movies");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/movies-getMovieDetail?id=${movieId}`,
      );
      if (!response.ok) throw new Error("Failed to fetch movie detail");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const createMovie = createAsyncThunk(
  "movies/createMovie",
  async (movieData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/movies-createMovie`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movieData),
      });
      if (!response.ok) throw new Error("Failed to create movie");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  movies: [],
  status: "idle",
  error: null,
  currMovieDetail: null,
  mockMovies: [
    {
      id: 1,
      title: "Avatar: Fire and Ash",
      poster:
        "https://via.placeholder.com/300x450/1a1a2e/ffffff?text=Avatar+Fire+and+Ash",
      rating: 8.1,
      voteCount: "33.4K+",
      genres: ["Action", "Adventure", "Fantasy", "Sci-Fi"],
    },
    {
      id: 2,
      title: "Pushpa 2: The Rule",
      poster: "https://via.placeholder.com/300x450/5D4037/ffffff?text=Pushpa+2",
      rating: 9.1,
      voteCount: "450K+",
      genres: ["Action", "Crime", "Drama"],
    },
  ],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        let items = [];
        if (Array.isArray(action.payload)) {
          items = action.payload;
        } else if (action.payload && Array.isArray(action.payload.data)) {
          items = action.payload.data;
        }
        state.movies = items;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        if (state.movies.length === 0) {
          state.movies = state.mockMovies;
        }
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.currMovieDetail = action.payload;
      })
      .addCase(createMovie.fulfilled, (state, action) => {
        if (action.payload) {
          state.movies.push(action.payload);
        }
      });
  },
});

export default moviesSlice.reducer;
