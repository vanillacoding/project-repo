import React from "react";
import { View } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import Button from "../../../components/Button/Button";

import styles from "./styles";

import { RED } from "../../../constants/color";

const AnswerButtons = ({
  postId,
  isCommentLike,
  handleCommentLikeClick,
  handleModifyButtonClick,
  handleRoutePostButtonClick
}) => {
  return (
    <View style={styles.buttonWrapper}>
      <Button
        text="쓰담 쓰담"
        textStyle={styles.buttonText}
        buttonStyle={styles.buttonContainer}
        handleClick={handleCommentLikeClick}
      >
        <AntDesign
          style={styles.buttonIcon}
          size={25}
          color={RED}
          name={isCommentLike ? "heart" : "hearto"}
        />
      </Button>
      {postId &&
        <Button
          text="게시물로"
          textStyle={styles.buttonText}
          buttonStyle={styles.buttonContainer}
          handleClick={handleRoutePostButtonClick}
        >
          <AntDesign
            style={styles.buttonIcon}
            size={25}
            color={RED}
            name="inbox"
          />
        </Button>
      }
        <Button
          text="수정하기"
          textStyle={styles.buttonText}
          buttonStyle={styles.buttonContainer}
          handleClick={handleModifyButtonClick}
        >
          <Ionicons
            style={styles.buttonIcon}
            size={25}
            color={RED}
            name="document"
          />
      </Button>
    </View>
  );
};

export default React.memo(AnswerButtons);
