import React from "react";
import {
  View,
  Image,
  StyleSheet,
} from "react-native";
import { Marker } from "react-native-maps";

import message from "../../../assets/message.png";

function MessageMarker(props) {
  return (
    <Marker {...props}>
      <View style={styles.markerContainer}>
        <Image
          style={{ width: 30, height: 30 }}
          source={message}
        />
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
});

export default MessageMarker;
