import React from "react";

import PropTypes from "prop-types";
import { Bar, defaults } from "react-chartjs-2";
import styled from "styled-components";

defaults.color = "#ffffff";
defaults.borderColor = "rgba(255, 255, 255, 0.1)";

const Wrapper = styled.div`
  width: calc(100vw - 150px);
  height: 100%;
  padding: 0 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const getFieldList = (rankings, field) => (
  rankings.map((player) => player[field])
);

function Chart({ positionRankings }) {
  const data = {
    labels: getFieldList(positionRankings, "name"),
    datasets: [
      {
        label: "Score of Player",
        data: getFieldList(positionRankings, "score"),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(68, 133, 244, 0.2)",
          "rgba(40, 255, 175, 0.2)",
          "rgba(255, 40, 199, 0.2)",
          "rgba(215, 162, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(68, 133, 244, 1)",
          "rgba(40, 255, 175, 1)",
          "rgba(255, 40, 199, 1)",
          "rgba(215, 162, 255, 1)",
        ],
        borderWidth: 1,
      },
      {
        label: "Users",
        data: getFieldList(positionRankings, "users"),
        backgroundColor: [
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(255, 255, 255, 0.5)",
        ],
        borderColor: [
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Wrapper>
      <Bar
        data={data}
        height={140}
      />
    </Wrapper>
  );
}

Chart.propTypes = {
  positionRankings: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Chart;
