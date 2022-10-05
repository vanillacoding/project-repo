import React from "react";
import {
  View,
  Text,
  TouchableOpacity
} from "react-native";

import styles from "./styles";

import {
  OPACITY_BACKGROUND,
  CATEGORY_ACTIVE_COLOR
} from "../../constants/color";
import { TEST_ID } from "../../constants/testContents";

const CategoryButton = ({
  title,
  titleStyle,
  focusValue,
  handleClick,
  categoryContainerStyle,
  categoryColor = CATEGORY_ACTIVE_COLOR
}) => {
  return (
    <View style={[styles.categoryContainer, categoryContainerStyle]}>
      <TouchableOpacity
        testID={TEST_ID}
        accessibilityRole="button"
        onPress={() => handleClick(title)}
        style={[
          styles.categoryWrapper,
          {
            backgroundColor:
              focusValue === title
                ? categoryColor
                : OPACITY_BACKGROUND
          }
        ]}
      >
        <Text style={[ styles.categoryTitle, titleStyle ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(CategoryButton);
