import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NAMES, STRINGS } from '../constants/index';

import BottomTapNavigator from './BottomTapNavigator';
import RegisterHabit from '../screens/RegisterHabit/RegisterHabit';

const Stack = createStackNavigator();

const UserScreenNavigator= () => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={STRINGS.NONE}>
        <Stack.Screen
          name={NAMES.BOTTOM_TAB_NAVIGATOR}
          component={BottomTapNavigator}
        />
        <Stack.Screen
          name={NAMES.REGISTER}
          component={RegisterHabit}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default UserScreenNavigator;
