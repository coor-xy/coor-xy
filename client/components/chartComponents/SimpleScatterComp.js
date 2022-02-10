import React, { useCallback, useEffect } from "react";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { transformData } from "../../utility";

const SimpleScatterComp = (props) => {
  const {
    data,
    primaryColumn,
    valueColumns,
    width,
    height,
    xLabel,
    yLabel,
    legend,
    title,
    grid,
    download,
  } = props;
  let valueName;
  let valueColor;
  if (!valueColumns[0]) {
    valueName = "";
    valueColor = "#66ff00";
  } else {
    valueName = valueColumns[0].name;
    valueColor = valueColumns[0].color;
  }

  const [getChartPng, { ref: chartRef }] = useCurrentPng();

  const handleChartDownload = useCallback(async () => {
    const png = await getChartPng();
    if (png) {
      FileSaver.saveAs(png, "scatter-chart.png");
    }
  }, [getChartPng]);

  useEffect(() => {
    if (download) {
      handleChartDownload();
    }
  }, [download]);

  return (
    <div>
      <ScatterChart
        width={width}
        height={height}
        margin={{
          top: 25,
          right: 30,
          bottom: 30,
          left: 35,
        }}
        ref={chartRef}
      >
        <text
          x={(width + 60) / 2}
          y={10}
          fill="black"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="20" fontWeight="bold">
            {title}
          </tspan>
        </text>
        {grid ? <CartesianGrid strokeDasharray="3 3" /> : <></>}
        <XAxis
          type="number"
          dataKey={primaryColumn}
          name={primaryColumn}
          label={{ value: xLabel, offset: 10, position: "bottom" }}
        />
        <YAxis
          type="number"
          dataKey={valueName}
          name={valueName}
          label={{ value: yLabel, angle: -90, position: "left" }}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {legend ? <Legend verticalAlign="top" height={36} /> : <></>}
        <Scatter
          name="A school"
          data={transformData(data, primaryColumn, valueColumns)}
          fill={valueColor}
        />
      </ScatterChart>
    </div>
  );
};

export default SimpleScatterComp;
