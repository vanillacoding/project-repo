import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyCatsScreen from '../screens/MyCatsScreen';
import CatPageContainer from '../containers/CatPageContainer';

const Stack = createStackNavigator();

const MyCatsStackScreen = ({ user, fetchMyCats }) => {
  return (
    <Stack.Navigator>
       <Stack.Screen name="Mycat" options= {{ headerShown: false }}>
        {(props) => <MyCatsScreen {...props} user={user} fetchMyCats={fetchMyCats} />} 
       </Stack.Screen>
       <Stack.Screen 
        name="myCatDetail" 
        component={CatPageContainer} 
        options= {{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default MyCatsStackScreen;
