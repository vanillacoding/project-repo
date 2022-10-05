import React from 'react';
import { Alert } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { initError } from '../features/userSlice';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailNavigator from '../navigations/DetailNavigator';
import MainNavigator from '../navigations/MainNavigator';

import Signin from '../screens/Signin';
import Signup from '../screens/Signup';

const AppStack = createStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(state => state.user.isSignedIn);
  const isError = useSelector(state => state.user.isError);
  const errorMessage = useSelector(state => state.user.errorMessage);

  if (isError) {
    Alert.alert(errorMessage);
    dispatch(initError());
  }

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        {isSignedIn ?
          <>
            <AppStack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                title: "홈"
              }}
            />
            <AppStack.Screen
              name="Details"
              component={DetailNavigator}
            />
          </>
          :
          <>
            <AppStack.Screen
              name="Sign in"
              component={Signin}
            />
            <AppStack.Screen
              name="Sign up"
              component={Signup}
            />
          </>
        }
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
