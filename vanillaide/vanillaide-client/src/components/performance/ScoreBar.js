import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";

import {
  CONTENT,
  LIGHT_GREY_150,
  GREEN_100,
  RED_100,
  YELLOW_50,
} from "../../constants/color";

export default function ScoreBar({ category, score, barWidth }) {
  const [count, setCount] = useState(0);
  const [barColor, setBarColor] = useState(CONTENT);
  const scoreBarWidth = (barWidth * score) / 100;

  const countInterval = useRef(null);

  useEffect(() => {
    if (score < 40) {
      setBarColor(RED_100);
    } else if (score < 70) {
      setBarColor(YELLOW_50);
    } else {
      setBarColor(GREEN_100);
    }

    countInterval.current = setInterval(
      () => setCount((prev) => prev + 20),
      50,
    );

    return () => {
      clearInterval(countInterval);
    };
  }, []);

  useEffect(() => {
    if (count >= scoreBarWidth) {
      setCount(scoreBarWidth);
      clearInterval(countInterval);
    }
  }, [count]);

  return (
    <View style={styles().categoryContainer}>
      <Text style={styles().category}>{category}</Text>
      <Text style={styles().score}>{score}</Text>
      <View style={styles(barColor, count).animatedBar} />
    </View>
  );
}

ScoreBar.propTypes = {
  category: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  barWidth: PropTypes.number.isRequired,
};

const styles = (barColor, count) =>
  StyleSheet.create({
    categoryContainer: {
      marginLeft: 17,
      marginBottom: 10,
    },
    category: {
      fontSize: 15,
      fontFamily: "FiraCode",
      color: LIGHT_GREY_150,
    },
    score: {
      fontSize: 15,
      fontFamily: "FiraCode",
      color: LIGHT_GREY_150,
    },
    animatedBar: {
      width: count,
      height: 30,
      backgroundColor: barColor,
    },
  });
