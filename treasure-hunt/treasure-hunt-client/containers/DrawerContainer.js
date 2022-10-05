import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Image, StatusBar } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import { getLogoutUser } from '../actions';
import { COLOR, FONT } from '../constants';
import message from '../constants/message';

export default function Drawer(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.user.isLogin);
  const userInfo = useSelector(state => state.user.userInfo);
  const makeLoginAlert = () => alert(message.needLogin);
  const makeHomeNavigation = () => navigation.navigate('Hunt', { screen: 'Treasures' });
  const makeMyTreasuresNavigation = () => navigation.navigate('MyTreasures', { screen: 'MyTreasures' });
  const makeMyHuntingsNavigation = () => navigation.navigate('MyHuntings', { screen: 'MyHuntings' });
  const makeLogout = async() => {
    alert('Bye 👋');
    dispatch(getLogoutUser());
    await SecureStore.deleteItemAsync('userToken');
  };
  const makeLoginIcon = () => <Entypo size={30} name={'flower'} color={COLOR.BLUE} />;
  const makeHomeIcon = () => <AntDesign size={30} name={'home'} />;
  const makeMyTreasuresIcon = () => <MaterialCommunityIcons size={30} name={'treasure-chest'} />;
  const makeMyHuntingsIcon = () => <AntDesign size={30} name={'shoppingcart'} />;
  const makeLogoutIcon = () => <AntDesign size={30} name={'logout'} />;

  if(!isLogin) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Welcome :)"
          icon={makeLoginIcon}
          onPress={makeLoginAlert}
          labelStyle={styles.logout}
        />
      </DrawerContentScrollView>
    );
  } else  {
    return (
      <View style={styles.wrapper}>
        <View style={styles.userWrpper}>
          <Text style={styles.userText}>{userInfo.name}</Text>
          <Image source={{ uri: userInfo.picture }} style={styles.userPicture} />
        </View>
        <View style={styles.drawerWrapper}>
          <DrawerItem
            label="Home"
            icon={makeHomeIcon}
            onPress={makeHomeNavigation}
            labelStyle={styles.drawerText}
          />
          <DrawerItem
            label="My Treasures"
            icon={makeMyTreasuresIcon}
            onPress={makeMyTreasuresNavigation}
            labelStyle={styles.drawerText}
          />
          <DrawerItem
            label="My Huntings"
            icon={makeMyHuntingsIcon}
            onPress={makeMyHuntingsNavigation}
            labelStyle={styles.drawerText}
          />
          <DrawerItem
            label="Logout"
            icon={makeLogoutIcon}
            onPress={makeLogout}
            labelStyle={styles.drawerText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logout: {
    fontSize: 25,
    color: COLOR.BLUE,
    fontFamily: FONT.GAMJA,
  },
  wrapper: {
    flex: 1
  },
  userWrpper: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
    backgroundColor: COLOR.BLUE
  },
  userPicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userText: {
    fontSize: 30,
    color: COLOR.WHITE,
    fontFamily: FONT.GAMJA,
  },
  drawerWrapper: {
    flex: 8,
  },
  drawerText: {
    fontSize: 25,
    fontFamily: FONT.GAMJA,
  },
});
