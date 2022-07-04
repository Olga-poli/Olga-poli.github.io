import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { updateMovieItemAction } from '../../store/actions/actions';
import { updateMovieItem } from '../../store/slices/catalog.slice';
import styles from './MovieEditing.module.scss';

function MovieEditing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movieID } = useParams();

  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const currentMovieData = moviesItemsList.find(({ id }) => id === Number(movieID));

  const [movieTitleState, setMovieTitleState] = useState('');
  const [moviePosterPathState, setMoviePosterPathState] = useState('');
  const [movieOverviewState, setOverviewState] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    movieTitleState: '',
    movieDirectorState: '',
    moviePosterPathState: '',
    movieOverviewState: '',
  });

  const {
    title,
    poster_path: posterPath,
    overview,
  } = currentMovieData;

  useEffect(() => {
    setMovieTitleState(title);
    setMoviePosterPathState(posterPath);
    setOverviewState(overview);
  }, []);

  if (!currentMovieData) {
    return null;
  }

  const onSubmit = ((event) => {
    event.preventDefault();
    const newMovieData = {
      title: movieTitleState,
      poster_path: moviePosterPathState,
      overview: movieOverviewState,
    };
    dispatch(updateMovieItem({ id: Number(movieID), newMovieData }));
    history.push(`/catalog/${movieID}`);
  });

  const handleUserInput = (event) => {
    const { name, value } = event.target;
    let errorMessage = '';
    const map = {
      movieTitleState: () => {
        setMovieTitleState(value);
        errorMessage = /^[A-Z][a-zA-Z0-9 -—.,!?:]+/.test(value) ? '' : 'Incorrect title';
        setErrorMessages({ ...errorMessages, movieTitleState: errorMessage });
      },
      moviePosterPathState: () => {
        setMoviePosterPathState(value);
        errorMessage = /^\/[a-zA-Z0-9]*(.jpg|.png|.gif)/.test(value) ? '' : 'Incorrect path';
        setErrorMessages({ ...errorMessages, moviePosterPathState: errorMessage });
      },
      movieOverviewState: () => {
        setOverviewState(value);
        errorMessage = /^[A-Z][a-zA-Z0-9 -—.,!?:]+/.test(value) ? '' : 'Overview is not long enough';
        setErrorMessages({ ...errorMessages, movieOverviewState: errorMessage });
      },
    };

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
          <div className={styles.formText}>{errorMessages.movieTitleState}</div>
        </div>
        <div className={styles.inputBlock}>
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
          <div className={styles.formText}>{errorMessages.moviePosterPathState}</div>
        </div>
        <div className={styles.inputBlock}>
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
          <div className={styles.formText}>{errorMessages.movieOverviewState}</div>
        </div>
        <button className={`${styles.button} btn btn-primary`} type="submit">Submit form</button>
      </form>
    </div>
  );
}

// MovieEditing.propTypes = {
//   moviesItemsList: PropTypes.arrayOf(PropTypes.shape({
//     adult: PropTypes.bool,
//     backdrop_path: PropTypes.string,
//     genre_ids: PropTypes.arrayOf(PropTypes.number),
//     id: PropTypes.number,
//     original_language: PropTypes.string,
//     original_title: PropTypes.string,
//     overview: PropTypes.string,
//     popularity: PropTypes.number,
//     poster_path: PropTypes.string,
//     release_date: PropTypes.string,
//     title: PropTypes.string,
//     video: PropTypes.bool,
//     vote_average: PropTypes.number,
//     vote_count: PropTypes.number,
//     currentLikesCount: PropTypes.number,
//     rating: PropTypes.number,
//     genres: PropTypes.arrayOf(PropTypes.shape({
//       name: PropTypes.string,
//     })),
//     credits: PropTypes.shape({
//       crew: PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string,
//       })),
//     }),
//   })).isRequired,
//   updateMovieItem: PropTypes.func.isRequired,
// };

export default MovieEditing;
