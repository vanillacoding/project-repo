import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  img: {
    flex: 1,
    resizeMode: "contain",
  },
  animation: {
    position: "absolute",
    alignSelf: "center",
    top: 45,
    width: 270,
    height: 270,
  },
});

export default styles;
