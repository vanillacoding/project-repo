import React from 'react';
import { useSelector } from 'react-redux';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DrawerContainer from './DrawerContainer';
import RootStack from '../navigation/RootStack';
import MyTreasuresStack from '../navigation/MyTreasuresStack';
import MyHuntingsStack from '../navigation/MyHuntingsStack';
import LoginContainer from '../containers/LoginContainer';

const Drawer = createDrawerNavigator();

export default function AppContainer() {
  const isLogin = useSelector(state => state.user.isLogin);

  if(!isLogin) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerContainer {...props} />}
        >
          <Drawer.Screen name="Login" component={LoginContainer} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <DrawerContainer {...props} />}
        >
          <Drawer.Screen name="Home" component={RootStack} />
          <Drawer.Screen name="MyTreasures" component={MyTreasuresStack} />
          <Drawer.Screen name="MyHuntings" component={MyHuntingsStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }
}
