import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

import { CATEGORY_DEFAULT_BACKGROUND } from "../../constants/color";

const Category = ({
  title,
  titleStyle,
  categoryStyle,
  categoryContainerStyle,
  categoryColor = CATEGORY_DEFAULT_BACKGROUND
}) => {
  return (
    <View style={[ styles.categoryContainer, categoryContainerStyle ]}>
      <View
        style={[
          styles.categoryWrapper,
          { backgroundColor: categoryColor },
          categoryStyle
        ]}
      >
        <Text style={[ styles.categoryTitle, titleStyle ]}>
          {title}
        </Text>
      </View>
    </View>
  );
}

export default React.memo(Category);
