import theme from "../theme";

const radarDefaultOptions = {
  datasets: {
    radar: {
      borderColor: theme.background.sub,
      backgroundColor: theme.background.graphData,
    },
  },
  scales: {
    r: {
      min: 0,
      max: 10,
      grid: {
        color: theme.background.main,
      },
      ticks: {
        backdropColor: "transparent",
        stepSize: 2,
        color: theme.text.sub,
        font: {
          size: theme.fontSizes.graph,
        },
      },
      pointLabels: {
        color: theme.text.sub,
        font: {
          size: theme.fontSizes.graph,
        },
      },
    },
  },
  animation: {
    duration: 0,
  },
};

export { radarDefaultOptions };
