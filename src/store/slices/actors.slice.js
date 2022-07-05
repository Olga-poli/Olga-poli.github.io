import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import MoviesService from '../../services/MoviesService';

export const fetchActorDetails = createAsyncThunk(
  'actors/fetchActorDetails',
  async (actorName, thunkAPI) => {
    try {
      return await MoviesService.getActorInfo(actorName);
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue({
        message: 'Error',
      });
    }
  },
);

const actorsSlice = createSlice({
  name: 'actors',
  initialState: {
    actorData: [],
    isError: false,
    isLoading: false,
  },
  extraReducers: {
    [fetchActorDetails.pending]: (store) => {
      store.isLoading = true;
    },
    [fetchActorDetails.fulfilled]: (store, action) => {
      store.isLoading = false;
      store.actorData = action.payload;
    },
    [fetchActorDetails.rejected]: (store) => {
      store.isLoading = false;
      store.isError = true;
    },
  },
});

export const actorsReducer = actorsSlice.reducer;
