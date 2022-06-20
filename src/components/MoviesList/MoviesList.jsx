import React from 'react';
import './MoviesList.scss';
import PropTypes from 'prop-types';
import MovieListItem from '../MovieListItem';

function MoviesList({ movies }) {
  const moviesItems = movies
    ? movies.map((item) => (<MovieListItem data={item} key={item.id} />))
    : null;
  return (
    <div className="movies-list">
      {moviesItems}
    </div>
  );
}

MoviesList.defaultProps = {
  movies: PropTypes.shape({}),
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
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
  })),
};

export default MoviesList;
