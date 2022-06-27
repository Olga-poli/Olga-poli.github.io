import * as constants from '../constants/constants';

const initialState = {
  moviesItemsList: [],
  activeMovieId: null,
  searchInputValue: '',
};

// eslint-disable-next-line default-param-last
const movieItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MOVIES_LIST: {
      return { ...state, moviesItemsList: action.payload };
    }

    case constants.SET_SEARCH_INPUT_VALUE: {
      return { ...state, searchInputValue: action.payload };
    }

    case constants.SET_MOVIES_ORDER: {
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
      const sortedMovies = [...state.moviesItemsList].sort(map[action.payload.name]);
      return { ...state, moviesItemsList: sortedMovies };
    }

    case constants.SET_ACTIVE_MOVIE_ID: {
      return { ...state, activeMovieId: action.payload };
    }

    // case constants.ADD_NEW_ITEM: {
    //   return { ...state, itemsList: [...state.itemsList, action.payload] };
    // }

    default: {
      return state;
    }
  }
};

export default movieItemsReducer;
