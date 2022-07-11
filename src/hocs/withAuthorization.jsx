import React, { useEffect, useState } from 'react';

import { getUserStatus } from '../utils';

const withAuthorization = (Component) => {
  function WithAuthorization(props) {
    const userStatus = getUserStatus();
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

    useEffect(() => {
      setIsUserLoggedIn(userStatus);
    }, [userStatus]);

    // eslint-disable-next-line no-param-reassign
    Component.displayName = `withAuthorization(${Component.displayName || Component.name || 'Component'})`;
    return <Component isLogged={isUserLoggedIn} {...props} />;
  }

  return WithAuthorization;
};

export default withAuthorization;
