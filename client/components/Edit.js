import React, { useEffect, useState } from "react";
import { getRandomColor } from "../utility";

const TESTvalueColumns = ["Group A", "Group B", "Group C", "Group D"];

const Edit = () => {
  const valueColumns = TESTvalueColumns; // should get from props or redux store
  const [chartConfig, setChartConfig] = useState({
    width: 500,
    height: 400,
    seriesColor: {},
  });

  useEffect(() => {
    const mapSeriesColors = valueColumns.reduce((a, col) => {
      a[col] = getRandomColor();
      return a;
    }, {});
    setChartConfig({ ...chartConfig, seriesColor: {...mapSeriesColors} });
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

  const handleConfigSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <button>Share</button>
        <button>Delete</button>
      </div>
      <div>
        <form onSubmit={handleConfigSubmit}>
          <label htmlFor="width">
            <small>Width</small>
          </label>
          <input
            name="width"
            type="number"
            value={chartConfig.width}
            onChange={handleConfigChange}
          />

          <label htmlFor="height">
            <small>Height</small>
          </label>
          <input
            name="height"
            type="number"
            value={chartConfig.height}
            onChange={handleConfigChange}
          />
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
