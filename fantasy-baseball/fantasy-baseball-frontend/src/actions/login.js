import { fetchUser, deleteUser } from "../api/login";
import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHECK_USER,
  EXPIRED_TOKEN,
  UPDATE_MONEY,
  START_LOADING,
  FINISH_LOADING,
  CATCH_API_ERROR,
} from "../constants/actionTypes";

const ERROR_MESSAGE = {
  commonError: "유저 데이터 접근에 실패하였습니다.",
};

export const saveUser = (user) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_SUCCESS, user });
  } catch (err) {
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const clearUser = () => async (dispatch) => {
  try {
    const response = await deleteUser();

    if (response.ok) {
      dispatch({ type: LOGOUT });
    }
  } catch (err) {
    const error = ERROR_MESSAGE.commonError;
    dispatch({ type: CATCH_API_ERROR }, error);
  }
};

export const checkUser = (tokenId) => async (dispatch) => {
  dispatch({ type: START_LOADING });

  try {
    const response = await fetchUser(tokenId, "checkUser");

    if (response.ok) {
      const { data: user } = await response.json();
      dispatch({ type: CHECK_USER, user });
    } else {
      dispatch({ type: EXPIRED_TOKEN });
    }

    dispatch({ type: FINISH_LOADING });
  } catch (err) {
    const error = ERROR_MESSAGE.commonError;
    dispatch({ type: CATCH_API_ERROR }, error);
  }
};

export const updateMoney = (bettingMoney) => ({ type: UPDATE_MONEY, bettingMoney });
