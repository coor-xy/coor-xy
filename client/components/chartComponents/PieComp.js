import React from "react";
import { 
  PieChart, 
  Pie, 
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const dummyData = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 400 }
];
const PieComp = (props) => {
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
      <PieChart 
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
        <Pie
          dataKey="value"
          //isAnimationActive Toggles the animation
          isAnimationActive={true}
          data={dummyData}
          cx={200}
          cy={200}
          //outer Radius controls the size of the whole pie
          outerRadius={100}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
  );
}

export default PieComp;
