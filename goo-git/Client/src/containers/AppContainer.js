import { connect } from 'react-redux';
import {
  setCurrentUser,
  setHasToken,
  initializeStore,
  setIsPrivateMode,
  setNoteListEntryInfos,
  setCurrentNoteAndBranch,
  updateNoteListEntryInfos,
  resetModificationStates,
} from '../actions';
import App from '../components/App';

function mapDispatchToProps(dispatch) {
  return {
    onLogin(user) {
      dispatch(setHasToken());
      dispatch(setCurrentUser(user));
    },
    onLogout() {
      dispatch(initializeStore());
    },
    onCreateBranch(user) {
      dispatch(setCurrentUser(user));
    },
    togglePrivateMode() {
      dispatch(setIsPrivateMode());
    },
    onSetNoteList(noteListEntryInfos) {
      dispatch(setNoteListEntryInfos(noteListEntryInfos));
    },
    onUpdateNoteList(noteListEntryInfos) {
      dispatch(updateNoteListEntryInfos(noteListEntryInfos));
    },
    onNoteListEntryClick(note, branch) {
      dispatch(setCurrentNoteAndBranch(note, branch));
    },
    onHomeButtonClick(func) {
      dispatch(resetModificationStates());
      dispatch(setCurrentNoteAndBranch(null, null));
      func();
      localStorage.removeItem('googit-compared-note-value');
    },
  };
}

function mapStateToProps(state) {
  return {
    hasToken: state.hasToken,
    currentUser: state.currentUser,
    isPrivateMode: state.isPrivateMode,
    noteListEntryInfos: state.noteListEntryInfos,
    currentNote: state.currentNote,
    isModified: state.isModified,
    sharedUsers: state.sharedUsers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
