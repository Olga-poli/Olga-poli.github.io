import * as constants from '../constants/constants';

const initialState = {
  moviesItemsList: [],
  activeMovieId: null,
  searchInputValue: '',
};

// eslint-disable-next-line default-param-last
const movieItemsReducer = (state = initialState, action) => {
  const { moviesItemsList } = state;
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
      const sortedMovies = [...moviesItemsList].sort(map[action.payload.name]);
      return { ...state, moviesItemsList: sortedMovies };
    }

    case constants.SET_ACTIVE_MOVIE_ID: {
      return { ...state, activeMovieId: action.payload };
    }

    case constants.ADD_LIKE_TO_MOVIE_ITEM: {
      const currentMovieIndex = moviesItemsList.findIndex(({ id }) => id === action.payload);
      const currentLikesCount = moviesItemsList[currentMovieIndex].currentLikesCount + 1;
      const updatedMovie = { ...moviesItemsList[currentMovieIndex], currentLikesCount };
      const updatedMoviesItemsList = [
        ...moviesItemsList.slice(0, currentMovieIndex),
        updatedMovie,
        ...moviesItemsList.slice(currentMovieIndex + 1),
      ];
      return { ...state, moviesItemsList: updatedMoviesItemsList };
    }

    case constants.REMOVE_LIKE_FROM_MOVIE_ITEM: {
      const currentMovieIndex = moviesItemsList.findIndex(({ id }) => id === action.payload);
      const currentLikesCount = moviesItemsList[currentMovieIndex].currentLikesCount - 1;
      const updatedMovie = { ...moviesItemsList[currentMovieIndex], currentLikesCount };
      const updatedMoviesItemsList = [
        ...moviesItemsList.slice(0, currentMovieIndex),
        updatedMovie,
        ...moviesItemsList.slice(currentMovieIndex + 1),
      ];
      return { ...state, moviesItemsList: updatedMoviesItemsList };
    }

    // case constants.ADD_NEW_ITEM: {
    //   return { ...state, itemsList: [...state.itemsList, action.payload] };
    // }

    default: {
      return state;
    }
  }
};

//  updateItemLikesCounter(movieId, shift = 1) {
//     const { movies } = this.state;
//     const currentMovieIndex = movies.findIndex(({ id }) => id === movieId);
//     const currentLikesCount = movies[currentMovieIndex].currentLikesCount + shift;
//     const updatedMovie = { ...movies[currentMovieIndex], currentLikesCount };
//     this.setState(() => ({
//       movies: [
//         ...movies.slice(0, currentMovieIndex),
//         updatedMovie,
//         ...movies.slice(currentMovieIndex + 1),
//       ],
//     }));
//   }

export default movieItemsReducer;
