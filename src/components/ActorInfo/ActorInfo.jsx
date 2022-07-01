import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './ActorInfo.module.scss';
import MoviesService from '../../services/MoviesService';

function ActorInfo() {
  const { actor } = useParams();
  const [actorDataState, setActorDataState] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const actorData = await MoviesService.getActorInfo(actor);
      setActorDataState(actorData);
    };
    fetchData();
  }, []);

  if (!actorDataState) {
    return <h2>Something go wrong...r</h2>;
  }

  const placeholderText = 'No info found';
  const {
    biography = placeholderText,
    birthday,
    place_of_birth: placeOfBirth = placeholderText,
  } = actorDataState;
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className={styles.actorInfo}>
      <button onClick={() => history.goBack()} type="button" className={`${styles.button} btn btn-secondary`}>Go back</button>
      <p>
        Name:
        <span>{` ${actor}`}</span>
      </p>
      <p>
        Birthday:
        <span>{` ${new Date(birthday).toLocaleDateString('en-US', dateOptions)}`}</span>
      </p>
      <p>
        Place of birth:
        <span>{` ${placeOfBirth}`}</span>
      </p>
      <p>
        Biography:
        <span>{` ${biography}`}</span>
      </p>
    </div>
  );
}

const mapStateToProps = (state) => ({
  moviesItemsList: state.appReducer.moviesItemsList,
});

export default connect(mapStateToProps)(ActorInfo);
