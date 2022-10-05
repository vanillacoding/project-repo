import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import PropTypes from "prop-types";

import * as sizes from "../constants/sizes";
import * as fonts from "../constants/fonts";

export default function PlaceMap({
  width,
  height,
  origin,
  location = {},
  places = [],
  onPlacePress,
}) {
  const filterdPlaces = places.filter((place) => {
    return (
      place.province === location.province
      && place.city === location.city
      && place.district === location.district
    );
  });

  const markers = filterdPlaces.map((place) => {
    const { name, id } = place;
    const { latitude, longitude } = place;
    const { city, district, town, detail } = place;
    const { contact } = place;

    return (
      <Marker
        key={id}
        coordinate={{
          latitude,
          longitude,
        }}
        onPress={() => onPlacePress(place)}
        onCalloutPress={() => onPlacePress(place)}
      >
        <Callout tootip>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.address}>{`${city} ${district} ${town} ${detail}`}</Text>
            <Text style={styles.contact}>{contact}</Text>
          </View>
        </Callout>
      </Marker>
    );
  });

  return (
    <MapView
      style={{ width, height }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: origin.latitude,
        longitude: origin.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      <Marker
        coordinate={{
          latitude: origin.latitude,
          longitude: origin.longitude,
        }}
        pinColor={"blue"}
      />
      {markers}
    </MapView>
  );
}

PlaceMap.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  origin: PropTypes.object.isRequired,
  location: PropTypes.object,
  places: PropTypes.array,
  onPlacePress: PropTypes.func,
};

const styles = StyleSheet.create({
  name: {
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  address: {
    fontSize: sizes.QUINARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  contact: {
    fontSize: sizes.QUINARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});
