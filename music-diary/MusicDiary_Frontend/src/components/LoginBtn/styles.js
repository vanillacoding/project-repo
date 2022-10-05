import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loginWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "400",
  },
  card: {
    margin: 0,
    padding: 0,
    flexDirection: "column",
    height: 235,
    width: 220,
    backgroundColor: "#F16862",
    borderWidth: 0.5,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderBottomColor: "transparent",
  },
  loginBox: {
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 220,
    borderWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderTopColor: "transparent",
    backgroundColor: "#ededed",
  },
  musicDiaryText: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 25,
    fontWeight: "600",
    position: "absolute",
    top: 110,
    left: -60,
    right: 100,
  },
  descText: {
    transform: [{ rotate: "-90deg" }],
    fontSize: 14,
    fontWeight: "400",
    position: "absolute",
    top: 60,
    bottom: 40,
    left: 25,
    right: 25,
  },
  loginText: {
    fontSize: 14,
    fontWeight: "700",
    position: "absolute",
    right: 25,
    bottom: 29,
  },
  spotify: {
    position: "absolute",
    left: 15,
    bottom: 25,
  },
});

export default styles;
