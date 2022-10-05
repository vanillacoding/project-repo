import { StyleSheet } from "react-native";

import {
  BLACK,
  TRANSPARENCY,
  CATEGORY_CARD_TITLE,
  CATEGORY_CARD_BACKGROUND
} from "../../constants/color";

const styles = StyleSheet.create({
  postCard: {
    width: "90%",
    minHeight: 70,
    justifyContent: "center",
    marginTop: 0,
    marginRight: "auto",
    marginBottom: 0,
    marginLeft: "auto",
    marginTop: 40,
    paddingLeft: 10,
    borderRadius: 10,
    backgroundColor: CATEGORY_CARD_BACKGROUND,
    shadowColor: BLACK,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.4,
    shadowRadius: 4
  },
  cardWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  postTitle: {
    minWidth: "40%",
    margin: 10,
    color: CATEGORY_CARD_TITLE,
    fontSize: 17,
    fontWeight: "bold"
  },
  postContentsWrapper: {
    flexDirection: "row"
  },
  postContent: {
    margin: 10,
    marginRight: 10,
    color: BLACK,
    fontWeight: "600"
  },
  likeWrapper: {
    flexDirection: "row"
  },
  likeIcon: {
    paddingTop: 11
  },
  deleteButton: {
    width: "100%",
    height: "auto",
    backgroundColor: TRANSPARENCY
  },
  deleteButtonText: {
    color: BLACK,
    fontSize: 17
  }
});

export default styles;
