import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../../screens/Home';
import PhotoMap from '../../screens/PhotoMap';

const HomeStack = createStackNavigator();

export default function HomeStackNavigation() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='Home'
        component={Home}
        options={{
          headerTitle: () => (
            <View style={{ alignItems: 'center', flex: 1, height: '100%'}}>
              <Text style={{ color: '#474F59' }}>
                내 주변 꽂
              </Text>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#F2F2F0',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <HomeStack.Screen
        name='PhotoMap'
        component={PhotoMap}
      />
    </HomeStack.Navigator>
  );
}
