import React, { useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

import getDateFromIso from "../utils/getDateFromIso";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function MessageItem({ item, navigation }) {
  const { guest, host, playground, playtime, sports, type } = item;

  const [, startMonth, startDate, startHour] = getDateFromIso(playtime.start);
  const [, , , endHour] = getDateFromIso(playtime.end);

  const handlePressMessage = useCallback(() => {
    navigation.navigate("Chat", { message: item });
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={handlePressMessage}
    >
      <Text style={styles.sports}>{`${sports} ${type}`}</Text>
      <Text style={styles.team}>{`${host.team} vs ${guest.team}`}</Text>
      <Text style={styles.plyaground}>{`${playground.city} ${playground.district}`}</Text>
      <Text style={styles.playgroundName}>{playground.name}</Text>
      <Text style={styles.playtime}>{`${startMonth}월 ${startDate}일 ${startHour}:00 ~ ${endHour}:00` }</Text>
    </TouchableOpacity>
  );
}

MessageItem.propTypes = {
  item: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.2 * sizes.DEVICE_HEIGHT,
    margin: 15,
    paddingLeft: 15,
    borderRadius: 10,
    backgroundColor: colors.PRIMARY_YELLOW,
    elevation: 5,
    shadowColor: colors.PRIMARY_SHADOW,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  sports: {
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  team: {
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  playgroundName: {
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    includeFontPadding: false,
  },
  plyaground: {
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
  playtime: {
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    includeFontPadding: false,
  },
});
