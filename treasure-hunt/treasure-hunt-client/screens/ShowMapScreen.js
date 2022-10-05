import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLOR } from '../constants';

export default function ShowMapScreen({ navigation, route }) {
  const [markedLocation, setMarkedLocation] = useState(route.params.location);
  const { latitude, longitude, latitudeDelta, longitudeDelta } = route.params.location;

  const onGetMarkedLocation = async() => {
    navigation.navigate('InputDetail', { markedLocation });
  };

  const onDragEnd = async(ev) => {
    setMarkedLocation(ev.nativeEvent.coordinate);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
        showsUserLocation={true}
        minZoomLevel={4}
      >
        <MapView.Marker
          draggable
          title={'Your treasure Here!'}
          pinColor={COLOR.BLUE}
          coordinate={{ latitude, longitude }}
          onDragEnd={onDragEnd}
        />
      </MapView>
      <TouchableOpacity
        onPress={onGetMarkedLocation}
        style={styles.buttonContainer}>
        <FontAwesome5
          name="stamp"
          style={styles.button}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
  },
  button: {
    color: COLOR.BLUE,
    fontSize: 50
  }
});
