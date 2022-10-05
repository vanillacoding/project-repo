import actionTypes from '../Constants/actionTypes';
const initialState = null;
const { LOGIN } = actionTypes;

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return action.data;

    default:
      return state;
  }
}
export default userReducer;
