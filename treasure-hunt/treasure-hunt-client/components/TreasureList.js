import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { makeExpirationToString, makeCountryFlag } from '../utils';
import { COLOR, FONT } from '../constants';

const { width } = Dimensions.get('window');
const margin = width * 0.01;
const padding = width * 0.01;

export default function TreasureList({ name, country, expiration, id, is_hunting, page, navigation, onCountry, onTreasure }) {
  const expirationDate = makeExpirationToString(expiration);
  const isMyPage = page !== 'generalPage';
  const isHuntPage = page === 'hunting';
  const onCountryPress = async() => await onCountry(country);
  const onNamePress = async() => {
    await onTreasure(id);
    if(!isMyPage) return navigation.navigate('TreasureDetail');
    if(isHuntPage) return navigation.navigate('MyHuntingDetail');
    return navigation.navigate('MyTreasureDetail');
  };

  return (
    <View style={styles.topWrapper}>
      <View style={styles.rowWrapper}>
        <View style={styles.flagWrapper}>
          <Image
            style={{ width: 45, height: 45 }}
            source={{ uri: makeCountryFlag(country) }}
          />
        </View>
        <View style={styles.contryWrapper}>
          {isMyPage ? (
            <View>
              <Text style={styles.text}>{country}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={onCountryPress}>
              <Text style={styles.text}>{country}</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.nameWrapper}>
          <TouchableOpacity onPress={onNamePress}>
            <Text style={styles.text}>{name}</Text>
          </TouchableOpacity>
        </View>
        {isMyPage && <View style={styles.pageWrapper}>
          {is_hunting
            ? <MaterialCommunityIcons size={30} name={'treasure-chest'} />
            : <AntDesign size={30} name={'shoppingcart'} />}
        </View>}
        <View style={styles.expirationWrapper}>
          <Text style={styles.text}>{expirationDate}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin,
    backgroundColor: '#fff',
  },
  rowWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding,
    borderBottomWidth: 0.8,
    borderBottomColor: COLOR.BLUE,
  },
  flagWrapper: {
    flex: 0.6,
  },
  contryWrapper: {
    flex: 1,
    textAlign: 'center',
  },
  nameWrapper: {
    flex: 2,
  },
  expirationWrapper: {
    flex: 1.1,
  },
  pageWrapper: {
    flex: 0.5,
  },
  text: {
    fontSize: 20,
    fontFamily: FONT.GAMJA,
  }
});

TreasureList.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  expiration: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  is_hunting: PropTypes.bool,
  page: PropTypes.string.isRequired,
  onCountry: PropTypes.func,
  onTreasure: PropTypes.func,
};
