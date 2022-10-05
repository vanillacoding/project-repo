import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Intro from "../../screens/Intro/Intro";
import Login from "../../screens/Login/Login";
import Signup from "../../screens/Signup/Signup";

import {
  INTRO,
  LOGIN,
  SIGNUP
} from "../../constants/navigationName";

const Stack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={INTRO} headerMode="none">
        <Stack.Screen name={INTRO} component={Intro} />
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={SIGNUP} component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStackNavigation;
