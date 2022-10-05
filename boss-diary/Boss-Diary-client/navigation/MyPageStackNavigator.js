import React from 'react';
import { createStackNavigator } from 'react-navigation';
import MyPageScreen from '../screens/MyPageScreen';
import SettingScreen from '../screens/SettingScreen';
import HeaderMenu from '../components/HeaderMenu';

export default MyPageStack = createStackNavigator(
  {
    MyPage: {
      screen: MyPageScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: '활동 내역',
        headerBackTitle: ' ',
        headerLeft: <HeaderMenu nav={navigation} name='ios-menu' />,
        headerRight: <HeaderMenu nav={navigation} name='ios-settings' dir={'right'} screen={'Setting'} />,
      })
    },
    Setting: {
      screen: SettingScreen
    }
  },
  {
    initialRouteName: 'MyPage'
  }
);
