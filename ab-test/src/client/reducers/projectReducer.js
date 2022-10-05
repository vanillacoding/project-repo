import { FETCH_PROJECTS, ADD_NEW_PROJECT, DELETE_PROJECT } from '../actions/types';

export default function projectReducer(state = [], action) {
  switch (action.type) {
    case FETCH_PROJECTS:
      return [
        ...action.payload
      ];
    case ADD_NEW_PROJECT:
      return [
        ...state,
        action.payload,
      ];
    case DELETE_PROJECT:
      let filteredProjects = [];

      for (let i = 0; i < state.length; i++) {
        if (action.payload === state[i]._id) {
          filteredProjects = filteredProjects.concat(state.slice(i + 1));
          break;
        }

        filteredProjects = filteredProjects.concat(state[i]);
      }

      return filteredProjects;
    default:
      return state;
  }
}
