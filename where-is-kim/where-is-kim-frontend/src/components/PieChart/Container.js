import React, { useRef, useEffect } from "react";
import Chart from "chart.js";
import randomColor from "randomcolor";
import PieChart from "./PieChart";

export default function PieChartContainer({ records }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const labels = records.map((record) => record.name);
    const data = records.map((record) => record.times);
    const backgroundColor = records.map(() =>
      randomColor({
        luminosity: "bright",
        format: "rgba",
        alpha: 0.5,
      })
    );

    new Chart(ctx, {
      type: "pie",
      data: {
        labels,
        datasets: [
          {
            data,
            borderColor: "#666",
            borderWidth: 3,
            backgroundColor,
          },
        ],
      },
    });
  }, [records]);
  return <PieChart chartRef={chartRef} />;
}
