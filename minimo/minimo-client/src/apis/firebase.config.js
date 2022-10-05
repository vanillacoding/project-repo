import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
});

export default firebase;
