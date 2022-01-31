import React, { useEffect, useState } from "react";
import { getRandomColor } from "../utility";

const TESTvalueColumns = ["Group A", "Group B", "Group C", "Group D"];
const TESTavailableCharts = ["Bar", "Funnel", "Line", "Pie", "Area", "Scatter"];

const Edit = () => {
  const valueColumns = TESTvalueColumns; // we should get columns from props or redux store
  const availableCharts = TESTavailableCharts; // we should get columns from props or redux store
  const [chartConfig, setChartConfig] = useState({
    type: "Bar",
    width: 500,
    height: 400,
    seriesColors: [],
  });

  useEffect(() => {
    // We can fetch a user's saved chart config in this hook if it exists
    // Otherwise, we can set the chart config in state with some defaults
    if (!chartConfig.seriesColors.length) {
      const mapRandomColors = valueColumns.map((col) => ({
        name: col,
        color: getRandomColor(),
      }));
      setChartConfig({ ...chartConfig, seriesColors: [...mapRandomColors] });
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
        <p>chart goes here</p>
      </div>
    </div>
  );
};

export default Edit;
