import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";

import ModalButton from "../components/ModalButton";
import MyTeamHeader from "../components/MyTeamHeader";
import RegisterUserModal from "../components/RegisterUserModal";
import SideButton from "../components/SideButton";
import TeamMatch from "../components/TeamMatch";
import TeamMember from "../components/TeamMember";
import TeamOverview from "../components/TeamOverview";

import * as colors from "../constants/colors";
import * as sizes from "../constants/sizes";

export default function MyTeamScreen({ navigation }) {
  const [isModal, setIsModal] = useState(false);

  const currentTeam = useSelector((state) => {
    return state.user.currentTeam;
  }, (prev, next) => _.cloneDeep(prev) === _.cloneDeep(next));

  const handleModal = () => setIsModal(!isModal);

  return (
    <SafeAreaView style={styles.container}>
      <RegisterUserModal
        visible={isModal}
        setIsModal={handleModal}
      />
      <MyTeamHeader />
      <View style={styles.body}>
        {currentTeam && (
          <>
            <TeamOverview team={currentTeam} />
            <TeamMember team={currentTeam} />
            <TeamMatch team={currentTeam} />
          </>
        )}
      </View>
      <SideButton
        navigation={navigation}
        path={"TeamCreate"}
        isRank={false}
      />
      {currentTeam && (
        <ModalButton
          setIsModal={handleModal}
          icon={"person-add"}
          style={styles.modalButton}
        />
      )}
    </SafeAreaView>
  );
}

MyTeamScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: colors.SECONDARY_GRAY,
  },
  modalButton: {
    flex: 1,
    alignItems: "center",
    bottom: 0.13 * sizes.DEVICE_HEIGHT,
    right: 0.1 * sizes.DEVICE_WIDTH,
    backgroundColor: colors.SECONDARY_GRAY,
  },
});
