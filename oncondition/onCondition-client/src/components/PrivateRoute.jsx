import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function PrivateRoute({ children, ...rest }) {
  const user = useSelector((state) => state.user);

  return (
    <Route {...rest}>
      {user.id
        ? children
        : <Redirect to="/login" />}
    </Route>
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateRoute;
