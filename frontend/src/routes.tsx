import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { List } from './pages/List';
import { Create } from './pages/Create';
import { Update } from './pages/Update';

export const useRoutes: React.FC = () => {
  return (
    <Switch>
      <Route component={List} path="/" exact />
      <Route component={Create} path="/create" exact />
      <Route component={Update} path="/update/:id" />
      <Redirect to="/" />
    </Switch>
  );
};
