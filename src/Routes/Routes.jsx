import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Catalog from '../pages/Catalog';
import MovieInfo from '../pages/MovieInfo';
import ActorInfo from '../pages/ActorInfo';
import MovieEditing from '../pages/MovieEditing';

function Routes() {
  return (
    <Switch>
      <Route path="/catalog">
        {({ match }) => (
          <Switch>
            <Route path={`${match.path}/:movieID`}>
              {() => (
                <Switch>
                  <Route path={`${match.path}/:movieID/edit`}>
                    <MovieEditing customProp={match.path} />
                  </Route>
                  <Route path={`${match.path}/:movieID/:actor`}>
                    <ActorInfo customProp={match.path} />
                  </Route>
                  <Route path={`${match.path}/:movieID`}>
                    <MovieInfo customProp={match.path} />
                  </Route>
                </Switch>
              )}
            </Route>
            <Route path={`${match.path}`}>
              <Catalog />
            </Route>
          </Switch>
        )}
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route exact path="/">
        <Catalog />
      </Route>
      <Route path="*">
        <h1>Not found</h1>
      </Route>
    </Switch>
  );
}

export default Routes;
