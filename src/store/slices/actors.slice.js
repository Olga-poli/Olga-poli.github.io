import { createSlice } from '@reduxjs/toolkit';
import { fetchActorDetails } from '../actions/actions';

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

export default actorsSlice.reducer;
