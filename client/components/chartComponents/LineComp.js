import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label
} from "recharts";
import { transformData } from "../../utility";

const LineComp = (props) => {
  const { data, primaryColumn, valueColumns, width, height, xLabel, yLabel } = props;
  return (
    <LineChart
      width={width}
      height={height}
      data={transformData(data, primaryColumn, valueColumns)}
      margin={{
        top: 25,
        right: 20,
        left: 30,
        bottom: 35,
      }}
      
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={primaryColumn} label={{value: xLabel, offset:10, position:"bottom"}}/>
      <YAxis label={{ value: yLabel, angle: -90, position: 'left' }} />
      <Tooltip label={{ value: "Title", position: 'top' }}/>
      <Legend verticalAlign="top" height={36}/>
      {valueColumns.map((col, i) => (
        <Line key={i} type="monotone" dataKey={col.name} stroke={col.color} />
      ))}
    </LineChart>
  );
};

export default LineComp;
