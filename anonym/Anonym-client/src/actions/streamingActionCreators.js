import * as actionTypes from "../constants/actionTypes";
import { defaultOptionHelper, urlHelper } from "../utils/fetchHelper";

export const fetchStreamings = () => async (dispatch) => {
  try {
    const url = urlHelper();
    const option = defaultOptionHelper("GET");

    const response = await fetch(url, option);
    const result = await response.json();

    dispatch({
      type: actionTypes.FETCH_STREAMINGS_SUCCESS,
      payload: result.payload,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.FETCH_STREAMINGS_FAIL,
      payload: err,
    });
  }
};

export const generateStreaming = (streamingTitle, streamingThumnail) => async (dispatch, state) => {
  try {
    const streamingId = state().auth.userInfo["_id"];
    const url = urlHelper(`streaming/${streamingId}`);
    const option = defaultOptionHelper("POST");
    option.body = JSON.stringify({ streamingTitle, streamingThumnail });

    const response = await fetch(url, option);
    const result = await response.json();

    if (response.ok) {
      dispatch({
        type: actionTypes.GENERATE_STREAMING_SUCESS,
        payload: result.payload,
      });
    } else {
      dispatch({
        type: actionTypes.GENERATE_STREAMING_FAIL,
        payload: {
          status: response.status,
          message: response.statusText,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: actionTypes.GENERATE_STREAMING_FAIL,
      payload: err,
    });
  }
};

export const removeStreaming = () => async (dispatch, state) => {
  try {
    const streamingId = state().auth.userInfo["_id"];
    const url = urlHelper(`streaming/${streamingId}`);
    const option = defaultOptionHelper("DELETE");

    await fetch(url, option);

    dispatch({
      type: actionTypes.REMOVE_STREAMING_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.REMOVE_STREAMING_FAIL,
      payload: err,
    });
  }
};
