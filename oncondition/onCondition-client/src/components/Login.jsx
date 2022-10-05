import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGapi } from "../helpers/useGapi";
import Loading from "../components/Loading";
import { login } from "../features/userSlice";

function Login() {
  const [status, setStatus] = useState("");
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [gapi, isLoaded] = useGapi();

  const handleLogin = function () {
    history.push(`/${user.id}/condition`);
  };

  const handleLoginSuccess = function (user) {
    const { id_token: idToken } = user.getAuthResponse();

    dispatch(login({ idToken }));
  };

  const handleLoginFailure = function () {
    setStatus("로그인에 실패하였습니다.");
  };

  useEffect(() => {
    if (user.id) {
      handleLogin();

      return;
    }

    if (!isLoaded) {
      return;
    }

    gapi.signin2.render("google-login-button", {
      width: 240,
      height: 50,
      longtitle: true,
      onsuccess: handleLoginSuccess,
      onfailure: handleLoginFailure,
    });
  }, [isLoaded, user.id]);

  return (
    <>
      {(status || !isLoaded)
        ? <Loading message={status || "Waiting..."} />
        : <Loading>
          <div id="google-login-button" />
        </Loading>
      }
    </>
  );
}

export default Login;
