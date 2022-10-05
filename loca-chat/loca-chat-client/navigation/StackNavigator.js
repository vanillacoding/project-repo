import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from '../containers/HoemContainer';
import MapContainer from '../containers/MapContainer';
import ChatContainer from '../containers/ChatContainer';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MapContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="chat"
        component={ChatContainer}
        options={({ route }) => ({ title: route.params.chatTitle })}
      />
    </Stack.Navigator>
  );
}
