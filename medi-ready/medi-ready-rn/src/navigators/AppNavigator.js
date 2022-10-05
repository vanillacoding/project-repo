import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LIGHT_THEME } from "../theme/navigationTheme";
import { checkAuthentication } from "../redux/reducers/userSlice";

import MainNavigator from "./MainNavigator";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const isLoading = useSelector((state) => state.user.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthentication());
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={LIGHT_THEME}>
      <AppStack.Navigator>
        {userInfo ? (
          <AppStack.Screen
            name="MainNavigator"
            component={MainNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <AppStack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        )}
      </AppStack.Navigator>

      <StatusBar style="auto" />
    </NavigationContainer>
  );
};

export default AppNavigator;
