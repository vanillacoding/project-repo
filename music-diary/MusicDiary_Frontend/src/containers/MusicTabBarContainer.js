import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, StyleSheet } from "react-native";
import { Audio } from "expo-av";

import {
  setIsPlaying,
  goToNextTrack,
  goToPrevTrack,
} from "../redux/slices/musicSlice";
import BottomTabBar from "../components/shared/BottomTabBar";
import MusicTabBar from "../components/shared/MusicTabBar";

const MusicTabBarContainer = ({ state, descriptors, navigation }) => {
  const dispatch = useDispatch();
  const { isPlaying, playList, currentIdx } = useSelector((state) => state?.music);

  const currentTrack = playList[currentIdx];
  const [sound, setSound] = useState(null);

  useEffect(() => {
    async function checkMusicSound() {
      if (sound) {
        await sound.unloadAsync();
      }

      if (currentTrack?.preview) {
        createSound();
      }
    }

    checkMusicSound();
  }, [currentIdx, playList]);

  const handlePressContolIcon = () => {
    controlMusicPlaying();
  };

  const handlePressPrevIcon = () => {
    dispatch(goToPrevTrack);
  };

  const handlePressNextIcon = () => {
    dispatch(goToNextTrack);
  };

  const createSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      { uri: currentTrack.preview },
      { shouldPlay: true },
      (status) => {
        if (!status.isLoaded) {
          if (status.error) {
            console.error(`error: ${status.error}`);
          }
        } else {
          if (status.didJustFinish) {
            dispatch(goToNextTrack());
            return;
          }

          dispatch(setIsPlaying(status.isPlaying));
        }
      }
    );

    setSound(sound);
  };

  const controlMusicPlaying = async () => {
    if (isPlaying) {
      return await sound.pauseAsync();
    }

    await sound.playAsync();
  };

  return (
    <View>
      <View style={styles.topSeperateLine} />
      <MusicTabBar
        currentTrack={currentTrack}
        goToNextTrack={goToNextTrack}
        onPressPrevIcon={handlePressPrevIcon}
        onPressNextIcon={handlePressNextIcon}
        isPlaying={isPlaying}
        onPressControlIcon={handlePressContolIcon}
      />
      <BottomTabBar
        state={state}
        descriptors={descriptors}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  topSeperateLine: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    height: 0.6,
    width: "100%",
  },
});

export default MusicTabBarContainer;
