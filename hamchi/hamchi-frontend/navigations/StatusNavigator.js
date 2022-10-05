import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MySubmissions from '../screens/MySubmissions';
import MyPosts from '../screens/MyPosts';
import colors from '../theme/color';

const StatusStack = createMaterialTopTabNavigator();

export default function DetailNavigator() {
  return (
    <StatusStack.Navigator
      tabBarOptions={{
        style: {
          paddingTop: 20,
        },
        labelStyle: {
          fontSize: 16,
          fontWeight: 'bold'
        },
        indicatorStyle: {
          backgroundColor: colors.message,
        }
      }}
    >
      <StatusStack.Screen
        name="내 분양글"
        component={MyPosts}
      />
      <StatusStack.Screen
        name="내 신청서"
        component={MySubmissions}
      />
    </StatusStack.Navigator>
  );
}
