import React from 'react';
import './MoviesList.scss';
import MovieListItem from '../MovieListItem';

function MoviesList() {
  return (
    <div className="movies-list">
      <MovieListItem />
      <MovieListItem />
      <MovieListItem />
      <MovieListItem />
      <MovieListItem />
      <MovieListItem />
    </div>
  );
}

export default MoviesList;
