import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { removeMovieItem } from '../../store/slices/catalog.slice';
import MovieRating from '../MovieRating';
import styles from './MovieInfoItem.module.scss';

function MovieInfoItem({ movieID }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const movieData = moviesItemsList.find(({ id }) => id === Number(movieID));

  if (!movieData?.isLoaded) {
    return (<h2>Loading...</h2>);
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
    genres = [],
    credits: { cast } = { cast: [] },
    credits: { crew } = { crew: [] },
  } = movieData;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const director = crew.find(({ known_for_department: department }) => department === 'Directing').name;
  const genre = genres.map(({ id: genreID, name }) => (
    <span key={genreID} className={styles.genresItem}>{name}</span>
  ));
  const actors = cast
    .filter(({ known_for_department: knownForDepartment }) => knownForDepartment === 'Acting')
    .map(({ name: actorName }) => (
      <button
        onClick={() => history.push(`/catalog/${movieID}/${actorName}`, { id })}
        key={actorName}
        className={styles.actorsListItems}
        type="button"
      >
        {actorName}
      </button>
    ));

  return (
    <div className={styles.movieInfo}>
      <div className="card">
        <div className={`${styles.body} card-body`}>
          <div>
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
            <p className={styles.genres}>
              <span>Genres: </span>
              <span>{genre}</span>
            </p>
            <p>
              Director:
              <span>{` ${director}`}</span>
            </p>
            <p>
              Description:
              <span>{` ${overview}`}</span>
            </p>
            <div>
              <span>Cast: </span>
              <div className={styles.actorsList}>{actors}</div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  // removeMovieItem(id);
                  history.push(`${movieID}/edit`);
                }}
                type="button"
                className={`${styles.button} btn btn-primary`}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  dispatch(removeMovieItem(id));
                  history.push('/catalog/');
                }}
                type="button"
                className={`${styles.button} btn btn-outline-danger`}
              >
                Delete
              </button>
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

MovieInfoItem.propTypes = {
  movieID: PropTypes.string.isRequired,
};

export default MovieInfoItem;
