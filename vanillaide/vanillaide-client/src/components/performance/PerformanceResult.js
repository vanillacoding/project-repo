import PropTypes from "prop-types";
import { StyleSheet, View, Text, Dimensions } from "react-native";

import { LIGHT_GREY_150 } from "../../constants/color";
import ScoreBar from "./ScoreBar";

export default function PerformanceResult({ performanceScore }) {
  const { performance, accessibility, bestPractices, seo, pwa } =
    performanceScore;
  const { width: screenWidth } = Dimensions.get("window");
  const barWidth = (screenWidth * 9) / 10;

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Performance</Text>
        <Text style={styles.title}>Result</Text>
      </View>
      <View style={styles.barWrapper}>
        <ScoreBar
          category="Performance"
          score={performance}
          barWidth={barWidth}
        />
        <ScoreBar
          category="Accessibility"
          score={accessibility}
          barWidth={barWidth}
        />
        <ScoreBar
          category="Best Practices"
          score={bestPractices}
          barWidth={barWidth}
        />
        <ScoreBar category="SEO" score={seo} barWidth={barWidth} />
        <ScoreBar category="PWA" score={pwa} barWidth={barWidth} />
      </View>
    </View>
  );
}

PerformanceResult.propTypes = {
  performanceScore: PropTypes.shape({
    performance: PropTypes.number.isRequired,
    accessibility: PropTypes.number.isRequired,
    bestPractices: PropTypes.number.isRequired,
    seo: PropTypes.number.isRequired,
    pwa: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    margin: 0,
    width: "100%",
    height: "100%",
  },
  titleWrapper: {
    marginBottom: 5,
    alignItems: "center",
  },
  title: {
    marginBottom: 3,
    fontSize: 28,
    fontFamily: "FiraCode",
    color: LIGHT_GREY_150,
  },
  barWrapper: {
    alignItems: "flex-start",
    width: "100%",
  },
});
