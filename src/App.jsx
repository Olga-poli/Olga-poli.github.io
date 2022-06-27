import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './App.module.scss';
import Filter from './components/Filter';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesService from './services/MoviesService';
import MovieListItem from './components/MovieListItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.updateMovies();
  }

  updateMovies = () => {
    MoviesService.getResource()
      .then((res) => {
        const { setMoviesList } = this.props;
        setMoviesList(res.results.map((item) => ({
          ...item,
          currentLikesCount: 0,
          rating: 0,
        })));
      });
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

  // eslint-disable-next-line class-methods-use-this
  searchByInputValue(array, searchValue) {
    if (searchValue.length === 0) {
      return array;
    }
    return array
      .filter(({ title }) => title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  }

  render() {
    const { moviesItemsList, activeMovieId, searchInputValue } = this.props;
    const visibleMovies = this.searchByInputValue(moviesItemsList, searchInputValue);
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
    const activeMovieData = moviesItemsList && activeMovieId
      ? moviesItemsList.find(({ id }) => id === activeMovieId)
      : null;

    return (
      <div className={styles.App}>
        <Header />
        <div className="container">
          <div className="row">
            <div className="col-8">
              <Filter />
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

App.defaultProps = {
  moviesItemsList: PropTypes.array,
  activeMovieId: PropTypes.shape({}),
  searchInputValue: PropTypes.string,
};

App.propTypes = {
  moviesItemsList: PropTypes.arrayOf(PropTypes.shape({
    adult: PropTypes.bool,
    backdrop_path: PropTypes.string,
    genre_ids: PropTypes.arrayOf(PropTypes.number),
    id: PropTypes.number,
    original_language: PropTypes.string,
    original_title: PropTypes.string,
    overview: PropTypes.string,
    popularity: PropTypes.number,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    title: PropTypes.string,
    video: PropTypes.bool,
    vote_average: PropTypes.number,
    vote_count: PropTypes.number,
    currentLikesCount: PropTypes.number,
    rating: PropTypes.number,
  })),
  activeMovieId: PropTypes.shape({}),
  searchInputValue: PropTypes.string,
  setMoviesList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  activeMovieId: state.appReducer.activeMovieId,
  searchInputValue: state.appReducer.searchInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  setMoviesList: (itemsList) => dispatch({
    type: 'SET_MOVIES_LIST',
    payload: itemsList,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
