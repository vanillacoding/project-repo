import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NewDiaryAddingModalScreen from "../screens/NewDiaryAddingModalScreen";

const ModalStack = createStackNavigator();

const ModalScreenNavigator = () => {
  return (
    <>
      <ModalStack.Navigator
        mode="modal"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: "transparent" },
          cardOverlayEnabled: true,
          cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 0.5, 0.9, 1],
                outputRange: [0, 0.25, 0.7, 1],
              }),
            },
            overlayStyle: {
              opacity: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.5],
                extrapolate: "clamp",
              }),
            },
          }),
        }}
      >
        <ModalStack.Screen
          name="addNewDiaryModal"
          component={NewDiaryAddingModalScreen}
          options={{ headerShown: false }}
        />
      </ModalStack.Navigator>
    </>
  );
};

export default ModalScreenNavigator;
