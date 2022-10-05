import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import TreasuresContainer from '../containers/TreasuresContainer';
import TreasureDetailContainer from '../containers/TreasureDetailContainer';
import ShowPicturesScreen from '../screens/ShowPicturesScreen';
import { COLOR, FONT } from '../constants';

const HuntStack = createStackNavigator();

export default function Hunt() {
  const makeOption = (title, navigation) => {
    return {
      headerTitle: title,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Hide', { screen: 'SelectCategory' })}
        >
          <Text style={styles.headerRight}>Hiding</Text>
        </TouchableOpacity>
      ),
      headerTitleStyle: styles.headerTitle,
      headerTitleAlign: 'center',
    };
  };

  return (
    <HuntStack.Navigator>
      <HuntStack.Screen
        name="Treasures"
        component={TreasuresContainer}
        options={({ navigation }) => makeOption('Happy Hunting 👀', navigation)}
      />
      <HuntStack.Screen
        name="TreasureDetail"
        component={TreasureDetailContainer}
        options={({ navigation }) => makeOption('Your Treasure 💰', navigation)}
      />
      <HuntStack.Screen
        name="ShowPictures"
        component={ShowPicturesScreen}
        options={{ headerShown: false }}
      />
    </HuntStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 10,
    color: COLOR.GREY,
    fontFamily: FONT.PT_REGUL,
  },
  headerTitle: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 30,
    color: COLOR.BLUE,
  }
});
