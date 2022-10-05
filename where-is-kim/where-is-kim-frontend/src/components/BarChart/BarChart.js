import React from "react";

export default function BarChart({ chartRef }) {
  return <canvas id="bar" ref={chartRef} />;
}
