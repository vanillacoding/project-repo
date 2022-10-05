import React from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BottomTabNavigator from "./BottomTabNavigator";
import MorePageScreen from "../screens/MorePageScreen";
import DetailPinScreen from "../screens/DetailPinScreen";
import SettingScreen from "../screens/SettingScreen";
import { color } from "../config/globalStyles";

const Stack = createNativeStackNavigator();

export default function MainNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Bottom" component={BottomTabNavigator} />
      <Stack.Screen
        name="MyPage"
        options={{
          headerShown: true,
          title: "더보기",
          headerTitleStyle: styles.headerTitle,
        }}
        component={MorePageScreen} />
      <Stack.Screen
        name="DetailPin"
        options={{
          headerShown: true,
          title: "상세페이지",
          headerTitleStyle: styles.headerTitle,
        }}
        component={DetailPinScreen} />
      <Stack.Screen
        name="Setting"
        options={{
          headerShown: true,
          title: "설정페이지",
          headerTitleStyle: styles.headerTitle,
        }}
        component={SettingScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    color: color.poplaceDark,
    textAlign: "center",
    fontWeight: "700",
  },
});
