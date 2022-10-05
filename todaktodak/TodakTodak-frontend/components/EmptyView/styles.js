import { StyleSheet } from "react-native";

import { WHITE } from "../../constants/color";

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    marginTop: "40%"
  },
  emptyBoxImage: {
    width: 100,
    height: 100
  },
  emptyText: {
    marginTop: 20,
    color: WHITE,
    fontSize: 20
  }
});

export default styles;
