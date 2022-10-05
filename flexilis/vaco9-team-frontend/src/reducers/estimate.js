import { fetchEstimate } from '../apis/campaigns';

const GET_ESTIMATE_REQUEST = 'GET_ESTIMATE';
export const GET_ESTIMATE_SUCCESS = 'GET_ESTIMATE_SUCCESS';
export const GET_ESTIMATE_ERROR = 'GET_ESTIMATE_ERROR';

const actionCreator = (actionType, data) => {
  return {
    type: actionType,
    payload: {
      ...data,
    },
  };
};

export const getEstimate = (data) => async (dispatch) => {
  dispatch(actionCreator(GET_ESTIMATE_REQUEST));
  try {
    const response = await fetchEstimate(data);
    const responseBody = await response.json();
    const { cpm, cpc } = responseBody;

    dispatch(actionCreator(GET_ESTIMATE_SUCCESS, { cpm, cpc }));
  } catch (error) {
    dispatch(actionCreator(GET_ESTIMATE_ERROR, { error }));
  }
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case GET_ESTIMATE_REQUEST: {
      return {
        ...state,
      };
    }
    case GET_ESTIMATE_SUCCESS: {
      return {
        ...action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
