import {
  SET_IS_PRIVATE_MODE,
  UPDATE_NOTE_LIST_ENTRY_INFOS,
  SET_NOTE_LIST_ENTRY_INFOS,
  SET_SHARED_USERS,
  SET_CURRENT_USER,
  SET_HAS_TOKEN,
  INITIALIZE_STORE,
  TOGGLE_SHOW_MODIFICATIONS_MODE,
  SET_IS_MODIFIED_TO_TRUE,
  SET_IS_MODIFIED_TO_FALSE,
  SET_NEW_BLOCKS_CANDIDATE,
  REMOVE_NEW_BLOCKS_CANDIDATE,
  SET_CURRENT_NOTE_AND_BRANCH,
  RESET_MODIFICATION_STATES,
} from '../constants/actionTypes';

export const setCurrentUser = user => ({
  type: SET_CURRENT_USER,
  user,
});

export const setHasToken = () => ({
  type: SET_HAS_TOKEN,
});

export const initializeStore = () => ({
  type: INITIALIZE_STORE,
});

export const setIsPrivateMode = () => ({
  type: SET_IS_PRIVATE_MODE,
});

export const toggleShowModificationsMode = () => ({
  type: TOGGLE_SHOW_MODIFICATIONS_MODE,
});

export const setIsModifiedToTrue = () => ({
  type: SET_IS_MODIFIED_TO_TRUE,
});

export const setIsModifiedToFalse = () => ({
  type: SET_IS_MODIFIED_TO_FALSE,
});

export const setNewBlocksCandidate = newNote => ({
  type: SET_NEW_BLOCKS_CANDIDATE,
  newNote,
});

export const removeNewBlocksCandidate = () => ({
  type: REMOVE_NEW_BLOCKS_CANDIDATE,
});

export const setCurrentNoteAndBranch = (note, branch) => ({
  type: SET_CURRENT_NOTE_AND_BRANCH,
  note,
  branch,
});

export const updateNoteListEntryInfos = noteListEntryInfos => ({
  type: UPDATE_NOTE_LIST_ENTRY_INFOS,
  payload: noteListEntryInfos
});

export const setNoteListEntryInfos = noteListEntryInfos => ({
  type: SET_NOTE_LIST_ENTRY_INFOS,
  payload: noteListEntryInfos
});

export const setSharedUsers = sharedUsers => ({
  type: SET_SHARED_USERS,
  sharedUsers,
});

export const resetModificationStates = () => ({
  type: RESET_MODIFICATION_STATES,
});
