import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAuthorization } from '../store/slices/catalog.slice';

import { getUserStatus } from '../utils';

const withAuthorization = (Component) => {
  function WithAuthorization(props) {
    const isLoggedState = useSelector((state) => state.catalogReducer.isAuthorized);
    const userStatus = getUserStatus();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedState);

    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(setUserAuthorization(userStatus));
      setIsUserLoggedIn(userStatus);
    }, [userStatus]);

    // eslint-disable-next-line no-param-reassign
    Component.displayName = `withAuthorization(${Component.displayName || Component.name || 'Component'})`;
    return <Component isLogged={isUserLoggedIn} {...props} />;
  }

  return WithAuthorization;
};

export default withAuthorization;
