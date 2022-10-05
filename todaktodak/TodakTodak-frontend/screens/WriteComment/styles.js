import { StyleSheet } from "react-native";

import {
  WHITE,
  BLACK,
  TRANSPARENCY
} from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%"
  },
  container: {
    width: "100%",
    alignItems: "center"
  },
  postContentsWrapper: {
    width: "90%",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  title: {
    marginBottom: 40,
  },
  titleText: {
    fontSize: 40
  },
  titleImage: {
    width: 50,
    height: 50,
    top: "-30%",
    left: "-30%"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 400,
    marginTop: 30,
    backgroundColor: TRANSPARENCY,
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  },
  buttonWrapper: {
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: WHITE,
    shadowColor: BLACK,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },
  buttonText: {
    color: BLACK,
    fontSize: 10,
    fontWeight: "bold"
  },
  buttonIcon: {
    padding: 10
  }
});

export default styles;
