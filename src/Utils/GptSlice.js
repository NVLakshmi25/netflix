import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",

  initialState: {
    showGptSearch: false,
    movieNames: [],
    movieResults: [],
  },

  reducers: {
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },

    addGptMovieResults: (state, action) => {
      state.movieNames = action.payload.movieNames;
      state.movieResults = action.payload.movieResults;
    },
  },
});

export const {
  toggleGptSearchView,
  addGptMovieResults,
} = gptSlice.actions;

export default gptSlice.reducer;