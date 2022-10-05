import firebase from "firebase";
import firebaseApp from "./firebaseAPIs";

class AuthService {
  login(providerName) {
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();

    return firebaseApp.auth().signInWithPopup(authProvider);
  }

  logout() {
    firebase.auth().signOut();
  }

  onAuthChange(callback) {
    firebase.auth().onAuthStateChanged((user) => {
      callback(user);
    });
  }
}

export default AuthService;
