export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return action.user;
    default:
      return state;
  }
};
