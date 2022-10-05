import React, { useState } from "react";
import PropTypes from "prop-types";
import { Line } from "react-chartjs-2";

import theme from "../../theme";
import GraphWrapper from "./GraphWrapper";

function LineGraph({ categories, dataPerDate }) {
  const [clickedDatasetLabel, setClickedDatasetLabel] = useState(categories[0]);
  const lastestSevenDaysIndex = -7;
  const dates = Object.keys(dataPerDate).sort().slice(lastestSevenDaysIndex);
  const datasets = categories.map((category, i) => {
    const data = dates.map((date) => dataPerDate[date][i]);

    return { label: category, data };
  });

  const data = { labels: dates, datasets };

  const LineOptions = {
    scales: {
      y: {
        min: 0,
        max: 10,
        ticks: {
          stepSize: 1,
          z: 1,
          color: theme.text.sub,
          font: {
            size: theme.fontSizes.graph,
          },
        },
      },
      x: {
        grid: {
          color: theme.text.sub,
        },
        ticks: {
          color: theme.text.sub,
          font: {
            size: theme.fontSizes.graph,
          },
        },
      },
    },
    elements: {
      point: {
        radius: 10,
      },
    },
    aspectRatio: 1,
    events: ["click"],
    plugins: {
      tooltip: {
        backgroundColor: theme.background.main,
        mode: "dataset",
      },
    },
    borderColor(context) {
      const index = context.datasetIndex;
      const label = data.datasets[index].label;
      if (label === clickedDatasetLabel) {
        return theme.lineGraph.clicked;
      }

      return theme.lineGraph.unclicked;
    },
    backgroundColor(context) {
      const index = context.datasetIndex;
      const label = data.datasets[index].label;
      if (label === clickedDatasetLabel) {
        return theme.lineGraph.clicked;
      }

      return theme.lineGraph.unclicked;
    },
    animation: {
      duration: 0,
    },
  };

  const handleGraphClick = function (element) {
    if (element.length) {
      const clickedDatasetIndex = element[0].datasetIndex;
      const label = data.datasets[clickedDatasetIndex].label;
      setClickedDatasetLabel(label);
    }
  };

  return (
    <GraphWrapper>
      <Line
        data={data}
        options={LineOptions}
        getElementAtEvent={handleGraphClick}
      />
    </GraphWrapper>
  );
}

LineGraph.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string),
  dataPerDate: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)),
};

export default LineGraph;
