import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import _ from "lodash";

import CompletionModal from "../components/CompletionModal";
import InputAlertModal from "../components/InputAlertModal";
import SpinnerLoading from "../components/SpinnerLoading";
import DropDown from "../components/DropDown";
import PlaceMap from "../components/PlaceMap";

import useMyLocation from "../hooks/useMyLocation";
import useHeaderRight from "../hooks/useHeaderRight";
import useMatchState from "../hooks/useMatchState";

import getDateFromMonth from "../utils/getDateFromMonth";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

const MONTH_AND_HOURS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

export default function MatchCreateScreen({ navigation, route }) {
  const { isRank } = route.params;

  const [isHeaderRightLoading, isCompletionShown, isInputInvalid] = useSelector((state) => {
    return [
      state.loading.isHeaderRightLoading,
      state.loading.isCompletionShown,
      state.loading.isInputInvalid,
    ];
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const [teams, currentSports, currentTeam, currentLocation] = useSelector((state) => {
    return [
      state.user.teams,
      state.user.currentSports,
      state.user.currentTeam,
      state.user.currentLocation,
    ];
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const [sports, playgrounds] = useSelector((state) => {
    return [
      state.app.sports,
      state.app.playgrounds,
    ];
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const [origin, setOrigin] = useState(null);
  const [forceRefreshKey, setForceRefreshKey] = useState("");
  const [location] = useState(currentLocation);

  const [
    match,
    handleSelectType,
    handleSelectMonth,
    handleSelectDate,
    handleSelectMeridiem,
    handleSelectStart,
    handleSelectEnd,
    handlePressPlayground,
  ] = useMatchState(sports, teams);

  const [myLocation] = useMyLocation();

  const sportsOptions = currentSports.matchTypes;

  const _match = {
    ...match,
    sports: { id: currentSports.id, name: currentSports.sports },
    team: { id: currentTeam.id, name: currentTeam.id },
    location: { id: currentLocation.id },
    isRank,
  };

  const path = isRank ? "match/rank" : "match";

  useHeaderRight(
    { navigation, title: "만들기" },
    { method: "POST", path, data: _match }
  );

  useEffect(() => {
    if (!location) {
      setOrigin(myLocation);
      setForceRefreshKey(100 * Math.random());

      return;
    }

    const { latitude, longitude } = location;
    setOrigin({ latitude, longitude });
    setForceRefreshKey(100 * Math.random());
  }, [location, myLocation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <SpinnerLoading
        visible={isHeaderRightLoading}
        content={"Match Creating..."}
      />
      <InputAlertModal
        content={"경기 정보를 입력해주세요."}
        visible={isInputInvalid}
      />
      <CompletionModal
        content={"경기를 만들었습니다."}
        visible={isCompletionShown}
      />
      <View style={styles.inputContainer}>
        <View style={styles.titleDropdown}>
          <Text style={styles.title}>경기 방식</Text>
          <DropDown
            defaultValue={"경기방식"}
            options={sportsOptions}
            style={{ ...styles.dropDown, width: 100 }}
            onSelect={handleSelectType}
          />
        </View>
        <View style={styles.titleDropdown}>
          <Text style={styles.title}>경기 날짜</Text>
          <DropDown
            defaultValue={match.month}
            options={MONTH_AND_HOURS}
            style={styles.dropDown}
            onSelect={handleSelectMonth}
          />
          <Text style={styles.separator}>월</Text>
          <DropDown
            defaultValue={match.date}
            options={getDateFromMonth(match.year, match.month)}
            style={styles.dropDown}
            onSelect={handleSelectDate}
          />
          <Text style={styles.separator}>일</Text>
        </View>
        <View style={styles.titleDropdown}>
          <Text style={styles.title}>경기 시간</Text>
          <DropDown
            defaultValue={match.meridiem}
            options={["AM", "PM"]}
            style={styles.dropDown}
            onSelect={handleSelectMeridiem}
          />
          <Text style={styles.separator} />
          <DropDown
            defaultValue={match.start}
            options={MONTH_AND_HOURS}
            style={styles.dropDown}
            onSelect={handleSelectStart}
          />
          <Text style={styles.separator}>~</Text>
          <DropDown
            defaultValue={match.end}
            options={MONTH_AND_HOURS}
            style={styles.dropDown}
            onSelect={handleSelectEnd}
          />
        </View>
      </View>
      <View>
        {origin && (
          <PlaceMap
            key={forceRefreshKey}
            width={0.8 * sizes.DEVICE_WIDTH}
            height={0.8 * sizes.DEVICE_WIDTH}
            origin={origin}
            location={location}
            places={playgrounds}
            onPlacePress={handlePressPlayground}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

MatchCreateScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  inputContainer: {
    justifyContent: "space-around",
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.3 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    backgroundColor: colors.PRIMARY_YELLOW,
    elevation: 5,
    shadowColor: "rgb(50, 50, 50)",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  titleDropdown: {
    flexDirection: "row",
    alignItems: "center",
    height: 0.1 * sizes.DEVICE_HEIGHT,
  },
  title: {
    height: 0.05 * sizes.DEVICE_HEIGHT,
    marginHorizontal: 15,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  separator: {
    marginLeft: 10,
    marginRight: 10,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.SECONDARY_FONT,
    textAlign: "center",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  dropDown: {
    width: 0.13 * sizes.DEVICE_WIDTH,
    height: 0.04 * sizes.DEVICE_HEIGHT,
    borderRadius: 5,
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    backgroundColor: colors.SECONDARY_WHITE,
  },
});
