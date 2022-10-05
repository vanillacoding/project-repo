import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TabNavigator from "./TabNavigator";
import MatchCreateScreen from "../screens/MatchCreateScreen";
import MatchJoinScreen from "../screens/MatchJoinScreen";
import TeamCreateScreen from "../screens/TeamCreateScreen";
import ChatScreen from "../screens/ChatScreen";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

const Stack = createStackNavigator();

const headerOption = {
  headerStyle: {
    backgroundColor: colors.SECONDARY_BLUE,
    height: sizes.HEADER_HEIGHT,
  },
  headerTintColor: colors.PRIMARY_WHITE,
  hearderTintStyle: {
    fontSize: sizes.HEADER_FONT_SIZE,
  },
  hearderTitleStyle: {
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
  },
  headerTitleAlign: "center",
};

export default function MatchNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MatchJoin"
        component={MatchJoinScreen}
        options={{ ...headerOption, title: "경기 신청하기" }}
      />
      <Stack.Screen
        name="MatchCreate"
        component={MatchCreateScreen}
        options={{ ...headerOption, title: "경기 만들기" }}
      />
      <Stack.Screen
        name="TeamCreate"
        component={TeamCreateScreen}
        options={{ ...headerOption, title: "팀 만들기" }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ ...headerOption, title: "채팅" }}
      />
    </Stack.Navigator>
  );
}
