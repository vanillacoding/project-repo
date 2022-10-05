import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import moment from "moment";

import Title from "./Title";

import THEME from "../../constants/theme";

function CoursePreview({ course, onPress, style }) {
  const createdAt = moment(course.createdAt).format("YYYY MMM Do");

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
    >
      <Title text={course.name} />
      <Text>{`장소 수: ${course.schedules.length}`}</Text>
      <Text>{createdAt}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    width: 150,
    height: 150,
    marginRight: 10,
    padding: 25,
    borderRadius: 20,
    backgroundColor: THEME.color.primitive,
  },
});

export default CoursePreview;
