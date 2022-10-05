import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyPage from '../screens/MyPage';

const MyPageStack = createStackNavigator();

export default function MyPageNavigator() {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Screen
        name="내 정보"
        component={MyPage}
      />
    </MyPageStack.Navigator>
  );
}
