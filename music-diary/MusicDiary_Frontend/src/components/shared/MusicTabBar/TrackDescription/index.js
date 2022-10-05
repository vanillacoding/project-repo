import React from "react";
import { Text, TouchableOpacity } from "react-native";

import styles from "./styles";

const TrackDescription = ({ currentTrack }) => {
  return (
    <TouchableOpacity style={styles.trackDescription}>
      <Text numberOfLines={1} style={styles.trackTitle}>
        {currentTrack?.title ? currentTrack.title : "Music Diary"}
      </Text>
      <Text numberOfLines={1} style={styles.trackArtist}>
        {currentTrack?.artist ? currentTrack.artist : "Choose track"}
      </Text>
    </TouchableOpacity>
  );
};

export default TrackDescription;
