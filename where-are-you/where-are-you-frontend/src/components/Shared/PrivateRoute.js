import React from "react";

import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/" />}
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

export default PrivateRoute;
