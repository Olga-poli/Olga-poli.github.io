import * as constants from '../constants/constants';

export const setMoviesList = (movies) => ({
  type: constants.SET_MOVIES_LIST,
  payload: movies,
});

export const setSearchInputValue = (searchInputValue) => ({
  type: constants.SET_SEARCH_INPUT_VALUE,
  payload: searchInputValue,
});

export const setActiveMovieId = (activeMovieId) => ({
  type: constants.SET_SEARCH_INPUT_VALUE,
  payload: activeMovieId,
});
