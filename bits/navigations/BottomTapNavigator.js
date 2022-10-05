import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { pickTabIconByName } from '../utils/pickTabIconByName';
import { COLORS, NAMES } from '../constants/index';

import Home from '../screens/Home/Home';
import LiveFeed from '../screens/Live/LiveFeed';
import SearchMate from '../screens/Search/SearchMate';
import MyProfile from '../screens/Profile/MyProfile';

const Tab = createBottomTabNavigator();

const BottomTapNavigator = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ _, color, size }) => {
          return pickTabIconByName(route.name, color, size);
        }
      })}

      tabBarOptions={{
        activeTintColor: COLORS.BOTTOM_TAB_ACTIVE,
        inactiveTintColor: COLORS.GRAY,
        inactiveBackgroundColor: COLORS.BOTTOM_TAB_BACKGROUND,
        activeBackgroundColor: COLORS.BOTTOM_TAB_BACKGROUND
      }}
    >
      <Tab.Screen
        name={NAMES.HABIT}
        component={Home}
      />
      <Tab.Screen
        name={NAMES.LIVE}
        component={LiveFeed}
      />
      <Tab.Screen
        name={NAMES.SEARCH}
        component={SearchMate}
      />
      <Tab.Screen
        name={NAMES.MYPROFILE}
        component={MyProfile}
      />
    </Tab.Navigator>
  );
};

export default BottomTapNavigator;
