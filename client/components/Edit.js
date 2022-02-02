import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getRandomColor } from "../utility";
import { useLocation } from "react-router-dom";
import charts from "./chartComponents";
const { BarComp, SimpleAreaComp, SimpleScatterComp, LineComp } = charts;

const Edit = () => {
  const location = useLocation();
  const { data, selectedColumns } = useSelector((state) => state);
  const availableCharts = ["Bar", "Funnel", "Line", "Pie", "Area", "Scatter"];
  const [chartConfig, setChartConfig] = useState({
    type: location.state.type,
    width: 500,
    height: 400,
    seriesColors: [],
  });

  useEffect(() => {
    // We can fetch a user's saved chart config in this hook if it exists
    // Otherwise, we can set the chart config in state with some defaults

    if (!chartConfig.seriesColors.length) {
      setChartConfig({
        ...chartConfig,
        seriesColors: [...selectedColumns.values],
      });
    }
  }, []);

  const handleConfigChange = (e) => {
    if (e.target.type === "number") {
      setChartConfig({
        ...chartConfig,
        [e.target.name]: parseInt(e.target.value || 0),
      });
    } else {
      setChartConfig({ ...chartConfig, [e.target.name]: e.target.value });
    }
  };

  const handleSeriesColorChange = (e) => {
    const { seriesColors } = chartConfig;
    seriesColors[e.target.name].color = e.target.value;
    setChartConfig({ ...chartConfig, seriesColors });
  };

  const handleConfigSubmit = (e) => {
    e.preventDefault();
    // if new chart, dispatch thunk with post request to add chartConfig to chart model
    // if existing chart, dispatch thunk with put request to update instance in chart model
  };

  return (
    <div>
      {!data.length ? (
        <div>
          <p>Try to create a component</p>
        </div>
      ) : (
        <div>
          <div>
            <button>Share</button>
            <button>Delete</button>
          </div>
          <div>
            <form onSubmit={handleConfigSubmit}>
              <div>
                <label htmlFor="type">
                  <small>Chart Type</small>
                </label>
                <select
                  name="type"
                  value={chartConfig.type}
                  onChange={handleConfigChange}
                >
                  {availableCharts.map((type, i) => (
                    <option key={i} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="width">
                  <small>Width</small>
                </label>
                <input
                  name="width"
                  type="number"
                  value={chartConfig.width}
                  onChange={handleConfigChange}
                />
              </div>

              <div>
                <label htmlFor="height">
                  <small>Height</small>
                </label>
                <input
                  name="height"
                  type="number"
                  value={chartConfig.height}
                  onChange={handleConfigChange}
                />
              </div>

              {chartConfig.seriesColors.map((series, index) => (
                <div key={index}>
                  <label htmlFor={series.name}>
                    <small>{`${series.name} color`}</small>
                  </label>
                  <input
                    name={index}
                    type="color"
                    value={series.color}
                    onChange={handleSeriesColorChange}
                  />
                </div>
              ))}

              <button type="submit">Save Changes</button>
            </form>
            {console.log(chartConfig)}
          </div>
          <div>
            {chartConfig.type === "Bar" && (
              <BarComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
              />
            )}
            {chartConfig.type === "Scatter" && (
              <SimpleScatterComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
              />
            )}
            {chartConfig.type === "Area" && (
              <SimpleAreaComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
              />
            )}
            {chartConfig.type === "Line" && (
              <LineComp
                data={data}
                primaryColumn={selectedColumns.primary}
                valueColumns={selectedColumns.values}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Edit;
