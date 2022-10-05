import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import PropTypes from "prop-types";
import _ from "lodash";

import SpinnerLoading from "../components/SpinnerLoading";
import CompletionModal from "../components/CompletionModal";
import PlaceMap from "../components/PlaceMap";
import TeamOverview from "../components/TeamOverview";
import TitleContentRow from "../components/TitleContentRow";

import useHeaderRight from "../hooks/useHeaderRight";
import getDateFromIso from "../utils/getDateFromIso";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

export default function MatchJoinScreen({ navigation, route }) {
  const { playtime, type, playground, host } = route.params.match;
  const { city, district, town, detail, latitude, longitude } = playground;

  const [isHeaderRightLoading, isCompletionShown] = useSelector((state) => {
    return [
      state.loading.isHeaderRightLoading,
      state.loading.isCompletionShown,
    ];
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const currentTeam = useSelector((state) => {
    return state.user.currentTeam;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const [, startMonth, startDate, startHour] = getDateFromIso(playtime.start);
  const [, , , endHour] = getDateFromIso(playtime.end);

  useHeaderRight(
    {
      navigation,
      title: "신청하기",
    },
    {
      method: "POST",
      path: "message",
      data: {
        matchId: route.params.match.id,
        teamId: currentTeam.id,
      },
    }
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <SpinnerLoading
        visible={isHeaderRightLoading}
        content={"Message Sending"}
      />
      <CompletionModal
        content={"경기를 신청하였습니다."}
        visible={isCompletionShown}
      />
      <TeamOverview team={host} />
      <View style={styles.textContainer}>
        <TitleContentRow title={"경기방식"} content={type} />
        <TitleContentRow title={"날짜"} content={`${startMonth}월 ${startDate}일`} />
        <TitleContentRow title={"시간"} content={`${startHour}:00 - ${endHour}:00`} />
        <TitleContentRow title={"경기장"} content={playground.name} />
        <TitleContentRow title={"주소"} content={`${city} ${district} ${town} ${detail}`} />
      </View>
      <PlaceMap
        origin={{ latitude, longitude }}
        width={0.8 * sizes.DEVICE_WIDTH}
        height={0.8 * sizes.DEVICE_WIDTH}
      />
    </SafeAreaView>
  );
}

MatchJoinScreen.propTypes = {
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
  textContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.2 * sizes.DEVICE_HEIGHT,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.SECONDARY_WHITE,
    elevation: 5,
    shadowColor: colors.PRIMARY_SHADOW,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
});
