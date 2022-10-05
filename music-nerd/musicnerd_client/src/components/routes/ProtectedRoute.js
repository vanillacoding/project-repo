import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  ...props
}) => (
  <Route
    {...props}
    render={props => isAuthenticated ? <Component {...props} /> : <Redirect to='/auth/login' />}
  />
);

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default ProtectedRoute;
