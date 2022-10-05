import React, { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import DropDown from "./DropDown";
import { setCurrentTeam } from "../actions/userActionCreators";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

export default function MyTeamHeader() {
  const myTeamInfo = useSelector((state) => {
    return {
      myTeams: state.user.teams,
      currentTeam: state.user.currentTeam,
    };
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const { myTeams, currentTeam } = myTeamInfo;

  const dispatch = useDispatch();

  const teamOptions = useMemo(() => myTeams.map((team) => team.name), []);

  const handleSelectTeam = useCallback((index) => {
    dispatch(setCurrentTeam(myTeams[index]));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.team}>
        <DropDown
          defaultValue={currentTeam?.name ?? "팀"}
          options={teamOptions}
          onSelect={handleSelectTeam}
          style={styles.dropDown}
        />
      </View>
      <View style={styles.blank} />
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
  team: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blank: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    width: 0.15 * sizes.DEVICE_WIDTH,
    height: 0.05 * sizes.DEVICE_HEIGHT,
    color: colors.SECONDARY_WHITE,
    fontSize: sizes.TERTIARY_FONT_SIZE,
  },
});
