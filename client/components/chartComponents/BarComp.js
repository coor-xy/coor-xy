import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { transformData } from "../../utility";

const BarComp = (props) => {
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
        <Bar key={i} type="monotone" dataKey={col.name} fill={col.color} />
      ))}
    </BarChart>
  );
};

export default BarComp;
