import { INITIALIZE_USER, UPDATE_USER_TEAM } from "../constants";

export const initialState = {
  id: "",
  username: "",
  email: "",
  allTeamIds: [],
  teamById: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case INITIALIZE_USER:
      const { _id: id, username, email, teams } = action.payload;
      const allTeamIds = teams.map((team) => team._id);
      const teamById = teams.reduce((acc, team) => {
        const { _id: id, name, display_name: displayName } = team;
        acc[team._id] = {
          id,
          name,
          displayName,
        };
        return acc;
      }, {});

      return {
        ...state,
        id,
        username,
        email,
        allTeamIds,
        teamById,
      };

    case UPDATE_USER_TEAM: {
      const { _id: id, name, display_name: displayName } = action.payload;
      return {
        ...state,
        allTeamIds: [...state.allTeamIds, id],
        teamById: {
          ...state.teamById,
          [id]: {
            id,
            name,
            displayName,
          },
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
}
