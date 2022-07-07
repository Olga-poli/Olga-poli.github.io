import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import { updateMovieItem } from '../../store/slices/catalog.slice';
import styles from './MovieEditing.module.scss';

const validate = (values) => {
  const errors = {};
  if (!values.movieTitle) {
    errors.movieTitle = 'Required';
  } else if (!/^[A-Z][a-zA-Z0-9 -—.,!?:]+/.test(values.movieTitle)) {
    errors.movieTitle = 'Must have title case and two symbols at least';
  }

  if (!values.moviePosterPath) {
    errors.moviePosterPath = 'Required';
  } else if (!/^\/[a-zA-Z0-9]*(.jpg|.jpeg|.png|.gif)/.test(values.moviePosterPath)) {
    errors.moviePosterPath = 'Must have right file extension and start with "/"';
  }

  if (!values.movieOverview) {
    errors.movieOverview = 'Required';
  } else if (!/^[A-Z][a-zA-Z0-9 -—.,!?:]+/.test(values.movieOverview)) {
    errors.movieOverview = 'Overview is not long enough';
  }

  return errors;
};

function MovieEditing() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { movieID } = useParams();

  const moviesItemsList = useSelector((state) => state.catalogReducer.moviesItemsList);
  const currentMovieData = moviesItemsList.find(({ id }) => id === Number(movieID));

  const {
    title,
    poster_path: posterPath,
    overview,
  } = currentMovieData;

  const formik = useFormik({
    initialValues: {
      movieTitle: title,
      moviePosterPath: posterPath,
      movieOverview: overview,
    },
    validate,
    onSubmit: (values) => {
      const newMovieData = {
        title: values.movieTitle,
        poster_path: values.moviePosterPath,
        overview: values.movieOverview,
      };
      dispatch(updateMovieItem({ id: Number(movieID), newMovieData }));
      history.push(`/catalog/${movieID}`);
    },
  });

  return (
    <div className={styles.movieEditing}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      <h2>Edit</h2>
      <form
        onSubmit={formik.handleSubmit}
        className={styles.form}
      >
        <div className={styles.inputBlock}>
          <label htmlFor="title" className="form-label">Title</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.movieTitle}
            name="movieTitle"
            className="form-control"
            type="text"
            id="title"
            required
          />
          {formik.errors.movieTitle ? <div>{formik.errors.movieTitle}</div> : null}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="image">Image url</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.moviePosterPath}
            name="moviePosterPath"
            className="form-control"
            type="text"
            id="image"
            required
          />
          {formik.errors.moviePosterPath ? <div>{formik.errors.moviePosterPath}</div> : null}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.movieOverview}
            name="movieOverview"
            className="form-control"
            id="description"
            required
          />
          {formik.errors.movieOverview ? <div>{formik.errors.movieOverview}</div> : null}
        </div>
        <button className={`${styles.button} btn btn-primary`} type="submit">Submit form</button>
      </form>
    </div>
  );
}

export default MovieEditing;
