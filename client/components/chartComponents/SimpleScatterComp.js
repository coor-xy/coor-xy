import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { transformData } from "../../utility";

const SimpleScatterComp = (props) => {
  const { data, primaryColumn, valueColumns } = props;
  return (
    <ScatterChart
      width={400}
      height={400}
      margin={{
        top: 20,
        right: 20,
        bottom: 20,
        left: 20,
      }}
    >
      <CartesianGrid />
      <XAxis type='number' dataKey={primaryColumn} name={primaryColumn} />
      <YAxis type='number' dataKey={valueColumns[0].name} name={valueColumns[0].name} />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name='A school' data={transformData(data, primaryColumn, valueColumns)} fill={valueColumns[0].color} />
    </ScatterChart>
  );
};

export default SimpleScatterComp;
