import Cookies from "universal-cookie";
import * as actionTypes from "../constants/actionTypes";
import { defaultOptionHelper, urlHelper } from "../utils/fetchHelper";

export const checkAuthorization = () => async (dispatch) => {
  const cookies = new Cookies();

  try {
    const token = cookies.get("jwt");
    const url = urlHelper("auth/check");
    const option = defaultOptionHelper("POST");
    option.headers.Authentication = `bearer ${token}`;

    const response = await fetch(url, option);
    const result = await response.json();

    if (response.ok) {
      dispatch({
        type: actionTypes.AUTHORIZATION_SUCCESS,
        payload: result.payload,
      });

      return;
    }

    cookies.remove("jwt");
    dispatch({
      type: actionTypes.AUTHORIZATION_FAIL,
    });
  } catch (err) {
    cookies.remove("jwt");
    dispatch({
      type: actionTypes.AUTHORIZATION_FAIL,
      payload: err,
    });
  }
};

export const userLogin = (userInfo) => async (dispatch) => {
  try {
    const url = urlHelper("auth/login");
    const option = defaultOptionHelper("POST");
    option.body = JSON.stringify(userInfo);

    const response = await fetch(url, option);
    const result = await response.json();

    dispatch({
      type: actionTypes.LOG_IN_SUCCESS,
      payload: result.payload,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.LOG_IN_FAIL,
      payload: err,
    });
  }
};

export const userLogout = () => async (dispatch) => {
  try {
    const url = urlHelper("auth/logout");
    const option = defaultOptionHelper("GET");

    const response = await fetch(url, option);

    if (response.ok) {
      dispatch({
        type: actionTypes.LOG_OUT_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.LOG_OUT_FAIL.anchor,
      payload: err,
    });
  }
};
