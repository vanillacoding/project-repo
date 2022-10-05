import React, { useCallback, useEffect, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import DropDown from "./DropDown";
import DateController from "./DateController";

import useDateController from "../hooks/useDateController";
import { setCurrentSports, setCurrentLocation } from "../actions/userActionCreators";
import { getMatch } from "../actions/appActionCreators";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

export default function MatchHeader() {
  const userInfo = useSelector((state) => {
    return {
      myLocations: state.user.locations,
      currentLocation: state.user.currentLocation,
      currentSports: state.user.currentSports,
    };
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const sports = useSelector((state) => {
    return state.app.sports;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const { myLocations, currentLocation, currentSports } = userInfo;

  const dispatch = useDispatch();

  const [year, month, date, handlePressButton] = useDateController();

  const locationOptions = useMemo(() => {
    return myLocations.map((location) => location.district);
  }, []);

  const sportsOptions = useMemo(() => {
    return sports.map((item) => item.koreanName);
  }, []);

  const handleSelectLocation = useCallback((index) => {
    dispatch(setCurrentLocation(myLocations[index]));
  }, []);

  const handleSelectSports = useCallback((index) => {
    dispatch(setCurrentSports(sports[index]));
  }, []);

  useEffect(() => {
    dispatch(getMatch(currentLocation, currentSports.sports, year, month, date));
  }, [currentLocation, currentSports, year, month, date]);

  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <DropDown
          defaultValue={currentLocation.district}
          options={locationOptions}
          style={styles.dropDown}
          onSelect={handleSelectLocation}
        />
      </View>
      <View style={styles.date}>
        <DateController
          year={year}
          month={month}
          date={date}
          onPressButton={handlePressButton}
        />
      </View>
      <View style={styles.sports}>
        <DropDown
          defaultValue={currentSports.koreanName}
          options={sportsOptions}
          style={styles.dropDown}
          onSelect={handleSelectSports}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    height: sizes.HEADER_HEIGHT,
    backgroundColor: colors.SECONDARY_BLUE,
  },
  location: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  date: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  sports: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.SECONDARY_FONT_SIZE,
  },
});
