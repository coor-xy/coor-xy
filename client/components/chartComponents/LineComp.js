import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { transformData } from "../../utility";

const LineComp = (props) => {
  const { data, primaryColumn, valueColumns } = props;
  return (
    <LineChart
      width={500}
      height={300}
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
        <Line key={i} type="monotone" dataKey={col.name} stroke={col.color} />
      ))}
    </LineChart>
  );
};

export default LineComp;
