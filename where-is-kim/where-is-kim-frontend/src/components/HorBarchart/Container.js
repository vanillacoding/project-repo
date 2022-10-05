import React, { useEffect, useRef } from "react";
import HorBarchart from "./HorBarchart";
import { connect } from "react-redux";
import moment from "moment";
import Chart from "chart.js";
import randomColor from "randomcolor";

function HorBarchartContainer({ records }) {
  const chartRef = useRef(null);
  const data = records.map((record) => record.workingTime);
  const labels = records.map((record) => record.username);
  const backgroundColor = data.map(() =>
    randomColor({
      luminosity: "bright",
      format: "rgba",
      alpha: 0.5,
    })
  );

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels,
        datasets: [
          {
            backgroundColor,
            borderColor: "#666",
            borderWidth: 3,
            data,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
        labels: false,
      },
    });
  }, [data, labels, backgroundColor]);

  return <HorBarchart records={records} chartRef={chartRef} />;
}

const mapStateToProps = (state) => {
  const monday = moment().day(1);
  const workingTimeStore = state.team.allRecordIds.reduce((acc, id) => {
    const {
      recorded_by: recordedBy,
      work_on: workOn,
      work_off: workOff,
    } = state.team.recordById[id];

    if (moment(workOn).isAfter(monday)) {
      const diff = Number(
        moment(workOff).diff(moment(workOn), "hours", true)
      ).toFixed(1);

      if (acc[recordedBy]) {
        acc[recordedBy] += diff;
      } else {
        acc[recordedBy] = diff;
      }
    }
    return acc;
  }, {});
  const records = Object.keys(workingTimeStore).map((id) => {
    const username = state.team.partById[id].username;
    return { username, workingTime: workingTimeStore[id] };
  });
  return {
    records,
  };
};

export default connect(mapStateToProps)(HorBarchartContainer);
