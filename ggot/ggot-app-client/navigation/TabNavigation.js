import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NewStack from './stacks/NewStack';
import HomeStack from './stacks/HomeStack';
import MyPageStack from './stacks/MyPageStack';

export default function TabNavigation() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'location-on';
          } else if (route.name === 'New') {
            iconName = 'add-circle-outline';
          } else  if (route.name === 'MyPage') {
            iconName = 'person-outline';
          }

          return <MaterialIcons name={iconName} size={size} color={color}/>;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#BF0436',
        inactiveTintColor: '#8D9AA6',
        tabStyle: {
          backgroundColor: '#F2F2F0'
        }
      }}
    >
      <Tab.Screen name='Home' component={HomeStack}/>
      <Tab.Screen name='New' component={NewStack}/>
      <Tab.Screen name='MyPage' component={MyPageStack}/>
    </Tab.Navigator>
  );
}
