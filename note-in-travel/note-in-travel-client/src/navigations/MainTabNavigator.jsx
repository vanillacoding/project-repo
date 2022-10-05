import React, { useCallback, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import UserScreen from "../screens/UserScreen";
import CourseDetailScreen from "../screens/CourseDetailScreen";

import useModal from "../hooks/useModal";

const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const [isActiveMode, setIsActiveMode] = useState(false);
  const { isModalOpen, openModal, closeModal } = useModal(false);
  const setActiveModeOffMemo = useCallback(setActiveModeOff, [setIsActiveMode]);

  function toggleMode() {
    setIsActiveMode((prev) => !prev);
  }

  function setActiveModeOff() {
    setIsActiveMode(false);
  }

  return (
    <Tab.Navigator
      backBehavior="initialRoute"
      tabBar={(props) => (
        <TabBar
          {...props}
          isActiveMode={isActiveMode}
          onActiveButtonPress={openModal}
          onActiveButtonLongPress={toggleMode}
        />
      )}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User" component={UserScreen} />
      <Tab.Screen name="CourseDetail">
        {(props) => (
          <CourseDetailScreen
            {...props}
            isActiveMode={isActiveMode}
            isMessageFormOpen={isModalOpen}
            onMessageFormClose={closeModal}
            onMessageSubmit={closeModal}
            onBlur={setActiveModeOffMemo}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default MainTabNavigator;
