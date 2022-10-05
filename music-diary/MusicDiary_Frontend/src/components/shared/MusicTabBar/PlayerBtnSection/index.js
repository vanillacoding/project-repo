import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import { MUSIC_TAB_ICON, PLAY_BUTTON_ICON } from "../../../../constants";
import styles from "./styles";

const PlayerBtnSection = ({
  onPressNextIcon,
  onPressPrevIcon,
  onPressControlIcon,
  isPlaying,
}) => {
  return (
    <View style={styles.playerBtnSection}>
      <TouchableOpacity style={styles.prevIcon} onPress={onPressPrevIcon}>
        <SimpleLineIcons name={MUSIC_TAB_ICON.Prev} size={14} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.controlIcon} onPress={onPressControlIcon}>
        <SimpleLineIcons
          name={PLAY_BUTTON_ICON[isPlaying]}
          size={18}
          color="black"
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.nextIcon} onPress={onPressNextIcon}>
        <SimpleLineIcons name={MUSIC_TAB_ICON.Next} size={14} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default PlayerBtnSection;
