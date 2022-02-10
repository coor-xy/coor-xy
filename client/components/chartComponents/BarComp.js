import React, { useCallback, useEffect } from "react";
import FileSaver from "file-saver";
import { useCurrentPng } from "recharts-to-png";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import { transformData } from "../../utility";

const BarComp = (props) => {
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
  const [getChartPng, { ref: chartRef }] = useCurrentPng();

  const handleChartDownload = useCallback(async () => {
    const png = await getChartPng();
    if (png) {
      FileSaver.saveAs(png, "bar-chart.png");
    }
  }, [getChartPng]);

  useEffect(() => {
    if (download) {
      handleChartDownload();
    }
  }, [download]);

  return (
    <div>
      <BarChart
        width={width}
        height={height}
        data={transformData(data, primaryColumn, valueColumns)}
        margin={{
          top: 25,
          right: 30,
          left: 30,
          bottom: 35,
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
          dataKey={primaryColumn}
          label={{ value: xLabel, offset: 10, position: "bottom" }}
        />
        <YAxis label={{ value: yLabel, angle: -90, position: "left" }} />
        <Tooltip />
        {legend ? <Legend verticalAlign="top" height={36} /> : <></>}
        {valueColumns.map((col, i) => (
          <Bar key={i} type="monotone" dataKey={col.name} fill={col.color} />
        ))}
      </BarChart>
    </div>
  );
};

export default BarComp;
