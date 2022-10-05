import { StyleSheet } from "react-native";

import {
  TRANSPARENCY,
  BEST_TITLE_TEXT,
  BEST_POST_CARD_TITLE,
  BEST_POST_CARD_BACKGROUND
} from "../../constants/color";

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
  categoryWrapper: {
    minHeight: 60,
    maxHeight: 60,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30
  },
  catagoryContainer: {
    width: "19%"
  },
  categoryStyle: {
    width: "90%"
  },
  bestPostCard: {
    marginTop: 10,
    backgroundColor: BEST_POST_CARD_BACKGROUND
  },
  bestPostTitle: {
    color: BEST_POST_CARD_TITLE
  },
  bestPost: {
    width: "100%",
    maxHeight: 200,
    alignItems: "center"
  },
  bestText: {
    height: 30,
    color: BEST_TITLE_TEXT,
    fontWeight: "bold",
    fontSize: 17
  },
  loadingWrapper: {
    width: "80%",
    height: "80%",
    marginLeft: 30
  },
  loading: {
    backgroundColor: TRANSPARENCY
  }
});

export default styles;
