import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import Title from "../components/shared/Title";
import SafeArea from "../components/shared/SafeArea";
import GoogleMap from "../components/shared/GoogleMap";
import IconButton from "../components/shared/IconButton";
import GoogleSearchBar from "../components/shared/GoogleSearchBar";
import SitePreviewList from "../components/shared/SitePreviewList";
import ModalWithBackground from "../components/shared/ModalWithBackground";
import ScheduleList from "../components/ScheduleList";
import TextInputForm from "../components/TextInputForm";

import THEME from "../constants/theme";
import REGION from "../constants/region";
import fetchData from "../utils/fetchData";
import calcutateViewport from "../utils/calcutateViewport";
import useModal from "../hooks/useModal";
import useRegion from "../hooks/useRegion";
import useErrorMessage from "../hooks/useErrorMsg";
import { saveMyCourse } from "../reducers/myCoursesSlice";

function NewCourseScreen({ navigation }) {
  const isLoading = useSelector((state) => state.myCourses.status === "pending");
  const myFavoriteSites = useSelector((state) => state.favoriteSites.items);
  const dispatch = useDispatch();

  const [schedules, setSchedules] = useState([]);
  const { errorMsg, setErrorMsg } = useErrorMessage(null);
  const { region, changeRegion } = useRegion(REGION.korea);
  const { isModalOpen, openModal, closeModal } = useModal(false);

  async function handleSearchPressAsync(
    data,
    { geometry: { location, viewport } },
  ) {
    try {
      const { northeast, southwest } = viewport;
      const { latitudeDelta, longitudeDelta } = calcutateViewport(northeast, southwest);
      const { lat: latitude, lng: longitude } = location;
      const nextRegion = {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };
      const {
        description: fullName,
        structured_formatting: { main_text: shortName },
      } = data;
      const site = { shortName, fullName, region: nextRegion };

      const response = await fetchData("POST", "/site", site);
      const newSchedules = schedules.concat({ index: schedules.length + 1, site: response });

      setSchedules(newSchedules);
      changeRegion(newSchedules.map((schedule) => schedule.site.region));
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  function handleSavePress() {
    if (schedules.length === 0) return;

    openModal();
  }

  async function handleFormSubmitAsync(courseName) {
    if (isLoading || schedules.length === 0) return;

    try {
      const actionResult = await dispatch(saveMyCourse({
        name: courseName,
        region,
        schedules,
      }));
      const myCourse = unwrapResult(actionResult);

      navigation.navigate("CourseDetail", { id: myCourse._id });
      closeModal();
    } catch (err) {
      setErrorMsg(err.message);
    }
  }

  function handleSitePreviewPress(site) {
    const isExist = !!schedules.find((schedule) => schedule.site._id === site._id);

    if (isExist) return;

    const newSchedules = schedules.concat({ index: schedules.length + 1, site });

    setSchedules(newSchedules);
    changeRegion(newSchedules.map((schedule) => schedule.site.region));
  }

  return (
    <View style={[styles.container, isLoading && styles.loading]}>
      <GoogleMap
        style={styles.map}
        region={region}
        schedules={schedules}
      />
      <GoogleSearchBar onPress={handleSearchPressAsync} />
      <ScheduleList
        schedules={schedules}
        onChange={setSchedules}
      />
      <SitePreviewList
        sites={myFavoriteSites}
        onSitePress={handleSitePreviewPress}
      />
      <IconButton
        name="save"
        color={THEME.color.primitive}
        size={40}
        onPress={handleSavePress}
      />
      <SafeArea />
      <ModalWithBackground
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        {errorMsg && !isLoading && <Title text={errorMsg} />}
        {isLoading
          ? <ActivityIndicator size="large" />
          : (
            <TextInputForm
              style={styles.modalForm}
              placeholder="여행의 제목을 입력하세요."
              onSubmit={handleFormSubmitAsync}
              onClose={closeModal}
            />
          )}
      </ModalWithBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  loading: {
    justifyContent: "center",
  },
  map: {
    height: "40%",
    borderRadius: 20,
  },
});

export default NewCourseScreen;
