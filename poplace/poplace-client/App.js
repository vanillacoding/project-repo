import React from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import "./src/config/api";
import AppNavigator from "./src/navigations/AppNavigator";
import { store } from "./src/features/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="AppNavigator" component={AppNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
