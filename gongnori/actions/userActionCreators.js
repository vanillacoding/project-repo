import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_SERVER } from "@env";
import * as actionTypes from "./actionTypes";
import {
  viewLoginRequest,
  hideLoginRequest,
  viewMessageLoading,
  hideMessageLoading,
} from "./loadingActionCreators";

const setCurrentTeam = (payload) => ({
  type: actionTypes.SET_CURRENT_TEAM,
  payload,
});

const setCurrentLocation = (payload) => ({
  type: actionTypes.SET_CURRENT_LOCATION,
  payload,
});

const setCurrentSports = (payload) => ({
  type: actionTypes.SET_CURRENT_SPORTS,
  payload,
});

const authLogin = (userInfo) => async (dispatch) => {
  try {
    const { name, email } = userInfo;

    dispatch(viewLoginRequest());

    const res = await fetch(`${API_SERVER}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const result = await res.json();
    const { data, error } = result;

    if (error) { throw new Error() }

    const { token, locations, teams, messages, sports } = data;

    await AsyncStorage.setItem("token", token);

    dispatch({
      type: actionTypes.AUTH_LOGIN_SUCCESS,
      payload: { name, email, locations, messages, teams, sports },
    });

    dispatch(hideLoginRequest());
  } catch (err) {
    dispatch(hideLoginRequest());
    dispatch({ type: actionTypes.AUTH_LOGIN_FAIL });
  }
};

const authLogout = () => async (dispatch) => {
  await AsyncStorage.removeItem("token");

  dispatch({ type: actionTypes.AUTH_LOGOUT });
};

const getMyMessage = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    dispatch(viewMessageLoading());

    const res = await fetch(`${API_SERVER}/message/my`, {
      method: "GET",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    const { data, error } = result;

    if (error) { throw new Error() }

    dispatch({ type: actionTypes.LOAD_MY_MESSAGE_SUCCESS, payload: data });
    dispatch(hideMessageLoading());
  } catch (err) {
    dispatch({ type: actionTypes.LOAD_MY_MESSAGE_FAIL });
  }
};

const saveMyLocation = (locations) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const res = await fetch(`${API_SERVER}/user/location`, {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ locations }),
    });

    const result = await res.json();
    const { error } = result;

    if (error) { throw new Error() }

    dispatch({
      type: actionTypes.SAVE_MY_LOCATION_SUCCESS,
      payload: locations,
    });
  } catch (err) {
    dispatch({ type: actionTypes.UPDATE_MY_DATA_FAIL });
  }
};

const updateMyData = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("token");

    const _teams = await fetch(`${API_SERVER}/team/my`, {
      method: "GET",
      headers: { "Authorization": token },
    });

    const _messages = await fetch(`${API_SERVER}/message/my`, {
      method: "GET",
      headers: { "Authorization": token },
    });

    const myTeam = await _teams.json();
    const teams = myTeam.data;

    const myMessage = await _messages.json();
    const messages = myMessage.data;

    if (myTeam.error) { throw new Error() }
    if (myMessage.error) { throw new Error() }

    dispatch({
      type: actionTypes.UPDATE_MY_DATA_SUCCESS,
      payload: { teams, messages },
    });
  } catch (err) {
    dispatch({ type: actionTypes.UPDATE_MY_DATA_FAIL });
  }
};

export {
  authLogin,
  authLogout,
  saveMyLocation,
  getMyMessage,
  updateMyData,
  setCurrentTeam,
  setCurrentLocation,
  setCurrentSports,
};
