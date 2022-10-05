import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import MainTabNavigator from "./MainTabNavigator";
import NewCourseScreen from "../screens/NewCourseScreen";

const Stack = createStackNavigator();

function AppNavigation() {
  const isLoggedIn = useSelector((state) => !!state.user.value);

  const authScreens = {
    LogIn: WelcomeScreen,
  };
  const serviceScreens = {
    Main: MainTabNavigator,
    NewCourse: NewCourseScreen,
  };

  return (
    <Stack.Navigator headerMode="none">
      {Object.entries(isLoggedIn ? serviceScreens : authScreens)
        .map(([name, component]) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
    </Stack.Navigator>
  );
}

export default AppNavigation;
