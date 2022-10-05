import { createAction, createReducer } from '@reduxjs/toolkit';

export const SET_ROUTE = 'routeReducer/SET_ROUTE';

export const setRoute = createAction(SET_ROUTE);

const initState = '/';

export default createReducer(initState, {
  [SET_ROUTE]: (state, action) => {
    return action.payload;
  },
});
