import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMoviesListAction } from './store/actions/actions';
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
  const { moviesItemsList } = props;

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

  const moviesItems = moviesItemsList
    ? moviesItemsList.map((item) => (
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
  setMoviesList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
});

const mapDispatchToProps = {
  setMoviesList: setMoviesListAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
