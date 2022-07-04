import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeMovieItemAction, updateMovieItemAction } from '../../store/actions/actions';

import MoviesService from '../../services/MoviesService';
import MovieRating from '../MovieRating';
import styles from './MovieInfo.module.scss';

function MovieInfo(props) {
  const history = useHistory();
  const { movieID } = useParams();
  const {
    moviesItemsList,
    isUpdated,
    updateMovieItem,
    removeMovieItem,
  } = props;

  useEffect(() => {
    const fetchData = async () => {
      const newData = await MoviesService.getMovieInfo(movieID);
      updateMovieItem(movieID, newData);
    };
    if (!isUpdated) {
      fetchData();
    }
  }, []);

  const movieDetails = moviesItemsList
    ? moviesItemsList.find(({ id }) => id === Number(movieID))
    : null;

  if (!movieDetails) {
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
    genres = [],
    credits: { cast } = { cast: [] },
    credits: { crew } = { crew: [] },
  } = movieDetails;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const director = crew.length > 0
    ? crew.find(({ known_for_department: department }) => department === 'Directing').name
    : 'Not Found';
  const genre = genres.map(({ id: genreID, name }) => (
    <span key={genreID} className={styles.genresItem}>{name}</span>
  ));
  const actorsList = cast.filter(({ known_for_department: knownForDepartment }) => knownForDepartment === 'Acting');
  const actors = actorsList
    ? (actorsList.map(({ name: actorName }) => (
      <button
        onClick={() => history.push(`/catalog/${movieID}/${actorName}`, { id })}
        key={actorName}
        className={styles.actorsListItems}
        type="button"
      >
        {actorName}
      </button>
    )))
    : null;

  return (
    <div className={styles.movieInfo}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
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
                  removeMovieItem(id);
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
    genres: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
    })),
    credits: PropTypes.shape({
      cast: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
      crew: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    }),
  })).isRequired,
  isUpdated: PropTypes.bool.isRequired,
  removeMovieItem: PropTypes.func.isRequired,
  updateMovieItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateMovieItem: updateMovieItemAction,
  removeMovieItem: removeMovieItemAction,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
  isUpdated: state.appReducer.isUpdated,
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieInfo);
