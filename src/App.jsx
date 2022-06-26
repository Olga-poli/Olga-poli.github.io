import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './App.module.scss';
import Filter from './components/Filter';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesService from './services/MoviesService';
import MovieListItem from './components/MovieListItem';
import store from './store/configureStore';
// import * as actions from './store/actions/actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: null,
      // activeMovieId: null,
      // searchInputValue: '',
    };
  }

  componentDidMount() {
    this.updateMovies();
  }

  // eslint-disable-next-line class-methods-use-this
  updateMovies = () => {
    MoviesService.getResource()
      .then((res) => {
        // eslint-disable-next-line react/prop-types,react/destructuring-assignment
        this.props.setMoviesList(res.results.map((item) => ({
          ...item,
          currentLikesCount: 0,
          rating: 0,
        })));
        // store.dispatch(actions.setMoviesList(res.results.map((item) => ({
        //   ...item,
        //   currentLikesCount: 0,
        //   rating: 0,
        // }))));

        // this.setState({
        //   movies: res.results.map((item) => ({
        //     ...item,
        //     currentLikesCount: 0,
        //     rating: 0,
        //   })),
        // });
      });
  };

  onFilterChange = (activeButton) => {
    const { movies } = this.state;
    const map = {
      likes: (a, b) => (
        activeButton.descending
          ? b.currentLikesCount - a.currentLikesCount
          : a.currentLikesCount - b.currentLikesCount
      ),
      rating: (a, b) => (
        activeButton.descending
          ? b.rating - a.rating
          : a.rating - b.rating
      ),
    };
    const sortedMovies = [...movies].sort(map[activeButton.name]);
    this.setState(() => ({ movies: sortedMovies }));
  };

  onRatingChange = (movieId, rating) => {
    const { movies } = this.state;
    const currentMovieIdx = movies.findIndex(({ id }) => id === movieId);
    const updatedMovie = { ...movies[currentMovieIdx], rating };
    this.setState(() => ({
      movies: [
        ...movies.slice(0, currentMovieIdx),
        updatedMovie,
        ...movies.slice(currentMovieIdx + 1),
      ],
    }));
  };

  onMovieTitleClick = (activeMovieId) => {
    // eslint-disable-next-line react/no-unused-state
    this.setState(() => ({ activeMovieId }));
  };

  // onSearch = (searchInputValue) => {
  //   this.setState(({ searchInputValue }));
  // };

  onLikeClick = (currentMovieId) => {
    this.updateItemLikesCounter(currentMovieId);
  };

  onDislikeClick = (currentMovieId) => {
    this.updateItemLikesCounter(currentMovieId, -1);
  };

  // eslint-disable-next-line class-methods-use-this
  searchByInputValue(array, term) {
    // const { searchInputValue } = this.state;
    // const searchInputValue = '';
    if (term.length === 0) {
      return array;
    }
    return array
      .filter(({ title }) => title.toLowerCase().indexOf(term.toLowerCase()) > -1);
  }

  updateItemLikesCounter(movieId, shift = 1) {
    const { movies } = this.state;
    const currentMovieIndex = movies.findIndex(({ id }) => id === movieId);
    const currentLikesCount = movies[currentMovieIndex].currentLikesCount + shift;
    const updatedMovie = { ...movies[currentMovieIndex], currentLikesCount };
    this.setState(() => ({
      movies: [
        ...movies.slice(0, currentMovieIndex),
        updatedMovie,
        ...movies.slice(currentMovieIndex + 1),
      ],
    }));
  }

  render() {
    const storedMovies = store.getState().appReducer.movies;
    const storedActiveMovieId = store.getState().appReducer.activeMovieId;
    const storedSearchInputValue = store.getState().appReducer.searchInputValue;
    // const {
    //   movies,
    //   activeMovieId,
    // } = this.state;
    const visibleMovies = this.searchByInputValue(storedMovies, storedSearchInputValue);
    const activeMovieData = storedMovies && storedActiveMovieId
      ? storedMovies.find(({ id }) => id === storedActiveMovieId)
      : null;
    const moviesItems = visibleMovies
      ? visibleMovies.map((item) => (
        <MovieListItem
          movieData={item}
          key={item.id}
          onMovieTitleClick={this.onMovieTitleClick}
          onLikeClick={this.onLikeClick}
          onDislikeClick={this.onDislikeClick}
          onRatingChange={this.onRatingChange}
        />
      ))
      : null;

    return (
      <div className={styles.App}>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <Filter
                onFilterChange={this.onFilterChange}
                // onSearch={(searchInputValue) => actions.setSearchInputValue(searchInputValue)}
                // onSearch={(searchInputValue) => dispatch(setSearchInputValue(searchInputValue))}
              />
              <div className={styles.moviesList}>
                {moviesItems}
              </div>
            </div>
            <MovieInfo
              activeMovieData={activeMovieData}
              onRatingChange={this.onRatingChange}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// store.subscribe(() => store.getState());
// const mapStateToProps = (state) => ({
//   movies: state.movies,
// });

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.movies,
  activeMovieId: state.appReducer.activeMovieId,
  searchInputValue: state.appReducer.searchInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  setMoviesList: (itemsList) => dispatch({
    type: 'SET_MOVIES_LIST',
    payload: itemsList,
  }),
  // setSearchInputValue: (searchInputValue) => dispatch({
  //   type: 'SET_SEARCH_INPUT_VALUE',
  //   payload: searchInputValue,
  // }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
