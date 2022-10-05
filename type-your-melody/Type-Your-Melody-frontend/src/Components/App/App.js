import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/auth';

import PianoKeyboard from '../PianoKeyboard/PianoKeyboard';

import glogo from '../../img/google-login.png';
import help from '../../img/help.png';
import './App.css';

var config = {
  apiKey: "AIzaSyBCrvBNP_x6Dxcy_b9rFN72c-smrvrvIQg",
  authDomain: "type-your-melody-1532934012672.firebaseapp.com",
  databaseURL: "https://type-your-melody-1532934012672.firebaseio.com",
  projectId: "type-your-melody-1532934012672",
  storageBucket: "type-your-melody-1532934012672.appspot.com",
  messagingSenderId: "125564717661"
};

firebase.initializeApp(config);

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      userName: null,
      userEmail: null,
      userPhotoUrl: null,
      PlayMode: true,
      isModalOpen: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {

        this.setState({
          isLoggedIn: true,
          userName: user.displayName,
          userEmail: user.email,
          userPhotoUrl: user.photoURL
        });
      } else {
      }
    });
  }

  triggerGoogleAuthentication() {
    firebase.auth().signInWithPopup(provider).then((result) => {
      var user = result.user;

      this.setState({
        isLoggedIn: true,
        userName: user.displayName,
        userEmail: user.email,
        userPhotoUrl: user.photoURL
      });
      
    }).catch(function(error) {
      console.log(error.code);
    });
  }
      
  logoutGoogleAuthentication() {
    firebase.auth().signOut().then(()=>{
      this.setState({
        isLoggedIn: false
      });
    }).catch(function(error) {
      // An error happened.
    });
  }

  changeMode() {
    if(this.state.playMode) {
      this.setState({
        playMode: false
      });
    } else {
      this.setState({
        playMode: true
      });
    }
  }
  
  render() {
    return (
      <div className="App">
        <div className="Header">
          <div className="Title-text">
            <div className="text">🎶 Type Your Melody 🎶</div>
          </div>
          <div className="User">
            {
              this.state.isLoggedIn &&
              <div className="User-pop">
                <Popup
                  trigger={<img alt="userPhoto" className="MyPhoto" src={this.state.userPhotoUrl} />}
                  position="bottom center"
                  on="click"
                >
                <div className="MyInfo">
                  Hello, {this.state.userName}!
                </div>
                </Popup>
              </div>
            }
            <div className="Login-pop">
              <Popup
                trigger={
                  !this.state.isLoggedIn ?
                  <button className="Login">Login</button> :
                  <button className="Login">Logout</button>
                }
                position="bottom center"
                on="click"
              >
              {
                !this.state.isLoggedIn ?
                <button className="googleBtn" onClick={this.triggerGoogleAuthentication.bind(this)}>
                  <img alt="googleLogo" className="googleLogo"src={glogo}/>
                  <div className="googleText">Login with Google</div>
                </button> : 
                <button className="googleBtn" onClick={this.logoutGoogleAuthentication.bind(this)}>
                  <img alt="googleLogo" className="googleLogo" src={glogo}/>
                  <div className="googleText">Logout from Google</div>
                </button>
              }
              </Popup>
            </div>
          </div>
        </div>
        <div className="Piano">
          <div className="Etc">
            {
              this.state.playMode ? 
              <button className="Mode" onClick={this.changeMode.bind(this)}>Go Drawing Mode</button> :
              <button className="Mode" onClick={this.changeMode.bind(this)}>Go Play Mode</button>
            }
            <Popup
              trigger={<img alt="helpIcon" className="Help" src={help}/>}
              position="bottom center"
              on="hover"
            >
              <div className="Description">
                🎵 연주/악보그리기 모드를<br/>&emsp;사용할 수 있습니다.<br/>
                🎵 악보그리기 모드에서는<br/>&emsp;단음만 기록이 가능합니다.<br/>
                🎵 소리가 나지 않을 땐<br/>&emsp;한/영키를 변환해 주세요.<br/>
              </div>
            </Popup>
          </div>
          <PianoKeyboard isLoggedIn={this.state.isLoggedIn} playMode={this.state.playMode} />
        </div>
      </div>
    );
  }
}
export default App;
