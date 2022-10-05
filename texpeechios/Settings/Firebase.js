import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

// pluck values from your `GoogleService-Info.plist` you created on the firebase console
const iosConfig = {
  clientId: '482965664730-ra3r150un7qbu3dqrpm8vgndi9rt60oh.apps.googleusercontent.com',
  appId: '1:482965664730:ios:9bc59a2f698e265e',
  apiKey: 'AIzaSyDVf4eyocGNde5l9QzgKZyeM_yEZgrHSUk',
  databaseURL: 'https://texpeech.firebaseio.com',
  storageBucket: 'texpeech.appspot.com',
  messagingSenderId: '482965664730',
  projectId: 'texpeech',
  // enable persistence by adding the below flag
  persistence: true,
};

// // pluck values from your `google-services.json` file you created on the firebase console
// const androidConfig = {
//   clientId: '482965664730-r5ueud1vk06072r4ei7tpa4s131k1pg6.apps.googleusercontent.com',
//   appId: '1:482965664730:android:e390783b67758a80',
//   apiKey: 'AIzaSyAV1rUz3Wpmb-Ojls2kLVS3OCu0kIpk4AA',
//   databaseURL: 'https://texpeech.firebaseio.com',
//   storageBucket: 'texpeech.appspot.com',
//   messagingSenderId: '482965664730',
//   projectId: 'texpeech',

//   // enable persistence by adding the below flag
//   persistence: true,
// };

const texpeechApp = firebase.initializeApp(
  // use platform specific firebase config
  Platform.OS === 'ios' ? iosConfig : androidConfig,
  // name of this app
  'texpeech',
);



export default texpeechApp;
