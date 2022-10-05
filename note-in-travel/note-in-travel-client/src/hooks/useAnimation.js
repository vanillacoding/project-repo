import { useEffect, useState } from "react";
import { Animated } from "react-native";

/**
 * hook to make animate value
 * @param {number} initialState - of animate value
 * @param {number} toValue - destination value at end of animation
 * @param {number} duration - of animation
 * @returns animate value for Animated Component of react-native
 */
function useAnimation(initialState, toValue, duration) {
  const [animation] = useState(new Animated.Value(initialState));

  useEffect(() => {
    Animated.timing(animation, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  }, [animation, toValue, duration]);

  return animation;
}

export default useAnimation;
