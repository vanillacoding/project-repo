import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  View,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import Title from "../components/shared/Title";
import GoogleMap from "../components/shared/GoogleMap";
import ModalWithBackground from "../components/shared/ModalWithBackground";
import CourseInfo from "../components/CourseInfo";
import ScheduleList from "../components/ScheduleList";
import TextInputForm from "../components/TextInputForm";

import fetchData from "../utils/fetchData";
import calculateAwardPoint from "../utils/calculateAwardPoint";
import useCourse from "../hooks/useCourse";
import useRegion from "../hooks/useRegion";
import useErrorMsg from "../hooks/useErrorMsg";
import useNearbyMsg from "../hooks/useNearbyMsg";
import useMyLocation from "../hooks/useMyLocation";
import { toggleCourseBookmark } from "../reducers/favoriteCoursesSlice";

function CourseDetailScreen({
  route: { params: { id } },
  isActiveMode,
  isMessageFormOpen,
  onMessageFormClose,
  onMessageSubmit,
  onBlur = () => {},
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { region, changeRegion } = useRegion({});
  const { errorMsg, setErrorMsg } = useErrorMsg(null);
  const {
    courseInfo,
    messages,
    setMessages,
    favorites,
    setFavorites,
  } = useCourse(id, { setIsLoading, changeRegion, setErrorMsg });
  const myLocation = useMyLocation(isActiveMode, null, { setErrorMsg });
  const { nearbyMessages, myIndices } = useNearbyMsg(region, messages, myLocation);
  const awardPoint = calculateAwardPoint(favorites, messages);

  const handleBookmarkPressAsyncMemo = useCallback(handleBookmarkPressAsync, [courseInfo._id]);

  async function handleBookmarkPressAsync() {
    try {
      const actionResult = await dispatch(toggleCourseBookmark(courseInfo._id));
      const { course: { favorites: newFavorites } } = unwrapResult(actionResult);

      setFavorites(newFavorites);
    } catch (err) {
      setErrorMsg(err.messages);
    }
  }

  async function handleMessageSubmitAsync(content) {
    try {
      if (!myIndices.x || !myIndices.y) {
        setErrorMsg("코스 영역 밖에 있습니다.");
        return;
      }

      const message = { content, location: myLocation };
      const response = await fetchData("POST", `/course/${id}`, message);

      setMessages((prev) => prev.concat(response));
      onMessageSubmit();
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  useFocusEffect(useCallback(() => () => {
    onBlur();
    setIsLoading(true);
  }, [onBlur]));

  return (
    <View style={[styles.container, isLoading && styles.loading]}>
      {isLoading
        ? <ActivityIndicator size="large" />
        : (
          <>
            <GoogleMap
              region={region}
              schedules={courseInfo.schedules}
              myLocation={myLocation}
              messages={nearbyMessages}
              style={styles.map}
            />
            <CourseInfo
              courseInfo={courseInfo}
              awardPoint={awardPoint}
              onBookmarkPress={handleBookmarkPressAsyncMemo}
            />
            <ScheduleList schedules={courseInfo.schedules} />
            <ModalWithBackground isOpen={isMessageFormOpen || !!errorMsg}>
              {errorMsg && <Title text={errorMsg} />}
              {isMessageFormOpen && (
                <TextInputForm
                  placeholder="쪽지 내용을 입력하세요."
                  onSubmit={handleMessageSubmitAsync}
                  onClose={onMessageFormClose}
                />
              )}
            </ModalWithBackground>
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  loading: {
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "50%",
    borderRadius: 20,
  },
});

export default React.memo(CourseDetailScreen);
