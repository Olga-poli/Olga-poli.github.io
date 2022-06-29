import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Catalog from '../components/Catalog';
import MovieInfo from '../components/MovieInfo';
import MovieEditing from '../components/MovieEditing';
import MainPage from '../components/MainPage';

function Routes() {
  return (
    <Switch>
      <Route path="/catalog">
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

            <Route path={`${match.path}`} component={Catalog} />
          </Switch>
        )}
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
