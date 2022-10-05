import React from "react";
import { useSelector } from "react-redux";
import { View, StyleSheet, Text } from "react-native";

import Title from "./shared/Title";
import IconButton from "./shared/IconButton";
import VectorIcon from "./shared/VectorIcon";

import THEME from "../constants/theme";
import { selectUser } from "../reducers/userSlice";
import { selectFavoriteCourseByCourseId } from "../reducers/favoriteCoursesSlice";

function CourseInfo({
  courseInfo = {},
  awardPoint,
  onBookmarkPress,
  style,
}) {
  const { _id: useId } = useSelector(selectUser);
  const isBookmarked = useSelector((state) => (
    !!selectFavoriteCourseByCourseId(state, courseInfo._id)
  ));

  const isMyCourse = useId === courseInfo.creator?._id;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <View style={styles.award}>
          <VectorIcon name="award" color={THEME.color.accent} />
          <Text testID="awardPoint">{awardPoint}</Text>
        </View>
        {!isMyCourse && (
          <IconButton
            type="FontAwesome"
            name={isBookmarked ? "bookmark" : "bookmark-o"}
            color={THEME.color.primitive}
            onPress={onBookmarkPress}
            testID="bookmarkButton"
          />
        )}
      </View>
      <View style={styles.body}>
        <Title text={courseInfo.name} />
        <Text>{` by ${courseInfo.creator?.name}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "75%",
    height: "11%",
    marginTop: "5%",
    paddingHorizontal: "5%",
    paddingVertical: "4%",
    borderRadius: 20,
    backgroundColor: "#DEDFE3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "100%",
  },
  award: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 45,
  },
  body: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
    width: "100%",
  },
});

export default React.memo(CourseInfo);
