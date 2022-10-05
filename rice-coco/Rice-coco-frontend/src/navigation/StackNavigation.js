import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import UserRegisterScreen from '../screens/UserRegisterScreen';
import MainMapScreen from '../screens/MainMapScreen';
import SearchScreen from '../screens/SearchScreen';
import RestaurantDetailsScreen from '../screens/RestaurantDetailsScreen';
import MatchWaitingScreen from '../screens/MatchWaitingScreen';
import MatchSuccessScreen from '../screens/MatchSuccessScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import AfterMeetingScreen from '../screens/AfterMeetingScreen';
import MyPageScreen from '../screens/MyPageScreen';
import EditUserInfoScreen from '../screens/EditUserInfoScreen';
import PreferredPartnerScreen from '../screens/PreferredPartnerScreen';
import PaymentScreen from '../screens/PaymentScreen';
import SCREEN from '../constants/screen';

const Home = createStackNavigator();

export const HomeStack = () => {
  return (
    <Home.Navigator initialRouteName={SCREEN.LOGIN} headerMode='none'>
      <Home.Screen name={SCREEN.LOGIN} component={LoginScreen} />
      <Home.Screen name={SCREEN.USER_REGISTER} component={UserRegisterScreen} />
      <Home.Screen name={SCREEN.PREFERRED_PARTNER} component={PreferredPartnerScreen} />
      <Home.Screen name={SCREEN.MAIN_MAP} component={MainMapScreen} />
      <Home.Screen name={SCREEN.SEARCH} component={SearchScreen} />
      <Home.Screen name={SCREEN.RESTAURANT_DETAILS} component={RestaurantDetailsScreen} />
      <Home.Screen name={SCREEN.MATCH_WAITING} component={MatchWaitingScreen} />
      <Home.Screen name={SCREEN.MATCH_SUCCESS} component={MatchSuccessScreen} />
      <Home.Screen name={SCREEN.CHAT_ROOM} component={ChatRoomScreen} />
      <Home.Screen name={SCREEN.AFTER_MEETING} component={AfterMeetingScreen} />
    </Home.Navigator>
  );
};

const MyPage = createStackNavigator();

export const MyPageStack = () => {
  return (
    <MyPage.Navigator headerMode='none'>
      <MyPage.Screen name={SCREEN.MY_PAGE} component={MyPageScreen} />
      <MyPage.Screen name={SCREEN.EDIT_USER_INFO} component={EditUserInfoScreen} />
      <MyPage.Screen name={SCREEN.PREFERRED_PARTNER} component={PreferredPartnerScreen} />
      <MyPage.Screen name={SCREEN.PAYMENT} component={PaymentScreen} />
    </MyPage.Navigator>
  );
};
