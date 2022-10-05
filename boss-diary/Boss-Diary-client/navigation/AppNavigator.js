import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';

import LoadingScreen from '../screens/LoadingScreen';
import LoginScreen from '../screens/LoginScreen';
import MainTab from './MainTabNavigator';
import MyPage from './MyPageStackNavigator';
import RequestsScreen from '../screens/RequestsScreen';
import HeaderMenu from '../components/HeaderMenu';

const mainDrawer = createDrawerNavigator(
  {
    Main: {
      screen: MainTab,
      navigationOptions: {
        drawerLabel: '메인 페이지'
      }
    },
    Requests: {
      screen: createStackNavigator({
        Requests: {
          screen: RequestsScreen,
          navigationOptions: ({ navigation }) => ({
            headerTitle: '승인 요청',
            headerLeft: <HeaderMenu nav={navigation} name='ios-menu' />
          })
        }
      }),
      navigationOptions: {
        drawerLabel: '승인 요청'
      }
    },
    Settings: {
      screen: MyPage,
      navigationOptions: {
        drawerLabel: '나의 페이지'
      }
    },
  },
  {
    initialRouteName: 'Main'
  }
);

const AppNavigator = createSwitchNavigator(
  {
    Loading: {
      screen: LoadingScreen
    },
    Login: {
      screen: LoginScreen
    },
    App: {
      screen: mainDrawer
    }
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(AppNavigator);
