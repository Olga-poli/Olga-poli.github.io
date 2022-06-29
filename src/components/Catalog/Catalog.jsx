import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMoviesListAction } from '../../store/actions/actions';

import Filter from '../Filter';
import MovieListItem from '../MovieListItem';
import MoviesService from '../../services/MoviesService';
import styles from './Catalog.module.scss';

function Catalog(props) {
  const getItemsList = () => MoviesService.getResource();
  const { moviesItemsList } = props;

  useEffect(() => {
    (async () => {
      const data = await getItemsList();
      const { setMoviesList } = props;
      setMoviesList(data.results.map((item) => ({
        ...item,
        currentLikesCount: 0,
        rating: 0,
        toShow: true,
      })));
    })();
  }, []);

  const moviesItems = moviesItemsList
    ? moviesItemsList.map((item) => (
      item.toShow
        ? <MovieListItem movieData={item} key={item.id} />
        : null
    ))
    : null;

  return (
    <div className={styles.container}>
      <Filter />
      <div className={styles.moviesList}>{moviesItems}</div>
    </div>
  );
}

Catalog.defaultProps = {
  moviesItemsList: PropTypes.array,
};

Catalog.propTypes = {
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
    toShow: PropTypes.bool,
  })),
  setMoviesList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
});

const mapDispatchToProps = {
  setMoviesList: setMoviesListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
