import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { caculateLocation } from '../utils';
import { COLOR } from '../constants';

export default function MarkedMap({ markedLocation }) {
  if (!markedLocation) {
    return (
      <View style={styles.dummyWrapper}>
        <MaterialCommunityIcons name="map-search-outline" style={styles.dummy} />
      </View>
    );
  } else {
    const {
      latitude, longitude, latitudeDelta, longitudeDelta
    } = caculateLocation(markedLocation.latitude, markedLocation.longitude, Dimensions.get('window'));

    return (
      <MapView
        style={styles.map}
        pinColor={COLOR.BLUE}
        initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
      >
        <MapView.Marker coordinate={{ latitude, longitude }} centerOffset={{ x: 0.5, y: 0.5 }} />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  dummyWrapper: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR.BLUE,
  },
  dummy: {
    flex: 1,
    margin: '16%',
    textAlign: 'center',
    fontSize: 60,
    color: COLOR.BLUE,
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
});

MarkedMap.propTypes = {
  markedLocation: PropTypes.object,
};
