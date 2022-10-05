import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import MainBottomTabNavigator from "./MainBottomTabNavigator";
import ExtraScreenNavigator from "./ExtraScreenNavigator";
import Header from "../components/shared/Header";

const Stack = createStackNavigator();

const RootStackNavigator = () => {
  function getHeader(route) {
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";

    switch (routeName) {
      case "Home":
      case "Calendar":
      case "My":
        return <Header logo={true} />;
      case "Diary":
        return <Header logo={false} />;
      case "Extra":
        return null;
    }
  }

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainBottomTabNavigator}
          options={({ route }) => ({
            header: () => getHeader(route),
          })}
        />
        <Stack.Screen
          name="Extra"
          component={ExtraScreenNavigator}
          options={({ route }) => ({
            header: () => getHeader(route),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default RootStackNavigator;
