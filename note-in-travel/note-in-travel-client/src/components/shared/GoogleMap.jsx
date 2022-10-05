import React from "react";
import { Image, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import IndexMarker from "./IndexMarker";
import MessageMarker from "./MessageMarker";

import character from "../../../assets/backpack.png";

function GoogleMap({
  region,
  zoomEnabled,
  scrollEnabled,
  segments = [],
  onSegmentPress,
  schedules = [],
  myLocation,
  messages = [],
  style,
}) {
  return (
    <MapView
      style={[styles.map, style]}
      provider={PROVIDER_GOOGLE}
      region={region}
      zoomEnabled={zoomEnabled}
      scrollEnabled={scrollEnabled}
    >
      {segments.map((segment) => (
        <IndexMarker
          key={segment[0]._id}
          coordinate={segment[0].region}
          index={segment.length}
          onPress={() => onSegmentPress(segment)}
        />
      ))}
      {myLocation && (
        <Marker coordinate={myLocation}>
          <Image source={character} style={{ width: 40, height: 40 }} />
        </Marker>
      )}
      {schedules.map(({ site, index }) => (
        <IndexMarker
          key={site._id}
          coordinate={site.region}
          index={index}
        />
      ))}
      {myLocation && messages.map((message) => (
        <MessageMarker
          key={message._id}
          style={styles.message}
          coordinate={message.location}
          description={message.content}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  message: {
    zIndex: 1,
  },
});

export default GoogleMap;
