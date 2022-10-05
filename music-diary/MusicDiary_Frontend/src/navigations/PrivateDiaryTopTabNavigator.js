import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import DiaryByDateSearchScreen from "../screens/DiaryByDateSearchScreen";
import { SimpleLineIcons } from "@expo/vector-icons";

const DiaryTopTab = createMaterialTopTabNavigator();

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.tapOptions}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel;
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
          return (
            <TouchableOpacity
              isFocused={isFocused}
              onPress={onPress}
              key={`tab_${index}`}
            >
              <Text style={styles.labelText} isFocused={isFocused}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const DiaryTopTabNavigator = ({ navigation }) => {
  function handleOpenAddNewDiaryModal() {
    navigation.navigate("Modal", {
      screen: "addNewDiaryModal",
    });
  }

  return (
    <>
      <DiaryTopTab.Navigator
        initialRouteName="ByDate"
        tabBar={(props) => <TabBar {...props} />}
      >
        <DiaryTopTab.Screen
          name="ByDate"
          component={DiaryByDateSearchScreen}
          options={{ tabBarLabel: "MUSIC DIARY" }}
        />
      </DiaryTopTab.Navigator>

      <TouchableOpacity style={styles.btnWrap}>
        <SimpleLineIcons
          style={styles.plusBtn}
          onPress={handleOpenAddNewDiaryModal}
          name="plus"
          size={30}
          color="black"
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  labelText: {
    fontSize: 20,
    fontWeight: "600",
  },
  btnWrap: {
    height: 30,
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  plusBtn: {
    position: "absolute",
    bottom: 20,
    right: 25,
  },
});

export default DiaryTopTabNavigator;
