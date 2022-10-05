export default (state = '', action) => {
  switch (action.type) {
    case 'SET_COUNTRY_ID':
      return action.countryId;
    default:
      return state;
  }
};
