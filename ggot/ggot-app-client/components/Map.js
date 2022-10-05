import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';

import { setUserLocation } from '../actions/index';

export default function Map({ isScrollEnabled }) {
  const dispatch = useDispatch();

  const userLocation = useSelector(state => state.user.coords);

  return (
    <View style={styles.contentWrapper}>
      {
        userLocation &&
        <MapView
          style={styles.mapStyle}
          maxZoomLevel={20}
          scrollEnabled={isScrollEnabled}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0,
            longitudeDelta: 0.009
          }}
          onPress={(e) => {
            dispatch(setUserLocation(e.nativeEvent.coordinate));
          }}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude
            }}
          />
        </MapView>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  mapStyle: {
    width: '100%',
    height: '100%'
  }
});
