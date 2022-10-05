import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopWidth: 0.3,
    borderColor: "rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  withinText: {
    fontSize: 20,
    fontFamily: "DMSans_500Medium",
    width: 180,
    marginTop: 30,
    fontWeight: "200",
    color: "rgba(0, 0, 0, 0.6)",
  },
  userIntroWrapper: {
    flexDirection: "row",
    marginBottom: 15,
    height: 100,
    width: 375,
    backgroundColor: "#191919",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.4)",
  },
  userInfo: {
    width: 330,
    justifyContent: "center",
  },
  userName: {
    fontFamily: "DMSans_700Bold",
    fontSize: 18,
    color: "#ffffff",
  },
  desc: {
    fontFamily: "DMSans_700Bold_Italic",
    fontSize: 13,
    color: "#ffffff",
  },
});

export default styles;
