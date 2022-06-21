import React from 'react';
import './MovieInfo.scss';
import PropTypes from 'prop-types';

function MovieInfo({ activeMovieData }) {
  if (!activeMovieData) {
    return null;
  }
  const {
    title,
    currentLikesCount = 0,
    poster_path: posterPath,
    release_date: releaseDate,
    original_language: language,
    overview,
  } = activeMovieData;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return (
    <div className="movie-info col">
      <div className="movie-info__container card">
        <div className="card-body">
          <div className="movie-info__header">
            <div className="movie-info__text">
              <h3>{title}</h3>
              <p>
                <span>
                  Likes:
                  <span>{` ${currentLikesCount}`}</span>
                </span>
              </p>
            </div>
            <div className="movie-info__image">
              <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={posterPath} />
            </div>
          </div>
          <div className="movie-info__body">
            <div>
              <p>
                Release:
                <span>
                  {` ${new Date(releaseDate).toLocaleDateString('en-US', dateOptions)}`}
                </span>
              </p>
              <p>
                Language:
                <span>{` ${language}`}</span>
              </p>
              <p>
                Description:
                <span>{` ${overview}`}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieInfo.defaultProps = {
  activeMovieData: PropTypes.shape({}),
};

MovieInfo.propTypes = {
  activeMovieData: PropTypes.shape({
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
  }),
};

export default MovieInfo;
