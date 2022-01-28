import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";

const data = [
  { name: "Group A", value: 100 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 400 }
];
const PieComp = () => {

  return (
    <div className="PieComp">
      <PieChart width={500} height={500}>
        <Pie
          dataKey="value"
          //isAnimationActive Toggles the animation
          isAnimationActive={true}
          data={data}
          cx={200}
          cy={200}
          //outer Radius controls the size of the whole pie
          outerRadius={100}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default PieComp;
