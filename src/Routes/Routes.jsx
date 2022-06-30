import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../components/Login';
import Register from '../components/Register';
import Catalog from '../components/Catalog';
import MovieInfo from '../components/MovieInfo';
import MovieEditing from '../components/MovieEditing';
import MainPage from '../components/MainPage';

function Routes(props) {
  // eslint-disable-next-line react/prop-types
  const { activeUserState, setActiveUserState } = props;
  console.log('Routes', activeUserState);
  return (
    <Switch>
      <Route path="/catalog" activeUserState={activeUserState}>
        {({ match }) => (
          <Switch>
            <Route path={`${match.path}/test`}>TEST route</Route>
            <Route path={`${match.path}/:movieID`}>
              {() => (
                <Switch>
                  <Route path={`${match.path}/:movieID/edit`}>
                    <MovieEditing customProp={match.path} />
                  </Route>
                  <Route path={`${match.path}/:movieID`}>
                    <MovieInfo customProp={match.path} />
                  </Route>
                </Switch>
              )}
            </Route>
            <Route path={`${match.path}`} activeUserState={activeUserState}>
              <Catalog activeUserState={activeUserState} />
            </Route>
          </Switch>
        )}
      </Route>
      <Route path="/login" activeUserState={activeUserState} setActiveUserState={setActiveUserState}>
        <Login setActiveUserState={setActiveUserState} />
      </Route>
      <Route path="/register" activeUserState={activeUserState} setActiveUserState={setActiveUserState}>
        <Register setActiveUserState={setActiveUserState} />
      </Route>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
}

export default Routes;
