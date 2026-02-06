import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'English',
  theme: 'light',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setLanguage, setTheme } = appSlice.actions;
export default appSlice.reducer;

