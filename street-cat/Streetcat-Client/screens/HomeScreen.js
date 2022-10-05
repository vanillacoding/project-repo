import React from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout, Circle } from 'react-native-maps';
import { COLOR, MARKER, CAT_MARKER } from '../constants';

const HomeScreen = ({ 
  location, 
  newLocation, 
  nearCat, 
  changeLocation, 
  navigation, 
  getClickedCatData,
  emptyComments,
}) => {
  const callOutClickHandler = (index) => {
    emptyComments();
    getClickedCatData(index);
    navigation.navigate('Detail', {
      index,
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        onPress={changeLocation}
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.011,
          longitudeDelta: 0.011,
        }}
      > 
        <Circle
          center = {{ latitude: newLocation.latitude, longitude: newLocation.longitude }}
          radius = {500}
          fillColor={COLOR.circle}
        />
        <Marker
          coordinate={{ latitude: newLocation.latitude, longitude: newLocation.longitude }}
        >
          <View style={styles.markerBox}>
            <Text style={styles.pinText}>현재위치</Text>
            <Image
              style={styles.image}
              source={{
                uri: MARKER
              }}
            />
          </View>
        </Marker>
        {nearCat.map((cat, i) => (
          <Marker
            key={cat._id + Math.random()}
            coordinate={{ 
              latitude: Number(cat.location[0]), 
              longitude: Number(cat.location[1]) 
            }}
          >
            <View style={styles.markerBox}>
              <Image
                style={styles.image}
                source={{
                  uri: CAT_MARKER
                }}
              />
            </View>
            <Callout onPress={() => callOutClickHandler(i)}>
              <Text>{cat.name}</Text>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: '100%',
  },
  markerBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  pinText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  image: {
    width: 40,
    height: 40,
  },
  callOut: {
    flex: -1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 10,
    shadowColor: "red",
    shadowOffset: {
	    width: 0,
	    height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
  },
});

export default HomeScreen;
