import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { BOTTOM_TAB_ICON, BOTTOM_TAB_ICON_COLOR } from "../../../constants";
import styles from "./styles";

function BottomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.bottomTabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let label;

        if (options.tabBarLable) {
          label = options.tabBarLable;
          return;
        } else if (options.title) {
          label = options.title;
          return;
        } else {
          label = route.name;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}
          >
            <SimpleLineIcons
              name={BOTTOM_TAB_ICON[label]}
              size={20}
              color={
                isFocused
                  ? BOTTOM_TAB_ICON_COLOR.Focused
                  : BOTTOM_TAB_ICON_COLOR.Default
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default BottomTabBar;
