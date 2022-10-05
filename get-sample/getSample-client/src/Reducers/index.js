import { combineReducers } from 'redux';
import loginReducer from '../Reducers/loginReducer';
import modalControlReducer from '../Reducers/modalControlReducer';
import modalMessageReducer from '../Reducers/modalMessageReducer';
import userReducer from './userReducer';
import selectedReducer from './selectedReducer';
import requestReducer from './requestReducer';
import videosReducer from './videosReducer.js';
import videoStateReducer from './videoStateReducer.js';
import dictionaryReducer from './dictionaryReducer.js';
import myWordsReducer from './myWordsReducer';

export default combineReducers({
  isLoggedIn: loginReducer,
  isReadyToShowModal: modalControlReducer,
  modalMessage: modalMessageReducer,
  userInfo: userReducer,
  selected: selectedReducer,
  request: requestReducer,
  videos: videosReducer,
  videoState: videoStateReducer,
  dictionary: dictionaryReducer,
  myWords: myWordsReducer,
});
