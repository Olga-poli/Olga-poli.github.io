import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { useHistory, useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import { updateMovieItem } from '../../store/slices/catalog.slice';
import styles from './MovieEditing.module.scss';

const cx = classNames.bind(styles);

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

  const movieEditingClassName = cx('movieEditing');
  const backButtonClassName = cx('button', 'btn btn-secondary');
  const formClassName = cx('form');
  const inputBlockClassName = cx('inputBlock');
  const inputClassName = cx('form-control');
  const labelClassName = cx('form-label');
  const submitButtonClassName = cx('button', 'btn btn-primary');

  return (
    <div className={movieEditingClassName}>
      <button onClick={() => history.goBack()} type="button" className={backButtonClassName}>Go back</button>
      <h2>Edit</h2>
      <form
        onSubmit={formik.handleSubmit}
        className={formClassName}
      >
        <div className={inputBlockClassName}>
          <label htmlFor="title" className={labelClassName}>Title</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.movieTitle}
            name="movieTitle"
            className={inputClassName}
            type="text"
            id="title"
            required
          />
          {formik.errors.movieTitle ? <div>{formik.errors.movieTitle}</div> : null}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="image" className={labelClassName}>Image url</label>
          <input
            onChange={formik.handleChange}
            value={formik.values.moviePosterPath}
            name="moviePosterPath"
            className={inputClassName}
            type="text"
            id="image"
            required
          />
          {formik.errors.moviePosterPath ? <div>{formik.errors.moviePosterPath}</div> : null}
        </div>
        <div className={styles.inputBlock}>
          <label htmlFor="description" className={labelClassName}>Description</label>
          <textarea
            onChange={formik.handleChange}
            value={formik.values.movieOverview}
            name="movieOverview"
            className={inputClassName}
            id="description"
            required
          />
          {formik.errors.movieOverview ? <div>{formik.errors.movieOverview}</div> : null}
        </div>
        <button className={submitButtonClassName} type="submit">Submit form</button>
      </form>
    </div>
  );
}

export default MovieEditing;
