import React, { Fragment } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from '../constants';

export default function Pictures({ uriList, style, isInput }) {
  const count = 3 - uriList.length;
  const dummy = [1, 2, 3].slice(0, count);

  return (
    <Fragment>
      {uriList.map((uri, index) => {
        return (
          <Image
            key={index}
            style={style}
            source={{ uri }}
          />
        );
      })}
      {isInput && dummy.map((number) => {
        return (
          <View key={number} style={styles.dummyWrapper}>
            <Ionicons
              name="md-images"
              style={styles.dummy}
            />
          </View>
        );
      })}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  dummyWrapper: {
    flex: 1,
    justifyContent: 'center',
    margin: 3,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
  },
  dummy: {
    textAlign: 'center',
    fontSize: 60,
    color: COLOR.BLUE
  },
});

Pictures.propTypes = {
  uriList: PropTypes.array.isRequired,
  style: PropTypes.object.isRequired,
  isInput: PropTypes.bool.isRequired,
};
