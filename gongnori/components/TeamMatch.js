import React, { useMemo } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";

import getDateFromIso from "../utils/getDateFromIso";
import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function TeamMatch({ team }) {
  const { matches } = team;

  const fixedMatches = useMemo(() => {
    return matches.filter((match) => match.teams.length === 2);
  }, []);

  return (
    <View style={styles.matches}>
      <Text style={styles.title}>경기 일정</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {
          fixedMatches.map((match) => {
            const { playgroundName, city, district, start, end, teams } = match;
            const [, startMonth, startDate, startHour] = getDateFromIso(start);
            const [, , , endHour] = getDateFromIso(end);
            const opponent = teams.filter((item) => item !== team.name);

            return (
              <View key={match.id} style={styles.match}>
                <Text
                  style={styles.primary}
                  numberOfLines={1}
                  ellipsizeMode="head"
                >
                  {`vs ${opponent}`}
                </Text>
                <View style={styles.cell}>
                  <Text style={styles.secondary}>{`${startMonth}월 ${startDate}일`}</Text>
                  <Text style={styles.tertiary}>{`${startHour}:00 - ${endHour}:00`}</Text>
                </View>
                <View style={styles.cell}>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={styles.secondary}
                  >
                    {playgroundName}
                  </Text>
                  <Text style={styles.tertiary}>{`${city} ${district}`}</Text>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );
}

TeamMatch.propTypes = {
  team: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  matches: {
    alignItems: "flex-start",
    width: 0.9 * sizes.DEVICE_WIDTH,
    height: 0.25 * sizes.DEVICE_HEIGHT,
    marginTop: 15,
  },
  title: {
    marginBottom: 10,
    marginLeft: 10,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    textAlign: "left",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  scroll: {
    width: "100%",
    backgroundColor: colors.SECONDARY_WHITE,
    borderRadius: 10,
    elevation: 5,
    shadowColor: colors.PRIMARY_SHADOW,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowOffset: {
      height: -1,
      width: 0,
    },
  },
  match: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 0.05 * sizes.DEVICE_HEIGHT,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY_BLUE,
  },
  cell: {
    flex: 1,
    height: "100%",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
  },
  primary: {
    flex: 1,
    height: "100%",
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
  },
  secondary: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
  tertiary: {
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: sizes.QUINARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_300_LIGHT,
    includeFontPadding: false,
  },
});
