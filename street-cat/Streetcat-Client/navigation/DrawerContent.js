import React from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Profile from '../components/Profile';
import LogOutButton from '../components/LogOutButton'

const DrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Profile name={props.name}/>
      <LogOutButton proceedLogout={props.proceedLogout}/>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
