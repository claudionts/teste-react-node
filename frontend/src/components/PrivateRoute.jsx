import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, auth, state, ...rest }) => (
  <>
    {console.log(state.auth)}
    <Route
      {...rest}
      render={props =>
        state.auth.isAuth ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/" }} />
          )
      }
    />
  </>
);

const mapStateTopProps = state =>  ({ state });

export default connect( mapStateTopProps )(PrivateRoute);