import { connect } from 'react-redux';
import App from '../Components/App';
import actionTypes from '../Constants/actionTypes';

const {
  LOGIN,
  LOADED_VIDEO_DATA,
  LOADED_DICTIONARY_DATA,
  TYPED_WORD,
  CHECKED_LANGUAGE,
  REQUEST_VIDEOS,
  REQUEST_POST_WORD,
  REQUEST_DELETE_WORD,
  MOVE_VIDEO_START_TIME,
  UPDATE_CURRENT_VALUE,
  UPDATE_CURRENT_TIME,
  UPDATE_VIDEO_ORDER,
  REMOVE_WORD,
  ADD_WORD,
  READY_TO_SHOW_MODAL,
  NOT_READY_TO_SHOW_MODAL,
  UPDATE_MODAL_MESSAGE,
  RESET_STATE_OF,
  ADD_VIDEO_INFO_TO_DICTIONARY,
  ON_ERROR_ABOUT,
} = actionTypes;

const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    isReadyToShowModal: state.isReadyToShowModal,
    modalMessage: state.modalMessage,
    userInfo: state.userInfo,
    selected: state.selected,
    request: state.request,
    videos: state.videos,
    videoState: state.videoState,
    dictionary: state.dictionary,
    myWords: state.myWords,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserData: userInfo => {
      dispatch({ type: LOGIN, data: userInfo });
    },
    getVideoData: videoData => {
      dispatch({ type: LOADED_VIDEO_DATA, data: videoData });
    },
    getDictionaryData: result => {
      dispatch({ type: LOADED_DICTIONARY_DATA, data: result });
    },
    onTextChange: function(ev) {
      dispatch({
        type: TYPED_WORD,
        data: ev.currentTarget.value,
      });
    },
    onRadioChange: function(ev) {
      dispatch({
        type: CHECKED_LANGUAGE,
        data: ev.currentTarget.value,
      });
    },
    onCheckboxChange: function(ev, field) {
      dispatch({
        type: `CHECKED_${field}`,
        data: ev.currentTarget.value,
      });
    },
    onVideoSearchSubmit: function(ev) {
      dispatch({ type: REQUEST_VIDEOS });
      ev.preventDefault();
    },
    // Will be updated
    //onChannelSearchSubmit: function(ev) {
    //   dispatch({ type: 'REQUEST_CHANNELS' });
    //   ev.preventDefault();
    // },
    onAddWordClick: function(word, myWords) {
      dispatch({
        type: REQUEST_POST_WORD,
        data: { word, myWords },
      });
    },
    onDeleteWordClick: function(word) {
      dispatch({
        type: REQUEST_DELETE_WORD,
        data: word,
      });
    },
    updateStartTimeTo: function(time, duration) {
      dispatch({
        type: MOVE_VIDEO_START_TIME,
        data: { time, duration },
      });
    },
    updateCurrentTo: function(currentValue) {
      dispatch({
        type: UPDATE_CURRENT_VALUE,
        data: currentValue,
      });
    },
    updateCurrentTimeTo: function(crrentTime) {
      dispatch({
        type: UPDATE_CURRENT_TIME,
        data: crrentTime,
      });
    },
    updateVideoOrder: function(difference) {
      dispatch({
        type: UPDATE_VIDEO_ORDER,
        data: difference,
      });
    },
    updateMyWords: function(word, type) {
      switch (type) {
        case 'remove':
          dispatch({ type: REMOVE_WORD, data: word });
          break;

        case 'add':
          dispatch({ type: ADD_WORD, data: word });
          break;

        default:
          dispatch({ type: null, data: word });
      }
    },
    onReadyModal: function() {
      dispatch({
        type: READY_TO_SHOW_MODAL,
      });
    },
    onNotReadyModal: function() {
      dispatch({
        type: NOT_READY_TO_SHOW_MODAL,
      });
    },
    UpdateModalMessage: function(text) {
      dispatch({
        type: UPDATE_MODAL_MESSAGE,
        data: text,
      });
    },
    resetStateOf: function(stateName) {
      dispatch({
        type: `${RESET_STATE_OF}_${stateName}`,
      });
    },
    addVideoInfoToDictionary: function(videosInfo) {
      dispatch({
        type: ADD_VIDEO_INFO_TO_DICTIONARY,
        data: videosInfo,
      });
    },
    onErrorAbout: function(errorType) {
      dispatch({
        type: ON_ERROR_ABOUT,
        data: errorType,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
