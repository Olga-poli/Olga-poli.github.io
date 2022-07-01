import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import styles from './MovieEditing.module.scss';

function MovieEditing() {
  const history = useHistory();
  const { movieID } = useParams();
  console.log(movieID);

  return (
    <div className={styles.movieEditing}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      <h2>Edit</h2>
      <form className={styles.form}>
        <label htmlFor="title">
          Title
          <input type="text" id="title" />
        </label>
        <label htmlFor="image">
          Image url
          <input type="text" id="image" />
        </label>
        <label htmlFor="director">
          Director
          <input type="text" id="director" />
        </label>
        <label htmlFor="description">
          Description
          <input type="text" id="description" />
        </label>
      </form>
    </div>
  );
}

export default MovieEditing;
