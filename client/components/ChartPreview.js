import React from "react";
import charts from "./chartComponents";
const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;

const defaultConfig = {
  width: 500,
  height: 400,
  xLabel: "",
  yLabel: "",
  legend: false,
  title: "",
  grid: false,
};

const ChartPreview = (props) => {
  const { type, data, selectedColumns } = props;

  return (
    <div>
      {type === "Bar" && (
        <BarComp
          data={data}
          primaryColumn={selectedColumns.primary}
          valueColumns={selectedColumns.values}
          width={defaultConfig.width}
          height={defaultConfig.height}
          xLabel={defaultConfig.xLabel}
          yLabel={defaultConfig.yLabel}
          legend={defaultConfig.legend}
          title={defaultConfig.title}
          grid={defaultConfig.grid}
        />
      )}
      {type === "Scatter" && (
        <SimpleScatterComp
          data={data}
          primaryColumn={selectedColumns.primary}
          valueColumns={selectedColumns.values}
          width={defaultConfig.width}
          height={defaultConfig.height}
          xLabel={defaultConfig.xLabel}
          yLabel={defaultConfig.yLabel}
          legend={defaultConfig.legend}
          title={defaultConfig.title}
          grid={defaultConfig.grid}
        />
      )}
      {type === "Area" && (
        <SimpleAreaComp
          data={data}
          primaryColumn={selectedColumns.primary}
          valueColumns={selectedColumns.values}
          width={defaultConfig.width}
          height={defaultConfig.height}
          xLabel={defaultConfig.xLabel}
          yLabel={defaultConfig.yLabel}
          legend={defaultConfig.legend}
          title={defaultConfig.title}
          grid={defaultConfig.grid}
        />
      )}
      {type === "Line" && (
        <LineComp
          data={data}
          primaryColumn={selectedColumns.primary}
          valueColumns={selectedColumns.values}
          width={defaultConfig.width}
          height={defaultConfig.height}
          xLabel={defaultConfig.xLabel}
          yLabel={defaultConfig.yLabel}
          legend={defaultConfig.legend}
          title={defaultConfig.title}
          grid={defaultConfig.grid}
        />
      )}
    </div>
  );
};

export default ChartPreview;
