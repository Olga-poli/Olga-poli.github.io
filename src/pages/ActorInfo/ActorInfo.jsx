import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import { fetchActorDetails } from '../../store/actions/actions';
import styles from './ActorInfo.module.scss';
import { useTranslation } from '../../hooks';

const cx = classNames.bind(styles);

function ActorInfo() {
  const dispatch = useDispatch();
  const { actor } = useParams();
  const actorData = useSelector((state) => state.actorsReducer.actorData);
  const isLoading = useSelector((state) => state.actorsReducer.isLoading);
  const isError = useSelector((state) => state.actorsReducer.isError);

  const history = useHistory();
  const { translate } = useTranslation();

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
      <button onClick={() => history.goBack()} type="button" className={backButtonClassName}>{translate('app-catalog-back-button')}</button>
      {isError ? (
        <h2>{translate('app-catalog-error')}</h2>
      ) : (
        <div>
          {isLoading ? (<h2>{translate('app-catalog-loading')}</h2>)
            : (
              <>
                <p>
                  {translate('app-actor-name')}
                  <span>{actor}</span>
                </p>
                <p>
                  {translate('app-actor-birthday')}
                  <span>{new Date(actorData.birthday).toLocaleDateString('en-US', dateOptions)}</span>
                </p>
                <p>
                  {translate('app-actor-place')}
                  <span>{actorData.place_of_birth}</span>
                </p>
                <p>
                  {translate('app-actor-biography')}
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
