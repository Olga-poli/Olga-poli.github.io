import React from 'react';
import {
  Link, useHistory, useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MovieRating from '../MovieRating';
import styles from './MovieInfo.module.scss';

function MovieInfo(props) {
  const history = useHistory();
  const { movieID } = useParams();

  const { moviesItemsList } = props;
  const activeMovieData = moviesItemsList
    ? moviesItemsList.find(({ id }) => id === Number(movieID))
    : null;

  if (!activeMovieData) {
    return (
      <div className={styles.movieInfo}>
        <h2>Something went wrong...</h2>
        <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      </div>
    );
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
    <div className={styles.movieInfo}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      <div className="card">
        <div className={`${styles.body} card-body`}>
          <div className={styles.info}>
            <h3>{title}</h3>
            <MovieRating rating={rating} movieId={id} />
            <p>
              <span>
                Likes:
                <span>{` ${currentLikesCount}`}</span>
              </span>
            </p>
            <p>
              Release:
              <span>{` ${new Date(releaseDate).toLocaleDateString('en-US', dateOptions)}`}</span>
            </p>
            <p>
              Language:
              <span>{` ${language}`}</span>
            </p>
            <p>
              Description:
              <span>{` ${overview}`}</span>
            </p>
            <div className={styles.buttons}>
              <Link to={`${movieID}/edit`}>
                <button type="button" className={`${styles.button} btn btn-primary`}>Edit</button>
              </Link>
              <Link to="/catalog">
                <button
                  onClick={() => {}}
                  type="button"
                  className={`${styles.button} btn btn-outline-danger`}
                >
                  Delete
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={posterPath} className={styles.image} />
          </div>
        </div>
      </div>
    </div>
  );
}

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
  })).isRequired,
  // activeMovieId: PropTypes.number,
};

// MovieInfo.defaultProps = {
//   activeMovieId: null,
// };

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  // activeMovieId: state.appReducer.activeMovieId,
});

export default connect(mapStateToProps)(MovieInfo);
