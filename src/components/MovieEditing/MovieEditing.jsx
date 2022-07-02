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
  // const [movieGenreState, setMovieGenreState] = useState('');
  const [movieDirectorState, setDirectorState] = useState('');
  const [moviePosterPathState, setMoviePosterPathState] = useState('');
  const [movieOverviewState, setOverviewState] = useState('');

  if (!currentMovieData) {
    return null;
  }

  const {
    title,
    // genres = [],
    poster_path: posterPath,
    credits: { crew } = { crew: [] },
    overview,
  } = currentMovieData;
  // const genresList = genres.length > 0
  //   ? [...genres].map(({ name }) => ({ genre: name }))
  //   : '';
  const director = crew.length > 0
    ? crew.find(({ known_for_department: department }) => department === 'Directing').name
    : '';

  const onSubmit = (() => {
    updateMovieItem(movieID, moviesItemsList);
    setMovieTitleState(movieTitleState);
    // setMovieGenreState(movieGenreState);
    setDirectorState(movieDirectorState);
    setMoviePosterPathState(moviePosterPathState);
    setOverviewState(movieOverviewState);
  });

  return (
    <div className={styles.movieEditing}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      <h2>Edit</h2>
      <form
        onSubmit={onSubmit}
        className={styles.form}
      >
        <label htmlFor="title">
          Title
          <input
            defaultValue={title}
            type="text"
            id="title"
          />
        </label>
        <label htmlFor="director">
          Director
          <input
            defaultValue={director}
            type="text"
            id="director"
          />
        </label>
        <label htmlFor="image">
          Image url
          <input
            defaultValue={posterPath}
            type="text"
            id="image"
          />
        </label>
        <label htmlFor="description">
          Description
          <input
            defaultValue={overview}
            type="text"
            id="description"
          />
        </label>
      </form>
    </div>
  );
}

//         <label htmlFor="genres">
//           Genres
//           <input
//             defaultValue={genresList}
//             type="text"
//             id="genres"
//           />
//         </label>
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
