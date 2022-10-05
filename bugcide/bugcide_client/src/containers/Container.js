import { connect } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import App from '../components/App';
import ProjectList from '../components/ProjectList';
import * as actions from '../actions/index';
import * as api from '../utils/api';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig);

const handleProjectLoad = async (dispatch, token, page) => {
  try {
    const response = await api.getProjectListApi(token, page);

    if (response.result === 'unauthorized') {
      window.localStorage.removeItem('bugcideToken');
      return dispatch(actions.logoutUser());
    }

    if (response.result !== 'ok') {
      return dispatch(actions.getProjectListFailure());
    }

    dispatch(actions.getProjectListSuccess(response, page));
  } catch (err) {
    console.log(err);
    dispatch(actions.getProjectListFailure());
  }
};

const mapStateToProps = state => {
  return {
    ...state.authReducer,
    ...state.listReducer,
    ...state.modalReducer
  };
};

const mapDispatchToProps = dispatch => ({
  handleModalOpen: () => {
    dispatch(actions.openModal());
  },
  handleModalClose: () => {
    dispatch(actions.closeModal());
  },
  handleAutoLogin: () => {
    const jwtoken = window.localStorage.getItem('bugcideToken');

    jwtoken ? dispatch(actions.loginUser(jwtoken)) : dispatch(actions.logoutUser());
  },
  handleLogin: async () => {
    try {
      const provider = new firebase.auth.GithubAuthProvider();

      const {
        additionalUserInfo: { username, profile }
      } = await firebase.auth().signInWithPopup(provider);

      const userInfo = {
        socialId: profile.id,
        name: username,
        profileUrl: profile.avatar_url
      };

      const { result, jwtoken } = await api.userLoginApi(userInfo);

      if (result !== 'ok') {
        throw new Error('login failed');
      }

      window.localStorage.setItem('bugcideToken', jwtoken);
      dispatch(actions.loginUser(jwtoken));
    } catch (err) {
      console.log(err);
      alert('Login failed. Please try again!');
    }
  },
  handleLogout: async () => {
    try {
      await firebase.auth().signOut();
      window.localStorage.removeItem('bugcideToken');
      dispatch(actions.logoutUser());
    } catch (err) {
      console.log(err);
      alert('Logout failed. Please try again!');
    }
  },
  onProjectListLoad: async (token, page = 0) => {
    handleProjectLoad(dispatch, token, page);
  },
  onProjectCreate: async (token, newProject) => {
    try {
      const response = await api.postNewProjectApi(token, newProject);

      if (response.result === 'unauthorized') {
        window.localStorage.removeItem('bugcideToken');
        return dispatch(actions.logoutUser());
      }

      if (response.result !== 'ok') {
        return dispatch(actions.postNewProjectFailure(response.message));
      }

      dispatch(actions.closeModal());

      handleProjectLoad(dispatch, token, 0);
    } catch (err) {
      console.log(err);
      alert('Something went wrong. Please try later');
    }
  }
});

export default {
  App: connect(mapStateToProps, mapDispatchToProps)(App),
  ProjectList: connect(mapStateToProps, mapDispatchToProps)(ProjectList)
};
