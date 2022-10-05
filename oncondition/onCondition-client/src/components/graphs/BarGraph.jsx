import React from "react";
import { useParams, useHistory } from "react-router";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";

import theme from "../../theme";
import GraphWrapper from "./GraphWrapper";

const MAX_RADIUS = 100;

const options = {
  parsing: {
    xAxisKey: "_id",
    yAxisKey: "sum",
  },
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "top",
    },
  },
  scales: {
    y: {
      min: 0,
      max: 18,
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

function BarGraph({ IncomingData }) {
  const { creatorId } = useParams();
  const history = useHistory();

  options.onClick = ({ chart }) => {
    const dataOid = chart.tooltip.dataPoints[0].raw.oid[0];
    history.push(`/${creatorId}/sleep/${dataOid}`);
  };

  const data = {
    datasets: [
      {
        backgroundColor: theme.background.sub,
        borderColor: theme.background.sub,
        borderWidth: 2,
        borderRadius: MAX_RADIUS,
        borderSkipped: false,
        hoverBackgroundColor: theme.background.main,
        hoverBorderColor: theme.background.main,
        data: IncomingData,
      },
    ],
  };

  return (
    <GraphWrapper>
      <Bar
        data={data}
        options={options}
      />
    </GraphWrapper>
  );
}

BarGraph.propTypes = {
  IncomingData: PropTypes.array,
};

export default BarGraph;
