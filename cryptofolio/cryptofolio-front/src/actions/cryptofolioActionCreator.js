import getActionTypes from "./actionTypes.js";

const getCryptofoliosAction = () => async (dispatch, getState) => {
  dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS });

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/cryptofolio`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    dispatch({
      type: getActionTypes().GET_CRYPTOFOLIOS_SUCCESS,
      payload: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().GET_CRYPTOFOLIOS_FAIL, payload: err });
  }
};

const createCryptofolioAction = (
  name,
  selectedList,
  totalValue,
  history
) => async (dispatch, getState) => {
  dispatch({ type: getActionTypes().CREATE_CRYPTOFOLIO });

  const createdBy = getState().authReducer.user._id;
  const data = { name, selectedList, createdValue: totalValue, createdBy };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/cryptofolio/new`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    await dispatch({
      type: getActionTypes().CREATE_CRYPTOFOLIO_SUCCESS,
      payload: result.data,
    });

    await history.push({
      pathname: `/cryptofolio/${result.data._id}`,
      state: result.data,
    });
  } catch (err) {
    dispatch({ type: getActionTypes().CREATE_CRYPTOFOLIO_FAIL, payload: err });
  }
};

const deleteCryptofolioAction = (userId, cryptoFolioId, history) => async (
  dispatch
) => {
  if (!userId || !cryptoFolioId) {
    return;
  }

  dispatch({ type: getActionTypes().DELETE_CRYPTOFOLIO });

  const data = { userId, cryptoFolioId };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_SERVER_API}/cryptofolio/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response) {
      return dispatch({
        type: getActionTypes().DELETE_CRYPTOFOLIO_FAIL,
      });
    }

    dispatch({
      type: getActionTypes().DELETE_CRYPTOFOLIO_SUCCESS,
      payload: cryptoFolioId,
    });

    history.push({
      pathname: "/cryptofolio",
    });
  } catch (err) {
    dispatch({ type: getActionTypes().DELETE_CRYPTOFOLIO_FAIL, payload: err });
  }
};

const cryptofolioActionCreator = {
  getCryptofoliosAction,
  createCryptofolioAction,
  deleteCryptofolioAction,
};

export default cryptofolioActionCreator;
