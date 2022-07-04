import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MoviesService from '../../services/MoviesService';

export const fetchMovieDetails = createAsyncThunk(
  'movie/fetchMovieDetails',
  async (movieID, thunkAPI) => {
    try {
      return await MoviesService.getMovieInfo(movieID);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        message: 'Error',
      });
    }
  },
);

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movieData: null,
    isError: false,
    isLoading: false,
  },
  extraReducers: {
    [fetchMovieDetails.pending]: (store) => {
      store.isLoading = true;
    },
    [fetchMovieDetails.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.movieData = action.payload;
    },
    [fetchMovieDetails.rejected]: (store) => {
      store.isLoading = false;
      store.isError = true;
    },
  },
});

export const movieReducer = movieSlice.reducer;
