import React from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { transformData, getRandomColor } from "../../utility";

const TestBarComp = (props) => {
  const { data, primaryColumn, valueColumns } = props;

  return (
    <BarChart
      width={500}
      height={400}
      data={transformData(data, primaryColumn, valueColumns)}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={primaryColumn} />
      <YAxis />
      <Tooltip />
      <Legend />
      {valueColumns.map((col, i) => (
        <Bar key={i} type="monotone" dataKey={col} fill={getRandomColor()} />
      ))}
    </BarChart>
  );
};

export default TestBarComp;
