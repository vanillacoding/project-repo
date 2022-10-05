import { StyleSheet } from "react-native";

import {
  TRANSPARENCY,
  OPACITY_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  wrapper: {
    flex: 1
  },
  friendsRoute: {
    position: "absolute",
    width: "30%",
    height: "10%",
    top: 20,
    backgroundColor: TRANSPARENCY,
    zIndex: 1
  },
  friendsRouteImage: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  titleImage: {
    left: "27%",
  },
  contentsWrapper: {
    flex: 1,
    width: "90%",
    margin: 20,
    backgroundColor: OPACITY_BACKGROUND,
    borderRadius: 30
  },
  inputWrapper: {
    width: "75%",
    height: "5%",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    marginBottom: 30,
    borderRadius: 10
  },
  textInput: {
    width: "95%"
  },
  sendButton: {
    width: "20%",
    minHeight: 45
  },
  sendButtonText: {
    fontSize: 15,
  }
});

export default styles;
