import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setMoviesListAction } from '../../store/actions/actions';

import Filter from '../../components/Filter';
import MovieListItem from '../../components/MovieListItem';
import styles from './Catalog.module.scss';

function Catalog(props) {
  const { moviesItemsList } = props;
  const moviesItems = moviesItemsList
    ? moviesItemsList.map((item) => (
      item.toShow
        ? <MovieListItem movieData={item} key={item.id} />
        : null
    ))
    : null;

  return (
    <div>
      <div className={styles.container}>
        <Filter />
        <div className={styles.moviesList}>{moviesItems}</div>
      </div>
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
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  isLoaded: state.appReducer.isLoaded,
});

const mapDispatchToProps = {
  setMoviesList: setMoviesListAction,
};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
