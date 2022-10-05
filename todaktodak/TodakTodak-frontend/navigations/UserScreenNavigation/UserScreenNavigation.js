import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigation from "../BottomTabNavigation/BottomTabNavigation";

import Answer from "../../screens/Answer/Answer";
import ChatRoom from "../../screens/ChatRoom/ChatRoom";
import Comments from "../../screens/Comments/Comments";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import DetailPost from "../../screens/DetailPost/DetailPost";
import WriteComment from "../../screens/WriteComment/WriteComment";

import {
  ANSWER,
  COMMENTS,
  CHAT_ROOM,
  WRITE_WORRY,
  DETAIL_POST,
  WRITE_COMMENT,
  BOTTOM_TAB_NAVIGATION
} from "../../constants/navigationName";

const Stack = createStackNavigator();

const UserScreenNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name={BOTTOM_TAB_NAVIGATION} component={BottomTabNavigation} />
        <Stack.Screen name={ANSWER} component={Answer} />
        <Stack.Screen name={COMMENTS} component={Comments} />
        <Stack.Screen name={CHAT_ROOM} component={ChatRoom} />
        <Stack.Screen name={WRITE_WORRY} component={WriteWorry} />
        <Stack.Screen name={DETAIL_POST} component={DetailPost} />
        <Stack.Screen name={WRITE_COMMENT} component={WriteComment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserScreenNavigation;
