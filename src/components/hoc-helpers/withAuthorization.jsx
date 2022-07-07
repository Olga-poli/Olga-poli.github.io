import React, { useEffect, useState } from 'react';

export const getUserStatus = () => {
  if (!localStorage.getItem('registeredUsers')) {
    localStorage.setItem('registeredUsers', JSON.stringify([]));
  }
  const userDataStorage = JSON.parse(localStorage.getItem('registeredUsers'));
  if (userDataStorage.length < 1) {
    return false;
  }
  const activeUser = userDataStorage.find(({ isLoggedIn }) => isLoggedIn === true);
  return activeUser?.isLoggedIn || false;
};

const withAuthorization = (Component) => {
  function WithAuthorization(props) {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
      setIsUserLoggedIn(getUserStatus());
    }, []);

    // eslint-disable-next-line no-param-reassign
    Component.displayName = `withAuthorization(${Component.displayName || Component.name || 'Component'})`;
    return <Component isLogged={isUserLoggedIn} {...props} />;
  }

  return WithAuthorization;
};

export default withAuthorization;
