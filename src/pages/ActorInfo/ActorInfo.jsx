import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import { fetchActorDetails } from '../../store/actions/actions';
import styles from './ActorInfo.module.scss';

const cx = classNames.bind(styles);

function ActorInfo() {
  const dispatch = useDispatch();
  const { actor } = useParams();
  const actorData = useSelector((state) => state.actorsReducer.actorData);
  console.log(actorData);
  const isLoading = useSelector((state) => state.actorsReducer.isLoading);
  const isError = useSelector((state) => state.actorsReducer.isError);

  const history = useHistory();

  useEffect(() => {
    (async () => {
      dispatch(fetchActorDetails(actor));
    })();
  }, []);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const actorInfoClassName = cx('actorInfo');
  const backButtonClassName = cx('button', 'btn btn-secondary');

  return (
    <div className={actorInfoClassName}>
      <button onClick={() => history.goBack()} type="button" className={backButtonClassName}>Go back</button>
      {isError ? (
        <h2>Error...</h2>
      ) : (
        <div>
          {isLoading ? (<h2>Loading...</h2>)
            : (
              <>
                <p>
                  Name:
                  <span>{` ${actor}`}</span>
                </p>
                <p>
                  Birthday:
                  <span>{` ${new Date(actorData.birthday).toLocaleDateString('en-US', dateOptions)}`}</span>
                </p>
                <p>
                  Place of birth:
                  <span>{` ${actorData.place_of_birth}`}</span>
                </p>
                <p>
                  Biography:
                  <span>{` ${actorData.biography}`}</span>
                </p>
              </>
            )}
        </div>
      )}
    </div>
  );
}

export default ActorInfo;
