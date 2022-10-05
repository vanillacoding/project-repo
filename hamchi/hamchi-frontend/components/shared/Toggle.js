import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFilter } from '../../features/postSlice';
import { Animated, View, Text, Pressable, StyleSheet, Easing } from 'react-native';
import colors from '../../theme/color';

const Toggle = () => {
  const dispatch = useDispatch();
  const isFiltered = useSelector(state => state.post.isFiltered);

  const moveAnim = useRef(new Animated.Value(1)).current;
  const moveToggleWheel = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-34, 22]
  });

  const changeWheelWidth = moveAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.25],
  });

  Animated.timing(moveAnim, {
    toValue: isFiltered ? 1 : 0,
    duration: 120,
    easing: Easing.linear,
    useNativeDriver: true
  }).start();

  function handleSwitchToggle() {
    dispatch(toggleFilter(!isFiltered));
  }

  return (
    <View>
      <Pressable onPress={handleSwitchToggle}
      >
        <View style={styles.toggleContainer}>
          <Animated.View style={
            [styles.toggleWheel,
            { transform: [{ translateX: moveToggleWheel, scaleX: changeWheelWidth }] },
            ]}>
          </Animated.View>
          <View style={styles.options} >
            <View style={styles.all}>
              <Text
                style={[styles.text, { color: isFiltered ? colors.black : colors.main }]}
              >전체</Text>
            </View>
            <View style={styles.tag}>
              <Text
                style={[styles.text, { color: isFiltered ? colors.main : colors.black }]}
              >관심태그</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View >
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    position: "relative",
    alignItems: "center",
    width: 121,
    height: 36,
    backgroundColor: colors.outline,
    borderRadius: 20,
    justifyContent: 'center',
    paddingLeft: 5,
  },
  toggleWheel: {
    width: 50,
    height: 29,
    backgroundColor: 'white',
    borderRadius: 14,
  },
  options: {
    position: "absolute",
    width: 100,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  all: {
    paddingLeft: 6,
    width: 50,
    textAlign: "center",
  },
  tag: {
    paddingLeft: 1,
    width: 50,
    textAlign: "center",
  },
  text: {
    fontWeight: "bold",
  }
});

export default Toggle;
