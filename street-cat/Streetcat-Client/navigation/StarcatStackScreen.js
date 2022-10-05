import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StarcatContainer from '../containers/StarcatsContainer';
import CatPageContainer from '../containers/CatPageContainer';
const Starstack = createStackNavigator();

const StacatStackScreen = () => {
  return (
    <Starstack.Navigator>
      <Starstack.Screen 
        name="Starcat" 
        component={StarcatContainer} 
        options= {{ headerShown: false }} 
      />
      <Starstack.Screen 
        name="StarDetail" 
        component={CatPageContainer} 
        options= {{ headerShown: false }}
      />
    </Starstack.Navigator>
  );
};

export default StacatStackScreen;
