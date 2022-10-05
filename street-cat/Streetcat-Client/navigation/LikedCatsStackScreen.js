import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CatPageContainer from '../containers/CatPageContainer';
import LikedCatsScreen from '../screens/LikedCatsScreen';

const Stack = createStackNavigator();

const LikedCatsStackScreen = ({ user, fetchLikedcats }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LikedCat" options= {{ headerShown: false }}>
        {(props) => <LikedCatsScreen {...props} user={user} fetchLikedcats={fetchLikedcats} />} 
       </Stack.Screen>
       <Stack.Screen 
        name="LikedDetail" 
        component={CatPageContainer} 
        options= {{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default LikedCatsStackScreen;
