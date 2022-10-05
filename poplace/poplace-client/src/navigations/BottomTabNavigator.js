import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import MyPageScreen from "../screens/MyPageScreen";
import NewPinScreen from "../screens/NewPinScreen";
import { color, horizontalScale, moderateScale, verticalScale } from "../config/globalStyles";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: [
          styles.tabBar,
          null
        ],
        headerShown: false,
        tabBarShowLabel: false,
      }}
      options={{
        headerMode: "none",
        navigationOptions: {
          headerVisible: false,
        }
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Ionicons name="home-outline" size={28} color={color.poplaceRed} />,
        }}
      />
      <Tab.Screen
        name="NewPinScreen"
        component={NewPinScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => <AntDesign name="plus" size={28} color={color.poplaceRed} />,
          title: "핀 생성하기",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
        }}
      />
      <Tab.Screen
        name="MyPageScreen"
        component={MyPageScreen}
        options={{
          headerShown: true,
          tabBarIcon: () => <Ionicons name="person-outline" size={28} color={color.poplaceRed} />,
          title: "마이페이지",
          headerTitleAlign: "center",
          headerTitleStyle: styles.headerTitle,
          headerRight: () => (
            <TouchableOpacity
              style={styles.settingContainer}
              activeOpacity={1}
              onPress={() => navigation.navigate("Setting")}>
              <Ionicons name="settings-sharp" size={26} color={color.poplaceLight} />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flex: 1,
    backgroundColor: color.poplaceWhite,
    position: "absolute",
    bottom: "3%",
    marginHorizontal: horizontalScale(40),
    height: verticalScale(60),
    borderRadius: moderateScale(100),
  },
  settingContainer: {
    flex: 1,
    justifyContent: "center",
    right: "10%",
  },
  headerTitle: {
    color: color.poplaceDark,
    textAlign: "center",
    fontWeight: "700",
  },
  completionButton: {
    fontSize: 20,
    color: color.poplaceErrorRed,
  }
});
