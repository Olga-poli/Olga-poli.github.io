import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MoviesService from '../../services/MoviesService';

export const fetchMoviesList = createAsyncThunk(
  'catalog/setMoviesList',
  async (thunkAPI) => {
    try {
      const response = await MoviesService.getResource();
      return response.results.map((item) => ({
        ...item,
        currentLikesCount: 0,
        rating: 0,
        toShow: true,
      }));
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        message: 'Error',
      });
    }
  },
);

const catalogSlice = createSlice({
  name: 'catalog',
  initialState: {
    moviesItemsList: [],
    isError: false,
    isLoading: false,
    isUpdated: false,
    activeMovieId: null,
  },
  reducers: {
    setFilteredMoviesByTitle: (store, action) => {
      if (action.payload.length === 0) {
        store.moviesItemsList = store.moviesItemsList.map((item) => ({ ...item, toShow: true }));
      }
      store.moviesItemsList = store.moviesItemsList.map((item) => (
        item.title.toLowerCase().indexOf(action.payload.toLowerCase()) > -1
          ? { ...item, toShow: true }
          : { ...item, toShow: false }
      ));
    },
    setMoviesOrder: (store, action) => {
      if (!action.payload) {
        console.log(action.payload);
        // eslint-disable-next-line no-self-assign
        store.moviesItemsList = store.moviesItemsList;
      }
      const map = {
        likes: (a, b) => (
          action.payload.descending
            ? b.currentLikesCount - a.currentLikesCount
            : a.currentLikesCount - b.currentLikesCount
        ),
        rating: (a, b) => (
          action.payload.descending
            ? b.rating - a.rating
            : a.rating - b.rating
        ),
      };
      store.moviesItemsList = store.moviesItemsList.sort(map[action.payload.name]);
    },
  },
  extraReducers: {
    [fetchMoviesList.pending]: (store) => {
      store.isLoading = true;
    },
    [fetchMoviesList.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.moviesItemsList = action.payload;
    },
    [fetchMoviesList.rejected]: (store) => {
      store.isLoading = false;
      store.isError = true;
    },
  },
});

const { actions } = catalogSlice;
export const {
  setFilteredMoviesByTitle,
  setMoviesOrder,
} = actions;
export default catalogSlice.reducer;
