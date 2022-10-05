import Cookies from "universal-cookie";
import getActionTypes from "./actionTypes.js";

export const checkAuthorization = () => async (dispatch) => {
  dispatch({ type: getActionTypes().CHECK_AUTHORIZATION });

  try {
    const cookies = new Cookies();
    const token = cookies.get("jwt");

    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/check_auth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );

    const result = await response.json();

    if (result.message === "Authorization Success") {
      dispatch({
        type: getActionTypes().CHECK_AUTHORIZATION_SUCCESS,
        payload: result.data,
      });
    } else {
      dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL });
    }
  } catch (err) {
    dispatch({ type: getActionTypes().CHECK_AUTHORIZATION_FAIL, payload: err });
  }
};

export const playerLogin = (data) => async (dispatch) => {
  dispatch({ type: getActionTypes().PLAYER_LOGIN });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    const cookies = new Cookies();

    cookies.set("jwt", result.token);

    dispatch({
      type: getActionTypes().PLAYER_LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().PLAYER_LOGIN_FAIL, payload: err });
  }
};

export const playerLogout = () => {
  const cookies = new Cookies();

  cookies.remove("jwt");

  return {
    type: getActionTypes().PLAYER_LOGOUT,
  };
};

export const logUnAuthMode = (playerId, name, email) => async (dispatch) => {
  dispatch({ type: getActionTypes().UNAUTH_MODE });

  try {
    const data = { playerId, name, email };
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/unAuth`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().UNAUTH_MODE_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().UNAUTH_MODE_FAIL, payload: err });
  }
};

export const stopUnAuthMode = () => {
  return {
    type: getActionTypes().STOP_UNAUTH_MODE,
  };
};

export const playerMicOn = () => {
  return {
    type: getActionTypes().PLAYER_MIC_ON,
  };
};
