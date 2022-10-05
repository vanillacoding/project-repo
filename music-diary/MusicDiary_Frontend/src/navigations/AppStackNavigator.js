import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";

import RootStackNavigator from "./RootStackNavigator";
import ModalScreenNavigator from "../navigations/ModalScreenNavigator";
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

const AppStackNavigator = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
      {userInfo?.id ? (
        <>
          <Stack.Screen name="Root" component={RootStackNavigator} />
          <Stack.Screen name="Modal" component={ModalScreenNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
