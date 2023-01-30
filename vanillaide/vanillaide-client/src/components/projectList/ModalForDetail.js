import { AntDesign } from "@expo/vector-icons";
import PropTypes from "prop-types";
import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";

import { LIGHT_GREY_50, DARK_GREY_100 } from "../../constants/color";

const { width: screenWidth } = Dimensions.get("window");

export default function ModalForDetail({
  isVisible,
  projectInfo,
  handlePress,
  handleDelete,
  handlePerformancePress,
  handleDeployPress,
}) {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.backIcon} onPress={handlePress}>
          <AntDesign name="caretdown" size={24} color={LIGHT_GREY_50} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(projectInfo.projectId)}>
          <Text style={styles.text}>Delete</Text>
        </TouchableOpacity>
        {projectInfo.deployState && (
          <TouchableOpacity onPress={handlePerformancePress}>
            <Text style={styles.text}>Performance</Text>
          </TouchableOpacity>
        )}
        {!projectInfo.deployState && (
          <TouchableOpacity onPress={handleDeployPress}>
            <Text style={styles.text}>Deploy</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}

ModalForDetail.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  projectInfo: PropTypes.object.isRequired,
  handlePress: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handlePerformancePress: PropTypes.func.isRequired,
  handleDeployPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignSelf: "center",
    padding: 20,
    width: screenWidth,
    height: 163,
    backgroundColor: DARK_GREY_100,
  },
  backIcon: {
    alignSelf: "center",
  },
  text: {
    marginBottom: 10,
    fontFamily: "FiraCode",
    fontSize: 20,
    color: LIGHT_GREY_50,
  },
});
