import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { transformData } from "../../utility";

const SimpleAreaComp = (props) => {
  const { data, primaryColumn, valueColumns } = props;
  return (
    <AreaChart
      width={500}
      height={400}
      data={transformData(data, primaryColumn, valueColumns)}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' />
      <XAxis dataKey={primaryColumn} />
      <YAxis />
      <Tooltip />
      {valueColumns.map((col, i) => (
        <Area key={i} type="monotone" dataKey={col.name} stroke={col.color} fill={col.color}/>
      ))}
    </AreaChart>
  );
};

export default SimpleAreaComp;
