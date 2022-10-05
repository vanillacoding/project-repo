import { StyleSheet } from "react-native";

import { TRANSPARENCY } from "../../constants/color";

const styles = StyleSheet.create({
  backgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  container: {
    width: "100%",
    height: "100%"
  },
  postContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginBottom: 20
  },
  titleImage: {
    left: "-10%"
  },
  postContentsWrapper: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    borderRadius: 20,
    overflow: "hidden"
  },
  categoryWrapper: {
    alignItems: "center",
    marginTop: 10
  },
  contents: {
    height: 400,
    backgroundColor: TRANSPARENCY,
    fontSize: 20
  },
  letterPage: {
    width: "100%"
  },
  commentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 5
  }
});

export default styles;
