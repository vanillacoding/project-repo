import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, StyleSheet } from "react-native";

import Profile from "../components/shared/Profile";
import SafeArea from "../components/shared/SafeArea";
import CoursePreviewList from "../components/shared/CoursePreviewList";

import THEME from "../constants/theme";
import { logoutUser, selectUser } from "../reducers/userSlice";
import { selectMyCourses } from "../reducers/myCoursesSlice";
import { selectFavoriteCourses } from "../reducers/favoriteCoursesSlice";
import IconButton from "../components/shared/IconButton";

function UserScreen({ navigation }) {
  const { name, photoUrl } = useSelector(selectUser);
  const myCourses = useSelector(selectMyCourses);
  const favoriteCourses = useSelector(selectFavoriteCourses);
  const dispatch = useDispatch();

  function handlePreviewPress(courseId) {
    navigation.navigate("CourseDetail", { id: courseId });
  }

  function handleLogoutPress() {
    dispatch(logoutUser());
  }

  return (
    <View style={styles.container}>
      <SafeArea />
      <Profile
        name={name}
        photoUrl={photoUrl}
      />
      <CoursePreviewList
        title="나의 일정"
        courses={myCourses}
        onPreviewPress={handlePreviewPress}
      />
      <CoursePreviewList
        title="즐겨찾기"
        courses={favoriteCourses}
        onPreviewPress={handlePreviewPress}
      />
      <IconButton
        style={styles.logoutButton}
        name="door-open"
        color={THEME.color.primitive}
        onPress={handleLogoutPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  listContainer: {
    height: "30%",
    width: "90%",
  },
  previewContainer: {
    paddingVertical: "5%",
  },
  logoutButton: {
    width: 40,
    height: 40,
  },
});

export default UserScreen;
