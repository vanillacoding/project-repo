import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './src/components/Main/Main';
import Timer from './src/components/Timer/Timer';
import Setting from './src/components/Setting/Setting';
import CopyrightNotice from './src/components/CopyrightNotice/CopyrightNotice';
import StatsList from './src/components/StatsList/StatsList';
import StatsPerTag from './src/components/StatsPerTag/StatsPerTag';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode='none'
      >
        <Stack.Screen
          name='Main'
          component={Main}
        />
        <Stack.Screen
          name='Timer'
          component={Timer}
        />
        <Stack.Screen
          name='Setting'
          component={Setting}
        />
        <Stack.Screen
          name='CopyrightNotice'
          component={CopyrightNotice}
        />
        <Stack.Screen
          name='StatsList'
          component={StatsList}
        />
        <Stack.Screen
          name='StatsPerTag'
          component={StatsPerTag}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
