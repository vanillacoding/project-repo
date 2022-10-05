import React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import DiaryScreen from "../screens/DiaryScreen";

const ExtraStack = createStackNavigator();

const ExtraScreenNavigator = ({ navigation }) => {
  function getHeader(route, props) {
    const routeName = getFocusedRouteNameFromRoute(route);

    switch (routeName) {
      case "SingleDiary":
        return null;
    }
  }

  return (
    <>
      <ExtraStack.Navigator>
        <ExtraStack.Screen
          name="SingleDiary"
          component={DiaryScreen}
          options={({ route }) => ({
            headerTitle: (props) => getHeader(route, props),
            headerLeft: (props) => (
              <HeaderBackButton
                tintColor="pink"
                label=""
                onPress={() => navigation.popToTop()}
              />
            ),
          })}
        />
      </ExtraStack.Navigator>
    </>
  );
};

export default ExtraScreenNavigator;
