import { connect } from 'react-redux';
import EditorPage from '../pages/EditorPage';
import {
  toggleShowModificationsMode,
  setIsModifiedToTrue,
  setIsModifiedToFalse,
  setNewBlocksCandidate,
  removeNewBlocksCandidate,
  setCurrentNoteAndBranch,
  setSharedUsers,
  resetModificationStates,
  setCurrentUser,
  setNoteListEntryInfos,
  updateNoteListEntryInfos,
} from '../actions';

function mapDispatchToProps(dispatch) {
  return {
    onShowModificationsModeToggle() {
      dispatch(toggleShowModificationsMode());
    },
    onNoteModify(blocks, isModified) {
      dispatch(setNewBlocksCandidate(blocks));
      if (isModified) return;
      dispatch(setIsModifiedToTrue());
    },
    onSave(note, branch) {
      dispatch(setIsModifiedToFalse());
      dispatch(removeNewBlocksCandidate());
      dispatch(setCurrentNoteAndBranch(note, branch));
      localStorage.removeItem('googit-compared-note-value');
    },
    onNoteLoad(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onNoteChange(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
      localStorage.removeItem('googit-compared-note-value');
    },
    onSharedUsersLoad(sharedUsers) {
      dispatch(setSharedUsers(sharedUsers));
    },
    onDeleteBranch(user) {
      dispatch(setCurrentUser(user));
      dispatch(setCurrentNoteAndBranch(null, null));
      dispatch(resetModificationStates());
      localStorage.removeItem('googit-compared-note-value');
    },
    onSetNoteList(noteListEntryInfos) {
      dispatch(setNoteListEntryInfos(noteListEntryInfos));
    },
    onUpdateBranchList(noteListEntryInfos) {
      dispatch(updateNoteListEntryInfos(noteListEntryInfos));
    },
    onSharedUsersPermissionUpdate(sharedUsers) {
      dispatch(setSharedUsers(sharedUsers));
    },
  };
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    currentBranch: state.currentBranch,
    currentNote: state.currentNote,
    previousNote: state.previousNote,
    isShowModificationsMode: state.isShowModificationsMode,
    isModified: state.isModified,
    newBlocksCandidate: state.newBlocksCandidate,
    authorName: state.authorName,
    sharedUsers: state.sharedUsers,
    isPrivateMode: state.isPrivateMode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditorPage);
