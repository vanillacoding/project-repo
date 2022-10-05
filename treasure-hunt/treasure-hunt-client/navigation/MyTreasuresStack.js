import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyTreasuresContainer from '../containers/MyPageContainer';
import MyTreasureDetailContainer from '../containers/MyPageDetailContainer';
import ShowPicturesScreen from '../screens/ShowPicturesScreen';
import { COLOR, FONT } from '../constants';

const MyTreasuresStack  = createStackNavigator();

export default function MyTreasures() {
  const headerOption = {
    headerTitle: 'My Treasures',
    headerTitleStyle: styles.headerTitle,
    headerTitleAlign: 'center',
  };

  return (
    <MyTreasuresStack.Navigator>
      <MyTreasuresStack.Screen
        name="MyTreasures"
        options={headerOption}
      >
        {props => <MyTreasuresContainer {...props} type={'treasure'} />}
      </MyTreasuresStack.Screen>
      <MyTreasuresStack.Screen
        name="MyTreasureDetail"
        options={headerOption}
      >
        {props => <MyTreasureDetailContainer {...props} type={'treasure'} />}
      </MyTreasuresStack.Screen>
      <MyTreasuresStack.Screen
        name="ShowPictures"
        options={{ headerShown: false }}
        component={ShowPicturesScreen}
      />
    </MyTreasuresStack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontFamily: FONT.PT_BOLD,
    fontSize: 30,
    color: COLOR.BLUE,
  }
});
