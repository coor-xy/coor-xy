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

const PieComp = (props) => {
  const { data, primaryColumn, valueColumns, width, height, xLabel, yLabel, legend, title, grid,} = props;
  let valueName;
  let valueColor;
  let restData=[];
  if(!valueColumns[0]){
    valueName = []
    valueColor = '#66ff00'
  } else {
    valueName = data.map(obj=>{
      return {"name":obj[primaryColumn], "value":parseInt(obj[valueColumns[0].name]),}
    })
    if (valueColumns.length>1){
      for(let i=1;i<valueColumns.length;i++){
        restData.push(data.map(obj=>{
          return {"name":obj[primaryColumn], "value":parseInt(obj[valueColumns[i].name]), "color":valueColumns[i].color}
        }))
      }
    }
    valueColor = valueColumns[0].color
  }
  const outerRadius = width<301 ? width/5 : 80

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
      <text x={width/ 2} y={10} fill="black" textAnchor="middle" dominantBaseline="central">
        <tspan fontSize="20" fontWeight="bold">{title}</tspan>
      </text>
        <Pie
          dataKey="value"
          //isAnimationActive Toggles the animation
          isAnimationActive={true}
          data={valueName}
          cx="50%"
          cy="50%"
          //outer Radius controls the size of the whole pie
          outerRadius={outerRadius}
          fill={valueColor}
        />
        {valueColumns.length>1? restData.map((data,idx)=>{
          let adder = (outerRadius/5)*(idx+1)
          let radius = outerRadius+parseInt(adder)
          return(
          <Pie key={idx}
          dataKey="value"
          //isAnimationActive Toggles the animation
          isAnimationActive={true}
          data={data}
          cx="50%"
          cy="50%"
          //outer Radius controls the size of the whole pie
          innerRadius={radius}
          outerRadius={radius+20}
          fill={data[0].color}
        />)
          
}):<></>}
        <Tooltip />
      </PieChart>
  );
}

export default PieComp;
