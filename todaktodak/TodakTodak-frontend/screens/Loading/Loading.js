import React from "react";
import LotteView from "lottie-react-native";

import loading from "../../assets/loading.json";

import { LOADING_BACKGROUND } from "../../constants/color";

const Loading = ({ style }) => {
  return (
    <LotteView
      loop
      autoPlay
      speed={1}
      source={loading}
      style={[{ backgroundColor: LOADING_BACKGROUND }, style ]}
    />
  );
}

export default React.memo(Loading);
