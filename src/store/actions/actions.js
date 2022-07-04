import { createAction } from '@reduxjs/toolkit';
import * as constants from '../constants/constants';

export const setMoviesListAction = (movies) => ({
  type: constants.SET_MOVIES_LIST,
  payload: movies,
});

export const setFilteredMoviesByTitleAction = (inputValue) => ({
  type: constants.SET_FILTERED_MOVIES_BY_TITLE,
  payload: inputValue,
});

export const setMoviesOrderAction = (filterOrder) => ({
  type: constants.SET_MOVIES_ORDER,
  payload: filterOrder,
});

export const setActiveMovieIdAction = (activeMovieId) => ({
  type: constants.SET_ACTIVE_MOVIE_ID,
  payload: activeMovieId,
});

export const addLikeToMovieItemAction = (currentMovieId) => ({
  type: constants.ADD_LIKE_TO_MOVIE_ITEM,
  payload: currentMovieId,
});

export const removeLikeFromMovieItemAction = (currentMovieId) => ({
  type: constants.REMOVE_LIKE_FROM_MOVIE_ITEM,
  payload: currentMovieId,
});

export const setRatingToMovieItemAction = (movieId, currentIndex) => ({
  type: constants.SET_RATING_TO_MOVIE_ITEM,
  payload: { movieId, currentIndex },
});

export const removeMovieItemAction = (movieId) => ({
  type: constants.REMOVE_MOVIE_ITEM,
  payload: { movieId },
});

export const updateMovieItemAction = (movieId, newData) => ({
  type: constants.UPDATE_MOVIE_ITEM,
  payload: { movieId, newData },
});

export const setMoviesList = createAction('catalog/setMoviesList');

// export const setMoviesList = createAsyncThunk(
//   'catalog/setMoviesList',
//   async (thunkAPI) => {
//     try {
//       const data = await MoviesService.getResource();
//
//       return { ...data };
//     } catch (error) {
//       console.error(error);
//       return thunkAPI.rejectWithValue({
//         message: 'Error',
//       });
//     }
//   },
// );
