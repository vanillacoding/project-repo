import React from "react";
import { View } from "react-native";

import AlbumDisplayingSection from "./AlbumDisplayingSection";
import PlayerBtnSection from "./PlayerBtnSection";
import styles from "./styles";

const MusicTabBar = ({
  currentTrack,
  onPressNextIcon,
  onPressPrevIcon,
  onPressControlIcon,
  isPlaying,
}) => {
  return (
    <View style={styles.trackPlayerContainer}>
      <AlbumDisplayingSection currentTrack={currentTrack} />
      <PlayerBtnSection
        onPressNextIcon={onPressNextIcon}
        onPressPrevIcon={onPressPrevIcon}
        onPressControlIcon={onPressControlIcon}
        isPlaying={isPlaying}
      />
    </View>
  );
};

export default MusicTabBar;
