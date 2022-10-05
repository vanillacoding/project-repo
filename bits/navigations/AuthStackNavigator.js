import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NAMES, STRINGS } from '../constants/index';

import Login from '../screens/Login/Login';
import Signup from '../screens/Signup/Signup';

const Stack = createStackNavigator();

const AutchStackNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={STRINGS.NONE}>
        <Stack.Screen
          name={NAMES.LOGIN}
          component={Login}
        />
        <Stack.Screen
          name={NAMES.SIGNUP}
          component={Signup}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AutchStackNavigator;
