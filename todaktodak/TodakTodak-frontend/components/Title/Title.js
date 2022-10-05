import React from "react";
import {
  Text,
  View,
  Image
} from "react-native";

import styles from "./styles";

import titleImage from "../../assets/pngs/moon.png";

const Title = ({
  text,
  textStyle,
  titleStyle,
  imageStyle
}) => {
  return (
    <View style={[ styles.title, titleStyle ]}>
      <Image
        style={[ styles.titleImage, imageStyle ]}
        source={titleImage}
      />
      <Text style={[ styles.titleText, textStyle ]}>
        {text}
      </Text>
    </View>
  );
}

export default React.memo(Title);
