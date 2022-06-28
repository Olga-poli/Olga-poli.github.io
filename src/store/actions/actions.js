import * as constants from '../constants/constants';

export const setMoviesList = (movies) => ({
  type: constants.SET_MOVIES_LIST,
  payload: movies,
});

export const setSearchInputValue = (searchInputValue) => ({
  type: constants.SET_SEARCH_INPUT_VALUE,
  payload: searchInputValue,
});

export const setMoviesOrder = (filterOrder) => ({
  type: constants.SET_MOVIES_ORDER,
  payload: filterOrder,
});

export const setActiveMovieId = (activeMovieId) => ({
  type: constants.SET_ACTIVE_MOVIE_ID,
  payload: activeMovieId,
});

export const addLikeToMovieItem = (currentMovieId) => ({
  type: constants.ADD_LIKE_TO_MOVIE_ITEM,
  payload: currentMovieId,
});

export const removeLikeFromMovieItem = (currentMovieId) => ({
  type: constants.REMOVE_LIKE_FROM_MOVIE_ITEM,
  payload: currentMovieId,
});

export const setRatingToMovieItem = (movieId, currentIndex) => ({
  type: constants.SET_RATING_TO_MOVIE_ITEM,
  payload: { movieId, currentIndex },
});
