import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HuntStack from '../navigation/HuntStack';
import HideStack from '../navigation/HideStack';

const RootStack = createStackNavigator();

export default function Root() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Hunt" component={HuntStack} options={{ headerShown: false }} />
      <RootStack.Screen name="Hide" component={HideStack} options={{ headerShown: false }} />
    </RootStack.Navigator>
  );
}
