import firebase from "firebase/app";
import "firebase/auth";

import logWarnOrErrInDevelopment from "../utils/logWarnOrErrInDevelopment";

const {
  REACT_APP_FIREBASE_API_KEY,
  REACT_APP_FIREBASE_AUTH_DOMAIN,
  REACT_APP_FIREBASE_DATABASE_URL,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  REACT_APP_FIREBASE_APP_ID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_API_KEY,
  authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);

const signInWithGoogle = async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await firebase.auth().signInWithPopup(provider);

    return user.getIdToken();
  } catch (error) {
    logWarnOrErrInDevelopment(error);
    throw error;
  }
};

export { signInWithGoogle };
