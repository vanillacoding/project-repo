import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import MusicTabBar from "../containers/MusicTabBarContainer";
import HomeScreen from "../screens/HomeScreen";
import PrivateDiaryListNavigator from "./PrivateDiaryListNavigator";
import UserInfoScreen from "../screens/UserInfoScreen";
import TotalDiaryInfoScreen from "../screens/TotalDiaryInfoScreen";

const MainBottomTab = createBottomTabNavigator();

const MainBottomTabNavigator = () => {
  return (
    <MainBottomTab.Navigator
      backBehavior="initialRoute"
      tabBar={(props) => <MusicTabBar {...props} />}
    >
      <MainBottomTab.Screen name="Home" component={HomeScreen} />
      <MainBottomTab.Screen
        name="Diary"
        component={PrivateDiaryListNavigator}
      />
      <MainBottomTab.Screen name="Calendar" component={TotalDiaryInfoScreen} />
      <MainBottomTab.Screen name="My" component={UserInfoScreen} />
    </MainBottomTab.Navigator>
  );
};

export default MainBottomTabNavigator;
