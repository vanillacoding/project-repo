import { combineReducers } from 'redux';
import {
  SET_IS_PRIVATE_MODE,
  SET_NOTE_LIST_ENTRY_INFOS,
  UPDATE_NOTE_LIST_ENTRY_INFOS,
  SET_SHARED_USERS,
  SET_HAS_TOKEN,
  SET_CURRENT_USER,
  TOGGLE_SHOW_MODIFICATIONS_MODE,
  RESET_MODIFICATION_STATES,
  SET_NEW_BLOCKS_CANDIDATE,
  REMOVE_NEW_BLOCKS_CANDIDATE,
  SET_IS_MODIFIED_TO_TRUE,
  SET_IS_MODIFIED_TO_FALSE,
  SET_CURRENT_NOTE_AND_BRANCH,
  INITIALIZE_STORE,
} from '../constants/actionTypes';
import { GOOGIT_LOGIN_TOKEN } from '../constants/auth';

const hasToken = (
  state = !!localStorage.getItem(GOOGIT_LOGIN_TOKEN),
  action,
) => {
  switch (action.type) {
    case SET_HAS_TOKEN:
      return !!localStorage.getItem(GOOGIT_LOGIN_TOKEN);
    default:
      return state;
  }
};

const currentUser = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user;
    default:
      return state;
  }
};

const isPrivateMode = (state = false, action) => {
  switch (action.type) {
    case SET_IS_PRIVATE_MODE:
      return !state;
    default:
      return state;
  }
};

const noteListEntryInfos = (state = [], action) => {
  switch (action.type) {
    case SET_NOTE_LIST_ENTRY_INFOS:
      return action.payload;
    case UPDATE_NOTE_LIST_ENTRY_INFOS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};

const isShowModificationsMode = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_SHOW_MODIFICATIONS_MODE:
      return !state;
    case RESET_MODIFICATION_STATES:
      return false;
    default:
      return state;
  }
};

const isModified = (state = false, action) => {
  switch (action.type) {
    case SET_IS_MODIFIED_TO_TRUE:
      return true;
    case SET_IS_MODIFIED_TO_FALSE:
      return false;
    case RESET_MODIFICATION_STATES:
      return false;
    default:
      return state;
  }
};

const newBlocksCandidate = (state = null, action) => {
  switch (action.type) {
    case SET_NEW_BLOCKS_CANDIDATE:
      return action.newNote;
    case REMOVE_NEW_BLOCKS_CANDIDATE:
      return null;
    default:
      return state;
  }
};

const currentNote = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_NOTE_AND_BRANCH:
      return action.note;
    default:
      return state;
  }
};

const currentBranch = (state = null, action) => {
  switch (action.type) {
    case SET_CURRENT_NOTE_AND_BRANCH:
      return action.branch;
    default:
      return state;
  }
};

const sharedUsers = (state = [], action) => {
  switch (action.type) {
    case SET_SHARED_USERS:
      return action.sharedUsers;
    default:
      return state;
  }
};

const appReducer = combineReducers({
  hasToken,
  currentUser,
  isPrivateMode,
  noteListEntryInfos,
  isShowModificationsMode,
  isModified,
  newBlocksCandidate,
  currentNote,
  currentBranch,
  sharedUsers,
});

export default function rootReducer(state, action) {
  if (action.type === INITIALIZE_STORE) {
    state = undefined;
  }

  return appReducer(state, action);
}
