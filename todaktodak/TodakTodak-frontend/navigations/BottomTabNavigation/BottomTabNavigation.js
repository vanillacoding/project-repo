import React from "react";
import { StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import Friends from "../../screens/Friends/Friends";
import WriteWorry from "../../screens/WriteWorry/WriteWorry";
import UserInfoRoom from "../../screens/UserInfoRoom/UserInfoRoom";
import MyPostStorage from "../../screens/MyPostStorage/MyPostStorage";
import CounselingCenter from "../../screens/CounselingCenter/CounselingCenter";

import {
  FRIENDS,
  WRITE_WORRY,
  FRIENDS_LABEL,
  USER_INFO_ROOM,
  MY_POST_STORAGE,
  WRITE_WORRYLABEL,
  COUNSELING_CENTER,
  USER_INFO_ROOMLABEL,
  MY_POST_STORAGELABEL,
  COUNSELING_CENTERLABEL
} from "../../constants/navigationName";
import {
  BLACK,
  BOTTOM_TAB_NAVIGATION_ACTIVE_COLOR
} from "../../constants/color";

import love from "../../assets/pngs/love.png";
import letter from "../../assets/pngs/letter.png";
import friends from "../../assets/pngs/friends.png";
import feather from "../../assets/pngs/feather.png";

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      initialRouteName={MY_POST_STORAGE}
      tabBarOptions={{
        activeTintColor: BOTTOM_TAB_NAVIGATION_ACTIVE_COLOR
      }}
    >
      <Tab.Screen
        name={MY_POST_STORAGE}
        component={MyPostStorage}
        options={{
          tabBarLabel: MY_POST_STORAGELABEL,
          tabBarIcon: () => (
            <Image source={letter} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={FRIENDS}
        component={Friends}
        options={{
          tabBarLabel: FRIENDS_LABEL,
          tabBarIcon: () => (
            <Image source={friends} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={COUNSELING_CENTER}
        component={CounselingCenter}
        options={{
          tabBarLabel: COUNSELING_CENTERLABEL,
          tabBarIcon: () => (
            <Image source={love} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={WRITE_WORRY}
        component={WriteWorry}
        initialParams={{ postInfo: {} }}
        options={{
          tabBarLabel: WRITE_WORRYLABEL,
          tabBarIcon: () => (
            <Image source={feather} style={styles.imageStyle} />
          )
        }}
      />
      <Tab.Screen
        name={USER_INFO_ROOM}
        component={UserInfoRoom}
        options={{
          tabBarLabel: USER_INFO_ROOMLABEL,
          tabBarIcon: () => (
            <AntDesign
              size={24}
              name="setting"
              color={BLACK}
            />
          )
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 25,
    height: 25
  }
});

export default BottomTabNavigation;
