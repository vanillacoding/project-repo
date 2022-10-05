import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";

import Title from "./shared/Title";
import IconButton from "./shared/IconButton";

import THEME from "../constants/theme";
import useAnimation from "../hooks/useAnimation";
import { toggleSiteBookmark, selectFavoriteSiteBySiteId } from "../reducers/favoriteSitesSlice";

function Schedule({
  schedule: { index: scheduleIndex, site },
  onIndexPress,
  accent,
}) {
  const isBookmarked = useSelector((state) => !!selectFavoriteSiteBySiteId(state, site._id));
  const dispatch = useDispatch();
  const translateX = useAnimation(400, 0, 500);

  function handleLikePress() {
    dispatch(toggleSiteBookmark(site._id));
  }

  function handleIndexPress() {
    onIndexPress(scheduleIndex);
  }

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX }] }]}>
      <View>
        <TouchableOpacity
          style={[styles.indexContainer, accent && styles.accent]}
          onPress={handleIndexPress}
          testID="indexButton"
        >
          <Text style={styles.index}>{scheduleIndex}</Text>
        </TouchableOpacity>
        <View style={styles.dash} />
      </View>
      <View style={styles.namesContainer}>
        <Title text={site.shortName} />
        <Text>{site.fullName}</Text>
      </View>
      <IconButton
        type="FontAwesome"
        name={isBookmarked ? "heart" : "heart-o"}
        color={THEME.color.accent}
        onPress={handleLikePress}
        testID="likeButton"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  indexContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: THEME.color.primitive,
  },
  accent: {
    backgroundColor: THEME.color.accent,
  },
  index: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  dash: {
    width: 21,
    height: 20,
    marginVertical: 10,
    borderRightWidth: 2,
    borderStyle: "solid",
    borderColor: THEME.color.primitive,
  },
  namesContainer: {
    width: "80%",
    padding: "3%",
  },
});

export default Schedule;
