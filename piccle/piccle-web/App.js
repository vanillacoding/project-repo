import React, { Component } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import MainScreen from './screens/MainScreen';
import CameraScreen from './screens/CameraScreen';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: ''
    };
  }

  _setUserInfo(userId, userName) {
    this.setState({
      userId,
      userName
    });
  }

  render() {
    const { userId, userName } = this.state;
    return (
      <AppContainer
        screenProps={{
          userId,
          userName,
          setUserInfo: this._setUserInfo.bind(this)
        }}
      />
    );
  }
}

const AppSwitchNavigator = createSwitchNavigator(
  {
    SplashScreen,
    LoginScreen,
    MainScreen,
    CameraScreen
  },
  {
    initialRouteName: 'SplashScreen'
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);
