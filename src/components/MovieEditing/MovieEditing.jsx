import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateMovieItemAction } from '../../store/actions/actions';

import styles from './MovieEditing.module.scss';

function MovieEditing(props) {
  const history = useHistory();
  const { movieID } = useParams();
  const { moviesItemsList, updateMovieItem } = props;
  const currentMovieData = moviesItemsList.length > 0
    ? [...moviesItemsList].find(({ id }) => id === Number(movieID))
    : null;

  const [movieTitleState, setMovieTitleState] = useState('');
  const [movieDirectorState, setDirectorState] = useState('');
  const [moviePosterPathState, setMoviePosterPathState] = useState('');
  const [movieOverviewState, setOverviewState] = useState('');

  if (!currentMovieData) {
    return null;
  }

  const {
    title,
    poster_path: posterPath,
    credits: { crew } = { crew: [] },
    overview,
  } = currentMovieData;
  const director = crew.length > 0
    ? crew.find(({ known_for_department: department }) => department === 'Directing').name
    : '';

  const onSubmit = ((event) => {
    event.preventDefault();
    updateMovieItem(movieID, moviesItemsList);
    setMovieTitleState(movieTitleState);
    setDirectorState(movieDirectorState);
    setMoviePosterPathState(moviePosterPathState);
    setOverviewState(movieOverviewState);
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    // console.log(event.target.name, event.target.value);
    const map = {
      movieTitleState: () => setMovieTitleState(value),
      movieDirectorState: () => setDirectorState(value),
      moviePosterPathState: () => setMoviePosterPathState(value),
      movieOverviewState: () => setOverviewState(value),
    };
    console.log(name, value);
    map[name](value);
  };

  return (
    <div className={styles.movieEditing}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      <h2>Edit</h2>
      <form
        onSubmit={onSubmit}
        className={styles.form}
      >
        <div className={styles.inputBlock}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="title" className="form-label">Title</label>
          <input
            onChange={(event) => handleUserInput(event)}
            defaultValue={title}
            name="movieTitleState"
            className="form-control"
            type="text"
            id="title"
            required
          />
          <div id="titleHelp" className={styles.formText}>Incorrect title</div>
        </div>
        <div className={styles.inputBlock}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="director">Director</label>
          <input
            onChange={(event) => handleUserInput(event)}
            defaultValue={director}
            name="movieDirectorState"
            className="form-control"
            type="text"
            id="director"
            required
          />
          <div id="directorHelp" className={styles.formText}>Incorrect name</div>
        </div>
        <div className={styles.inputBlock}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="image">Image url</label>
          <input
            onChange={(event) => handleUserInput(event)}
            defaultValue={posterPath}
            name="moviePosterPathState"
            className="form-control"
            type="text"
            id="image"
            required
          />
          <div id="imageHelp" className={styles.formText}>Incorrect path</div>
        </div>
        <div className={styles.inputBlock}>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="description">Description</label>
          <textarea
            onChange={(event) => handleUserInput(event)}
            defaultValue={overview}
            name="movieOverviewState"
            className="form-control"
            type="text"
            id="description"
            required
          />
          <div id="descriptionHelp" className={styles.formText}>Incorrect description</div>
        </div>
        <button className={`${styles.button} btn btn-primary`} type="submit">Submit form</button>
      </form>
    </div>
  );
}

MovieEditing.propTypes = {
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
      crew: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    }),
  })).isRequired,
  updateMovieItem: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  updateMovieItem: updateMovieItemAction,
};

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieEditing);
