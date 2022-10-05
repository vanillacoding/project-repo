import Cookies from "universal-cookie";
import getActionTypes from "./actionTypes.js";

const cookies = new Cookies();

const checkAuthAction = () => async (dispatch) => {
  dispatch({ type: getActionTypes().CHECK_AUTHORIZATION });

  try {
    const token = cookies.get("jwt");

    if (!token || token === "undefined") {
      return dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_UNAUTH });
    }

    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/check_auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const result = await response.json();

    if (result.message === "success") {
      return dispatch({
        type: getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
        payload: result.data.user,
      });
    }

    if (result.message === "unauthorized") {
      return dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_UNAUTH });
    }
  } catch (err) {
    dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL, payload: err });
  }
};

const loginAction = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().USER_LOGIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.message === "fail") {
      return dispatch({
        type: getActionTypes().USER_LOGIN_FAIL,
        payload: result.data,
      });
    }

    cookies.set("jwt", result.data.token);

    dispatch({
      type: getActionTypes().USER_LOGIN_SUCCESS,
      payload: result.data.user,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().USER_LOGIN_FAIL, payload: err });
  }
};

const socialLoginAction = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().SOCIAL_LOGIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/social_login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    cookies.set("jwt", result.data.token);

    dispatch({
      type: getActionTypes().SOCIAL_LOGIN_SUCCESS,
      payload: result.data.user,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().SOCIAL_LOGIN_FAIL, payload: err });
  }
};

const signupAction = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().USER_SIGNUP });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (result.message === "fail") {
      return dispatch({
        type: getActionTypes().USER_SIGNUP_FAIL,
        payload: result.data,
      });
    }

    cookies.set("jwt", result.data.token);

    dispatch({
      type: getActionTypes().USER_SIGNUP_SUCCESS,
      payload: result.data.user,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().USER_SIGNUP_FAIL, payload: err });
  }
};

const logoutAction = (history) => (dispatch) => {
  cookies.remove("jwt", { path: "/" });

  return dispatch({ type: getActionTypes().USER_LOGOUT });
};

const resetErrorMessage = () => (dispatch) => {
  return dispatch({ type: getActionTypes().RESET_ERROR_MESSAGE });
};

const authActionCreator = {
  checkAuthAction,
  loginAction,
  socialLoginAction,
  signupAction,
  logoutAction,
  resetErrorMessage,
};

export default authActionCreator;
