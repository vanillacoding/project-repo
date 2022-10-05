import React from "react";
import {
  View,
  Text,
  Image
} from "react-native";

import styles from "./styles";

import emptyBox from "../../assets/pngs/emptyBox.png";

const EmptyView = ({ text, viewStyle }) => {
  return (
    <View style={[ styles.emptyContainer, viewStyle ]}>
      <Image
        source={emptyBox}
        style={styles.emptyBoxImage}
      />
      <Text style={styles.emptyText}>
        {text}
      </Text>
    </View>
  );
};

export default React.memo(EmptyView);
