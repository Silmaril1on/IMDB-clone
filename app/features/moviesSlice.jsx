import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  actors: [],
  watchlist: [],
  ratedMovies: [],
  recently: [],
  userRatings: 0,
  menuSettingsModal: false,
  warning: false,
  openPhotos: false,
  openStarPanel: false,
  openReviewPanel: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    getMoviesData: (state, action) => {
      state.movies = action.payload;
    },
    getActorsData: (state, action) => {
      state.actors = action.payload;
    },
    getWatchlistData: (state, action) => {
      state.watchlist = action.payload;
    },
    getWarning: (state) => {
      state.warning = !state.warning;
    },
    getUsersRating: (state, action) => {
      state.userRatings = action.payload;
    },
    getRecentlyData: (state, action) => {
      state.recently = action.payload;
    },
    getRatedMoviesData: (state, action) => {
      state.ratedMovies = action.payload;
    },
    handleOpenPhoto: (state) => {
      state.openPhotos = !state.openPhotos;
    },
    handleMenuSettings: (state) => {
      state.menuSettingsModal = !state.menuSettingsModal;
    },
    handleStarPanel: (state) => {
      state.openStarPanel = !state.openStarPanel;
    },
    handleReviewPanel: (state) => {
      state.openReviewPanel = !state.openReviewPanel;
    },
  },
});

export const {
  getMoviesData,
  getActorsData,
  getWatchlistData,
  getWarning,
  getUsersRating,
  getRatedMoviesData,
  handleOpenPhoto,
  handleMenuSettings,
  handleStarPanel,
  handleReviewPanel,
  getRecentlyData,
} = moviesSlice.actions;

export default moviesSlice.reducer;
