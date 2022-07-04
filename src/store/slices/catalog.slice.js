import { createSlice } from '@reduxjs/toolkit';

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    moviesItemsList: [],
    isError: false,
    isLoading: false,
    isLoaded: false,
    isUpdated: false,
    activeMovieId: null,
  },
  reducers: {
    setMoviesList: (store, action) => {
      store.moviesItemsList = action.payload.moviesItemsList;
    },
  },
  // extraReducers: {
  //   [setMoviesList.pending]: (store) => {
  //     store.isLoading = true;
  //   },
  //   [setMoviesList.fulfilled]: (store, action) => {
  //     store.isLoading = false;
  //     store.moviesItemsList = action.payload.moviesItemsList;
  //   },
  //   [setMoviesList.rejected]: (store) => {
  //     store.isLoading = false;
  //     store.isError = true;
  //   },
  // },
});

export const { setMoviesList } = catalogSlice.actions;
export default catalogSlice.reducer;
