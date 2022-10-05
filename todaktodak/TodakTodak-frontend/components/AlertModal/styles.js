import { StyleSheet } from "react-native";

import {
  BLACK,
  TRANSPARENCY,
  MODAL_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  friendModal: {
    width: "60%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "100%",
    marginRight: "auto",
    marginLeft: "auto",
    backgroundColor: MODAL_BACKGROUND,
    borderRadius: 30
  },
  text: {
    fontSize: 15
  },
  modalButton: {
    backgroundColor: TRANSPARENCY
  },
  modalButtonText: {
    marginTop: 15,
    fontSize: 17,
    color: BLACK
  }
});

export default styles;
