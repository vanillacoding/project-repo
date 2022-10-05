import React from "react";
import { StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import MatchHeader from "../components/MatchHeader";
import MatchItem from "../components/MatchItem";
import SideButton from "../components/SideButton";
import SpinnerLoading from "../components/SpinnerLoading";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

export default function MatchScreen({ navigation }) {
  const isMatchLoading = useSelector((state) => {
    return state.loading.isMatchLoading;
  });

  const currentTeam = useSelector((state) => {
    return state.user.currentTeam;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const matches = useSelector((state) => {
    return state.app.matches;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const _matches = _.cloneDeep(matches);

  const sortedMatches = _matches.sort((a, b) => {
    const milliSecA = new Date(a.playtime.start).getTime();
    const milliSecB = new Date(b.playtime.start).getTime();
    return milliSecA - milliSecB;
  });

  return (
    <SafeAreaView style={styles.container}>
      <SpinnerLoading
        visible={isMatchLoading}
        content={"Match Loading..."}
      />
      <MatchHeader />
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={{ justifyContent: "flex-end", alignItems: "center" }}
        keyExtractor={(item) => item.id}
        data={sortedMatches}
        renderItem={({ item }) => <MatchItem item={item} navigation={navigation} />}
      />
      {currentTeam
        && (
          <SideButton
            navigation={navigation}
            path={"MatchCreate"}
            isRank={false}
          />
        )}
    </SafeAreaView>
  );
}

MatchScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  flatlist: {
    flex: 1,
    width: sizes.DEVICE_WIDTH,
    marginTop: 30,
  },
});
