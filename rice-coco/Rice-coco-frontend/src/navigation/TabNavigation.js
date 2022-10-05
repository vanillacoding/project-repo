import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { HomeStack, MyPageStack } from './StackNavigation';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'map-marker-alt';
    } else if (route.name === 'MyPage') {
      iconName = focused ? 'list-alt' : 'list-ul';
    } else if (route.name === 'Search') {
      iconName = focused ? 'search-location' : 'search';
    }

    return <Icon name={iconName} size={size} color={color} />;
  },
});

const tabBarOptions = {
  activeTintColor: '#ff914d',
  inactiveTintColor: 'gray',
  keyboardHidesTabBar: true,
};

export default TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
      <Tab.Screen name='Home' component={HomeStack} />
      <Tab.Screen name='Search' component={SearchScreen} />
      <Tab.Screen name='MyPage' component={MyPageStack} />
    </Tab.Navigator>
  );
};
