import React, { useEffect } from "react";

import jwtDecode from "jwt-decode";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, useHistory } from "react-router-dom";
import styled from "styled-components";

import { checkUser } from "../../actions/login";

const Loading = styled.div`
  color: ${({ theme }) => theme.color.black};
`;

function PrivateRoute({
  path,
  component: Component,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((state) => state.login.isLoading);
  const user = useSelector((state) => state.login.user);

  useEffect(() => {
    const checkUserLogin = () => {
      if (document.cookie.indexOf("access_token") === -1) {
        history.push("/login");
        return;
      }

      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("access_token"))
        .split("=")[1];

      const jwtData = jwtDecode(token);
      const { exp } = jwtData;
      const isTokenExpired = Math.floor(Date.now() / 1000) + 15 > exp;

      if (!isTokenExpired) {
        dispatch(checkUser(token));
      } else {
        history.push("/login");
      }
    };

    checkUserLogin();
  }, []);

  if (isLoading) {
    return <Loading>로딩</Loading>;
  }

  return (
    <Route
      path={path}
      render={(props) => (
        user
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.func.isRequired,
};

export default PrivateRoute;
