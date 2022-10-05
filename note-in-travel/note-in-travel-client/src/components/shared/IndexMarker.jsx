import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";
import { Marker } from "react-native-maps";

import marker from "../../../assets/marker.png";

function IndexMarker(props) {
  return (
    <Marker {...props}>
      <View style={styles.markerContainer}>
        <Image
          style={{ width: 40, height: 40 }}
          source={marker}
        />
        <View style={styles.indexContainer}>
          <Text style={styles.index}>{`${props.index}`}</Text>
        </View>
      </View>
    </Marker>
  );
}

const styles = StyleSheet.create({
  markerContainer: {
    position: "relative",
  },
  indexContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    top: 6,
    left: 10,
    borderRadius: 10,
    backgroundColor: "#ffff",
  },
  index: {
    color: "black",
    fontWeight: "bold",
  },
});

export default IndexMarker;
