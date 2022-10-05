import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import RankHeader from "../components/RankHeader";
import RankItem from "../components/RankItem";
import SideButton from "../components/SideButton";
import SpinnerLoading from "../components/SpinnerLoading";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";
import * as fonts from "../constants/fonts";

export default function RankScreen({ navigation }) {
  const isRankLoading = useSelector((state) => {
    return state.loading.isRankLoading;
  });

  const currentTeam = useSelector((state) => {
    return state.user.currentTeam;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const teams = useSelector((state) => {
    return state.app.teams;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const _teams = _.cloneDeep(teams);
  const sortedTeams = _teams.sort((a, b) => b.rank - a.rank);

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerLoading
        visible={isRankLoading}
        content={"Rank Loading..."}
      />
      <RankHeader />
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>랭킹</Text>
      </View>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center" }}
        keyExtractor={(item) => item.id}
        data={sortedTeams}
        renderItem={({ item, index }) => <RankItem item={item} index={index} />}
      />
      {currentTeam
        && (
          <SideButton
            navigation={navigation}
            path={"MatchCreate"}
            isRank={true}
          />
        )}
    </SafeAreaView>
  );
}

RankScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },

  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    width: 0.8 * sizes.DEVICE_WIDTH,
    height: 0.06 * sizes.DEVICE_HEIGHT,
    marginTop: 30,
    borderRadius: 5,
    backgroundColor: "black",
  },
  tableHeaderText: {
    flex: 1,
    height: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
    includeFontPadding: false,
    color: "white",
  },
  flatlist: {
    flex: 1,
    width: sizes.DEVICE_WIDTH,
    marginTop: 15,
  },
});
