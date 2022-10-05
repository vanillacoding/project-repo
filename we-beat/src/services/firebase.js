import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/database";

var config = {
  apiKey: "AIzaSyDXepznozMfE9_lordhxn3Gqw2AadIj8Tc",
  authDomain: "bangbae-gimbab.firebaseapp.com",
  databaseURL:
    "https://bangbae-gimbab-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bangbae-gimbab",
  storageBucket: "bangbae-gimbab.appspot.com",
  messagingSenderId: "324535191591",
  appId: "1:324535191591:web:88bcfa2afd7d170d33a602",
};

firebase.initializeApp(config);

export default firebase;
