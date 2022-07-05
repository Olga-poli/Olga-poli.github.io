import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MovieInfoItem from '../../components/MovieInfoItem';
import styles from './MovieInfo.module.scss';

function MovieInfo() {
  const history = useHistory();

  const isLoading = useSelector((state) => state.catalogReducer.isLoading);
  const isError = useSelector((state) => state.catalogReducer.isError);
  const { movieID } = useParams();

  return (
    <div>
      {isError ? (
        <h2>Error...</h2>
      ) : (
        <div>
          {isLoading
            ? (<h2>Loading...</h2>)
            : (
              <div className={styles.movieInfo}>
                <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
                <MovieInfoItem key={movieID} movieID={movieID} />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
export default MovieInfo;
