import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginContainer from '../containers/LoginContainer';
import AppTabs from './AppTabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import MyCatsStackScreen from './MyCatsStackScreen';
import LikedCatsStackScreen from './LikedCatsStackScreen';
import { COLOR } from '../constants'

const Stack = createStackNavigator();

const AppNavigator = ({ isLoggedIn, user, fetchMyCats, fetchLikedcats, proceedLogout }) => {
  const Drawer = createDrawerNavigator();

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Drawer.Navigator 
          drawerContent={(props) => 
            <DrawerContent 
              {...props} 
              name={user.name} 
              proceedLogout={proceedLogout}
            />
          }
          drawerContentOptions={{ 
            activeBackgroundColor: COLOR.main, 
            activeTintColor: COLOR.white,
          }}
        >
          <Drawer.Screen name="메인화면" component={AppTabs} />
          <Drawer.Screen name="내가찾은 냥이들">
            {(props) => <MyCatsStackScreen {...props} user={user} fetchMyCats={fetchMyCats}/>}  
          </Drawer.Screen>
          <Drawer.Screen name="내가 좋아한 냥이들">
            {(props) => <LikedCatsStackScreen {...props} user={user} fetchLikedcats={fetchLikedcats}/>} 
          </Drawer.Screen>
        </Drawer.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginContainer} options= {{ headerShown: false }}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
