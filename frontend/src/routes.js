import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Login';
// import Box from './pages/Box';
import SignIn from './pages/SignIn';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Main} />
      {/* <Route path="/box/:id" component={Box} /> */}
      <Route path="/singin" exact component={SignIn} />
    </Switch>
  </BrowserRouter>
);

export default Routes;