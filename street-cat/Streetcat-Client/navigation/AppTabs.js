import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './HomeStackScreen';
import { Ionicons } from '@expo/vector-icons';
import starcatStackScreen from './StarcatStackScreen';

const Tabs = createBottomTabNavigator();

const AppTabs = () => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = 'md-home';
          } else {
            iconName = 'md-star';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="Home" component={HomeStackScreen} />
      <Tabs.Screen name="Starcats" component={starcatStackScreen} />
    </Tabs.Navigator>
  );
};

export default AppTabs;
