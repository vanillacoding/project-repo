import produce from "immer";

import * as type from "../constants/actionTypes";

const initialState = {
  byName: {},
  allNames: []
};

const password = (state = initialState, action) => {
  switch (action.type) {
    case type.SAVE_PASSWORDS:
      return produce(state, (draft) => {
        const passwords = {};

        for (let i = 0; i < action.passwords.length; i++) {
          const password = action.passwords[i];
          passwords[password.name] = password;
          draft.allNames.push(password.name);
        }

        draft.byName = passwords;
      });
    default:
      return state;
  }
};

export default password;
