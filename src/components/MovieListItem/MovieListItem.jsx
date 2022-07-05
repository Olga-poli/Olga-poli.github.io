import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  addLikeToMovieItem,
  removeLikeFromMovieItem,
} from '../../store/slices/catalog.slice';
import MovieRating from '../MovieRating';
import styles from './MovieListItem.module.scss';

function MovieListItem({ movieId }) {
  const dispatch = useDispatch();
  const moviesList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const movieData = moviesList
    .find(({ id }) => id === movieId);
  const {
    title, poster_path: posterPath, id, currentLikesCount = 0,
  } = movieData;

  return (
    <div className={`card ${styles.moviesListItem}`}>
      <div className={`card-body ${styles.cardBody}`}>
        <p
          className={`mb-3 ${styles.cardTitle}`}
        >
          <Link to={`/catalog/${id}`}>
            {title}
          </Link>
        </p>
        <div>
          <div className={`d-flex ${styles.cardContent}`}>
            <div className={styles.cardLikes}>
              <div className={` mb-3 ${styles.buttons}`}>
                <button
                  onClick={() => dispatch(addLikeToMovieItem(id))}
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                >
                  <i className="fa fa-thumbs-up" />
                </button>
                <button
                  onClick={() => dispatch(removeLikeFromMovieItem(id))}
                  type="button"
                  className="btn btn-outline-dark btn-sm"
                >
                  <i className="fa fa-thumbs-down" />
                </button>
              </div>
              <span>likes</span>
              <span>{` ${currentLikesCount}`}</span>
            </div>
            <div className={styles.imageContainer}>
              <img src={`https://image.tmdb.org/t/p/w500/${posterPath}`} alt={title} />
            </div>
          </div>
          <MovieRating
            movieId={id}
          />
        </div>
      </div>
    </div>
  );
}

MovieListItem.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieListItem;
