import PropTypes from "prop-types";
import { StyleSheet, Modal, Text, TextInput, View } from "react-native";

import {
  DARK_GREY_100,
  LIGHT_GREY_50,
  WHITE,
  RED_50,
} from "../../constants/color";

export default function ModalForCreate({
  isVisible,
  projectName,
  handleChange,
  handleCancelPress,
  handleCreatePress,
  errorMessage,
}) {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <Text style={styles.pageTitle}>Create New Project</Text>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          value={projectName}
          onChangeText={handleChange}
          maxLength={50}
        />
        <Text style={styles.errorText}>{errorMessage}</Text>
        <View style={styles.choiceWrapper}>
          <Text style={styles.text} onPress={handleCancelPress}>
            Cancel
          </Text>
          <Text style={styles.text} onPress={handleCreatePress}>
            Create
          </Text>
        </View>
      </View>
    </Modal>
  );
}

ModalForCreate.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  projectName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleCancelPress: PropTypes.func.isRequired,
  handleCreatePress: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: "40%",
    padding: 10,
    justifyContent: "center",
    alignSelf: "center",
    width: 304,
    height: 192,
    borderRadius: 10,
    backgroundColor: DARK_GREY_100,
  },
  pageTitle: {
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "FiraCode",
    color: WHITE,
  },
  choiceWrapper: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    height: 40,
  },
  errorText: {
    textAlign: "center",
    fontSize: 12,
    fontFamily: "FiraCode",
    color: RED_50,
  },
  text: {
    marginHorizontal: 18,
    fontSize: 12,
    fontFamily: "FiraCode",
    color: WHITE,
  },
  input: {
    alignSelf: "center",
    padding: 10,
    width: 251,
    height: 40,
    borderRadius: 5,
    backgroundColor: LIGHT_GREY_50,
  },
});
