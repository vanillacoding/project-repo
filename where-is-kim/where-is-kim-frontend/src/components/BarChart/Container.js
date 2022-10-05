import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import BarChart from "./BarChart";
import randomColor from "randomcolor";

export default function BarChartContainer({ records }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const data = records;
    const backgroundColor = data.map(() =>
      randomColor({
        luminosity: "bright",
        format: "rgba",
        alpha: 0.5,
      })
    );

    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor,
            borderColor: "#666",
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 1,
              },
            },
          ],
        },
        legend: {
          display: false,
        },
      },
    });
  }, [records]);
  return <BarChart chartRef={chartRef} />;
}
