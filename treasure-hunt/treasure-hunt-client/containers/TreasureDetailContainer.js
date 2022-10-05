import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import TreasureDetail from '../components/TreasureDetail';
import { updateSelectedTreasure } from '../utils/api';
import { FONT, COLOR } from '../constants';
import message from '../constants/message';

export default function TreasureDetailContainer({ navigation }) {
  const selectedTreasure = useSelector(state => state.treasures.selectedTreasure);
  const { _id } = selectedTreasure;
  const onHunting = async() => {
    try {
      const currentToken = await SecureStore.getItemAsync('userToken');
      await updateSelectedTreasure(_id, currentToken);
      alert(message.success);
      navigation.navigate('Hunt', { screen: 'Treasures' });
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TreasureDetail selectedTreasure={selectedTreasure} navigation={navigation} />
      <View style={styles.completeWrapper}>
        <TouchableOpacity onPress={onHunting}>
          <Text style={styles.completeText} >
            Hunting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  completeWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.BLUE,
  },
  completeText: {
    fontSize: 45,
    color: COLOR.WHITE,
    fontFamily: FONT.PT_BOLD,
  }
});
