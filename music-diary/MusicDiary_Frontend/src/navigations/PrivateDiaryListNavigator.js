import React from "react";
import { StyleSheet } from "react-native";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import PrivateDiaryTopTabNavigator from "./PrivateDiaryTopTabNavigator";
import DiaryScreen from "../screens/DiaryScreen";
import NewTrackAddingModalScreen from "../screens/NewTrackAddingModalScreen";

const DiaryStack = createStackNavigator();

const PrivateDiaryListScreenNavigator = () => {
  const navigation = useNavigation();

  return (
    <DiaryStack.Navigator>
      <DiaryStack.Screen
        name="DiaryTopTap"
        component={PrivateDiaryTopTabNavigator}
        options={{ headerShown: false }}
      />
      <DiaryStack.Screen
        name="SingleDiary"
        component={DiaryScreen}
        options={({ route }) => ({
          headerTitle: null,
          headerLeft: (props) => (
            <HeaderBackButton
              style={styles.backBtn}
              tintColor="black"
              label=" "
              onPress={() =>
                navigation.navigate("DiaryTopTap", { screen: "PlayList" })
              }
            />
          ),
        })}
      />
      <DiaryStack.Screen
        name="addNewTrackModal"
        component={NewTrackAddingModalScreen}
        options={{ headerShown: false }}
      />
    </DiaryStack.Navigator>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    marginLeft: 5,
  },
});

export default PrivateDiaryListScreenNavigator;
