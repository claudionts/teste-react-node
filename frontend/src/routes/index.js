import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import SignIn from '../pages/SignIn.jsx';
import PatternLogin from '../pages/PatternLogin';
import PrivateRoute from '../components/PrivateRoute';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={PatternLogin} />
      {/* <Route path="/box/:id" component={Box} /> */}
      <PrivateRoute path="/singin" exact component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;