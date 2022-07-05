import { createAsyncThunk } from '@reduxjs/toolkit';
import MoviesService from '../../services/MoviesService';

export const fetchMoviesList = createAsyncThunk(
  'catalog/fetchMoviesList',
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

export const fetchMovieDetails = createAsyncThunk(
  'catalog/fetchMovieDetails',
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
