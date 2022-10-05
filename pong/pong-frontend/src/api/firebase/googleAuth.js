import firebase from "./index";
import { postGoogleLogin, postGoogleLogout } from "../authApi";

const provider = new firebase.auth.GoogleAuthProvider();

export const googleLogin = async (nextPage, setUser) => {
  const { user } = await firebase.auth().signInWithPopup(provider);

  postGoogleLogin(user.email, user.displayName);
  setUser({
    email: user.email,
    name: user.displayName,
  });

  nextPage();
};

export const googleLogout = async () => {
  await firebase.auth().signOut();
  postGoogleLogout();
};
