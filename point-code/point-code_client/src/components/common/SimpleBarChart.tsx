import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from 'recharts';

type Data = {
  name: string;
  value: number;
};

type SimpleBarChartProps = {
  width: number;
  height: number;
  data: Data[];
};

const SimpleBarChart = ({ width, height, data }: SimpleBarChartProps) => (
  <BarChart
    width={width}
    height={height}
    data={data}
    margin={{ top: 60, right: 47, bottom: 0, left: 0 }}
  >
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis label={{ angle: -90, position: 'insideLeft' }} />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
);

export default SimpleBarChart;
