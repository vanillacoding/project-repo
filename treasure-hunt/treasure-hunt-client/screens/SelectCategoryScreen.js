import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Entypo, Ionicons, MaterialCommunityIcons, Foundation, FontAwesome5 } from '@expo/vector-icons';
import { COLOR, FONT } from '../constants';

const screen = Dimensions.get('window');
const imageWidth = (screen.width / 2) * 0.85;
const imageHight = (screen.height / 3) * 0.7;
const margin = imageWidth * 0.01;

export default function SelectCategoryScreen({ navigation }) {
  const onSelectCategory = (category) => {
    navigation.navigate('InputDetail', { category });
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => onSelectCategory('usim')}>
          <View style={styles.iconWrapper}>
            <Entypo name="creative-commons-share" style={styles.icons} />
            <Text style={styles.text}>유심</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => onSelectCategory('transportation')}>
          <View style={styles.iconWrapper}>
            <Ionicons name="md-train" style={styles.icons} />
            <Text style={styles.text}>교통</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => onSelectCategory('show')}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="music-circle-outline" style={styles.icons} />
            <Text style={styles.text}>영화/공연</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => onSelectCategory('ticket')}>
          <View style={styles.iconWrapper}>
            <Foundation name="ticket" style={styles.icons} />
            <Text style={styles.text}>입장권</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => onSelectCategory('coupon')}>
          <View style={styles.iconWrapper}>
            <FontAwesome5 name="money-check-alt" style={styles.icons} />
            <Text style={styles.text}>쿠폰</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => onSelectCategory('etc')}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons name="dots-horizontal-circle" style={styles.icons} />
            <Text style={styles.text}>기타</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: imageWidth,
    height: imageHight,
    margin,
  },
  iconWrapper: {
    alignItems: 'center',
  },
  icons: {
    color: COLOR.BLUE,
    fontSize: 50,
  },
  text: {
    width: 120,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 27,
    color: COLOR.WHITE,
    fontFamily: FONT.GAMJA,
    backgroundColor: COLOR.BLUE
  }
});
