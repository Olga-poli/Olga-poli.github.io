import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieRating from '../MovieRating';
import styles from './MovieInfo.module.scss';

function MovieInfo(props) {
  const { moviesItemsList, activeMovieId } = props;
  const activeMovieData = moviesItemsList && activeMovieId
    ? moviesItemsList.find(({ id }) => id === activeMovieId)
    : null;

  if (!activeMovieData) {
    return null;
  }

  const {
    title,
    currentLikesCount = 0,
    rating = 0,
    id,
    poster_path: posterPath,
    release_date: releaseDate,
    original_language: language,
    overview,
  } = activeMovieData;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className={`${styles.movieInfo} col`}>
      <div className="card">
        <div className="card-body">
          <div className={styles.header}>
            <div className="movie-info__text">
              <h3>{title}</h3>
              <p>
                <span>
                  Likes:
                  <span>{` ${currentLikesCount}`}</span>
                </span>
              </p>
            </div>
            <div className={styles.imageContainer}>
              <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={posterPath} className={styles.image} />
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
              <MovieRating
                rating={rating}
                movieId={id}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieInfo.defaultProps = {
  moviesItemsList: PropTypes.array,
  activeMovieId: PropTypes.shape({}),
};

MovieInfo.propTypes = {
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
  activeMovieId: PropTypes.number,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  activeMovieId: state.appReducer.activeMovieId,
});

export default connect(mapStateToProps)(MovieInfo);
