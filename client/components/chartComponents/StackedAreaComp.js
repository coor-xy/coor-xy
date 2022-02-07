import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { transformData } from "../../utility";

const StackedAreaComp = (props) => {
  const { data, primaryColumn, valueColumns, width, height, xLabel, yLabel, legend, title, grid,} = props;

  return (
    <AreaChart
      width={width}
      height={height}
      data={transformData(data, primaryColumn, valueColumns)}
      margin={{
        top: 25,
        right: 30,
        left: 30,
        bottom: 35,
      }}
    >
      <text x={(width+60) / 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
        <tspan fontSize="20" fontWeight="bold">{title}</tspan>
      </text>
      {grid ? 
      <CartesianGrid strokeDasharray="3 3"/> :
      <></>}
      <XAxis dataKey={primaryColumn} label={{value: xLabel, offset:10, position:"bottom"}}/>
      <YAxis label={{ value: yLabel, angle: -90, position: 'left' }} />
      <Tooltip />
      {legend ?
      <Legend verticalAlign="top" height={36}/> :
        <></>
      }
      {valueColumns.map((col, i) => (
        <Area key={i} type="monotone" stackId='a' dataKey={col.name} stroke={col.color} fill={col.color}/>
      ))}
    </AreaChart>
  );
};

export default StackedAreaComp;
