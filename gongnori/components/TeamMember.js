import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";

import * as colors from "../constants/colors";
import * as fonts from "../constants/fonts";
import * as sizes from "../constants/sizes";

export default function TeamMember({ team }) {
  const { members } = team;

  return (
    <View style={styles.members}>
      <Text style={styles.title}>팀원</Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {
          members.map((member) => {
            return (
              <View key={member._id} style={styles.member}>
                <Text
                  style={styles.name}
                  numberOfLines={1}
                  ellipsizeMode="head"
                >
                  {member.name}
                </Text>
                <View style={styles.detail}>
                  <Icon
                    name="person-remove"
                    size={sizes.QUATERNARY_FONT_SIZE}
                    style={styles.icon}
                  />
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );
}

TeamMember.propTypes = {
  team: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  members: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: 0.9 * sizes.DEVICE_WIDTH,
    height: 0.25 * sizes.DEVICE_HEIGHT,
    marginTop: 15,
  },
  title: {
    textAlign: "left",
    textAlignVertical: "center",
    marginBottom: 10,
    marginLeft: 10,
    fontSize: sizes.TERTIARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_500_MEDIUM,
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
  member: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 30,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY_BLUE,
  },
  name: {
    flex: 1,
    textAlign: "left",
    textAlignVertical: "center",
    fontSize: sizes.QUATERNARY_FONT_SIZE,
    fontFamily: fonts.NOTO_SANS_KR_400_REGULAR,
    includeFontPadding: false,
  },
  detail: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  icon: {
    width: 20,
  },
});
