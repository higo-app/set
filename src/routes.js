import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Play from './pages/Play';
import NotFound from './pages/NotFound';

export const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/play" exact component={Play} />
    <Route component={NotFound} />
  </Switch>
);

export default Routes;
