import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import TrackDescription from "../TrackDescription";
import { MUSIC_TAB_ICON } from "../../../../constants";
import styles from "./styles";

const albumDisplayingSection = ({ currentTrack }) => {
  return (
    <View style={styles.albumDisplayingSection}>
      {currentTrack?.albumImg ? (
        <Image
          source={{ uri: currentTrack?.albumImg[2].url }}
          style={styles.albumImg}
        />
      ) : (
        <TouchableOpacity style={styles.defaultAlbumIcon}>
          <SimpleLineIcons
            name={MUSIC_TAB_ICON.DefaultAlbum}
            size={20}
            color="black"
          />
        </TouchableOpacity>
      )}

      <TrackDescription currentTrack={currentTrack} />
    </View>
  );
};

export default albumDisplayingSection;
