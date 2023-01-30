import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

import { LIGHT_GREY_100 } from "../../constants/color";
import CustomButton from "../CustomButton";

export default function UserInfo({ username, email, handlePress }) {
  return (
    <View style={styles.userInfoWrapper}>
      <Text style={styles.userName}>{username}</Text>
      <Text style={styles.userEmail}>{email}</Text>
      <CustomButton
        text="Sign out"
        fontSize={8}
        handlePress={handlePress}
        buttonWidth={76}
        buttonHeight={32}
        buttonMargin={5}
      />
    </View>
  );
}

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  userInfoWrapper: {
    flex: 4,
    justifyContent: "center",
    padding: 20,
  },
  userName: {
    fontSize: 30,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_100,
  },
  userEmail: {
    fontSize: 15,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_100,
  },
});
