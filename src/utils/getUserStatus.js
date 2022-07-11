const getUserStatus = () => {
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

export default getUserStatus;
