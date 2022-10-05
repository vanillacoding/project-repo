import actionTypes from '../Constants/actionTypes';
const { LOGIN } = actionTypes;

export function loginReducer(state = false, action) {
  switch (action.type) {
    case LOGIN:
      return true;

    default:
      return state;
  }
}
export default loginReducer;
