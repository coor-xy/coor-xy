import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { transformData } from "../../utility";

const SimpleScatterComp = (props) => {
  const { data, primaryColumn, valueColumns, width, height, xLabel, yLabel, legend, title, grid,} = props;
  let valueName;
  let valueColor;
  if(!valueColumns[0]){
    valueName = ''
    valueColor = '#66ff00'
  } else {
    valueName = valueColumns[0].name
    valueColor = valueColumns[0].color
  }

  return (
    <ScatterChart
      width={width}
      height={height}
      margin={{
        top: 25,
        right: 30,
        bottom: 30,
        left: 35,
      }}
    >
      <text x={(width+60) / 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
        <tspan fontSize="20" fontWeight="bold">{title}</tspan>
      </text>
      {grid ? 
      <CartesianGrid strokeDasharray="3 3"/> :
      <></>}
      <XAxis type='number' dataKey={primaryColumn} name={primaryColumn} label={{value: xLabel, offset:10, position:"bottom"}}/>
      <YAxis type='number' dataKey={valueName} name={valueName} label={{ value: yLabel, angle: -90, position: 'left' }}/>
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      {legend ?
      <Legend verticalAlign="top" height={36}/> :
        <></>
      }
      <Scatter name='A school' data={transformData(data, primaryColumn, valueColumns)} fill={valueColor} />
    </ScatterChart>
  );
};

export default SimpleScatterComp;
