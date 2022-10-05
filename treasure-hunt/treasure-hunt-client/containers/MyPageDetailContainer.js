import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import TreasureDetail from '../components/TreasureDetail';
import PropTypes from 'prop-types';
import { deleteSelectedTreasure } from '../utils/api';
import { FONT, COLOR } from '../constants';
import message from '../constants/message';

const screen = Dimensions.get('window');
const margin = screen.width * 0.02;

export default function MyPageDetailContainer({ navigation, type }) {
  const selectedTreasure = useSelector(state => state.treasures.selectedTreasure);
  const { _id, is_hunting } = selectedTreasure;
  const taken = is_hunting ? `${selectedTreasure.taken_by.name} 🥳` : '.... 🥺';
  const isMyTreasures = type === 'treasure';
  const onDelete = async() => {
    try {
      const currentToken = await SecureStore.getItemAsync('userToken');
      await deleteSelectedTreasure(_id, currentToken);
      alert(message.success);
      navigation.goBack();
    } catch(err) {
      if (err.response) alert(err.response.data.errMessage);
    }
  };

  return (
    <View style={styles.wrapper}>
      <TreasureDetail selectedTreasure={selectedTreasure} navigation={navigation} />
      <View style={styles.footWrapper}>
        {isMyTreasures && <View style={styles.deleteWrapper}>
          <TouchableOpacity
            style={styles.delete}
            onPress={onDelete}
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>}
        <View style={styles.takenWrapper}>
          <Text style={styles.takenText}>
            Taken: {taken}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLOR.WHITE,
  },
  footWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: margin,
  },
  deleteWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: margin,
    borderRadius: 10,
    backgroundColor: COLOR.BLUE,
  },
  takenWrapper: {
    flex: 2.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 40,
    color: COLOR.WHITE,
    fontFamily: FONT.PT_BOLD,
  },
  takenText: {
    fontSize: 40,
    color: COLOR.BLUE,
    fontFamily: FONT.PT_BOLD,
  }
});

MyPageDetailContainer.propTypes = {
  type: PropTypes.string.isRequired,
};
