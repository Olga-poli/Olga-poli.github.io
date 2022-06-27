import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './App.module.scss';
import MoviesService from './services/MoviesService';
import Filter from './components/Filter';
import MovieListItem from './components/MovieListItem';
import MovieInfo from './components/MovieInfo';
import Header from './components/Header';
import Footer from './components/Footer';

function App(props) {
  const getItemsList = () => MoviesService.getResource()
    .then((res) => res);

  useEffect(() => {
    (async () => {
      const data = await getItemsList();
      const { setMoviesList } = props;
      setMoviesList(data.results.map((item) => ({
        ...item,
        currentLikesCount: 0,
        rating: 0,
      })));
    })();
  }, []);

  const searchByInputValue = (array, searchValue) => {
    if (searchValue.length === 0) {
      return array;
    }
    return array
      .filter(({ title }) => title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1);
  };

  const { moviesItemsList, searchInputValue } = props;
  const visibleMovies = searchByInputValue(moviesItemsList, searchInputValue);
  const moviesItems = visibleMovies
    ? visibleMovies.map((item) => (
      <MovieListItem movieData={item} key={item.id} />
    ))
    : null;

  return (
    <div className={styles.App}>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-8">
            <Filter />
            <div className={styles.moviesList}>{moviesItems}</div>
          </div>
          <MovieInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
}

App.defaultProps = {
  moviesItemsList: PropTypes.array,
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
  searchInputValue: PropTypes.string,
  setMoviesList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  searchInputValue: state.appReducer.searchInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  setMoviesList: (itemsList) => dispatch({
    type: 'SET_MOVIES_LIST',
    payload: itemsList,
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
